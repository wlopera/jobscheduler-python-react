import React, { useEffect, useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./Jobs.css";
import service from "../../../../services/jobs.service";

import ModalComponent from "../../../modal/ModalComponent";
import {
  TITLE_JOB,
  ADD_TITLE_JOB,
  MODIFY_TITLE_JOB,
  PLACEHOLDER_JOB,
} from "../../../utils/Constants";

const Jobs = ({
  orderId,
  addButton = false,
  editButton = false,
  deleteButton = false,
  setMessageJob,
  onLoading,
  textFooter,
}) => {
  const [dataTable, setDataTable] = useState(null);
  const [row, setRow] = useState("");
  const [show, setShow] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  useEffect(() => {
    const getData = async () => {
      setMessageJob({ type: "LOADING", text: "Cargando Tareas..." });
      onLoading(true);
      const response = await service.get(orderId);
      console.log("Consultar Tareas:", response);
      if (response.code === 200) {
        setDataTable(response.data);
      }
      setMessageJob(response.alert);
      onLoading(false);
    };
    if (orderId === "") {
      setMessageJob(null);
      setDataTable([]);
    } else if (orderId) {
      getData();
    }
  }, [orderId]);

  const processAddRow = async (input) => {
    setMessageJob({ type: "LOADING", text: "Procesando..." });
    onLoading(true);
    const response = await service.create({
      order_id: orderId,
      job_id: input,
    });
    console.log("Agregar tarea:", response);
    if (response.code === 200) {
      response.data.forEach((item) => {
        if (item.active) {
          setSelectedRow(item.id);
          return;
        }
      });
      setDataTable(response.data);
    }
    setMessageJob(response.alert);
    onLoading(false);
  };

  const processModifyRow = async (old_value, new_value) => {
    setMessageJob({ type: "LOADING", text: "Procesando..." });
    onLoading(true);
    const response = await service.update({
      order_id: orderId,
      old_value,
      new_value,
    });
    console.log("Modificar Tarea:", response);
    if (response.code === 200) {
      response.data.forEach((item) => {
        if (item.active) {
          setSelectedRow(item.id);
          return;
        }
      });
      setDataTable(response.data);
    }
    setMessageJob(response.alert);
    onLoading(false);
  };

  const handleDeleteRow = async (row) => {
    setMessageJob({ type: "LOADING", text: "Procesando..." });
    onLoading(true);
    const response = await service.delete({
      order_id: orderId,
      job_id: row,
    });
    console.log("Eliminar tarea:", response);
    if (response.code === 200) {
      setSelectedRow(null);
      setDataTable(response.data);
    }
    setMessageJob(response.alert);
    onLoading(false);
  };

  const handleSetShow = () => {
    setRow("");
    setShow(false);
  };

  const addRow = () => {
    setMessageJob({ type: "" });
    setRow("");
    setShow(true);
  };

  const modifyRow = (input) => {
    setMessageJob({ type: "" });
    setRow(input);
    setShow(true);
  };

  const handleProcessRow = async (newRow, type) => {
    handleSetShow();

    if (type === "ADD") {
      processAddRow(newRow);
    } else {
      processModifyRow(row, newRow);
    }
  };

  const handleClick = (id, name) => {
    setMessageJob(null);
    setSelectedRow(id);
  };

  return (
    <div>
      <div className="card">
        <div className="card-header">
          <div className="row">
            <div className="row">
              <div className="col-md-4">{TITLE_JOB}</div>
              {addButton && orderId && orderId !== "" && (
                <div className="col-md-8 d-flex justify-content-end">
                  <button
                    className="btn btn-light btn-sm ml-2 "
                    onClick={() => addRow()}
                  >
                    <i className="bi bi-plus-square-fill icon_table"></i>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="card-body">
          <div className="widthClass">
            <table id="myTable" className="table table-hover">
              <thead>
                <tr>
                  <th style={{ width: "100px" }}>ID</th>
                  <th style={{ width: "100px" }}>Acciones</th>
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
                      <td>
                        {editButton && (
                          <button
                            className="btn btn-light btn-sm"
                            onClick={() => modifyRow(item.name)}
                          >
                            <i className="bi bi-pencil-square icon_table"></i>
                          </button>
                        )}{" "}
                        {deleteButton && (
                          <button
                            className="btn btn-light btn-sm ml-2"
                            onClick={() => handleDeleteRow(item.name)}
                          >
                            <i className="bi bi-trash-fill icon_table"></i>
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
      <ModalComponent
        title={row.length === 0 ? ADD_TITLE_JOB : MODIFY_TITLE_JOB}
        placeHolder={PLACEHOLDER_JOB}
        show={show}
        showModal={handleSetShow}
        processModal={handleProcessRow}
        value={row}
      />
    </div>
  );
};

export default Jobs;
