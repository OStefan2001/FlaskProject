from datetime import datetime
from flask import Blueprint, request, jsonify, session
from database import budgets_collection, users_collection, transactions_collection
from bson.objectid import ObjectId
transactions_bp = Blueprint('transactions', __name__)

@transactions_bp.route('/api/add_money', methods=['POST'])
def add_money():
    data = request.get_json()  # Preia datele din cererea JSON
    user_id = session.get('user_id')
    amount = data.get('amount')
    description = data.get('description', '')

    # Verifică dacă user_id și amount sunt furnizate
    if not user_id or not amount:
        return jsonify({'error': 'User ID and amount are required!'}), 400


    # Verifică dacă amount este un număr valid
    if not isinstance(amount, (int, float)) or amount <= 0:
        return jsonify({'error': 'Amount must be a positive number!'}), 400

    # Verifică dacă utilizatorul există
    user = users_collection.find_one({'_id': ObjectId(user_id)})
    if not user:
        print('user not found')
        return jsonify({'error': 'User not found!'}), 404

    budgets = {
        'user_id': user_id,
        'amount': amount,
        'description': description,
        'date': datetime.now()
    }

    try:
        result = budgets_collection.insert_one(budgets)
        budgets['_id'] = str(result.inserted_id)
    except Exception as e:
        return jsonify({'error': 'An error occurred while adding the transaction. Please try again later.', e:''}), 500

    return jsonify({'message': 'Money added successfully!', 'transaction': budgets}), 201

@transactions_bp.route('/api/add_cheltuieli', methods=['POST'])
def add_cheltuieli():
    data = request.get_json()
    user_id = session.get('user_id')
    amount = data.get('amount')
    category = data.get('category')
    description = data.get('description', '')
    if category == "null":
        return jsonify({'error': 'Please add category'}), 400
    if not user_id or not amount:
        return jsonify({'error': 'User ID and amount are required!'}), 400
    if not isinstance(amount, (int, float)) or amount <= 0:
        return jsonify({'error': 'Amount must be a positive number!'}), 400
    user = users_collection.find_one({'_id': ObjectId(user_id)})
    if not user:
        print('user not found')
        return jsonify({'error': 'User not found!'}), 404
    transactions = {
        'user_id': user_id,
        'amount': amount,
        'category': category,
        'description': description,
        'date': datetime.now()
    }
    try:
        result = transactions_collection.insert_one(transactions)
        transactions['_id'] = str(result.inserted_id)
    except Exception as e:
        return jsonify({'error': 'An error occurred while adding the transaction. Please try again later.', e: ''}), 500

    return jsonify({'message': 'Expenses added successfully!', 'transaction': transactions}), 201