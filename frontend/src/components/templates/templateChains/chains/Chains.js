import React, { useEffect, useState } from "react";

import { TITLE_CHAIN } from "../../../utils/Constants";
import service from "../../../../services/chains.service";
import ModalChains from "../../../modal/ModalChains";

const Chains = ({ orderId, editButton, loading, onLoading }) => {
  const [dataTable, setDataTable] = useState(null);
  const [row, setRow] = useState("");
  const [selectedRow, setSelectedRow] = useState(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const getData = async () => {
      //setMessageJob({ type: "LOADING", text: "Cargando Tareas..." });
      onLoading(true);
      const response = await service.get(orderId);
      console.log("Consultar Tareas:", response);
      if (response.code === 200) {
        setDataTable(response.data);
      }
      // setMessageJob(response.alert);
      onLoading(false);
    };
    if (orderId === "") {
      // setMessageJob(null);
      setDataTable([]);
    } else if (orderId) {
      getData();
    }
  }, [orderId]);

  const handleClick = (id, name) => {
    if (!loading) {
      setRow("");
      setShow(true);  
      setSelectedRow(id);
    }
  };

  const modifyRow = (input) => {
    setRow(input);
    setShow(true);
  };


  const handleSetShow = () => {
    setRow("");
    setShow(false);
  };

  const handleProcessRow = async (newRow, type) => {
    handleSetShow();

    console.log("Procesar modal")
  };


  return (
    <div>
      <div className="card">
        <div className="card-header">
          <div className="row">
            <div className="row">
              <div className="col-md-4">{TITLE_CHAIN}</div>
            </div>
          </div>
        </div>
        <div className="card-body">
          <div className="widthClass">
            <table id="myTable" className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">Tarea</th>
                  <th scope="col">Paquete</th>
                  <th scope="col">Clase</th>
                  <th scope="col">Siguiente</th>
                  <th scope="col">Error</th>
                  <th style={{ width: "100px" }}>Acciones</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {dataTable &&
                  dataTable.map((item) => (
                    <tr
                      key={item.id}
                      className={selectedRow === item.id ? "table-primary" : ""}
                      //onClick={() => handleClick(item.id, item.name)}
                    >
                      <td>{item.name}</td>
                      <td>{item.package}</td>
                      <td>{item.class}</td>
                      <td>{item.next}</td>
                      <td>{item.error}</td>
                      <td>
                        {editButton && (
                          <button
                            className="btn btn-light btn-sm"
                            onClick={() => modifyRow(item.name)}
                          >
                            <i className="bi bi-pencil-square icon_table"></i>
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="card-footer"></div>
      </div>
      <ModalChains
        title="Definir cadena de trabajo"
        placeHolder=""
        show={show}
        showModal={handleSetShow}
        processModal={handleProcessRow}
        value={row}
      />
    </div>
  );
};

export default Chains;
