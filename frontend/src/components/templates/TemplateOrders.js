import React from "react";
import TableOrders from "../orders/TableOrders";

const TemplateOrders = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="row">
          <div className="col-md-4"><TableOrders /></div>
          <div className="col-md-4">Tabla de Jobs</div>
        </div>
      </div>
    </div>
  );
};

export default TemplateOrders;
