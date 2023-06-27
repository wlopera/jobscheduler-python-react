import http from "./axios/http-common";

const PATH_API = "/orders";

class OrdersService {
  get() {
    try {
      return http.get(PATH_API).then((response) => {
        if (response.data.code === 200) {
          if (response.data.data.length > 0) {
            return {
              ...response.data,
              alert: {
                type: "SUCCESS",
                text: `Ordenes cargadas satisfactoriamente.`,
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
              text: `Error cargando órdenes [${response.data.code}]: ${response.data.message}`,
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
          text: `Error cargando órdenes: ${errorMessage}`,
        },
      };
    }
  }

  create(data) {
    try {
      return http.post(`${PATH_API}/add/${data}`).then((response) => {
        if (response.data.code === 200) {
          return {
            ...response.data,
            alert: {
              type: "SUCCESS",
              text: `Orden "${data}" creada satisfactoriamente.`,
            },
          };
        } else {
          return {
            ...response.data,
            alert: {
              type: "ERROR",
              text: `Error creando  orden "${data}: "[${response.data.code}] - ${response.data.message}`,
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
          text: `Error creando orden "${data}": ${errorMessage}`,
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
              text: `Modificar orden "${data.old_value}" => "${data.new_value}".`,
            },
          };
        } else {
          return {
            ...response.data,
            alert: {
              type: "ERROR",
              text: `Error modificando orden "${data.old_value}": [${response.data.code}] - ${response.data.message}`,
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
          text: `Error modificando orden "${data.old_value}": ${errorMessage}`,
        },
      };
    }
  }

  delete(row) {
    try {
      return http.post(`${PATH_API}/delete/${row}`).then((response) => {
        if (response.data.code === 200) {
          return {
            ...response.data,
            alert: {
              type: "SUCCESS",
              text: `Orden "${row}" eliminada satisfactoriamente.`,
            },
          };
        } else {
          return {
            ...response.data,
            alert: {
              type: "ERROR",
              text: `Error eliminando orden "${row}" [${response.data.code}]: ${response.data.message}`,
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
          text: `Error eliminando orden "${row}": ${errorMessage}`,
        },
      };
    }
  }
}

export default new OrdersService();
