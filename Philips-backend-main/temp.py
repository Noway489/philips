import argparse
from huggingface_client import analyze_sentiment

def main():
    parser = argparse.ArgumentParser(
        description="Analyze sentiment using the Twitter XLM-RoBERTa model."
    )
    parser.add_argument(
        "--text",
        type=str,
        default="I love this product!",
        help="Text to analyze (default: 'I love this product!')"
    )
    args = parser.parse_args()

    label, score = analyze_sentiment(args.text)
    print(f"Sentiment: {label}, Score: {score:.4f}")

if __name__ == "__main__":
    main()