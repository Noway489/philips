# routes/feedback.py

from flask import Blueprint, request, jsonify
from models import db, Feedback
import logging

feedback_bp = Blueprint('feedback_bp', __name__)

@feedback_bp.route('/feedback', methods=['POST'])
def feedback():
    """
    POST /api/feedback
    Body JSON: {
      "pageContext": "...",       # optional
      "userResponse": [...],      # required array of responses
      "questions": [...]          # optional array of strings
    }
    
    Saves the raw feedback immediately and returns a status message.
    The intensive sentiment processing and insights generation run asynchronously.
    """
    from services.sentiment_service import process_feedback
    from services.insight_service import generate_insights
    from threading import Thread
    from app import app

    data = request.get_json() or {}
    page_context = data.get('pageContext') or data.get('page_context')
    user_responses = data.get("userResponse")
    questions_array = data.get("questions", [])
    app_logger = logging.getLogger("philips")
    app_logger.info(f"Received feedback: {data}")

    # Validate that we received a list of responses
    if not user_responses or not isinstance(user_responses, list):
        return jsonify({"error": "Missing or invalid 'userResponse' field"}), 400

    # Save raw feedback data with placeholders (sentiment pending, empty insights)
    new_feedback = Feedback(
         page_context=page_context,
         user_response=user_responses,
         questions=questions_array,
         sentiment_label="pending",
         sentiment_score=0.0,
         insights={}
    )
    db.session.add(new_feedback)
    db.session.commit()

    # Background processing: update the record with sentiment and insights
    def process_and_update(feedback_id, page_context, responses, questions_array):
        # Wrap processing in an application context
        with app.app_context():
            user_response_text = "\n".join(responses)
            try:
                label, score = process_feedback(page_context, user_response_text)
                insights = generate_insights({
                      "page_context": page_context,
                      "user_response": user_response_text,
                      "questions": questions_array,
                      "sentiment_label": label,
                      "sentiment_score": score,
                 })
                # Retrieve the record and update it
                feedback_record = Feedback.query.get(feedback_id)
                feedback_record.sentiment_label = label
                feedback_record.sentiment_score = score
                feedback_record.insights = insights
                db.session.commit()
                app_logger.info(f"Updated feedback {feedback_id} with sentiment and insights")
            except Exception as e:
                app_logger.error(f"Error processing feedback {feedback_id}: {e}")

    thread = Thread(target=process_and_update, args=(new_feedback.id, page_context, user_responses, questions_array))
    thread.start()

    # Return immediately without waiting for intensive processing to finish.
    return jsonify({"status": "Feedback received. Processing will be updated shortly."}), 200


@feedback_bp.route('/feedback', methods=['GET'])
def get_feedback():
    """
    GET /api/feedback
    Returns: JSON array of all feedback entries in the database.
    """
    feedback_entries = Feedback.query.all()
    feedback_list = [entry.to_dict() for entry in feedback_entries]
    return jsonify(feedback_list), 200