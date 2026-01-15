from extensions import db

class AdmissionProcessStep(db.Model):
    __tablename__ = "admission_process_steps"

    id = db.Column(db.Integer, primary_key=True)
    step_title = db.Column(db.String(200))
    description = db.Column(db.Text)
    status = db.Column(db.String(20))  # ongoing/completed/upcoming
    display_order = db.Column(db.Integer)


class ImportantInstruction(db.Model):
    __tablename__ = "important_instructions"

    id = db.Column(db.Integer, primary_key=True)
    instruction = db.Column(db.Text)
    display_order = db.Column(db.Integer)


class MeritRule(db.Model):
    __tablename__ = "merit_rules"

    id = db.Column(db.Integer, primary_key=True)
    group_id = db.Column(db.Integer, db.ForeignKey("groups.id"))
    priority = db.Column(db.Integer)
    rule_description = db.Column(db.Text)
