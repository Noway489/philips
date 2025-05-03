# gemini_client.py

import os
import json
import logging
from typing import List
import google.genai as genai

logger = logging.getLogger('philips')

# ----------------------------------------------------------------------------
# Configure the Gemini client
# ----------------------------------------------------------------------------
API_KEY = os.getenv("GEMINI_API_KEY")
if not API_KEY:
    raise RuntimeError("GEMINI_API_KEY is not set")

client = genai.Client(api_key=API_KEY)

# ----------------------------------------------------------------------------
# Use the specified generative model
# ----------------------------------------------------------------------------
MODEL_NAME = "gemini-2.5-flash-preview-04-17"

def generate_questions(
    page_context: str,
    initial_response: str,
    num_questions: int = 3
) -> List[str]:
    """
    Generate a set of follow-up feedback questions based on the user's initial response.

    Args:
        page_context: Description of what the user just interacted with.
        initial_response: The user's first free-form response.
        num_questions: How many follow-up questions to generate (default 3).

    Returns:
        A list of question strings.
    """
    prompt = (
        f'A user has just interacted with: "{page_context}".\n'
        f'The initial response is for question: "{initial_response}".\n\n'
        f'Generate {num_questions} user feedback questions tailored to this context.\n\n'
        "IMPORTANT:\n"
        "- Return ONLY a raw JSON array of strings.\n"
        "- Do NOT include any explanation.\n"
        "- Do NOT wrap the JSON in markdown formatting (no backticks or 'json').\n"
        '- Output format example: ["Question 1", "Question 2", "Question 3"]'
    )

    messages = [
        {"role": "user", "content": prompt},
    ]

    try:
        resp = client.chat.completions.create(
            model=MODEL_NAME,
            messages=messages,
            temperature=0.2,
            max_output_tokens=512,
        )
        content = resp.choices[0].message.content.strip()
        questions = json.loads(content)
        if not (isinstance(questions, list) and all(isinstance(q, str) for q in questions)):
            raise ValueError(f"Expected JSON array of strings, got: {questions!r}")
        return questions

    except Exception as e:
        logger.error(f"Error generating questions with {MODEL_NAME}: {e}")
        raise
