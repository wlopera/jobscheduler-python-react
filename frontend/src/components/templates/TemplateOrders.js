import React, { useState } from "react";
import TableOrders from "../table/TableOrders";
import TableJobs from "../table/TableJobs";

const TemplateOrders = () => {
  const [orderId, setOrderId] = useState(null);
  const [message, setMessage] = useState(null);

  const contextMessage =
    message && message.type === "LOADING"
      ? "alert alert-primary col-md-8"
      : message && message.type === "SUCCESS"
      ? "alert alert-success col-md-8"
      : message && message.type === "ERROR"
      ? "alert alert-danger col-md-8"
      : "";

  return (
    <div className="row">
      <div className="row">
        {message && (
          <div className={contextMessage} role="alert">
            {message.text}
          </div>
        )}
        <div className="row">
          <div className="col-md-4">
            <TableOrders
              onOrderId={setOrderId}
              addButton={true}
              editButton={true}
              deleteButton={true}
              setMessage={setMessage}
            />
          </div>
          <div className="col-md-4">
            <TableJobs
              orderId={orderId}
              addButton={true}
              editButton={true}
              deleteButton={true}
              setMessage={setMessage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateOrders;
