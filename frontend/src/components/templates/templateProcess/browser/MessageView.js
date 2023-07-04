import React, { useEffect, useState } from "react";

import chainsService from "../../../../services/chains.service";

const MessageView = ({ logName }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const getData = async () => {
      console.log(12345, logName);
      const response = await chainsService.read_log_file(logName);
      console.log("Archivo log:", response);
      if (response.code === 200) {
        const logLines = response.log;
        setMessages(logLines);
      }
    };
    getData();
  }, [logName]);

  return (
    <div style={{ height: "300px", overflow: "auto" }}>
      <div className="card">
        <div className="card-header">Procesamiento de la Orden </div>
        <div className="card-body">
          <pre>{messages.join("\n")}</pre>
        </div>
        <div className="card-footer text-muted">Footer</div>
      </div>
    </div>
  );
};

export default MessageView;
