import http from "./axios/http-common";

const PATH_API = "/orders";

class OrdersService {
  get(text) {
    try {
      return http.get(PATH_API).then((response) => {
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
      return http.post(`${PATH_API}/add/${data}`).then((response) => {
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

  delete(row, text) {
    try {
      return http.post(`${PATH_API}/delete/${row}`).then((response) => {
        if (response.data.code === 200) {
          return {
            ...response.data,
            alert: {
              type: "SUCCESS",
              text: `${text} "${row}" eliminada satisfactoriamente.`,
            },
          };
        } else {
          return {
            ...response.data,
            alert: {
              type: "ERROR",
              text: `Error eliminando la ${text} "${row}" [${response.data.code}]: ${response.data.message}`,
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
          text: `Error eliminando la ${text} "${row}": ${errorMessage}`,
        },
      };
    }
  }
}

export default new OrdersService();
