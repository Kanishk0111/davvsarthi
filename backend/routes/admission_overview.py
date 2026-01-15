from flask import Blueprint, request, jsonify
from extensions import db
from models.site_content import SiteContent
from models.admission import (
    AdmissionProcessStep,
    ImportantInstruction,
    MeritRule
)
from models.group import Group

admission_overview_bp = Blueprint("admission_overview", __name__, url_prefix="/api/admission-overview")
@admission_overview_bp.route("/header", methods=["POST"])
def save_page_header():
    data = request.json

    SiteContent.query.filter_by(content_type="admission_header").delete()

    title = SiteContent(
        content_type="admission_header",
        title=data["title"],
        description=data["description"]
    )

    db.session.add(title)
    db.session.commit()

    return jsonify({"message": "Page header saved"})
@admission_overview_bp.route("/header", methods=["GET"])
def get_page_header():
    header = SiteContent.query.filter_by(
        content_type="admission_header"
    ).first()

    return jsonify({
        "title": header.title if header else "",
        "description": header.description if header else ""
    })
@admission_overview_bp.route("/process", methods=["POST"])
def add_process_step():
    data = request.json

    step = AdmissionProcessStep(
        step_title=data["title"],
        description=data["description"],
        status=data["status"],
        display_order=data["order"]
    )

    db.session.add(step)
    db.session.commit()

    return jsonify({"message": "Step added"})
@admission_overview_bp.route("/process/<int:step_id>", methods=["DELETE"])
def delete_process_step(step_id):
    step = AdmissionProcessStep.query.get_or_404(step_id)
    db.session.delete(step)
    db.session.commit()
    return jsonify({"message": "Step removed"})
@admission_overview_bp.route("/process", methods=["GET"])
def get_process_steps():
    steps = AdmissionProcessStep.query.order_by(
        AdmissionProcessStep.display_order
    ).all()

    return jsonify([
        {
            "id": s.id,
            "title": s.step_title,
            "description": s.description,
            "status": s.status
        } for s in steps
    ])
@admission_overview_bp.route("/instructions", methods=["POST"])
def add_instruction():
    data = request.json

    inst = ImportantInstruction(
        instruction=data["text"],
        display_order=data.get("order", 0)
    )

    db.session.add(inst)
    db.session.commit()

    return jsonify({"message": "Instruction added"})
@admission_overview_bp.route("/instructions/<int:id>", methods=["DELETE"])
def delete_instruction(id):
    inst = ImportantInstruction.query.get_or_404(id)
    db.session.delete(inst)
    db.session.commit()
    return jsonify({"message": "Instruction deleted"})
@admission_overview_bp.route("/instructions", methods=["GET"])
def get_instructions():
    instructions = ImportantInstruction.query.order_by(
        ImportantInstruction.display_order
    ).all()

    return jsonify([
        {"id": i.id, "text": i.instruction}
        for i in instructions
    ])
@admission_overview_bp.route("/merit-rule", methods=["POST"])
def add_merit_rule():
    data = request.json

    group = Group.query.filter_by(
        group_code=data["group"].strip().upper()
    ).first()

    if not group:
        return jsonify({
            "error": f"Group '{data['group']}' not found. Create it first."
        }), 400

    rule = MeritRule(
        group_id=group.id,
        priority=data["priority"],
        rule_description=data["rule"]
    )

    db.session.add(rule)
    db.session.commit()

    return jsonify({"message": "Merit rule added"})

@admission_overview_bp.route("/merit-rule/<int:id>", methods=["DELETE"])
def delete_merit_rule(id):
    rule = MeritRule.query.get_or_404(id)
    db.session.delete(rule)
    db.session.commit()
    return jsonify({"message": "Merit rule removed"})
@admission_overview_bp.route("/merit-rules", methods=["GET"])
def get_merit_rules():
    rules = (
        db.session.query(MeritRule, Group.group_code)
        .join(Group, Group.id == MeritRule.group_id)
        .order_by(Group.group_code, MeritRule.priority)
        .all()
    )

    response = {}

    for rule, group_code in rules:
        response.setdefault(group_code, []).append({
            "priority": rule.priority,
            "rule": rule.rule_description
        })

    return jsonify(response)
