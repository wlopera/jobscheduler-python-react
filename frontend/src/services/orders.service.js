import http from "./axios/http-common";

const PATH_API = "/orders";

class OrdersService {
  get(text) {
    try {
      return http.get(PATH_API).then((response) => {
        if (response.data.code === 200) {
          return {
            ...response.data,
            alert: {
              type: "SUCCESS",
              text: `${text} cargadas satisfactoriamente.`,
            },
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

  create(data) {
    return http.post(`/orders/add/${data}`);
  }

  update(id, data) {
    return http.put("/ingredients/" + id, data);
  }

  delete(id) {
    return http.delete("/ingredients/" + id);
  }
}

export default new OrdersService();
