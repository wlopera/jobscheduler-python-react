from flask import Blueprint, render_template, request, jsonify
from util.file_utils import FileUtils

orders_routes = Blueprint('orders_routes', __name__, url_prefix='/api/orders')


@orders_routes.route('/')
def orders():
    orders = [{"id": index, "name": valor}
              for index, valor in enumerate(get_orders())]
    response = {
        "button_add": True,
        "data": orders,
        "columns": [
            {"dataField": "name", "text": ""},
            {"dataField": "button_edit",  "text": "", "editable": True},
            {"dataField": "button_delete", "text": "", "editable": True},
        ],
    }

    return jsonify(response)


@orders_routes.route('/add/<string:name>', methods=['POST'])
def add_order(name):
    FileUtils.create_folder("JobScheduler/backend/orders", name)
    FileUtils.create_file_json(
        "JobScheduler/backend/orders/" + name + "/param.json")
    orders = [{"id": index, "name": valor}
              for index, valor in enumerate(get_orders())]
    response = {
        "data": orders,
    }
    return jsonify(response)


@orders_routes.route('/modify', methods=['POST'])
def modify_order():
    param= request.get_json()
    print(111, param)
    print(2222, param['old_value'], param['new_value'])
    FileUtils.rename_folder("JobScheduler/backend/orders", param['old_value'], param['new_value'])
    orders = [{"id": index, "name": valor}
              for index, valor in enumerate(get_orders())]
    response = {
        "data": orders,
    }
    return jsonify(response)


@orders_routes.route('/delete/<string:name>', methods=['POST'])
def delete_order(name):
    FileUtils.delete_folder("JobScheduler/backend/orders/"+name)
    orders = [{"id": index, "name": valor}
              for index, valor in enumerate(get_orders())]
    response = {
        "data": orders,
    }
    return jsonify(response)


@orders_routes.route('/selected')
def selected_order():
    order_id = request.args.get('order_id')
    data = {
        'order_id': order_id,
        'orders': get_orders(),
        'jobs': get_jobs(order_id),
    }
    return render_template('orders/index.html',  data=data)


def get_orders():
    return FileUtils.get_folders("JobScheduler/backend/orders")


def get_jobs(order_id):
    return FileUtils.get_folders("JobScheduler/backend/orders/" + order_id + "/jobs")
