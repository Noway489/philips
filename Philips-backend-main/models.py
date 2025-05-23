# models.py

from extensions import db

class Feedback(db.Model):
    __tablename__ = 'feedback'

    id = db.Column(db.Integer, primary_key=True)
    page_context = db.Column(db.String(512), nullable=True)
    user_response = db.Column(db.Text, nullable=False)
    sentiment_label = db.Column(db.String(64), nullable=False)
    sentiment_score = db.Column(db.Float, nullable=False)
    questions = db.Column(db.JSON, nullable=False)
    insights = db.Column(db.JSON, nullable=False)
    timestamp = db.Column(db.DateTime, server_default=db.func.now())

    def __repr__(self):
        return (
            f"<Feedback id={self.id} "
            f"sentiment={self.sentiment_label} "
            f"score={self.sentiment_score:.2f}>"
        )
    
    def to_dict(self):
        return {
            "id": self.id,
            "page_context": self.page_context,
            "user_response": self.user_response,
            "sentiment_label": self.sentiment_label,
            "sentiment_score": self.sentiment_score,
            "questions": self.questions,
            "insights": self.insights,
            "timestamp": self.timestamp.isoformat() if self.timestamp else None
        }
