from flask import Blueprint, request, jsonify
from extensions import db
from models.site_content import SiteContent
from models.course import Course
from models.fees import CourseFee
from models.scholarship import Scholarship
from models.payment import PaymentMode
from models.contact import ContactInfo

fees_bp = Blueprint("fees", __name__, url_prefix="/api/fees")
@fees_bp.route("/content", methods=["POST"])
def save_fees_content():
    data = request.json
    content_type = data["type"]  # fees_header | fees_note | office_hours

    SiteContent.query.filter_by(content_type=content_type).delete()

    content = SiteContent(
        content_type=content_type,
        title=data.get("title"),
        description=data.get("description")
    )

    db.session.add(content)
    db.session.commit()
    return jsonify({"message": "Content saved"})
@fees_bp.route("/content", methods=["GET"])
def get_fees_content():
    contents = SiteContent.query.filter(
        SiteContent.content_type.in_(
            ["fees_header", "fees_note", "office_hours"]
        )
    ).all()

    return jsonify({
        c.content_type: {
            "title": c.title,
            "description": c.description
        } for c in contents
    })

@fees_bp.route("/courses/admin", methods=["GET"])
def get_course_fees_admin():
    fees = CourseFee.query.all()

    return jsonify([
        {
            "id": f.id,
            "course": f.course.course_code,
            "program_type": f.program_type,
            "tuition_fee": float(f.tuition_fee),
            "development_fee": float(f.development_fee),
            "exam_fee": float(f.exam_fee),
            "other_charges": float(f.other_charges)
        } for f in fees
    ])
@fees_bp.route("/courses/admin", methods=["POST"])
def save_course_fee():
    data = request.json
    course = Course.query.filter_by(course_code=data["course"]).first_or_404()

    fee = CourseFee.query.filter_by(course_id=course.id).first()

    if not fee:
        fee = CourseFee(course_id=course.id)
        db.session.add(fee)

    fee.program_type = data["program_type"]
    fee.tuition_fee = data["tuition_fee"]
    fee.development_fee = data["development_fee"]
    fee.exam_fee = data["exam_fee"]
    fee.other_charges = data.get("other_charges", 0)

    db.session.commit()
    return jsonify({"message": "Course fee saved"})
@fees_bp.route("/courses/admin/<int:id>", methods=["DELETE"])
def delete_course_fee(id):
    fee = CourseFee.query.get_or_404(id)
    db.session.delete(fee)
    db.session.commit()
    return jsonify({"message": "Course fee removed"})
@fees_bp.route("/scholarships/admin", methods=["GET"])
def get_scholarships_admin():
    scholarships = Scholarship.query.all()
    return jsonify([
        {
            "id": s.id,
            "name": s.name,
            "eligibility": s.eligibility,
            "benefit": s.benefit
        } for s in scholarships
    ])
@fees_bp.route("/scholarships/admin", methods=["POST"])
def add_scholarship():
    data = request.json

    scholarship = Scholarship(
        name=data["name"],
        eligibility=data["eligibility"],
        benefit=data["benefit"]
    )

    db.session.add(scholarship)
    db.session.commit()
    return jsonify({"message": "Scholarship added"})
@fees_bp.route("/scholarships/admin/<int:id>", methods=["DELETE"])
def delete_scholarship(id):
    s = Scholarship.query.get_or_404(id)
    db.session.delete(s)
    db.session.commit()
    return jsonify({"message": "Scholarship removed"})
@fees_bp.route("/payments/admin", methods=["GET"])
def get_payment_modes():
    modes = PaymentMode.query.all()
    return jsonify([
        {"id": m.id, "method": m.method}
        for m in modes
    ])
@fees_bp.route("/payments/admin", methods=["POST"])
def add_payment_mode():
    data = request.json
    mode = PaymentMode(method=data["method"])
    db.session.add(mode)
    db.session.commit()
    return jsonify({"message": "Payment mode added"})

@fees_bp.route("/payments/admin/<int:id>", methods=["DELETE"])
def delete_payment_mode(id):
    mode = PaymentMode.query.get_or_404(id)
    db.session.delete(mode)
    db.session.commit()
    return jsonify({"message": "Payment mode removed"})
@fees_bp.route("/contacts/admin", methods=["GET"])
def get_contacts():
    contacts = ContactInfo.query.all()
    return jsonify([
        {
            "id": c.id,
            "label": c.label,
            "type": c.type,
            "value": c.value
        } for c in contacts
    ])
@fees_bp.route("/contacts/admin", methods=["POST"])
def add_contact():
    data = request.json

    contact = ContactInfo(
        label=data["label"],
        type=data["type"],
        value=data["value"]
    )

    db.session.add(contact)
    db.session.commit()
    return jsonify({"message": "Contact added"})
@fees_bp.route("/public", methods=["GET"])
def get_fees_public():
    return jsonify({
        "header": get_fees_content().json,
        "course_fees": get_course_fees_admin().json,
        "scholarships": get_scholarships_admin().json,
        "payment_modes": get_payment_modes().json,
        "contacts": get_contacts().json
    })
