from flask import Blueprint, render_template, request, send_from_directory
from util.file_utils import FileUtils
import json

chains_routes = Blueprint('chains_routes', __name__, url_prefix='/api/chains')

# ---------------------------Rutas y menu de clientes
data = {}


@chains_routes.route('/')
def chains():
    orders = get_orders()
    jobs = FileUtils.get_jobs(
        "JobScheduler/orders/" + orders[0] + "/param.json")
    data = {
        "order_id": orders[0], "orders": orders, "jobs": jobs
    }
    return render_template('chains/index.html',  data=data, modified_rows= [0, 2])


@chains_routes.route('/select_job')
def select_job():
    order_id = request.args.get('order_id')
    orders = get_orders()
    jobs = FileUtils.get_jobs(
        "JobScheduler/orders/" + order_id + "/param.json")
    data = {
        "order_id": order_id, "orders": orders, "jobs": jobs
    }
    return render_template('chains/index.html',  data=data)


@chains_routes.route('/showModal', methods=['POST'])
def show_modal():
    job_id = request.form['job_id']
    order_id = request.form['order_id']
    jobs = FileUtils.get_jobs(
        "JobScheduler/orders/" + order_id + "/param.json")
    job = filter(lambda item: "name" in item and item["name"] == job_id, jobs)
    options = [item["name"] for item in jobs]
    options.append("success")
    options.append("error")
    positions = list(range(1, len(jobs)+1))
    position = get_position_by_name(jobs, job_id)

    data = {
        "order_id": order_id,
        "orders": get_orders(),
        "jobs": jobs,
        "job": list(job)[0],
        "options": options,
        "positions": positions,
        "position": position,
        "show_modal": True,
    }
    return render_template('chains/index.html', data=data)


@chains_routes.route('/process', methods=['POST'])
def process_chain():
    action = request.form['action']
    order_id = request.form['order_id']
    if action == "CANCEL":
        orders = get_orders()
        jobs = FileUtils.get_jobs(
            "JobScheduler/orders/" + order_id + "/param.json")
        data = {
            "order_id": order_id, "orders": orders, "jobs": jobs
        }
        return render_template('chains/index.html',  data=data)
    else:
        # Obtener los datos enviados desde el formulario
        old_position = int(request.form.get('old_position')) - 1
        new_position = int(request.form.get('txtPosition')) - 1

        data = {
            "name": request.form['job_id'],
            "package": request.form['txtPackage'],
            "class": request.form['txtClass'],
            "next": request.form['txtNext'],
            "error": request.form['txtError']
        }

        FileUtils.remove_job_by_position(
            "JobScheduler/orders/" + order_id + "/param.json", old_position)
        FileUtils.add_job_at_position(
            "JobScheduler/orders/" + order_id + "/param.json", data, new_position)

        orders = get_orders()
        jobs = FileUtils.get_jobs(
            "JobScheduler/orders/" + order_id + "/param.json")
        data = {
            "order_id": order_id, "orders": orders, "jobs": jobs
        }
        return render_template('chains/index.html',  data=data)


def get_orders():
    return FileUtils.get_folders("JobScheduler/orders")

# Función para obtener la posición del elemento basado en el campo "name"


def get_position_by_name(data, name):
    for index, item in enumerate(data):
        if "name" in item and item["name"] == name:
            return index + 1
    return -1
