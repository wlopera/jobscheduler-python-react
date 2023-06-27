import http from "./axios/http-common";

const PATH_API = "/jobs";

class JobsService {
  get(data, text) {
    try {
      return http.post(`${PATH_API}/${data}`).then((response) => {
        if (response.data.code === 200) {
          if (response.data.data.length > 0) {
            return {
              ...response.data,
              alert: {
                type: "SUCCESS",
                text: `${text} cargadas satisfactoriamente.`,
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
              text: `Error cargando ${text} [${response.data.code}]: ${response.data.message}`,
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
          text: `Error cargando las ${text}: ${errorMessage}`,
        },
      };
    }
  }

  create(data, text) {
    try {
      return http.post(`${PATH_API}/add`, data).then((response) => {
        if (response.data.code === 200) {
          return {
            ...response.data,
            alert: {
              type: "SUCCESS",
              text: `${text} ${data} creada satisfactoriamente.`,
            },
          };
        } else {
          return {
            ...response.data,
            alert: {
              type: "ERROR",
              text: `Error cargando ${text} [${response.data.code}]: ${response.data.message}`,
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
          text: `Error cargando la ${text}: ${errorMessage}`,
        },
      };
    }
  }

  update(data, text) {
    try {
      return http.post(`${PATH_API}/modify`, data).then((response) => {
        if (response.data.code === 200) {
          return {
            ...response.data,
            alert: {
              type: "SUCCESS",
              text: `${text} ${data.old_value} modificada satisfactoriamente => ${data.new_value}.`,
            },
          };
        } else {
          return {
            ...response.data,
            alert: {
              type: "ERROR",
              text: `Error modificando la ${text} [${response.data.code}]: ${response.data.message}`,
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
          text: `Error modificando la ${text}: ${errorMessage}`,
        },
      };
    }
  }

  delete(data, text) {
    try {
      return http.post(`${PATH_API}/delete`, data).then((response) => {
        if (response.data.code === 200) {
          return {
            ...response.data,
            alert: {
              type: "SUCCESS",
              text: `${text} "${data.order_id}" eliminada satisfactoriamente.`,
            },
          };
        } else {
          return {
            ...response.data,
            alert: {
              type: "ERROR",
              text: `Error eliminando la ${text} "${data.order_id}" [${response.data.code}]: ${response.data.message}`,
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
          text: `Error eliminando la ${text} "$${data.order_id}": ${errorMessage}`,
        },
      };
    }
  }
}

export default new JobsService();
