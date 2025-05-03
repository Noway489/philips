# services/question_service.py

import logging
import gemini_client

logger = logging.getLogger("philips")

def generate_questions(page_context: str):
    """
    Generate a set of feedback questions via the Gemini API client.

    Args:
        page_context (str): Description of what the user saw/did.

    Returns:
        List[str]: A list of question strings.
    """
    try:
        questions = gemini_client.generate_questions(page_context)
        if not isinstance(questions, list):
            raise ValueError("Expected a list of questions from Gemini client")
        return questions
    except Exception as e:
        logger.error(f"Error generating questions: {e}")
        raise
