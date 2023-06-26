import React, { useState } from "react";
import TableOrders from "../table/TableOrders";
import TableJobs from "../table/TableJobs";

const TemplateOrders = () => {
  const [orderId, setOrderId] = useState(null);

  return (
    <div className="row">
      <div className="col-md-4">
        <TableOrders
          onOrderId={setOrderId}
          addButton={true}
          editButton={true}
          deleteButton={true}
        />
      </div>
      <div className="col-md-4">
        <TableJobs
          orderId={orderId}
          addButton={true}
          editButton={true}
          deleteButton={true}
        />
      </div>
    </div>
  );
};

export default TemplateOrders;
