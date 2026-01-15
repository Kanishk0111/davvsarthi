from extensions import db

class ReservationPolicy(db.Model):
    __tablename__ = "reservation_policy"

    id = db.Column(db.Integer, primary_key=True)
    category_id = db.Column(db.Integer, db.ForeignKey("categories.id"))

    reservation_percentage = db.Column(db.Numeric(5, 2))
    domicile = db.Column(db.String(100))
    applicable_for = db.Column(db.String(100))
    notes = db.Column(db.Text)
