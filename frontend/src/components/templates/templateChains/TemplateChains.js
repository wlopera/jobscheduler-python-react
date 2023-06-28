import React, { useState } from "react";
import Orders from "./chains/Orders";

const TemplateChains = () => {
  const [orderId, setOrderId] = useState(null);
  const [messageOrder, setMessageOrder] = useState(null);
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
            <Orders
              onOrderId={setOrderId}
              loading={loading}
              onLoading={setLoading}
            />
          </div>
          <div className="col-md-4">            
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateChains;
