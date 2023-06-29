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
              text: `Modificada tarea "${data.name}"`,
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

  params(data) {
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
}

export default new ChainsService();
