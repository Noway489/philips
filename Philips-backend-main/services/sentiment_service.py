# services/sentiment_service.py
# import logging
# from huggingface_client import analyze_sentiment
# from app import db
# from models import Feedback
import logging
from huggingface_client import analyze_sentiment
from models import Feedback
from extensions import db
logger = logging.getLogger("philips")

def process_feedback(page_context: str, user_response: str):
    """
    Analyze the sentiment of a user's response and persist it.

    Args:
        page_context (str): Optional context about where the user was.
        user_response (str): The raw feedback text from the user.

    Returns:
        tuple[label (str), score (float)]: Sentiment label and confidence score.
    """
    # 1) Run the HF model
    label, score = analyze_sentiment(user_response)

    # 2) Save to Postgres (deferred import to break circular dependency)
    # from app import db

    try:
        fb = Feedback(
            page_context=page_context,
            user_response=user_response,
            sentiment_label=label,
            sentiment_score=score
        )
        db.session.add(fb)
        db.session.commit()
    except Exception as e:
        logger.error(f"DB error saving feedback: {e}")
        db.session.rollback()
        raise

    return label, score
