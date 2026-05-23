from flask import Flask, jsonify
import os

app = Flask(__name__)

API_KEY = os.getenv("API_KEY", "not-set")

@app.route("/")
def home():
    return jsonify({
        "message": "Hey! This is Nikhil's Flask API running in Docker!",
        "status": "live",
        "container": "python:3.10-slim"
    })

@app.route("/secret")
def secret():
    return jsonify({
        "api_key_loaded": True if API_KEY != "not-set" else False,
        "hint": f"Key starts with: {API_KEY[:3]}..." if API_KEY != "not-set" else "API_KEY not set"
    })

@app.route("/health")
def health():
    return jsonify({
        "status": "healthy"
    })

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=False)
