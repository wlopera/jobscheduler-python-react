from flask import Blueprint, request, jsonify
from util.file_utils import FileUtils
from util.service_utils import ServiceUtils

orders_routes = Blueprint('orders_routes', __name__, url_prefix='/api/orders')


@orders_routes.route('/')
def orders():
    try:
        result=1/0
        orders = [{"id": index, "name": valor}
                  for index, valor in enumerate(get_orders())]
        response = {
            "code": 200,
            "data": orders,
            "columns": [
                {"dataField": "name", "text": ""},
            ],
        }        

        return ServiceUtils.success(response)
    except Exception as e:
        return ServiceUtils.error(e)


@orders_routes.route('/add/<string:name>', methods=['POST'])
def add_order(name):
    try:
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
        return ServiceUtils.success(response)
    except Exception as e:
        return ServiceUtils.error(e)


@orders_routes.route('/modify', methods=['POST'])
def modify_order():
    try:
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
        return ServiceUtils.success(response)
    except Exception as e:
        return ServiceUtils.error(e)


@orders_routes.route('/delete/<string:name>', methods=['POST'])
def delete_order(name):
    try:
        FileUtils.delete_folder("JobScheduler/backend/orders/"+name)
        orders = [{"id": index, "name": valor}
                  for index, valor in enumerate(get_orders())]
        response = {
            "data": orders,
        }
        return ServiceUtils.success(response)
    except Exception as e:
        return ServiceUtils.error(e)


def get_orders():
    return FileUtils.get_folders("JobScheduler/backend/orders")


def get_jobs(order_id):
    return FileUtils.get_folders("JobScheduler/backend/orders/" + order_id + "/jobs")
