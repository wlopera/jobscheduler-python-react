from flask import Blueprint, request
from util.folder_utils import FolderUtils
from util.json_utils import JsonUtils
from util.service_utils import ServiceUtils
from util.constants import PATH_FOLDERS_ORDER, FILE_PARAM_JSON, NAME_JOBS

orders_routes = Blueprint('orders_routes', __name__, url_prefix='/api/orders')


@orders_routes.route('/', methods=['GET'])
def get_orders():
    """
        Consultar los directorios de la carpeta requerida..
    Author:
        wlopera
    Return:
            dict: Carpetas de una ruta
    """
    try:
        orders = get_orders_folders()
        return ServiceUtils.success({"data": orders})
    except Exception as e:
        return ServiceUtils.error(e)


@orders_routes.route('/add/<string:name>', methods=['POST'])
def add_order(name):
    """
        Crear carpeta.
    Args:
        name (str): Nombre de la carpeta a crear
    Author:
        wlopera
    Return:
            dict: Resultado del procesamiento
    """
    try:
        create_order_folders(name)
        orders = get_orders_folders()
        activate_order(orders, name)

        return ServiceUtils.success({"data": orders})
    except Exception as e:
        return ServiceUtils.error(e)


@orders_routes.route('/modify', methods=['POST'])
def modify_order():
    """
        Modificar nombre de carpeta.
    Args:
        old_value (str): Nombre de la carpeta a modificar
        new_value (str): Nombre nuevo de la carpeta a modificar
    Author:
        wlopera
    Return:
            dict: Resultado del procesamiento
    """
    try:
        param = request.get_json()
        old_name = param['old_value']
        new_name = param['new_value']

        rename_order_folders(old_name, new_name)
        orders = get_orders_folders()
        activate_order(orders, new_name)

        return ServiceUtils.success({"data": orders})
    except Exception as e:
        return ServiceUtils.error(e)


@orders_routes.route('/delete/<string:name>', methods=['POST'])
def delete_order(name):
    """
        Eliminar carpeta.
    Args:
        name (str): Nombre de la carpeta a eliminar.
    Author:
        wlopera
    Return:
            dict: Resultado del procesamiento
    """
    try:
        delete_order_folders(name)
        orders = get_orders_folders()
        return ServiceUtils.success({"data": orders})
    except Exception as e:
        return ServiceUtils.error(e)


def get_orders_folders():
    """
        Lee los directorios de una ruta requerida.
    Author: 
        wlopera
    Return:
        dict: Carpetas de una ruta
    """
    response = FolderUtils.get_folders(PATH_FOLDERS_ORDER)
    orders = [{"id": index, "name": value}
              for index, value in enumerate(response)]

    return orders


def create_order_folders(name):
    """
        Crea una carpeta en una ruta requerida.
    Args:
        name (str): Nombre de la carpeta a eliminar
    Author: 
        wlopera
    """
    FolderUtils.create_folder(PATH_FOLDERS_ORDER, name)
    FolderUtils.create_folder(f"{PATH_FOLDERS_ORDER}/{name}/", NAME_JOBS)
    JsonUtils.write_json(f"{PATH_FOLDERS_ORDER}/{name}/{FILE_PARAM_JSON}", [])


def rename_order_folders(old_name, new_name):
    """
        Renombrar carpeta.
    Args:
        old_value (str): Nombre de la carpeta a modificar
        new_value (str): Nombre nuevo de la carpeta a modificar
    Author: 
        wlopera
    """
    FolderUtils.rename_folder(PATH_FOLDERS_ORDER, old_name, new_name)


def delete_order_folders(name):
    """
        Eliminar carpeta.
    Args:
        name (str): Nombre de la carpeta a eliminar
    Author:
        wlopera
    """
    FolderUtils.delete_folder(f"{PATH_FOLDERS_ORDER}/{name}")


def activate_order(orders, name):
    """
        Recorrer y activar la carpeta actual.
    Args:
        name (str): Nombre de la carpeta a activar
    Author:
        wlopera
    """
    for order in orders:
        if order["name"] == name:
            order["active"] = True
        else:
            order.pop("active", None)
