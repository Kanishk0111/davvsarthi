from extensions import db

class SiteContent(db.Model):
    __tablename__ = "site_content"

    id = db.Column(db.Integer, primary_key=True)
    content_type = db.Column(db.String(50))  # notice, hero, stat, marquee
    title = db.Column(db.String(200))
    description = db.Column(db.Text)
    value = db.Column(db.String(100))
    display_order = db.Column(db.Integer)
    is_active = db.Column(db.Boolean, default=True)
