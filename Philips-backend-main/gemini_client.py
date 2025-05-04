import os
import json
import logging
from typing import List
import google.generativeai as genai

logger = logging.getLogger("philips")

API_KEY = os.getenv("GEMINI_API_KEY")
if not API_KEY:
    raise RuntimeError("GEMINI_API_KEY is not set")

genai.configure(api_key=API_KEY)

MODEL_NAME = "models/gemini-1.5-flash" 
model = genai.GenerativeModel(model_name=MODEL_NAME)


def generate_questions(
    page_context: str,
    initial_response: str,
    num_questions: int = 3
) -> List[str]:
    prompt = (
        f'A user has just interacted with: "{page_context}".\n'
        f'The initial response is: "{initial_response}".\n\n'
        f'Generate {num_questions} user feedback questions tailored to this context.\n\n'
        "IMPORTANT:\n"
        "- Return ONLY a raw JSON array of strings.\n"
        "- Do NOT include any explanation.\n"
        "- Do NOT wrap the JSON in markdown formatting (no backticks or 'json').\n"
        '- Output format example: ["Question 1", "Question 2", "Question 3"]'
    )

    try:
        chat = model.start_chat()
        response = chat.send_message(prompt)
        content = response.text.strip()

        questions = json.loads(content)
        if not isinstance(questions, list) or not all(isinstance(q, str) for q in questions):
            raise ValueError(f"Invalid format: {questions!r}")
        return questions

    except Exception as e:
        logger.error(f"Error generating questions: {e}")
        raise

def generate_insights(feedback: dict) -> dict:
    prompt = f"""
You are an AI that analyzes structured user feedback and returns insights in strict JSON format.

Here is the feedback data:
{json.dumps(feedback, indent=2)}

INSTRUCTIONS:
- Analyze the user_response field in context of page_context and questions.
- Return only valid JSON. No explanations or markdown.
- Your response MUST have this structure:

{{
  "summary": "<Brief summary of the user’s feedback>",
  "action_items": ["<First actionable insight>", "<Second>"],
  "theme": "<One or two-word theme like Navigation, Content Clarity, Performance>"
}}

Rules:
- NO markdown or backticks (`) in output.
- Make sure it's valid JSON.
- Don't include any commentary, just the raw JSON.
"""

    try:
        chat = model.start_chat()
        response = chat.send_message(prompt)
        content = response.text.strip()

        insights = json.loads(content)
        if not isinstance(insights, dict):
            raise ValueError("Gemini did not return a valid JSON object.")

        return insights

    except Exception as e:
        logger.error(f"Error generating insights: {e}")
        raise
