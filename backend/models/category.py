from extensions import db

class Category(db.Model):
    __tablename__ = "categories"

    id = db.Column(db.Integer, primary_key=True)
    category_code = db.Column(db.String(20), unique=True)
    description = db.Column(db.Text)
