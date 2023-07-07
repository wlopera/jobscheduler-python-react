from flask import Blueprint, request
from spooler_task import SpoolerTask
from datetime import datetime
import traceback

from util.json_utils import JsonUtils
from util.service_utils import ServiceUtils
from util.constants import PATH_FOLDERS_ORDER, FILE_PARAM_JSON, FILE_ORDERS_JSON, NAME_JOBS, PATH_LOG


chains_routes = Blueprint('chains_routes', __name__, url_prefix='/api/chains')


@chains_routes.route('/<string:name>', methods=['POST'])
def chains(name):
    try:
        response = get_chains(name)
        print(2222222,response)
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

        JsonUtils.remove_item_by_position(
            PATH_FOLDERS_ORDER + "/" + order_id + "/" + FILE_PARAM_JSON, old_position)

        JsonUtils.add_item(
            PATH_FOLDERS_ORDER + "/" + order_id + "/" + FILE_PARAM_JSON, data, new_position)

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

        JsonUtils.write_json(
            PATH_FOLDERS_ORDER + "/" + order_id + "/" + NAME_JOBS + "/" + job_id + "/" + FILE_PARAM_JSON, new_data)

        return ServiceUtils.success({})
    except Exception as e:
        return ServiceUtils.error(e)


@chains_routes.route('/process/<string:name>', methods=['POST'])
def process(name):
    values = {}
    try:
        spooler = SpoolerTask()
        spooler.logger.info("Orden a procesar " + name)
        spooler.get_chains(name)

        # spooler.logger.info("ORDER ==> " + str(spooler.order))
        spooler.logger.info("JOBS ==> " + str(spooler.jobs))
        spooler.logger.info("Tarea inicial ==> " + spooler.current_job)

        startDate = datetime.now().strftime('%d/%m/%Y-%H:%M:%S')
        values = {
            "id": datetime.now().strftime('%Y%m%d%H%M%S'),
            "order_id": name,
            "status": "iniciado",
            "startDate": startDate,
            "endDate": "",
            "duration": "",
            "node": spooler.current_job,
            "log": spooler.log_name
        }

        JsonUtils.add_item(PATH_FOLDERS_ORDER + "/" + FILE_ORDERS_JSON, values)

        spooler.process()

        # Calcular la diferencia de tiempo
        endDate = datetime.now().strftime('%d/%m/%Y-%H:%M:%S')

        # Convertir las cadenas en objetos de fecha y hora
        startDate_time = datetime.strptime(startDate, "%d/%m/%Y-%H:%M:%S")
        endDate_time = datetime.strptime(endDate, "%d/%m/%Y-%H:%M:%S")

        diff = endDate_time - startDate_time

        values['status'] = "exitoso"
        values['endDate'] = endDate
        values['duration'] = str(diff.total_seconds()) + " seg"
        values["node"] = "success",

        JsonUtils.update_item(
            PATH_FOLDERS_ORDER + "/" + FILE_ORDERS_JSON, 'id', values['id'], values)

        handlers = spooler.logger.handlers[:]
        for handler in handlers:
            spooler.logger.removeHandler(handler)
            handler.close()

        spooler.logger.info("Proceso termino exitosamente.")
        return ServiceUtils.success({})
    except Exception as e:

        # Obtener la traza de excepción como cadena de texto
        trace = traceback.format_exc()

        # Enviar la traza al logger de nivel de error
        print(f"Error.........................: {str(e)}\n{trace}")
        spooler.logger.error(
            f"Error.........................: {str(e)}\n{trace}")

        # Calcular la diferencia de tiempo
        endDate = datetime.now().strftime('%d/%m/%Y-%H:%M:%S')

        # Convertir las cadenas en objetos de fecha y hora
        startDate_time = datetime.strptime(
            values['startDate'], "%d/%m/%Y-%H:%M:%S")
        endDate_time = datetime.strptime(endDate, "%d/%m/%Y-%H:%M:%S")

        diff = endDate_time - startDate_time

        values['status'] = "fallido"
        values['endDate'] = datetime.now().strftime('%d/%m/%Y-%H:%M:%S'),
        values['endDate'] = endDate
        values['duration'] = str(diff.total_seconds()) + " seg"
        values["node"] = "error",

        JsonUtils.update_item(
            PATH_FOLDERS_ORDER + "/" + FILE_ORDERS_JSON, 'id', values['id'], values)

        spooler.logger.info("Proceso termino con error.")

        handlers = spooler.logger.handlers[:]
        for handler in handlers:
            spooler.logger.removeHandler(handler)
            handler.close()

        return ServiceUtils.error(e)


@chains_routes.route('/log/<string:name>', methods=['POST'])
def log_data(name):
    try:
        response = JsonUtils.read_log_file(PATH_LOG + '/' + name)

        return ServiceUtils.success(response)
    except Exception as e:
        return ServiceUtils.error(e)


@chains_routes.route('/history')
def history():
    try:
        response = get_history()

        # Ordenar por el campo "startDate"
        response.sort(key=lambda x: x['startDate'], reverse=True)

        return ServiceUtils.success({"data": response})
    except Exception as e:
        return ServiceUtils.error(e)


def get_chains(name):
    chains = JsonUtils.read_json(
        PATH_FOLDERS_ORDER + "/" + name + "/" + FILE_PARAM_JSON)

    print(111111111, chains)
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
    return JsonUtils.read_json(
        PATH_FOLDERS_ORDER + "/" + order_id + "/" + NAME_JOBS + "/" + job_id + "/" + FILE_PARAM_JSON)


def get_history():
    return JsonUtils.read_json(
        PATH_FOLDERS_ORDER + "/" + FILE_ORDERS_JSON)
