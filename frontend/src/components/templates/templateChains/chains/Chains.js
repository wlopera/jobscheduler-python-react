import React, { useEffect, useState } from "react";

import { TITLE_CHAIN } from "../../../utils/Constants";
import service from "../../../../services/chains.service";
import ModalChains from "../../../modal/ModalChains";

const Chains = ({
  orderId,
  editButton,
  onLoading,
  setMessageChains,
  textFooter,
}) => {
  const [dataTable, setDataTable] = useState(null);
  const [row, setRow] = useState("");
  const [selectedRow, setSelectedRow] = useState(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const getData = async () => {
      setMessageChains({
        type: "LOADING",
        text: "Cargando cadenas de tareas...",
      });
      onLoading(true);
      const response = await service.get(orderId);
      console.log("Consultar Tareas:", response);
      if (response.code === 200) {
        setDataTable({
          data: response.data,
          options: response.options,
          positions: response.positions,
        });
      }
      setMessageChains(response.alert);
      onLoading(false);
    };
    if (orderId === "") {
      setMessageChains(null);
      setDataTable([]);
    } else if (orderId) {
      getData();
    }
  }, [orderId]);

  const modifyRow = (input) => {
    setRow(input);
    setShow(true);
    setSelectedRow(input.id);
  };

  const handleSetShow = () => {
    setRow("");
    setShow(false);
  };

  const handleProcessRow = async (data) => {
    data = { ...data, ["order_id"]: orderId };
    setMessageChains({ type: "LOADING", text: "Procesando..." });
    const response = await service.update(data);
    if (response.code === 200) {
      response.data.forEach((item) => {
        if (item.active) {
          setSelectedRow(item.id);
          return;
        }
      });
      setDataTable({
        data: response.data,
        options: response.options,
        positions: response.positions,
      });
    }
    setMessageChains(response.alert);
    handleSetShow();
  };

  return (
    <div>
      <div className="card">
        <div className="card-header">
          <div className="row">
            <div className="row">
              <div className="col-md-12">{TITLE_CHAIN}</div>
            </div>
          </div>
        </div>
        <div className="card-body">
          <div className="widthClass">
            <table id="myTable" className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">Posición</th>
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
                  dataTable.data &&
                  dataTable.data.map((item) => (
                    <tr
                      key={item.id}
                      className={selectedRow === item.id ? "table-primary" : ""}
                    >
                      <td className="text-center">{item.id}</td>
                      <td className="link-success">{item.name}</td>
                      <td>{item.package}</td>
                      <td>{item.class}</td>
                      <td className="link-primary">{item.next}</td>
                      <td className="link-danger">{item.error}</td>
                      <td>
                        {editButton && (
                          <button
                            className="btn btn-light btn-sm"
                            onClick={() => modifyRow(item)}
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
      {show && (
        <ModalChains
          placeHolder=""
          show={show}
          showModal={handleSetShow}
          processModal={handleProcessRow}
          row={row}
          options={dataTable.options}
          positions={dataTable.positions}
        />
      )}
    </div>
  );
};

export default Chains;
