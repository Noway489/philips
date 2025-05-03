# utils/logger.py

import logging

def setup_logger():
    """
    Configure the root 'philips' logger with a standard format and console handler.
    Call this once at application startup.
    """
    logger = logging.getLogger('philips')
    if logger.handlers:
        # already configured
        return

    logger.setLevel(logging.INFO)
    handler = logging.StreamHandler()
    handler.setLevel(logging.INFO)
    fmt = logging.Formatter('[%(asctime)s] %(levelname)s in %(module)s: %(message)s')
    handler.setFormatter(fmt)
    logger.addHandler(handler)
