import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import "bootstrap/dist/css/bootstrap.min.css";

const MyTable = () => {
  const data = [
    { id: 1, name: "John Doe", age: 28 },
    { id: 2, name: "Jane Smith", age: 32 },
    { id: 3, name: "Bob Johnson", age: 45 },
  ];

  const columns = [
    { dataField: "id", text: "ID" },
    { dataField: "name", text: "Name" },
    { dataField: "age", text: "Age" },
  ];

  return (
    <BootstrapTable
      keyField="id"
      data={data}
      columns={columns}
      classes="table table-striped table-hover"
    />
  );
};

export default MyTable;
