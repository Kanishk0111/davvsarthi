from extensions import db

class Group(db.Model):
    __tablename__ = "groups"

    id = db.Column(db.Integer, primary_key=True)
    group_code = db.Column(db.String(1), unique=True, nullable=False)
    description = db.Column(db.Text)
