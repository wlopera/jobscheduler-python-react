from flask import Blueprint, render_template, request, jsonify
from util.file_utils import FileUtils

jobs_routes = Blueprint('jobs_routes', __name__, url_prefix='/api/jobs')


@jobs_routes.route('/<string:name>', methods=['POST'])
def jobs(name):
    jobs = [{"id": index, "name": valor}
            for index, valor in enumerate(get_jobs(name))]
    response = {
        "button_add": True,
        "data": jobs,
        "columns": [
            {"dataField": "name", "text": ""},
            {"dataField": "button_edit",  "text": "", "editable": True},
            {"dataField": "button_delete", "text": "", "editable": True},
        ],
    }
    return jsonify(response)


@jobs_routes.route('/add', methods=['POST'])
def add_job():
    param = request.get_json()
    order_id = param['order_id']
    job_id = param['job_id']

    FileUtils.create_folder(
        "JobScheduler/backend/orders/" + order_id + "/jobs/", job_id)

    values = {
        "name": job_id,
        "package": "",
        "class": "",
        "next": "success",
        "error": "error"
    }

    FileUtils.add_job_at_last_position(
        "JobScheduler/backend/orders/" + order_id + "/param.json", values)

    jobs = [{"id": index, "name": valor}
            for index, valor in enumerate(get_jobs(order_id))]

    data = list(filter(
        lambda item: "name" in item and item["name"] == job_id, jobs))

    jobs[data[0]['id']]["active"] = True

    response = {
        "data": jobs,
    }
    return jsonify(response)


@jobs_routes.route('/modify', methods=['POST'])
def modify_job():
    param = request.get_json()
    order_id = param['order_id']
    old_job = param['old_value']
    new_job = param['new_value']

    FileUtils.rename_folder(
        "JobScheduler/backend/orders/"+order_id+"/jobs/", old_job, new_job)

    FileUtils.modify_job("JobScheduler/backend/orders/" +
                         order_id + "/param.json", old_job, new_job)

    jobs = [{"id": index, "name": valor}
            for index, valor in enumerate(get_jobs(order_id))]

    response = {
        "data": jobs,
    }
    return jsonify(response)


@jobs_routes.route('/delete', methods=['POST'])
def delete_job():
    param = request.get_json()
    order_id = param['order_id']
    job_id = param['job_id']

    FileUtils.delete_folder(
        "JobScheduler/backend/orders/" + order_id + "/jobs/" + job_id)

    FileUtils.remove_jobs_by_name(
        "JobScheduler/backend/orders/" + order_id + "/param.json", job_id)

    jobs = [{"id": index, "name": valor}
            for index, valor in enumerate(get_jobs(order_id))]

    response = {
        "data": jobs,
    }

    return jsonify(response)


@jobs_routes.route('/process', methods=['POST'])
def process_job():
    action = request.form['action']
    type = request.form['txtType']
    order_id = request.form['order_id']
    job_id = request.form['txtName']
    old_job = request.form['old_job']

    print("action: ", action)
    print("type: ", type)
    print("order_id: ", order_id)
    print("old_job: ", old_job)
    if action == "CANCEL":
        data = {
            'order_id': order_id,
            "job_id": job_id,
            'orders': get_orders(),
            'jobs': get_jobs(order_id),
        }
        return render_template('orders/index.html',  data=data)
    else:
        if type == "ADD":
            FileUtils.create_folder(
                "JobScheduler/orders/"+order_id+"/jobs/", job_id)

            data = {
                "name": job_id,
                "package": "",
                "class": "",
                "next": "success",
                "error": "error"
            }
            FileUtils.add_job_at_last_position(
                "JobScheduler/orders/" + order_id + "/param.json", data)

        else:
            FileUtils.rename_folder(
                "JobScheduler/orders/"+order_id+"/jobs/", old_job, job_id)

        data = {
            'order_id': order_id,
            "job_id": job_id,
            'orders': get_orders(),
            'jobs': get_jobs(order_id),
        }
        return render_template('orders/index.html',  data=data)


def get_orders():
    return FileUtils.get_folders("JobScheduler/backend/orders")


def get_jobs(order_id):
    return FileUtils.get_folders("JobScheduler/backend/orders/" + order_id + "/jobs")
