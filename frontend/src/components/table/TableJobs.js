import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./TableJobs.css";
import service from "../../services/jobs.service";

import ModalComponent from "../modal/ModalComponent";
import {
  TITLE_JOB,
  ADD_TITLE_JOB,
  MODIFY_TITLE_JOB,
  PLACEHOLDER_JOB,
} from "../utils/Constants";

const TableJobs = ({
  orderId,
  addButton = false,
  editButton = false,
  deleteButton = false,
  setMessage,
  onLoading,
}) => {
  const [dataTable, setDataTable] = useState({});
  const [row, setRow] = useState("");
  const [show, setShow] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  useEffect(() => {
    setMessage({ type: "LOADING", text: "Cargando..." });
    onLoading(true);
    const getData = async () => {
      const response = await service.get(orderId, "Tareas");
      console.log("Consultar Tareas:", response);
      if (response.code === 200) {
        setDataTable({ columns: response.columns, data: response.data });
      }
      setMessage(response.alert);
      onLoading(false);
    };
    if (orderId === "") {
      onLoading(false);
      setDataTable((prevData) => ({ ...prevData, data: [] }));
    } else if (orderId) {
      getData();
    }
  }, [orderId]);

  const processAddRow = async (input) => {
    setMessage({ type: "LOADING", text: "Procesando..." });
    onLoading(true);
    const response = await service.create(
      {
        order_id: orderId,
        job_id: input,
      },
      "Tarea"
    );
    console.log("Agregar tarea:", response);
    if (response.code === 200) {
      const arr = Object.entries(response.data).map(([key, value]) => {
        return { key, value };
      });

      arr.forEach((item) => {
        if (item.value.active) {
          setSelectedRow(item.value.id);
        }
      });
      setDataTable((prevData) => ({ ...prevData, data: response.data }));
    }
    setMessage(response.alert);
    onLoading(false);
  };

  const processModifyRow = async (old_value, new_value) => {
    setMessage({ type: "LOADING", text: "Procesando..." });
    onLoading(true);
    const response = await service.update(
      {
        order_id: orderId,
        old_value,
        new_value,
      },
      "Tarea"
    );
    console.log("Modificar Tarea:", response);
    if (response.code === 200) {
      const arr = Object.entries(response.data).map(([key, value]) => {
        return { key, value };
      });

      arr.forEach((item) => {
        if (item.value.active) {
          setSelectedRow(item.value.id);
        }
      });
      setDataTable((prevData) => ({ ...prevData, data: response.data }));
    }
    setMessage(response.alert);
    onLoading(false);
  };

  const handleDeleteRow = async (row) => {
    setMessage({ type: "LOADING", text: "Procesando..." });
    onLoading(true);
    const response = await service.delete(
      {
        order_id: orderId,
        job_id: row,
      },
      "Tarea"
    );
    console.log("Eliminar tarea:", response);
    if (response.code === 200) {
      setSelectedRow(null);
      setDataTable((prevData) => ({ ...prevData, data: response.data }));
    }
    setMessage(response.alert);
    onLoading(false);
  };

  const handleSetShow = () => {
    setRow("");
    setShow(false);
  };

  const addRow = () => {
    setMessage({ type: "" });
    setRow("");
    setShow(true);
  };

  const modifyRow = (input) => {
    setMessage({ type: "" });
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
                {dataTable.data &&
                  dataTable.data.map((item) => (
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
        <div className="card-footer text-muted"></div>
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

export default TableJobs;
