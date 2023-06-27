import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./TableOrders.css";

import ModalComponent from "../modal/ModalComponent";
import service from "../../services/orders.service";

import {
  TITLE_ORDER,
  ADD_TITLE_ORDER,
  MODIFY_TITLE_ORDER,
  PLACEHOLDER_ORDER,
} from "../utils/Constants";

const TableOrders = ({
  onOrderId,
  addButton = false,
  editButton = false,
  deleteButton = false,
  setMessage,
  loading,
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
      const response = await service.get("Ordenes");
      console.log(12345, response);
      if (response.code === 200) {
        setDataTable({ columns: response.columns, data: response.data });
      }
      setMessage(response.alert);
      onLoading(false);
    };
    getData();
  }, []);

  const processAddRow = async (input) => {
    setMessage({ type: "LOADING", text: "Procesando..." });
    onLoading(true);
    const response = await service.create((input, "Orden"));
    console.log(12345, response);
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
      onOrderId(input);
    }
    setMessage(response.alert);
    onLoading(false);
  };

  const processModifyRow = async (old_value, new_value) => {
    setMessage({ type: "LOADING", text: "Procesando..." });
    onLoading(true);
    const response = await service.update(
      {
        old_value,
        new_value,
      },
      "Orden"
    );
    console.log(12345, response);
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
      onOrderId(new_value);
    }
    setMessage(response.alert);
    onLoading(false);
  };

  const handleDeleteRow = async (row) => {
    setMessage({ type: "LOADING", text: "Procesando..." });
    onLoading(true);
    const response = await service.delete(row, "Orden");
    console.log(12345, response);
    if (response.code === 200) {
      setSelectedRow(null);
      setDataTable((prevData) => ({ ...prevData, data: response.data }));
      onOrderId("");
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
    if (type === "ADD") {
      processAddRow(newRow);
    } else {
      processModifyRow(row, newRow);
    }
    handleSetShow();
  };

  const handleClick = (id, name) => {
    if (!loading) {
      onOrderId(name);
      setSelectedRow(id);
    }
  };

  return (
    <div>
      <div className="card">
        <div className="card-header">
          <div className="row">
            <div className="row">
              <div className="col-md-4">{TITLE_ORDER}</div>
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
