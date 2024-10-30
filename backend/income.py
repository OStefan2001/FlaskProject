from datetime import datetime
from flask import Blueprint, jsonify, session
from database import budgets_collection

income_bp = Blueprint('income', __name__)

@income_bp.route('/api/income/<int:month>/<int:year>', methods=['GET'])
def get_monthly_income(month, year):
    # Verifică dacă luna și anul sunt valide
    if month < 1 or month > 12:
        return jsonify({'error': 'Invalid month! Must be between 1 and 12.'}), 400

    user_id = session.get('user_id')
    if not user_id:
        return jsonify({'error': 'User not authenticated!'}), 401

    try:
        if month == 12:
            start_date = datetime(year, 12, 1)
            end_date = datetime(year + 1, 1, 1)  # Ianuarie din anul următor
        else:
            start_date = datetime(year, month, 1)
            end_date = datetime(year, month + 1, 1)  # Luna următoare
        # Fetch income records for the specified month and year
        income_records = budgets_collection.find({
            'user_id': user_id,
            'date': {
                '$gte': start_date,
                '$lt': end_date
            }
        })

        total_income = 0
        income_by_category = {}

        for record in income_records:
            total_income += record['amount']
            category = record.get('description', 'Other').strip().lower()
            income_by_category[category] = income_by_category.get(category, 0) + record['amount']

        return jsonify({
            'total_income': total_income,
            'income_by_category': income_by_category
        }), 200

    except Exception as e:
        return jsonify({'error': f'An error occurred while fetching income data: {str(e)}'}), 500
