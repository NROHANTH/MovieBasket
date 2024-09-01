from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app,resources={r"/api/*": {"origins": "http://localhost:3000"}})  # Enable CORS for all origins

@app.route('/api/data')
def get_data():
    return jsonify(message="Hello from the backend!")

if __name__ == '__main__':
    app.run(debug=True)