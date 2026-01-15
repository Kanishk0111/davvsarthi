from extensions import db

class Cutoff(db.Model):
    __tablename__ = "cutoffs"

    id = db.Column(db.Integer, primary_key=True)

    year = db.Column(db.Integer)
    course_id = db.Column(db.Integer, db.ForeignKey("courses.id"))
    department = db.Column(db.String(100))

    category_id = db.Column(db.Integer, db.ForeignKey("categories.id"))
    closing_rank = db.Column(db.Integer)

    admitted = db.Column(db.Boolean, default=True)
