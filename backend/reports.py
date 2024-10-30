from database import transactions_collection, budgets_collection
from flask import Blueprint, jsonify, session
reports_bp = Blueprint('reports', __name__)