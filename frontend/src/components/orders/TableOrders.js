import React, { useEffect, useState } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const TableOrders = () => {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/orders");
        const jsonData = await response.json();

        console.log("Data: ", jsonData.data);
        console.log("Columns: ", jsonData.columns);
        console.log(123, jsonData.columns)
        setColumns(jsonData.columns);
        setData(jsonData.data);
        console.log(678, jsonData.columns)
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, []);

  // const handleEditRow = (row) => {
  //   // Lógica para editar la fila
  //   console.log("Edit row:", row);
  // };

  // const handleDeleteRow = async (row) => {
  //   // Lógica para eliminar la fila
  //   console.log("Delete row:", row);
  //   axios
  //     .post(`http://localhost:5000/api/orders/delete/${row}`)
  //     .then((response) => {
  //       // Manejar la respuesta del servidor si es necesario
  //       console.log(response.data);
  //     })
  //     .catch((error) => {
  //       // Manejar errores en caso de que ocurra algún problema con la solicitud
  //       console.error(error);
  //     });
  // };

  // const columns_context =
  //   columns && columns.length > 0
  //     ? columns.map((column) => {
  //         if (column.dataField === "button_edit" && column.editable) {
  //           return {
  //             ...column,
  //             headerClasses: "text-center",
  //             formatter: (cell, row) => (
  //               <div className="d-flex justify-content-center">
  //                 <button
  //                   className="btn btn-primary btn-sm"
  //                   onClick={() => handleEditRow(row.name)}
  //                 >
  //                   <FontAwesomeIcon icon={faEdit} />
  //                 </button>
  //               </div>
  //             ),
  //           };
  //         } else if (column.dataField === "button_delete" && column.editable) {
  //           return {
  //             ...column,
  //             headerClasses: "text-center",
  //             formatter: (cell, row) => (
  //               <div className="d-flex justify-content-center">
  //                 <button
  //                   className="btn btn-primary btn-sm"
  //                   onClick={() => handleDeleteRow(row.name)}
  //                 >
  //                   <FontAwesomeIcon icon={faTrash} />
  //                 </button>
  //               </div>
  //             ),
  //           };
  //         } else {
  //           return { ...column, headerClasses: "text-center" };
  //         }
  //       })
  //     : [];

  console.log(12345, data, columns);
  return (
    <div className="card">
      <div className="card-header">
        <div className="row">
          <div className="row">
            <div className="col-md-4">Ordenes</div>
            <div className="col-md-8 d-flex justify-content-end">
              {/* <button
                className="btn btn-primary btn-sm"
                onClick={() => handleDeleteRow(row.name)}
              >
                <FontAwesomeIcon icon={faPlus} />
              </button> */}
            </div>
          </div>
        </div>
      </div>
      <div className="card-body">
        {/* {data.length > 0 && (
          <BootstrapTable
            keyField="id"
            data={data}
            columns={columns_context}
            classes="table table-striped table-hover"
          />
        )} */}
      </div>
      <div className="card-footer text-muted"></div>
    </div>
  );
};

export default TableOrders;
