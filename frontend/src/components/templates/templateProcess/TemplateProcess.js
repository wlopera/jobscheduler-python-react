import React, { useState } from "react";
import Orders from "./orders/Orders";
import Jobs from "./jobs/Jobs";
import MessageView from "./browser/MessageView";
import History from "./history/History";

const TemplateProcess = () => {
  const [orderId, setOrderId] = useState(null);
  const [messageOrder, setMessageOrder] = useState(null);
  const [messageJob, setMessageJob] = useState(null);
  const [loading, setLoading] = useState(false);
  const [logName, setLogName] = useState(null);

  return (
    <div className="row">
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
        <div className="col-md-5" style={{ height: "350" }}>
          <Jobs
            orderId={orderId}
            setMessageJob={setMessageJob}
            loading={loading}
            onLoading={setLoading}
            textFooter={messageJob ? messageJob : null}
          />
        </div>
      </div>
      <br/>
      <div className="row">
        <History
          onLogName={setLogName}
          textFooter={messageJob ? messageJob : null}
        />
      </div>
      <br/>
      <div className="row">{logName && <MessageView logName={logName} />}</div>
    </div>
  );
};

export default TemplateProcess;
