from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
from extensions import db, migrate
import os

# Load environment variables
load_dotenv()


def create_app():
    app = Flask(__name__)
    CORS(app)

    # Database config
    app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URL")
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    # Init extensions
    db.init_app(app)
    migrate.init_app(app, db)
    from models import site_content, group, course, category, counselling, admission, reservation, fees, scholarship, payment, cutoff, admin

    # Import and register blueprints
    from routes.eligibility import eligibility_bp
    from routes.prediction import prediction_bp
    from routes.chatbot import chatbot_bp
    from routes.site_content import site_content_bp
    from routes.courses import courses_bp
    from routes.admission_overview import admission_overview_bp
    from routes.counselling_updates import counselling_bp
    from routes.reservation_policy import reservation_bp
    from routes.fees import fees_bp
    from routes.cutoffs import cutoffs_bp
    app.register_blueprint(cutoffs_bp)

    app.register_blueprint(fees_bp)

    app.register_blueprint(reservation_bp)
    app.register_blueprint(counselling_bp)
    app.register_blueprint(admission_overview_bp)
    app.register_blueprint(courses_bp)
    app.register_blueprint(eligibility_bp, url_prefix="/api")
    app.register_blueprint(prediction_bp, url_prefix="/api")
    app.register_blueprint(chatbot_bp, url_prefix="/api")
    app.register_blueprint(site_content_bp)

    return app

app = create_app()

if __name__ == "__main__":
    app.run(debug=True)
