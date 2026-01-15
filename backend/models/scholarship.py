from extensions import db

class Scholarship(db.Model):
    __tablename__ = "scholarships"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150))
    eligibility = db.Column(db.Text)
    benefit = db.Column(db.Text)
