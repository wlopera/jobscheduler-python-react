import React, { useEffect, useState } from "react";

import { TITLE_CHAIN } from "../../../utils/Constants";
import service from "../../../../services/chains.service";
import ModalChains from "../../../modal/ModalChains";
import ModalParams from "../../../modal/ModalParams";

import "./Chains.css";

const Chains = ({ orderId, editButton, onLoading }) => {
  const [dataTable, setDataTable] = useState(null);
  const [row, setRow] = useState("");
  const [selectedRow, setSelectedRow] = useState(null);
  const [showEdit, setShowEdit] = useState(false);
  const [showParams, setShowParams] = useState(false);
  const [params, setParams] = useState([]);

  useEffect(() => {
    const getData = async () => {
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
      onLoading(false);
    };
    if (orderId === "") {
      setDataTable([]);
    } else if (orderId) {
      getData();
    }
  }, [orderId]);

  const paramRow = async (input) => {
    onLoading(true);
    handleSetShowEdit();
    const data = { order_id: orderId, job_id: input.name };
    const response = await service.params(data);
    if (response.code === 200) {
      //setSelectedRow(input.id);
      setParams(response.params);
    }
    onLoading(false);

    setRow(data);
    setShowParams(true);
    setSelectedRow(input.id);
  };

  const modifyRow = (input) => {
    setRow(input);
    setShowEdit(true);
    setSelectedRow(input.id);
  };

  const handleSetShowParams = () => {
    setRow("");
    setShowParams(false);
  };

  const handleSetShowEdit = () => {
    setRow("");
    setShowEdit(false);
  };

  const handleProcessRow = async (data) => {
    onLoading(true);
    handleSetShowEdit();
    data = { ...data, ["order_id"]: orderId };
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
    onLoading(false);
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
                  <th style={{ width: "100px" }}>Parámetros</th>
                  <th style={{ width: "100px" }}>Acción</th>
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
                      <td className="text-center">
                        {editButton && (
                          <button
                            className="btn btn-light btn-sm"
                            onClick={() => paramRow(item)}
                          >
                            <i className="bi bi-building-fill-add icon_table"></i>
                          </button>
                        )}
                      </td>
                      <td className="text-center">
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
        <div className="card-footer"></div>
      </div>
      {showEdit && (
        <ModalChains
          show={showEdit}
          showModal={handleSetShowEdit}
          processModal={handleProcessRow}
          row={row}
          options={dataTable.options}
          positions={dataTable.positions}
        />
      )}
      {showParams && (
        <ModalParams
          show={showParams}
          showModal={handleSetShowParams}
          processModal={handleProcessRow}
          params={params}
          row={row}
          options={dataTable.options}
          positions={dataTable.positions}
        />
      )}
    </div>
  );
};

export default Chains;
