import React, { useState } from "react";
import TableOrders from "../table/TableOrders";
import TableJobs from "../table/TableJobs";

const TemplateOrders = () => {
  const [orderId, setOrderId] = useState(null);
  const [messageOrder, setMessageOrder] = useState(null);
  const [messageJob, setMessageJob] = useState(null);
  const [loading, setLoading] = useState(false);

  return (
    <div className="row">
      <div className="row">
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
              setMessageOrder={setMessageOrder}
              loading={loading}
              onLoading={setLoading}
              textFooter={messageOrder ? messageOrder : null}
            />
          </div>
          <div className="col-md-4">
            <TableJobs
              orderId={orderId}
              addButton={!loading} // Deshabilita el botón durante el loading
              editButton={!loading} // Deshabilita el botón durante el loading
              deleteButton={!loading} // Deshabilita el botón durante el loading
              setMessageJob={setMessageJob}
              loading={loading}
              onLoading={setLoading}
              textFooter={messageJob ? messageJob : null}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateOrders;
