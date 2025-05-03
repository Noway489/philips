# routes/questions.py

from flask import Blueprint, request, jsonify

questions_bp = Blueprint('questions_bp', __name__)

@questions_bp.route('/questions', methods=['POST'])
def questions():
    # Delay import here to avoid circular import
    from services.question_service import generate_questions

    data = request.get_json() or {}
    page_context = data.get('pageContext') or data.get('page_context')
    if not page_context:
        return jsonify({"error": "Missing 'pageContext' field"}), 400

    try:
        questions = generate_questions(page_context)
        return jsonify({ "questions": questions }), 200
    except Exception as e:
        # Your utils/logger will have already logged it
        return jsonify({ "error": str(e) }), 500
