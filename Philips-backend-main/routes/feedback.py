# routes/feedback.py

from flask import Blueprint, request, jsonify
from models import db, Feedback

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
    Returns: { "sentiment": str, "score": float }
    """
    # Delay import here to break circular dependency
    from services.sentiment_service import process_feedback

    data = request.get_json() or {}
    page_context = data.get('pageContext') or data.get('page_context')
    user_responses = data.get("userResponse")
    questions = data.get("questions", [])

    # Validate that we received a list of responses
    if not user_responses or not isinstance(user_responses, list):
        return jsonify({"error": "Missing or invalid 'userResponse' field"}), 400

    # Join responses into one string for processing (if your sentiment service expects a string)
    user_response_text = "\n".join(user_responses)

    label, score = process_feedback(page_context, user_response_text)

    # Store the feedback submission along with the JSON array of responses and questions into the database.
    new_feedback = Feedback(
         page_context=page_context,
         user_response=user_responses,
         sentiment_label=label,
         sentiment_score=score
        #  questions=questions
    )
    db.session.add(new_feedback)
    db.session.commit()

    return jsonify({
         "sentiment": label,
         "score": score
    }), 200
