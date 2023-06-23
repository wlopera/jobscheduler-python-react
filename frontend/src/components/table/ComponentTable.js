import React, { useEffect, useState } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

import ModalComponent from "../modal/ModalComponent";

const TableOrders = () => {
  const [dataTable, setDataTable] = useState({});
  const [row, setRow] = useState("");
  const [show, setShow] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/orders");
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
      .post(`http://localhost:5000/api/orders/add/${input}`)
      .then((response) => {
        setDataTable((prevData) => ({ ...prevData, ...response.data }));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const processModifyRow = async (old_value, new_value) => {
    axios
      .post("http://localhost:5000/api/orders/modify", {
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
      .post(`http://localhost:5000/api/orders/delete/${row}`)
      .then((response) => {
        setDataTable((prevData) => ({ ...prevData, ...response.data }));
      })
      .catch((error) => {
        // Manejar errores en caso de que ocurra algún problema con la solicitud
        console.error(error);
      });
  };

  const selectRow = {
    mode: 'checkbox',
    clickToSelect: true,
    style: { backgroundColor: '#c8e6c9' }
  };
  
  const columns_context =
    dataTable.columns && dataTable.columns.length > 0
      ? dataTable.columns.map((column) => {
          if (column.dataField === "button_edit" && column.editable) {
            return {
              ...column,
              headerClasses: "text-center",
              formatter: (cell, row) => (
                <div className="d-flex justify-content-center">
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => modifyRow(row.name)}
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                </div>
              ),
            };
          } else if (column.dataField === "button_delete" && column.editable) {
            return {
              ...column,
              headerClasses: "text-center",
              formatter: (cell, row) => (
                <div className="d-flex justify-content-center">
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => handleDeleteRow(row.name)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              ),
            };
          } else {
            return { ...column, headerClasses: "text-center" };
          }
        })
      : [];

  return (
    <div>
      <div className="card">
        <div className="card-header">
          <div className="row">
            <div className="row">
              <div className="col-md-4">Ordenes</div>
              {dataTable.button_add && (
                <div className="col-md-8 d-flex justify-content-end">
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => addRow()}
                  >
                    <FontAwesomeIcon icon={faPlus} />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="card-body">
          {dataTable.data && dataTable.data.length > 0 && (
            <BootstrapTable
              keyField="id"
              data={dataTable.data}
              columns={columns_context}
              classes="table table-striped table-hover"
              selectRow={ selectRow }
            />
          )}
        </div>
        <div className="card-footer text-muted"></div>
      </div>
      <ModalComponent
        title={row.length === 0 ? "Agregar Orden" : "Modificar Orden"}
        placeHolder="Introducir la orden"
        show={show}
        showModal={handleSetShow}
        processModal={handleProcessRow}
        value={row}
      />
    </div>
  );
};

export default TableOrders;
