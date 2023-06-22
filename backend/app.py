from flask import Flask, jsonify
from flask_cors import CORS

from routes.main_routes import main_routes
from routes.orders_routes import orders_routes
from routes.jobs_routes import jobs_routes
from routes.chains_routes import chains_routes


app = Flask(__name__)
app.secret_key = "wlopera"

# Rutas
app.register_blueprint(main_routes)
app.register_blueprint(orders_routes)
app.register_blueprint(jobs_routes)
app.register_blueprint(chains_routes)

if __name__ == '__main__':
    CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})
    app.run(debug=True, port=5000)
