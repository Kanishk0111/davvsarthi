from extensions import db

class CuetSubject(db.Model):
    __tablename__ = "cuet_subjects"

    id = db.Column(db.Integer, primary_key=True)
    subject_name = db.Column(db.String(100), unique=True, nullable=False)


class CourseCuetSubject(db.Model):
    __tablename__ = "course_cuet_subjects"

    course_id = db.Column(db.Integer, db.ForeignKey("courses.id"), primary_key=True)
    subject_id = db.Column(db.Integer, db.ForeignKey("cuet_subjects.id"), primary_key=True)
