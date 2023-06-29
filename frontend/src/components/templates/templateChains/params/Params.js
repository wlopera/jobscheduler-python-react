import React, { useEffect, useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";

import service from "../../../../services/orders.service";

import { TITLE_ORDER } from "../../../utils/Constants";

const Params = ({ onOrderId, loading, onLoading }) => {
  const [dataTable, seDataTable] = useState(null);
  const [row, setRow] = useState("");
  const [selectedRow, setSelectedRow] = useState(null);

  useEffect(() => {
    const getData = async () => {
      //setMessageOrder({ type: "LOADING", text: "Cargando Ordenes..." });
      onLoading(true);
      const response = await service.get();
      console.log("Consultar Ordenes:", response);
      if (response.code === 200) {
        seDataTable(response.data);
      }
      onLoading(false)
    };
    getData();
  }, []);

  const handleClick = (id, name) => {
    if (!loading) {
      setSelectedRow(id);
      onOrderId(name)
    }
  };

  return (
    <div>
      <div className="card">
        <div className="card-header">
          <div className="row">
            <div className="row">
              <div className="col-md-12">{TITLE_ORDER}</div>
            </div>
          </div>
        </div>
        <div className="card-body">
          <div className="widthClass">
            <table id="myTable" className="table table-hover">
              <thead>
                <tr>
                  <th>ID</th>
                </tr>
              </thead>
              <tbody>
                {dataTable &&
                  dataTable.map((item) => (
                    <tr
                      key={item.id}
                      className={selectedRow === item.id ? "table-primary" : ""}
                      onClick={() => handleClick(item.id, item.name)}
                    >
                      <td>{item.name}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="card-footer"></div>
      </div>
    </div>
  );
};

export default Params;
