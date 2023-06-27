import React, { useState, useEffect } from "react";
import TableOrders from "../table/TableOrders";
import TableJobs from "../table/TableJobs";

const TemplateOrders = () => {
  const [orderId, setOrderId] = useState(null);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

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
        {loading && (
          <div className="overlay">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Cargando...</span>
            </div>
          </div>
        )}
        <div
          className={loading ? "row content content-loading" : "row content"}
          style={{ opacity: loading ? 0.5 : 1 }} // Establece la opacidad reducida durante el loading
        >
          <div className="col-md-4">
            <TableOrders
              onOrderId={setOrderId}
              addButton={!loading} // Deshabilita el botón durante el loading
              editButton={!loading} // Deshabilita el botón durante el loading
              deleteButton={!loading} // Deshabilita el botón durante el loading
              setMessage={setMessage}
              loading={loading}
              onLoading={setLoading}
            />
          </div>
          <div className="col-md-4">
            <TableJobs
              orderId={orderId}
              addButton={!loading} // Deshabilita el botón durante el loading
              editButton={!loading} // Deshabilita el botón durante el loading
              deleteButton={!loading} // Deshabilita el botón durante el loading
              setMessage={setMessage}
              loading={loading}
              onLoading={setLoading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateOrders;
