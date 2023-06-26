import React, { useState } from "react";
import TableOrders from "../table/TableOrders";
import TableJobs from "../table/TableJobs";

const TemplateOrders = () => {
  const [orderId, setOrderId] = useState(null);

  return (
    <div className="row">
      <div className="col-md-4">
        <TableOrders onOrderId={setOrderId} />
      </div>
      <div className="col-md-4">
        <TableJobs orderId={orderId} />
      </div>
    </div>
  );
};

export default TemplateOrders;
