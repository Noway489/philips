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

    return label, score
