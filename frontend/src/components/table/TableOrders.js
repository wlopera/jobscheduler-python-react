import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./TableOrders.css";

import ModalComponent from "../modal/ModalComponent";
import {
  URL_BASE,
  TITLE_ORDER,
  ADD_TITLE_ORDER,
  MODIFY_TITLE_ORDER,
  PLACEHOLDER_ORDER,
  API_ORDER,
} from "../utils/Constants";

const TableOrders = ({onOrderId}) => {
  const [dataTable, setDataTable] = useState({});
  const [row, setRow] = useState("");
  const [show, setShow] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(`${URL_BASE}/${API_ORDER}`);
        const jsonData = await response.json();
        setDataTable(jsonData);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  const handleSetShow = () => {
    setShow((previusShow) => !previusShow);
  };

  const addRow = () => {
    setRow("");
    setShow(true);
  };

  const modifyRow = (input) => {
    setRow(input);
    setShow(true);
  };

  const handleProcessRow = async (newRow, type) => {
    console.log("Add row:", newRow, type);
    handleSetShow();

    if (type === "ADD") {
      processAddRow(newRow);
    } else {
      processModifyRow(row, newRow);
    }
  };

  const processAddRow = async (input) => {
    axios
      .post(`${URL_BASE}/${API_ORDER}/add/${input}`)
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
        onOrderId("")
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const processModifyRow = async (old_value, new_value) => {
    axios
      .post(`${URL_BASE}/${API_ORDER}/modify`, {
        old_value,
        new_value,
      })
      .then((response) => {
        setDataTable((prevData) => ({ ...prevData, ...response.data }));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDeleteRow = async (row) => {
    // Lógica para eliminar la fila
    console.log("Delete row:", row);
    axios
      .post(`${URL_BASE}/${API_ORDER}/delete/${row}`)
      .then((response) => {
        setSelectedRow(null);
        setDataTable((prevData) => ({ ...prevData, ...response.data }));
        onOrderId("")
      })
      .catch((error) => {
        // Manejar errores en caso de que ocurra algún problema con la solicitud
        console.error(error);
      });
  };

  const handleClick = (id, name) => {
    onOrderId(name)
    setSelectedRow(id);
  };

  return (
    <div>
      <div className="card">
        <div className="card-header">
          <div className="row">
            <div className="row">
              <div className="col-md-4">{TITLE_ORDER}</div>
              {dataTable.button_add && (
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
          <table id="myTable" className="table table-hover">
            <thead>
              <tr>
                <th>ID</th>
                <th>Acciones</th>
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
                      <button
                        className="btn btn-light btn-sm"
                        onClick={() => modifyRow(item.name)}
                      >
                        <i className="bi bi-pencil-square icon_table"></i>
                      </button>{" "}
                      <button
                        className="btn btn-light btn-sm ml-2"
                        onClick={() => handleDeleteRow(item.name)}
                      >
                        <i className="bi bi-trash-fill icon_table"></i>
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div className="card-footer text-muted"></div>
      </div>
      <ModalComponent
        title={row.length === 0 ? ADD_TITLE_ORDER : MODIFY_TITLE_ORDER}
        placeHolder={PLACEHOLDER_ORDER}
        show={show}
        showModal={handleSetShow}
        processModal={handleProcessRow}
        value={row}
      />
    </div>
  );
};

export default TableOrders;
