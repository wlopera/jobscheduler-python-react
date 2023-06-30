import React, { useState } from "react";
import Orders from "./orders/Orders";
import Jobs from "./jobs/Jobs";

const TemplateProcess = () => {
  const [orderId, setOrderId] = useState(null);
  const [messageOrder, setMessageOrder] = useState(null);
  const [messageJob, setMessageJob] = useState(null);
  const [loading, setLoading] = useState(false);

  return (
      <div className="row">
        {loading && (
          <div className="d-flex justify-content-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Cargando...</span>
            </div>
          </div>
        )}
          <div className="col-md-4">
            <Orders
              onOrderId={setOrderId}
              setMessageOrder={setMessageOrder}
              loading={loading}
              onLoading={setLoading}
              textFooter={messageOrder ? messageOrder : null}
            />
          </div>
          <div className="col-md-5">
            <Jobs
              orderId={orderId}
              setMessageJob={setMessageJob}
              loading={loading}
              onLoading={setLoading}
              textFooter={messageJob ? messageJob : null}
            />
        </div>
      </div>
  );
};

export default TemplateProcess;
