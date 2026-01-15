from flask import Blueprint, request, jsonify
from extensions import db
from models.category import Category
from models.reservation import ReservationPolicy

reservation_bp = Blueprint("reservation_policy", __name__, url_prefix="/api/reservation")
@reservation_bp.route("/admin", methods=["GET"])
def get_reservation_policy_admin():
    policies = (
        db.session.query(ReservationPolicy, Category.category_code)
        .join(Category, Category.id == ReservationPolicy.category_id)
        .all()
    )

    return jsonify([
        {
            "id": policy.id,
            "category": category_code,
            "reservation_percentage": float(policy.reservation_percentage),
            "domicile": policy.domicile,
            "applicable_for": policy.applicable_for,
            "notes": policy.notes
        }
        for policy, category_code in policies
    ])
@reservation_bp.route("/admin", methods=["POST"])
def save_reservation_policy():
    data = request.json  # list of rows

    ReservationPolicy.query.delete()

    for row in data:
        category = Category.query.filter_by(
            category_code=row["category"]
        ).first()

        if not category:
            category = Category(
                category_code=row["category"],
                description=row["category"]
            )
            db.session.add(category)
            db.session.flush()

        policy = ReservationPolicy(
            category_id=category.id,
            reservation_percentage=row["reservation_percentage"],
            domicile=row["domicile"],
            applicable_for=row["applicable_for"],
            notes=row.get("notes")
        )

        db.session.add(policy)

    db.session.commit()
    return jsonify({"message": "Reservation policy saved"})
@reservation_bp.route("/admin/<int:policy_id>", methods=["DELETE"])
def delete_reservation_policy(policy_id):
    policy = ReservationPolicy.query.get_or_404(policy_id)
    db.session.delete(policy)
    db.session.commit()
    return jsonify({"message": "Reservation category deleted"})
@reservation_bp.route("/public", methods=["GET"])
def get_reservation_policy_public():
    policies = (
        db.session.query(ReservationPolicy, Category.category_code)
        .join(Category, Category.id == ReservationPolicy.category_id)
        .all()
    )

    return jsonify([
        {
            "category": category_code,
            "reservation_percentage": float(policy.reservation_percentage),
            "domicile": policy.domicile,
            "applicable_for": policy.applicable_for,
            "notes": policy.notes
        }
        for policy, category_code in policies
    ])
