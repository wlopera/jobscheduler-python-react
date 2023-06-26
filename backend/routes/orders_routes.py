from flask import Blueprint, request, jsonify
from util.file_utils import FileUtils

orders_routes = Blueprint('orders_routes', __name__, url_prefix='/api/orders')


@orders_routes.route('/')
def orders():
    orders = [{"id": index, "name": valor}
              for index, valor in enumerate(get_orders())]
    response = {
        "data": orders,
        "columns": [
            {"dataField": "name", "text": ""},
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
    data = list(filter(
        lambda item: "name" in item and item["name"] == name, orders))
    orders[data[0]['id']]["active"] = True
    response = {
        "data": orders,
    }
    return jsonify(response)


@orders_routes.route('/modify', methods=['POST'])
def modify_order():
    param = request.get_json()
    FileUtils.rename_folder("JobScheduler/backend/orders",
                            param['old_value'], param['new_value'])
    orders = [{"id": index, "name": valor}
              for index, valor in enumerate(get_orders())]
    data = list(filter(
        lambda item: "name" in item and item["name"] == param['new_value'], orders))
    orders[data[0]['id']]["active"] = True

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


def get_orders():
    return FileUtils.get_folders("JobScheduler/backend/orders")


def get_jobs(order_id):
    return FileUtils.get_folders("JobScheduler/backend/orders/" + order_id + "/jobs")
