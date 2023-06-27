import http from "./axios/http-common";

const PATH_API = "/jobs";

class JobsService {
  get(data) {
    try {
      return http.post(`${PATH_API}/${data}`).then((response) => {
        if (response.data.code === 200) {
          if (response.data.data.length > 0) {
            return {
              ...response.data,
              alert: {
                type: "SUCCESS",
                text: `Tareas cargadas satisfactoriamente.`,
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
              text: `Error cargando tareas [${response.data.code}]: ${response.data.message}`,
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
          text: `Error cargando $tareas: ${errorMessage}`,
        },
      };
    }
  }

  create(data) {
    try {
      return http.post(`${PATH_API}/add`, data).then((response) => {
        if (response.data.code === 200) {
          return {
            ...response.data,
            alert: {
              type: "SUCCESS",
              text: `Tarea "${data.job_id}" creada satisfactoriamente.`,
            },
          };
        } else {
          return {
            ...response.data,
            alert: {
              type: "ERROR",
              text: `Error creando tarea "${data.job_id}": [${response.data.code}] - ${response.data.message}`,
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
          text: `Error creando tarea "${data.job_id}": ${errorMessage}`,
        },
      };
    }
  }

  update(data) {
    try {
      return http.post(`${PATH_API}/modify`, data).then((response) => {
        if (response.data.code === 200) {
          return {
            ...response.data,
            alert: {
              type: "SUCCESS",
              text: `Modificar tarea "${data.old_value}" => "${data.new_value}".`,
            },
          };
        } else {
          return {
            ...response.data,
            alert: {
              type: "ERROR",
              text: `Error modificando tarea "${data.old_value}": [${response.data.code}] - ${response.data.message}`,
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
          text: `Error modificando tarea "${data.old_value}": ${errorMessage}`,
        },
      };
    }
  }

  delete(data) {
    try {
      return http.post(`${PATH_API}/delete`, data).then((response) => {
        if (response.data.code === 200) {
          return {
            ...response.data,
            alert: {
              type: "SUCCESS",
              text: `Tarea "${data.job_id}" eliminada satisfactoriamente.`,
            },
          };
        } else {
          return {
            ...response.data,
            alert: {
              type: "ERROR",
              text: `Error eliminando tarea "${data.job_id}": [${response.data.code}] - ${response.data.message}`,
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
          text: `Error eliminando tarea "$${data.job_id}": ${errorMessage}`,
        },
      };
    }
  }
}

export default new JobsService();
