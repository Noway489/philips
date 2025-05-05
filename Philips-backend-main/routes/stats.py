from flask import Blueprint, request, jsonify
from sqlalchemy import func
from models import Feedback, db
import datetime

stats_bp = Blueprint('stats_bp', __name__)

@stats_bp.route('/stats', methods=['GET'])
def stats():
    """
    GET /api/stats?type=pie or type=line
    Returns aggregated statistics from the feedback records.
    
    For type=pie:
      Returns the distribution of sentiment labels.
    For type=line:
      Returns the count of feedback entries per day.
    """
    stat_type = request.args.get('type', 'pie').lower()

    if stat_type == 'pie':
        # Aggregate the count of feedback per sentiment_label
        results = (
            db.session.query(Feedback.sentiment_label, func.count(Feedback.id))
            .group_by(Feedback.sentiment_label)
            .all()
        )
        labels = []
        counts = []
        for label, count in results:
            labels.append(label)
            counts.append(count)
        # Return data formatted for Chart.js
        return jsonify({
            "labels": labels,
            "datasets": [
                {
                    "label": "Feedback Sentiment Distribution",
                    "data": counts,
                    "backgroundColor": ["#4caf50", "#f44336", "#ffeb3b", "#9e9e9e"]
                }
            ]
        })

    elif stat_type == 'line':
        # Aggregate feedback counts per day
        results = (
            db.session.query(func.date(Feedback.timestamp), func.count(Feedback.id))
            .group_by(func.date(Feedback.timestamp))
            .order_by(func.date(Feedback.timestamp))
            .all()
        )
        dates = []
        counts = []
        for date_obj, count in results:
            # Format the date as YYYY-MM-DD
            dates.append(date_obj.strftime("%Y-%m-%d"))
            counts.append(count)
        return jsonify({
            "labels": dates,
            "datasets": [
                {
                    "label": "Feedback Over Time",
                    "data": counts,
                    "fill": False,
                    "borderColor": "#3e95cd"
                }
            ]
        })
    else:
        return jsonify({"error": "Invalid stat type. Use 'pie' or 'line'."}), 400