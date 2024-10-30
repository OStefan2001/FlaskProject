from flask import Flask, jsonify
from auth import auth_bp
from transactions import transactions_bp
from income import income_bp
from expenses import expenses_bp
from reports import  reports_bp
app = Flask(__name__)
app.secret_key = '377882hfhshs87382882'

app.register_blueprint(income_bp)
app.register_blueprint(auth_bp)
app.register_blueprint(transactions_bp)
app.register_blueprint(reports_bp)
app.register_blueprint(expenses_bp)
@app.route('/api/message')
def home():
    return "Hello, World!"

@app.route('/api/title')
def get_title():
    return "Hello from Flask!"

if __name__ == '__main__':
    app.run(debug=True)


