from flask import Blueprint, render_template, request, jsonify
from util.file_utils import FileUtils
from util.service_utils import ServiceUtils

jobs_routes = Blueprint('jobs_routes', __name__, url_prefix='/api/jobs')


@jobs_routes.route('/<string:name>', methods=['POST'])
def jobs(name):
    try:
        jobs = []
        if name != '':
            jobs = [{"id": index, "name": valor}
                    for index, valor in enumerate(get_jobs(name))]
        response = {"data": jobs}
        return ServiceUtils.success(response)
    except Exception as e:
        return ServiceUtils.error(e)

@jobs_routes.route('/fromJson/<string:name>', methods=['POST'])
def jobs_from_json(name):
    try:
        jobs = []
        if name != '':
            jobs = [{"id": index, "name": data['name']}
                    for index, data in enumerate(get_jobs_from_json(name))]
        response = {"data": jobs}
        return ServiceUtils.success(response)
    except Exception as e:
        return ServiceUtils.error(e)
    

@jobs_routes.route('/add', methods=['POST'])
def add_job():
    try:
        param = request.get_json()
        order_id = param['order_id']
        job_id = param['job_id']

        FileUtils.create_folder(
            "JobScheduler/backend/orders/" + order_id + "/jobs/", job_id)

        FileUtils.create_file_json(
            "JobScheduler/backend/orders/" + order_id + "/jobs/" + job_id + "/param.json")

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
        return ServiceUtils.success(response)
    except Exception as e:
        return ServiceUtils.error(e)


@jobs_routes.route('/modify', methods=['POST'])
def modify_job():
    try:
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

        data = list(filter(
            lambda item: "name" in item and item["name"] == new_job, jobs))

        jobs[data[0]['id']]["active"] = True

        response = {
            "data": jobs,
        }
        return ServiceUtils.success(response)
    except Exception as e:
        return ServiceUtils.error(e)


@jobs_routes.route('/delete', methods=['POST'])
def delete_job():
    try:
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
        return ServiceUtils.success(response)
    except Exception as e:
        return ServiceUtils.error(e)


def get_jobs(order_id):
    return FileUtils.get_folders("JobScheduler/backend/orders/" + order_id + "/jobs")

def get_jobs_from_json(order_id):
    return FileUtils.get_param_json("JobScheduler/backend/orders/" + order_id + "/param.json")


