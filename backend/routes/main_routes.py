from flask import Blueprint, render_template, send_from_directory, jsonify
import os

main_routes = Blueprint('main_routes', __name__, url_prefix='/api')


@main_routes.route('/data')
def get_data():
    data = {'message': 'Hola desde el backend de Flask'}
    return jsonify(data)


@main_routes.route('/css/<filecss>')
def css_link(filecss):
    return send_from_directory(os.path.join('static/css/'), filecss)


@main_routes.route('/about')
def all():
    return render_template('about.html')
