import React, { useEffect, useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./Orders.css";

import service from "../../../../services/orders.service";

import { TITLE_ORDER } from "../../../utils/Constants";

const Orders = ({ onOrderId, setMessageOrder, onLoading, textFooter }) => {
  const [dataTable, setDataTable] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);

  useEffect(() => {
    const getData = async () => {
      setMessageOrder({ type: "LOADING", text: "Cargando Ordenes..." });
      onLoading(true);
      const response = await service.get();
      //console.log("Consultar Ordenes:", response);
      if (response.code === 200) {
        setDataTable(response.data);
      }
      setMessageOrder(response.alert);
      onLoading(false);
    };
    getData();
  }, []);

  const play = async (item) => {
    onOrderId(item.name);
    setSelectedRow(item.id);
  };

  return (
    <div>
      <div className="card">
        <div className="card-header">
          <div className="row">
            <div className="row">
              <div className="col-md-4">{TITLE_ORDER}</div>
            </div>
          </div>
        </div>
        <div className="card-body">
          <div className="widthClass">
            <table id="myTable" className="table table-hover">
              <tbody>
                {dataTable &&
                  dataTable.map((item) => (
                    <tr
                      key={item.id}
                      className={selectedRow === item.id ? "table-primary" : ""}
                      onClick={() => play(item)}
                    >
                      <td>{item.name}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="card-footer">
          <p
            className={
              textFooter && textFooter.type === "ERROR"
                ? "text-danger fs-6"
                : "text-primary fs-6"
            }
          >
            {textFooter ? textFooter.text : ""}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Orders;
