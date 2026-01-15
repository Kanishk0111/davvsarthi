from extensions import db

class PaymentMode(db.Model):
    __tablename__ = "payment_modes"

    id = db.Column(db.Integer, primary_key=True)
    method = db.Column(db.String(100))
