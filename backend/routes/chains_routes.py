from flask import Blueprint, render_template, request, send_from_directory
from util.file_utils import FileUtils
from util.service_utils import ServiceUtils

chains_routes = Blueprint('chains_routes', __name__, url_prefix='/api/chains')


@chains_routes.route('/')
def orders():
    try:
        orders = [{"id": index, "name": valor}
                  for index, valor in enumerate(get_orders())]
        response = {"data": orders}
        return ServiceUtils.success(response)
    except Exception as e:
        return ServiceUtils.error(e)

def get_orders():
    return FileUtils.get_folders("JobScheduler/backend/orders")