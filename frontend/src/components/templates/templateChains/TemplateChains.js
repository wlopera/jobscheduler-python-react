import React, { useState } from "react";
import Orders from "./orders/Orders";
import Chains from "./chains/Chains";

const TemplateChains = () => {
  const [orderId, setOrderId] = useState(null);
  const [messageChains, setMessageChains] = useState(null);
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
          <div className="col-md-3">
            <Orders
              onOrderId={setOrderId}
              loading={loading}
              onLoading={setLoading}
            />
          </div>
          <div className="col-md-9">
            <Chains
              orderId={orderId}
              onLoading={setLoading}
              editButton={true}
              setMessageChains={setMessageChains}
              textFooter={messageChains ? messageChains : null}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateChains;
