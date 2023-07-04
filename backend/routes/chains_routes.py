from flask import Blueprint, render_template, request, send_from_directory
from util.file_utils import FileUtils
from util.service_utils import ServiceUtils
from spooler_task import SpoolerTask
import threading
import secrets

chains_routes = Blueprint('chains_routes', __name__, url_prefix='/api/chains')

processes = {}  # Diccionario para almacenar los procesos en ejecución


@chains_routes.route('/<string:name>', methods=['POST'])
def chains(name):
    try:
        response = get_chains(name)
        return ServiceUtils.success(response)
    except Exception as e:
        return ServiceUtils.error(e)


@chains_routes.route('/modify', methods=['POST'])
def modify_chain():
    try:
        param = request.get_json()

        # Obtener los datos enviados desde el formulario
        order_id = param['order_id']
        old_position = int(param['old_id']) - 1
        new_position = int(param['id']) - 1

        data = {
            "name": param['name'],
            "package": param['package'],
            "class": param['class'],
            "next": param['next'],
            "error": param['error']
        }

        FileUtils.remove_job_by_position(
            "JobScheduler/backend/orders/" + order_id + "/param.json", old_position)

        FileUtils.add_job_at_position(
            "JobScheduler/backend/orders/" + order_id + "/param.json", data, new_position)

        response = get_chains(order_id)

        record = list(filter(
            lambda item: "name" in item and item["name"] == param['name'], response['data']))

        position = int(record[0]['id'])-1

        response['data'][position]["active"] = True

        return ServiceUtils.success(response)
    except Exception as e:
        return ServiceUtils.error(e)


@chains_routes.route('/params', methods=['POST'])
def params_job():
    try:
        param = request.get_json()

        # Obtener los datos enviados desde el formulario
        order_id = param['order_id']
        job_id = param['job_id']

        response = get_params(order_id, job_id)

        return ServiceUtils.success(response)
    except Exception as e:
        return ServiceUtils.error(e)


@chains_routes.route('/update_params', methods=['POST'])
def update_params_job():
    try:
        param = request.get_json()

        # Obtener los datos enviados desde el formulario
        order_id = param['order_id']
        job_id = param['job_id']
        new_data = param['data']

        FileUtils.update_data_json(
            "JobScheduler/backend/orders/" + order_id + "/jobs/" + job_id + "/param.json", new_data)

        return ServiceUtils.success({})
    except Exception as e:
        return ServiceUtils.error(e)


@chains_routes.route('/process/<string:name>', methods=['POST'])
def process(name):
    try:
        # Generar un token único
        token = secrets.token_hex(16)

        print("Procesar  orden: ", processes, token)
        # Verificar si ya existe un proceso en ejecución con ese token
        if token in processes:
            # 102: El servidor ha aceptado la solicitud, pero aún no la ha completado
            return ServiceUtils.success({'message': 'Ya hay un proceso en ejecución con ese token', 'status-code': 102})
        else:
            # Almacenar el token en el diccionario de procesos en ejecución
            processes[token] = True

            spooler = SpoolerTask()
            spooler.get_chains(name)

            # spooler.logger.info("ORDER ==> " + str(spooler.order))
            spooler.logger.info("JOBS ==> " + str(spooler.jobs))
            spooler.logger.info("Tarea inicial ==> " + spooler.current_job)

            # Define una función que ejecutará spooler.process()
            def run_spooler():
                spooler.process()
                print(12345678, token)
                if token in processes:
                    del processes[token]

            # Crea un hilo y ejecuta run_spooler() en él
            thread = threading.Thread(target=run_spooler)
            thread.start()

            return ServiceUtils.success({"log_name": spooler.log_name, "token": token})
    except Exception as e:
        return ServiceUtils.error(e)


@chains_routes.route('/status')
def check_status():
    try:
        print(111111111111111)
        # Obtener el token de la petición
        token = request.headers.get('X-Request-Token')
        
        print("processes -token: ", processes, token)

        # Verificar si existe un proceso en ejecución con ese token
        if token in processes:
            # 202: Indica que la solicitud se ha aceptado para su procesamiento, pero el procesamiento no se ha completado;
            return ServiceUtils.success({"message": "El proceso aún está en ejecución", "token": token, 'status-code': 202})
        else:
            # 200: La solicitud tuvo éxito
            return ServiceUtils.success({"message": "El proceso ha finalizado", "token": token, 'status-code': 200})
    except Exception as e:
        return ServiceUtils.error(e)


@chains_routes.route('/log/<string:name>', methods=['POST'])
def log_data(name):
    try:
        response = FileUtils.get_log_file(
            'JobScheduler/backend/log/' + name + ".log")

        print(123456, ServiceUtils.success(response))

        return ServiceUtils.success(response)
    except Exception as e:
        return ServiceUtils.error(e)


def get_chains(name):
    chains = FileUtils.get_param_json(
        "JobScheduler/backend/orders/" + name + "/param.json")

    # Combo de posiciones posibles
    positions = []
    # Agrego identificador ID
    for i, obj in enumerate(chains):
        obj["id"] = i + 1
        positions.append(i+1)

    # Combo de opciones - tareas
    options = [item["name"] for item in chains]
    options.append("exito")
    options.append("error")

    return {"data": chains, "options": options, "positions": positions}


def get_params(order_id, job_id):
    return FileUtils.get_param_json(
        "JobScheduler/backend/orders/" + order_id + "/jobs/" + job_id + "/param.json")
