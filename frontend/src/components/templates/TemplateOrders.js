import React from "react";
import ComponentTable from '../table/ComponentTable'

const TemplateOrders = () => {
  return (
    <div className="row">
      <div className="col-md-4">
        <ComponentTable />
      </div>
      <div className="col-md-4">Tabla de Jobs</div>
    </div>
  );
};

export default TemplateOrders;
