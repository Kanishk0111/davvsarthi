from flask import Blueprint, request, jsonify
from extensions import db
from models.site_content import SiteContent
from models.course import Course
from models.category import Category
from models.counselling import CounsellingSeat

counselling_bp = Blueprint(
    "counselling_updates",
    __name__,
    url_prefix="/api/counselling-updates"
)
@counselling_bp.route("/content", methods=["POST"])
def save_counselling_content():
    data = request.json
    content_type = data["type"]  # header | notice | footer

    SiteContent.query.filter_by(content_type=content_type).delete()

    content = SiteContent(
        content_type=content_type,
        title=data.get("title"),
        description=data.get("description")
    )

    db.session.add(content)
    db.session.commit()

    return jsonify({"message": "Content saved"})
@counselling_bp.route("/content", methods=["GET"])
def get_counselling_content():
    contents = SiteContent.query.filter(
        SiteContent.content_type.in_(["counselling_header", "counselling_notice", "counselling_footer"])
    ).all()

    response = {}
    for c in contents:
        response[c.content_type] = {
            "title": c.title,
            "description": c.description
        }

    return jsonify(response)
@counselling_bp.route("/seats", methods=["POST"])
def save_counselling_seats():
    data = request.json
    course_code = data["course_code"]

    course = Course.query.filter_by(course_code=course_code).first_or_404()

    for row in data["categories"]:
        category = Category.query.filter_by(category_code=row["category"]).first()

        seat = CounsellingSeat.query.filter_by(
            course_id=course.id,
            category_id=category.id
        ).first()

        if not seat:
            seat = CounsellingSeat(
                course_id=course.id,
                category_id=category.id
            )
            db.session.add(seat)

        seat.total_male = row["total_male"]
        seat.total_female = row["total_female"]
        seat.filled_male = row["filled_male"]
        seat.filled_female = row["filled_female"]

    db.session.commit()
    return jsonify({"message": "Counselling seats updated"})
@counselling_bp.route("/seats/<int:course_id>", methods=["DELETE"])
def remove_course_counselling(course_id):
    CounsellingSeat.query.filter_by(course_id=course_id).delete()
    db.session.commit()
    return jsonify({"message": "Course removed from counselling"})

@counselling_bp.route("/public", methods=["GET"])
def get_counselling_updates_public():
    courses = Course.query.all()
    response = []

    for course in courses:
        seats = (
            db.session.query(CounsellingSeat, Category.category_code)
            .join(Category, Category.id == CounsellingSeat.category_id)
            .filter(CounsellingSeat.course_id == course.id)
            .all()
        )

        if not seats:
            continue

        category_data = []
        total_seats = total_filled = 0

        for seat, category_code in seats:
            total = seat.total_male + seat.total_female
            filled = seat.filled_male + seat.filled_female

            total_seats += total
            total_filled += filled

            category_data.append({
                "category": category_code,
                "total_male": seat.total_male,
                "total_female": seat.total_female,
                "filled_male": seat.filled_male,
                "filled_female": seat.filled_female,
                "available_male": seat.total_male - seat.filled_male,
                "available_female": seat.total_female - seat.filled_female
            })

        response.append({
            "course_code": course.course_code,
            "course_name": course.course_name,
            "categories": category_data,
            "total_seats": total_seats,
            "total_filled": total_filled,
            "total_available": total_seats - total_filled
        })

    return jsonify(response)
