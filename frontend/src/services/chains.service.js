import http from "./axios/http-common";

const PATH_API = "/chains";

class ChainsService {
  get(data) {
    try {
      return http.post(`${PATH_API}/${data}`).then((response) => {
        if (response.data.code === 200) {
          if (response.data.data.length > 0) {
            return {
              ...response.data,
              alert: {
                type: "SUCCESS",
                text: `Cadena de tareas cargadas satisfactoriamente.`,
              },
            };
          } else {
            return {
              ...response.data,
              alert: {
                type: "SUCCESS",
                text: `No hay registros disponibles`,
              },
            };
          }
        } else {
          return {
            ...response.data,
            alert: {
              type: "ERROR",
              text: `Error cargando cadena de tareas: [${response.data.code}]: ${response.data.message}`,
            },
          };
        }
      });
    } catch (error) {
      const errorMessage = error.response;
      return {
        data: response.data,
        message: {
          type: "ERROR",
          text: `Error cargando cadena de tareas: ${errorMessage}`,
        },
      };
    }
  }

  update(data) {
    try {
      return http.post(`${PATH_API}/modify`, data).then((response) => {
        console.log("Modificar update - tarea:", response);
        if (response.data.code === 200) {
          return {
            ...response.data,
            alert: {
              type: "SUCCESS",
              text: `Modificada tarea "${data.name}" satisfactoriamente`,
            },
          };
        } else {
          return {
            ...response.data,
            alert: {
              type: "ERROR",
              text: `Error modificando tarea "${data.name}": [${response.data.code}] - ${response.data.message}`,
            },
          };
        }
      });
    } catch (error) {
      const errorMessage = error.response;
      return {
        data: response.data,
        message: {
          type: "ERROR",
          text: `Error modificando tarea "${data.name}": ${errorMessage}`,
        },
      };
    }
  }

  getParams(data) {
    try {
      return http.post(`${PATH_API}/params`, data).then((response) => {
        console.log("Parámetros - tarea:", response);
        if (response.data.code === 200) {
          if (response.data.params.length > 0) {
            return {
              ...response.data,
              alert: {
                type: "SUCCESS",
                text: `Parámetros de tarea cargados satisfactoriamente.`,
              },
            };
          } else {
            return {
              ...response.data,
              alert: {
                type: "SUCCESS",
                text: `No hay registros disponibles`,
              },
            };
          }
        } else {
          return {
            ...response.data,
            alert: {
              type: "ERROR",
              text: `Error cargando parámetros de tarea: [${response.data.code}]: ${response.data.message}`,
            },
          };
        }
      });
    } catch (error) {
      const errorMessage = error.response;
      return {
        data: response.data,
        message: {
          type: "ERROR",
          text: `Error cargando parámetros de tarea: ${errorMessage}`,
        },
      };
    }
  }

  updateParams(data) {
    try {
      console.log("Update Params:", data);
      return http.post(`${PATH_API}/update_params`, data).then((response) => {
        console.log("Parámetros - tarea luego de actualizados:", response);
        if (response.data.code === 200) {
          return {
            ...response.data,
            alert: {
              type: "SUCCESS",
              text: `Parámetros orden/tarea: ${data.order_id}/${data.job_id} -> actualizados satisfactoriamente.`,
            },
          };
        } else {
          return {
            ...response.data,
            alert: {
              type: "ERROR",
              text: `Error cargando parámetros de tarea actualizada: [${response.data.code}]: ${response.data.message}`,
            },
          };
        }
      });
    } catch (error) {
      const errorMessage = error.response;
      return {
        data: response.data,
        message: {
          type: "ERROR",
          text: `Error cargando parámetros de tarea: ${errorMessage}`,
        },
      };
    }
  }

  process(data) {
    try {
      return http.post(`${PATH_API}/process/${data}`).then((response) => {
        console.log(12345, response);
        if (response.data.code === 200) {
          return {
            ...response.data,
            alert: {
              type: "SUCCESS",
              text: `Orden procesada satisfactoriamente.`,
            },
          };
        } else {
          return {
            ...response.data,
            alert: {
              type: "ERROR",
              text: `Error procesando la orden: [${response.data.code}]: ${response.data.message}`,
            },
          };
        }
      });
    } catch (error) {
      const errorMessage = error.response;
      return {
        data: response.data,
        message: {
          type: "ERROR",
          text: `Error prcoesando la orden: ${errorMessage}`,
        },
      };
    }
  }

  read_log_file(data) {
    try {
      return http.post(`${PATH_API}/log/${data}`).then((response) => {
        console.log(12345, response);
        if (response.data.code === 200) {
          return {
            ...response.data,
            alert: {
              type: "SUCCESS",
              text: `Archivo Log cargado satisfactoriamente.`,
            },
          };
        } else {
          return {
            ...response.data,
            alert: {
              type: "ERROR",
              text: `Error cargando archivo log: [${response.data.code}]: ${response.data.message}`,
            },
          };
        }
      });
    } catch (error) {
      const errorMessage = error.response;
      return {
        data: response.data,
        message: {
          type: "ERROR",
          text: `Error cargando archivo log: ${errorMessage}`,
        },
      };
    }
  }
}

export default new ChainsService();
