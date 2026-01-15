from extensions import db

class CounsellingSeat(db.Model):
    __tablename__ = "counselling_seats"

    id = db.Column(db.Integer, primary_key=True)

    course_id = db.Column(db.Integer, db.ForeignKey("courses.id"))
    category_id = db.Column(db.Integer, db.ForeignKey("categories.id"))

    total_male = db.Column(db.Integer)
    total_female = db.Column(db.Integer)

    filled_male = db.Column(db.Integer)
    filled_female = db.Column(db.Integer)
