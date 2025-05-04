import logging
import gemini_client  # assumes you have a Gemini API wrapper here

logger = logging.getLogger("philips")

MAX_RETRIES = 2

EXPECTED_KEYS = {"summary", "action_items", "theme"}

def is_valid_response(data: dict) -> bool:
    """Validate if Gemini response has required keys."""
    return isinstance(data, dict) and EXPECTED_KEYS.issubset(data.keys())


def generate_insights(feedback_obj: dict):
    """
    Send structured feedback data to Gemini and retrieve insights.

    Args:
        feedback_obj (dict): The full feedback entry from DB or user.

    Returns:
        dict: Insights including summary, theme, sentiment, action items.

    Raises:
        ValueError: If valid structured output could not be generated.
    """
    retries = 0
    while retries <= MAX_RETRIES:
        try:
            logger.info(f"Generating insights, attempt {retries+1}")
            result = gemini_client.generate_insights(feedback_obj)

            if is_valid_response(result):
                return result
            else:
                logger.warning(f"Invalid Gemini response format: {result}")
                retries += 1

        except Exception as e:
            logger.error(f"Error communicating with Gemini: {e}")
            retries += 1

    raise ValueError("Failed to generate structured insights after multiple retries.")
