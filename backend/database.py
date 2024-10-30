from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

uri = "mongodb+srv://admin:admin@cluster0.etlpd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

client = MongoClient(uri, server_api=ServerApi('1'))

db = client['trackMoney']

# Colecția pentru utilizatori
users_collection = db.get_collection("users")
try:
    users_collection.create_index("email", unique=True)
    print("Collection 'users' created or already exists, index created.")
except Exception as e:
    print("Error creating index for 'users':", e)

# Colecția pentru tranzacții
transactions_collection = db.get_collection("transactions")
try:
    transactions_collection.create_index("date", unique=False)
    print("Collection 'transactions' created or already exists.")
except Exception as e:
    print("Error creating index for 'transactions':", e)

# Colecția pentru bugete
budgets_collection = db.get_collection("budgets")
try:
    budgets_collection.create_index("user_id", unique=False)
    print("Collection 'budgets' created or already exists.")
except Exception as e:
    print("Error creating index for 'budgets':", e)

if __name__ == '__main__':
    pass
