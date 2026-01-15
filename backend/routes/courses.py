from flask import Blueprint, request, jsonify
from extensions import db
from models.course import Course
from models.group import Group
from models.cuet import CuetSubject, CourseCuetSubject

courses_bp = Blueprint("courses", __name__, url_prefix="/api/courses")

@courses_bp.route("/admin", methods=["GET"])
def get_courses_admin():
    courses = Course.query.order_by(Course.id).all()

    response = []
    for idx, c in enumerate(courses, start=1):
        cuet_subjects = (
            db.session.query(CuetSubject.subject_name)
            .join(CourseCuetSubject)
            .filter(CourseCuetSubject.course_id == c.id)
            .all()
        )

        response.append({
            "order": idx,
            "id": c.id,
            "code": c.course_code,
            "name": c.course_name,
            "group": c.group.group_code if c.group else None,
            "duration": c.duration,
            "academic_year": c.academic_year,
            "seats": f"{c.filled_seats}/{c.total_seats}",
            "cuet_subjects": [s[0] for s in cuet_subjects],
            "remarks": c.remarks
        })

    return jsonify(response)

@courses_bp.route("/admin", methods=["POST"])
def add_course():
    data = request.json

    group = Group.query.filter_by(group_code=data["group"]).first()

    course = Course(
        course_code=data["course_code"],
        course_name=data["course_name"],
        full_form=data.get("full_form"),
        group_id=group.id if group else None,
        duration=data["duration"],
        academic_year=data["academic_year"],
        total_seats=data["total_seats"],
        filled_seats=data.get("filled_seats", 0),
        remarks=data.get("remarks")
    )

    db.session.add(course)
    db.session.flush()  # get course.id

    # CUET subjects
    for subject_name in data.get("cuet_subjects", []):
        subject = CuetSubject.query.filter_by(subject_name=subject_name).first()
        if subject:
            db.session.add(
                CourseCuetSubject(course_id=course.id, subject_id=subject.id)
            )

    db.session.commit()

    return jsonify({"message": "Course added successfully"})

@courses_bp.route("/admin/<int:course_id>", methods=["DELETE"])
def delete_course(course_id):
    course = Course.query.get_or_404(course_id)
    db.session.delete(course)
    db.session.commit()
    return jsonify({"message": "Course deleted successfully"})

@courses_bp.route("/public", methods=["GET"])
def get_courses_public():
    courses = Course.query.all()

    return jsonify([
        {
            "code": c.course_code,
            "name": c.course_name,
            "group": c.group.group_code if c.group else None,
            "duration": c.duration,
            "academic_year": c.academic_year,
            "available_seats": c.total_seats - c.filled_seats,
            "remarks": c.remarks
        }
        for c in courses
    ])
