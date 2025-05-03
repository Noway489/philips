# routes/health.py

from flask import Blueprint, jsonify

health_bp = Blueprint('health_bp', __name__)

@health_bp.route('/health', methods=['GET'])
def health():
    """Simple endpoint to confirm the server is up."""
    return jsonify({ "status": "ok" }), 200
