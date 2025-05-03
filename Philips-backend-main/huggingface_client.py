# huggingface_client.py

import os
import logging
import numpy as np
import torch
from transformers import AutoTokenizer, AutoModelForSequenceClassification

# Configure logger
logger = logging.getLogger('philips')

# Optionally respect custom HF cache directory
hf_home = os.getenv("HF_HOME")
if hf_home:
    os.environ["HF_HOME"] = hf_home

# Model details (as per https://huggingface.co/cardiffnlp/twitter-xlm-roberta-base-sentiment)
MODEL_NAME = "cardiffnlp/twitter-xlm-roberta-base-sentiment"
LABELS = ["negative", "neutral", "positive"]

# Load tokenizer & model once at import time
try:
    tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
    model = AutoModelForSequenceClassification.from_pretrained(MODEL_NAME)
    model.eval()
    logger.info(f"Loaded sentiment model `{MODEL_NAME}` successfully")
except Exception as e:
    logger.error(f"Failed to load sentiment model `{MODEL_NAME}`: {e}")
    raise

def analyze_sentiment(text: str):
    """
    Analyze sentiment of `text` using the Twitter XLM-RoBERTa model.
    Returns a tuple: (label: str, score: float).
    """
    try:
        # Tokenize and prepare inputs
        inputs = tokenizer(
            text,
            return_tensors="pt",
            truncation=True,
            max_length=512
        )

        # Run model (no gradient)
        with torch.no_grad():
            outputs = model(**inputs)
            logits = outputs.logits[0].cpu().numpy()

        # Convert logits to probabilities via softmax
        exp_logits = np.exp(logits - np.max(logits))
        probs = exp_logits / exp_logits.sum()

        # Pick the highest-probability label
        idx = int(np.argmax(probs))
        label = LABELS[idx]
        score = float(probs[idx])

        return label, score

    except Exception as err:
        logger.error(f"Error during sentiment analysis: {err}")
        # Fallback in case of error
        return "error", 0.0
