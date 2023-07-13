from flask import Flask
from flask_cors import CORS

from routes.orders_routes import orders_routes
from routes.jobs_routes import jobs_routes
from routes.chains_routes import chains_routes


app = Flask(__name__)
app.secret_key = "wlopera"

# Rutas
app.register_blueprint(orders_routes)
app.register_blueprint(jobs_routes)
app.register_blueprint(chains_routes)
CORS(app)


@app.route('/api/', methods=['GET'])
def test():
    """
        Consultar los directorios de la carpeta requerida..
    Author:
        wlopera
    Return:
            dict: Carpetas de una ruta
    """
    return {"data": "Json de prueba", "code": 200}


if __name__ == '__main__':
    #CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})
    app.run(debug=True, port=5000)
