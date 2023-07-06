from flask import jsonify
import traceback

class ServiceUtils:

    @staticmethod
    def success(response):
        response['code'] = 200
        response['status'] = 'SUCCESS'
        response['error'] = None
        response['message'] = "Operación exitosa"
        return jsonify(response)

    @staticmethod
    def error(err, logger):        
        # trace =traceback.print_exc()
        # print(f"Traza: {str(err)}\n{trace}")
        #print("errorrrrrrrrrrrrrr.........: ", traceback.print_exc())
        response = {
            "code": 400,
            "message": "Error en servicio",
            "error": str(err),
            "status": "ERROR"
        }
        print("error: ", response)
        # logger.info(f"Traza: {str(err)}\n{trace}")
        # logger.info("error: " + str(response))
        
        return jsonify(response)
