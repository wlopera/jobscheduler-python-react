import React, { useEffect, useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";

import service from "../../../../services/chains.service";

import { TITLE_ORDER } from "../../../utils/Constants";

const History = ({ onLogName, textFooter }) => {
  const [dataTable, setDataTable] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);

  useEffect(() => {
    const getData = async () => {
      //   setMessageOrder({ type: "LOADING", text: "Cargando historial..." });
      //   onLoading(true);
      const response = await service.history();
      console.log("Historial:", response);
      if (response.code === 200) {
        setDataTable(response.data);
      }
      //   setMessageOrder(response.alert);
      //   onLoading(false);
    };
    getData();
  }, []);

  const showLog = async (item) => {
    onLogName(item.log)
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
              <thead>
                <tr>
                  <th>Orden ID</th>
                  <th>Estado</th>
                  <th>Fecha de inicio</th>
                  <th>Fecha de fin</th>
                  <th>Duración</th>
                  <th>Nodo</th>
                  <th>Archivo LOG</th>
                </tr>
              </thead>
              <tbody>
                {dataTable &&
                  dataTable.map((item) => (
                    <tr
                      key={item.id}
                      className={selectedRow === item.id ? "table-primary" : ""}
                      onClick={() => showLog(item)}
                    >
                      <td>{item.order_id}</td>
                      <td>{item.status}</td>
                      <td>{item.startDate}</td>
                      <td>{item.endDate}</td>
                      <td>{item.duration}</td>
                      <td>{item.node}</td>
                      <td>{item.log}</td>
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

export default History;
