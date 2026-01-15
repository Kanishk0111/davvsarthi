from extensions import db

class Fee(db.Model):
    __tablename__ = "fees"

    id = db.Column(db.Integer, primary_key=True)
    course_id = db.Column(db.Integer, db.ForeignKey("courses.id"))

    program_type = db.Column(db.String(10))  # UG / PG

    tuition_fee = db.Column(db.Numeric(10, 2))
    development_fee = db.Column(db.Numeric(10, 2))
    exam_fee = db.Column(db.Numeric(10, 2))
    other_charges = db.Column(db.Numeric(10, 2))
