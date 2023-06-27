import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./TableJobs.css";

import ModalComponent from "../modal/ModalComponent";
import {
  URL_BASE,
  TITLE_JOB,
  ADD_TITLE_JOB,
  MODIFY_TITLE_JOB,
  PLACEHOLDER_JOB,
  API_JOBS,
} from "../utils/Constants";

const TableJobs = ({
  orderId,
  addButton = false,
  editButton = false,
  deleteButton = false,
  setMessage,
}) => {
  const [dataTable, setDataTable] = useState({});
  const [row, setRow] = useState("");
  const [show, setShow] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  useEffect(() => {
    const getData = async () => {
      await axios
        .post(`${URL_BASE}/${API_JOBS}/${orderId}`)
        .then((response) => {
          setSelectedRow(null);
          setDataTable((prevData) => ({ ...prevData, ...response.data }));
        })
        .catch((error) => {
          // Manejar errores en caso de que ocurra algún problema con la solicitud
          console.error("No hay data: ", error);
        });
    };
    if (orderId === "") {
      setDataTable((prevData) => ({ ...prevData, data: [] }));
    } else if (orderId) {
      getData();
    }
  }, [orderId]);

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

  const processAddRow = async (input) => {
    setMessage({ type: "LOADING", text: "Procesando..." });
    axios
      .post(`${URL_BASE}/${API_JOBS}/add`, {
        order_id: orderId,
        job_id: input,
      })
      .then((response) => {
        const arr = Object.entries(response.data.data).map(([key, value]) => {
          return { key, value };
        });

        arr.forEach((item) => {
          if (item.value.active) {
            setSelectedRow(item.value.id);
          }
        });
        setDataTable((prevData) => ({ ...prevData, ...response.data }));
        setMessage({
          type: "SUCCESS",
          text: "Tarea agregada satisfactoriamente.",
        });
      })
      .catch((error) => {
        console.error(error);
        setMessage({
          type: "ERROR",
          text: "Error tratando de crear una tarea.",
        });
      });
  };

  const processModifyRow = async (old_value, new_value) => {
    setMessage({ type: "LOADING", text: "Procesando..." });
    axios
      .post(`${URL_BASE}/${API_JOBS}/modify`, {
        order_id: orderId,
        old_value,
        new_value,
      })
      .then((response) => {
        const arr = Object.entries(response.data.data).map(([key, value]) => {
          return { key, value };
        });

        arr.forEach((item) => {
          if (item.value.active) {
            setSelectedRow(item.value.id);
          }
        });
        setDataTable((prevData) => ({ ...prevData, ...response.data }));
        setMessage({
          type: "SUCCESS",
          text: "Tarea modificada satisfactoriamente.",
        });
      })
      .catch((error) => {
        console.error(error);
        setMessage({
          type: "ERROR",
          text: "Error tratando de modificar la tarea.",
        });
      });
  };

  const handleDeleteRow = async (row) => {
    setMessage({ type: "LOADING", text: "Procesando..." });
    axios
      .post(`${URL_BASE}/${API_JOBS}/delete`, {
        order_id: orderId,
        job_id: row,
      })
      .then((response) => {
        setSelectedRow(null);
        setDataTable((prevData) => ({ ...prevData, ...response.data }));
        setMessage({
          type: "SUCCESS",
          text: "Tarea eliminada satisfactoriamente.",
        });
      })
      .catch((error) => {
        // Manejar errores en caso de que ocurra algún problema con la solicitud
        console.error(error);
        setMessage({
          type: "ERROR",
          text: "Error tratando de eliminar la tarea.",
        });
      });
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
              {addButton && (
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
