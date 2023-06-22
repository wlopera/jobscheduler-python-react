from flask import Blueprint, render_template, request
from util.file_utils import FileUtils

jobs_routes = Blueprint('jobs_routes', __name__, url_prefix='/api/jobs')


@jobs_routes.route('/selected')
def selected_job():
    order_id = request.args.get('order_id')
    data = {
        'order_id': order_id,
        "job_id": request.args.get('job_id'),
        'orders': get_orders(),
        'jobs': get_jobs(order_id),
    }
    return render_template('orders/index.html',  data=data)


@jobs_routes.route('/showModal', methods=['POST'])
def show_modal():
    if 'job_id' in request.form:
        order_id = request.form['order_id']
        job_id = request.form['job_id']
        data = {
            'order_id': order_id,
            'job_id': job_id,
            'orders': get_orders(),
            'jobs': get_jobs(order_id),
            'show_modal_job': True,
            'type': 'MODIFY'
        }
        return render_template('orders/index.html', data=data)
    else:
        order_id = request.form['order_id']
        data = {
            'order_id': order_id,
            'job_id': "",
            'orders': get_orders(),
            'jobs': get_jobs(order_id),
            'show_modal_job': True,
            'type': 'ADD'
        }
        return render_template('orders/index.html',  data=data)


@jobs_routes.route('/delete', methods=['POST'])
def delete_job():
    order_id = request.form['order_id']
    job_id = request.form['job_id']
    FileUtils.delete_folder("JobScheduler/orders/"+order_id+"/jobs/"+job_id)
    
    FileUtils.remove_jobs_by_name("JobScheduler/orders/" + order_id + "/param.json", job_id )
            
    data = {
        'order_id': order_id,
        "job_id": request.args.get('job_id'),
        'orders': get_orders(),
        'jobs': get_jobs(order_id),
    }
    return render_template('orders/index.html',  data=data)


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
            FileUtils.add_job_at_last_position("JobScheduler/orders/" + order_id + "/param.json", data )
            
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
    return FileUtils.get_folders("JobScheduler/orders")


def get_jobs(order_id):
    return FileUtils.get_folders("JobScheduler/orders/" + order_id + "/jobs")
