from flask import Blueprint, render_template, request, send_from_directory
from util.file_utils import FileUtils
from util.service_utils import ServiceUtils

chains_routes = Blueprint('chains_routes', __name__, url_prefix='/api/chains')


@chains_routes.route('/<string:name>', methods=['POST'])
def chains(name):
    try:
        # Data del archivo json
        chains = get_chains(name)

        # Combo de posiciones posibles
        positions = []
        # Agrego identificador ID
        for i, obj in enumerate(chains):
            obj["id"] = i + 1
            positions.append(i+1)

        # Combo de opciones - tareas
        options = [item["name"] for item in chains]
        options.append("success")
        options.append("error")

        response = {"data": chains, "options": options, "positions": positions}
        return ServiceUtils.success(response)
    except Exception as e:
        return ServiceUtils.error(e)


def get_chains(name):
    return FileUtils.get_param_json("JobScheduler/backend/orders/" + name + "/param.json")

# def get_chains_by_name(name):
#     return FileUtils.get_chains_by_name("JobScheduler/backend/orders/" + name + "param.json")
