from flask import Blueprint, request, jsonify
from extensions import db
from models.cutoff import Cutoff
from models.course import Course
from models.category import Category
from models.site_content import SiteContent

cutoffs_bp = Blueprint(
    "cutoffs",
    __name__,
    url_prefix="/api/cutoffs"
)
@cutoffs_bp.route("/disclaimer", methods=["POST"])
def save_disclaimer():
    data = request.json

    SiteContent.query.filter_by(content_type="cutoff_disclaimer").delete()

    disclaimer = SiteContent(
        content_type="cutoff_disclaimer",
        description=data["text"]
    )

    db.session.add(disclaimer)
    db.session.commit()

    return jsonify({"message": "Disclaimer saved"})
@cutoffs_bp.route("/disclaimer", methods=["GET"])
def get_disclaimer():
    d = SiteContent.query.filter_by(
        content_type="cutoff_disclaimer"
    ).first()

    return jsonify({
        "text": d.description if d else ""
    })
@cutoffs_bp.route("/admin", methods=["GET"])
def get_cutoffs_admin():
    cutoffs = (
        db.session.query(Cutoff, Course.course_name, Category.category_code)
        .join(Course, Course.id == Cutoff.course_id)
        .join(Category, Category.id == Cutoff.category_id)
        .order_by(Cutoff.year.desc())
        .all()
    )

    return jsonify([
        {
            "id": c.id,
            "year": c.year,
            "course": course_name,
            "department": c.department,
            "category": category_code,
            "last_rank": c.closing_rank,
            "admitted": c.admitted
        }
        for c, course_name, category_code in cutoffs
    ])
@cutoffs_bp.route("/admin", methods=["POST"])
def save_cutoffs():
    data = request.json  # list of rows

    Cutoff.query.delete()

    for row in data:
        course = Course.query.filter_by(course_name=row["course"]).first()
        category = Category.query.filter_by(
            category_code=row["category"]
        ).first()

        cutoff = Cutoff(
            year=row["year"],
            course_id=course.id if course else None,
            department=row["department"],
            category_id=category.id if category else None,
            closing_rank=row["last_rank"],
            admitted=row["admitted"]
        )

        db.session.add(cutoff)

    db.session.commit()
    return jsonify({"message": "Cut-offs saved successfully"})
POST /api/cutoffs/admin
[
  {
    "year": 2025,
    "course": "MBA (Management Science)",
    "department": "Management",
    "category": "UR-O",
    "last_rank": 250,
    "admitted": "Yes"
  },
  {
    "year": 2025,
    "course": "MBA (Finance)",
    "department": "Management",
    "category": "OBC",
    "last_rank": 370,
    "admitted": "Yes"
  }
]@cutoffs_bp.route("/admin/<int:id>", methods=["DELETE"])
def delete_cutoff(id):
    cutoff = Cutoff.query.get_or_404(id)
    db.session.delete(cutoff)
    db.session.commit()
    return jsonify({"message": "Cut-off deleted"})

@cutoffs_bp.route("/public", methods=["GET"])
def get_cutoffs_public():
    cutoffs = (
        db.session.query(Cutoff, Course.course_name, Category.category_code)
        .join(Course, Course.id == Cutoff.course_id)
        .join(Category, Category.id == Cutoff.category_id)
        .order_by(Cutoff.year.desc())
        .all()
    )

    return jsonify([
        {
            "year": c.year,
            "course": course_name,
            "department": c.department,
            "category": category_code,
            "closing_rank": c.closing_rank,
            "admitted": c.admitted
        }
        for c, course_name, category_code in cutoffs
    ])
