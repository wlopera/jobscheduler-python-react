import React, { useEffect, useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./Orders.css";

import ModalComponent from "../modal/ModalComponent";
import service from "../../services/orders.service";

import {
  TITLE_ORDER,
  ADD_TITLE_ORDER,
  MODIFY_TITLE_ORDER,
  PLACEHOLDER_ORDER,
} from "../utils/Constants";

const Orders = ({
  onOrderId,
  addButton = false,
  editButton = false,
  deleteButton = false,
  setMessageOrder,
  loading,
  onLoading,
  textFooter,
}) => {
  const [dataTable, setDataTable] = useState(null);
  const [row, setRow] = useState("");
  const [show, setShow] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  useEffect(() => {
    const getData = async () => {
      setMessageOrder({ type: "LOADING", text: "Cargando Ordenes..." });
      onLoading(true);
      const response = await service.get();
      console.log("Consultar Ordenes:", response);
      if (response.code === 200) {
        setDataTable(response.data);
      }
      setMessageOrder(response.alert);
      onLoading(false);
    };
    getData();
  }, []);

  const processAddRow = async (input) => {
    setMessageOrder({ type: "LOADING", text: "Procesando..." });
    onLoading(true);
    const response = await service.create(input);
    console.log("Agregar Orden:", response);
    if (response.code === 200) {
      response.data.forEach((item) => {
        if (item.active) {
          setSelectedRow(item.id);
          return;
        }
      });

      setDataTable(response.data);
      onOrderId(input);
    }
    setMessageOrder(response.alert);
    onLoading(false);
  };

  const processModifyRow = async (old_value, new_value) => {
    setMessageOrder({ type: "LOADING", text: "Procesando..." });
    onLoading(true);
    const response = await service.update({
      old_value,
      new_value,
    });
    console.log("Modificar orden:", response);
    if (response.code === 200) {
      response.data.forEach((item) => {
        if (item.active) {
          setSelectedRow(item.id);
          return;
        }
      });

      setDataTable(response.data);
      onOrderId(new_value);
    }
    setMessageOrder(response.alert);
    onLoading(false);
  };

  const handleDeleteRow = async (row) => {
    setMessageOrder({ type: "LOADING", text: "Procesando..." });
    onLoading(true);
    const response = await service.delete(row);
    console.log("Eliminar orden:", response);
    if (response.code === 200) {
      setSelectedRow(null);
      setDataTable(response.data);
      onOrderId("");
    }
    setMessageOrder(response.alert);
    onLoading(false);
  };

  const handleSetShow = () => {
    setRow("");
    setShow(false);
  };

  const addRow = () => {
    setMessageOrder({ type: "" });
    setRow("");
    setShow(true);
  };

  const modifyRow = (input) => {
    setMessageOrder({ type: "" });
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
      setMessageOrder(null);
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

export default Orders;
