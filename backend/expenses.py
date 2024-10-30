from datetime import datetime
from flask import Blueprint, jsonify, session
from database import transactions_collection

expenses_bp = Blueprint('expenses', __name__)


@expenses_bp.route('/api/expenses/<int:month>/<int:year>', methods=['GET'])
def get_expenses(year, month):
    if month < 1 or month > 12:
        return jsonify({'error': 'Invalid month! Must be between 1 and 12.'}), 400

    user_id = session.get('user_id')
    if not user_id:
        return jsonify({'error': 'User not authenticated!'}), 401

    try:
        # Ajustează data pentru Decembrie (luna 12)
        if month == 12:
            start_date = datetime(year, 12, 1)
            end_date = datetime(year + 1, 1, 1)  # Ianuarie din anul următor
        else:
            start_date = datetime(year, month, 1)
            end_date = datetime(year, month + 1, 1)  # Luna următoare

        # Fetch expenses records for the specified month and year
        expenses_records = transactions_collection.find({
            'user_id': user_id,
            'date': {
                '$gte': start_date,
                '$lt': end_date
            }
        })

        total_expenses = 0
        expenses_by_category = {}
        for record in expenses_records:
            total_expenses += record['amount']
            category = record.get('category', 'Other').strip().lower()
            subcategory = record.get('description',
                                     'Fără descriere').strip().lower()  # Folosim descrierea drept subcategorie

            # Creăm o listă de subcategorii pentru fiecare categorie
            if category not in expenses_by_category:
                expenses_by_category[category] = {}

            # Adăugăm subcategoria la categorie, acumulând sumele
            if subcategory not in expenses_by_category[category]:
                expenses_by_category[category][subcategory] = 0

            expenses_by_category[category][subcategory] += record['amount']

        return jsonify({
            'total_expenses': total_expenses,
            'expenses_by_category': expenses_by_category  # Returnează cheltuielile pe categorii și subcategorii
        }), 200

    except Exception as e:
        return jsonify({'error': f'An error occurred while fetching expense data: {str(e)}'}), 500
