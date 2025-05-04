# app.py

import logging
from flask import Flask
from flask_cors import CORS
from extensions import db 
from flask_migrate import Migrate
from models import *
from config import Config
from utils.logger import setup_logger

# Import blueprints
from routes.feedback import feedback_bp
from routes.questions import questions_bp
from routes.health    import health_bp
# Initialize extensions
# db = SQLAlchemy()

def create_app():
    """
    Application factory: creates and configures the Flask app.
    """
    app = Flask(__name__)
    app.config.from_object(Config)

    # Configure CORS
    cors_origins = app.config.get("CORS_ALLOWED_ORIGINS") or "*"
    CORS(app, origins=cors_origins, supports_credentials=True)

    # Initialize database
    db.init_app(app)

    # Register API blueprints
    app.register_blueprint(feedback_bp,  url_prefix="/api")
    app.register_blueprint(questions_bp, url_prefix="/api")
    app.register_blueprint(health_bp,    url_prefix="/api")
    return app

# --- Startup sequence ---

# 1) Configure structured logging
setup_logger()
logger = logging.getLogger("philips")
logger.info("Starting Philips Smart Feedback Backend...")

# 2) Create Flask app and ensure DB tables exist
app = create_app()
migrate = Migrate(app, db)
with app.app_context():
    # Import models so SQLAlchemy knows about them
    from models import Feedback
    db.create_all()
    logger.info("Database tables created or verified")

# 3) Run the development server if executed directly
if __name__ == "__main__":
    debug_mode = app.config.get("ENV") == "development"
    logger.info(f"Running in {'debug' if debug_mode else 'production'} mode on port 5000")
    app.run(host="0.0.0.0", port=5000, debug=debug_mode)
