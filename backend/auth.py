from flask import Blueprint, request, jsonify, session
from database import users_collection
import bcrypt

auth_bp = Blueprint('auth', __name__)
@auth_bp.route('/api/create_user', methods=['POST'])
def create_user():
    data = request.get_json()
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    if users_collection.find_one({"email": email}):
        return jsonify({"message": "User already exists!"}), 400
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

    users_collection.insert_one({"username": username, "email": email, "password": hashed_password.decode('utf-8')})
    return jsonify({"message": "User created successfully!", "username": username}), 201

@auth_bp.route('/api/logIn', methods=['POST'])
def log_In():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    user = users_collection.find_one({"email": email})

    if user:
        if bcrypt.checkpw(password.encode('utf-8'), user['password'].encode('utf-8')):
            session['username'] = user['username']
            session['user_id'] = str(user['_id'])
            session.permanent = True
            return jsonify({"message": "Login successful!", "username": user['username']}), 200
        else:
            return jsonify({"message": "Invalid password!"}), 400
    else:
        return jsonify({"message": "User not found!"}), 404

@auth_bp.route('/api/loggedIn', methods=['GET'])
def logged_in():
    if 'username' in session:
        return jsonify(logged_in=True)
    return jsonify(logged_in=False)
@auth_bp.route('/api/logout', methods=['POST'])
def logout():
    session.pop('username', None)
    return jsonify({"message": "Logged out successfully"}), 200
