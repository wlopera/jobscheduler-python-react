import React, { useEffect, useState } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const TableOrders = () => {
  const [dataTable, setDataTable] = useState({});

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

  const handleEditRow = (row) => {
    // Lógica para editar la fila
    console.log("Edit row:", row);
  };

  const handleDeleteRow = async (row) => {
    // Lógica para eliminar la fila
    console.log("Delete row:", row);
    axios
      .post(`http://localhost:5000/api/orders/delete/${row}`)
      .then((response) => {
        setDataTable(prevData=> ({ ...prevData, ...response.data }))
      })
      .catch((error) => {
        // Manejar errores en caso de que ocurra algún problema con la solicitud
        console.error(error);
      });
  };

  console.log(1111, dataTable);

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
                    onClick={() => handleEditRow(row.name)}
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

  console.log(12345, dataTable, columns_context);
  return (
    <div className="card">
      <div className="card-header">
        <div className="row">
          <div className="row">
            <div className="col-md-4">Ordenes</div>
            <div className="col-md-8 d-flex justify-content-end">
              <button
                className="btn btn-primary btn-sm"
                onClick={() => handleDeleteRow(row.name)}
              >
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </div>
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
          />
        )}
      </div>
      <div className="card-footer text-muted"></div>
    </div>
  );
};

export default TableOrders;
