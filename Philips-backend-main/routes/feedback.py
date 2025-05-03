# routes/feedback.py

# from flask import Blueprint, request, jsonify
# from services.sentiment_service import process_feedback

# routes/feedback.py

from flask import Blueprint, request, jsonify

feedback_bp = Blueprint('feedback_bp', __name__)

@feedback_bp.route('/feedback', methods=['POST'])
def feedback():
    """
    POST /api/feedback
    Body JSON: {
      "pageContext": "...",     # optional
      "userResponse": "..."     # required
    }
    Returns: { "sentiment": str, "score": float }
    """
    # Delay import here to break circular dependency
    from services.sentiment_service import process_feedback

    data = request.get_json() or {}
    # support both camelCase & snake_case
    page_context = data.get('pageContext') or data.get('page_context')
    user_response = (
        data.get('userResponse')
        or data.get('user_response')
        or data.get('feedback')
    )

    if not user_response:
        return jsonify({"error": "Missing 'userResponse' field"}), 400

    label, score = process_feedback(page_context, user_response)
    return jsonify({
        "sentiment": label,
        "score":      score
    }), 200
