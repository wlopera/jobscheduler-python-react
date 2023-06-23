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


@orders_routes.route('/selected')
def selected_order():
    order_id = request.args.get('order_id')
    data = {
        'order_id': order_id,
        'orders': get_orders(),
        'jobs': get_jobs(order_id),
    }
    return render_template('orders/index.html',  data=data)


@orders_routes.route('/showModal', methods=['POST'])
def show_modal():
    if 'order_id' in request.form:
        order_id = request.form['order_id']
        data = {
            'order_id': order_id,
            'orders': get_orders(),
            'jobs': get_jobs(order_id),
            'show_modal_order': True,
            'type': 'MODIFY'
        }
        return render_template('orders/index.html', data=data)
    else:
        orders = get_orders()
        data = {
            'order_id': "",
            'orders': orders,
            'jobs': get_jobs(orders[0]),
            'show_modal_order': True,
            'type': 'ADD'
        }
        return render_template('orders/index.html',  data=data)


@orders_routes.route('/delete/<string:order_id>', methods=['POST'])
def delete_order(order_id):
    FileUtils.delete_folder("JobScheduler/backend/orders/"+order_id)
    orders = [{"id": index, "name": valor}
              for index, valor in enumerate(get_orders())]
    response = {
        "data": orders,        
    }

    return jsonify(response)


@orders_routes.route('/process', methods=['POST'])
def process_order():
    action = request.form['action']
    type = request.form['txtType']
    order_id = request.form['txtName']
    old_order = request.form['old_order']

    print("action: ", action)
    print("type: ", type)
    print("order_id: ", order_id)
    if action == "CANCEL":
        if order_id:
            data = {
                'order_id': order_id,
                'orders': get_orders(),
                'jobs': get_jobs(order_id),
            }
            return render_template('orders/index.html',  data=data)
        else:
            return orders()
    else:
        if type == "ADD":
            FileUtils.create_folder("JobScheduler/orders", order_id)
            FileUtils.create_file_json(
                "JobScheduler/orders/" + order_id + "/param.json")
        else:
            FileUtils.rename_folder("JobScheduler/orders", old_order, order_id)

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
