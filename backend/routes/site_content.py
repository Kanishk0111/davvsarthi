from flask import Blueprint, request, jsonify
from extensions import db
from models.site_content import SiteContent

site_content_bp = Blueprint("site_content", __name__, url_prefix="/api/site-content")

@site_content_bp.route("/", methods=["POST"])
def create_or_update_content():
    data = request.json

    content = SiteContent(
        content_type=data["content_type"],
        title=data.get("title"),
        description=data.get("description"),
        value=data.get("value"),
        display_order=data.get("display_order", 0),
        is_active=data.get("is_active", True)
    )

    db.session.add(content)
    db.session.commit()

    return jsonify({"message": "Content saved successfully"})

@site_content_bp.route("/admin/<content_type>", methods=["GET"])
def get_content_by_type_admin(content_type):
    items = SiteContent.query.filter_by(content_type=content_type)\
        .order_by(SiteContent.display_order).all()

    return jsonify([
        {
            "id": i.id,
            "title": i.title,
            "description": i.description,
            "value": i.value,
            "is_active": i.is_active,
            "display_order": i.display_order
        } for i in items
    ])
@site_content_bp.route("/<int:id>", methods=["DELETE"])
def delete_content(id):
    content = SiteContent.query.get_or_404(id)
    db.session.delete(content)
    db.session.commit()
    return jsonify({"message": "Deleted successfully"})

@site_content_bp.route("/public", methods=["GET"])
def get_public_homepage_content():
    items = SiteContent.query.filter_by(is_active=True)\
        .order_by(SiteContent.display_order).all()

    response = {
        "notice": [],
        "announcement": [],
        "hero": [],
        "stats": [],
        "marquee": []
    }

    content_type_map = {
        "notice": "notice",
        "announcement": "announcement",
        "hero": "hero",
        "stat": "stats",        # 👈 KEY FIX
        "marquee": "marquee"
    }

    for item in items:
        key = content_type_map.get(item.content_type)
        if not key:
            continue  # ignore unknown types safely

        response[key].append({
            "id": item.id,
            "title": item.title,
            "description": item.description,
            "value": item.value
        })

    return jsonify(response)
