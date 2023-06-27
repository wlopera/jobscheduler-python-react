from flask import jsonify

class ServiceUtils:

    @staticmethod
    def success(response):
        response['code'] = 200
        response['status'] = 'SUCCESS'
        response['error'] = None
        response['message'] = "Operación exitosa"
        print("exito: ", response)
        return jsonify(response)

    @staticmethod
    def error(err):
        response = {
            "code": 400,
            "message": "Error en servicio",
            "error": str(err),
            "status": "ERROR"
        }
        print("error: ", response)
        return jsonify(response)
