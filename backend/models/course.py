from extensions import db

class Course(db.Model):
    __tablename__ = "courses"

    id = db.Column(db.Integer, primary_key=True)

    course_code = db.Column(db.String(20), unique=True, nullable=False)
    course_name = db.Column(db.String(200), nullable=False)
    full_form = db.Column(db.String(300))

    group_id = db.Column(db.Integer, db.ForeignKey("groups.id"))

    duration = db.Column(db.String(20))
    academic_year = db.Column(db.String(9))

    total_seats = db.Column(db.Integer)
    filled_seats = db.Column(db.Integer, default=0)

    remarks = db.Column(db.Text)

    def available_seats(self):
        return self.total_seats - self.filled_seats
