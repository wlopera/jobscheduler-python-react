import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";

import service from "../../services/chains.service";

const ModalViewLog = ({ logName, show, closeModal }) => {
  const [messages, setMessages] = useState([]);
  const [maximized, setMaximized] = useState(false);

  useEffect(() => {
    refresh();
    setMaximized(false);
  }, [logName]);

  const refresh = async () => {
    const response = await service.read_log_file(logName);
    console.log("Archivo log:", response);
    if (response.code === 200) {
      const logLines = response.log;
      setMessages(logLines);
    }
  };

  const handleMaximize = () => {
    setMaximized(!maximized);
  };

  const handleDownload = () => {
    try {
      // Blob (Binary Large Object) es una clase incorporada en JavaScript que representa datos binarios, como archivos.
      // Proporciona una forma de crear y manipular datos binarios de forma eficiente.
      // Se puede utilizar para diversas operaciones, como descargar, almacenar o enviar el archivo a través de la red.
      const blob = new Blob([messages.join("\n")], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", logName + ".log");
      link.click();

      const rep= URL.revokeObjectURL(url);
      console.log(11111, rep)

      // console.log("blob:", blob);

      // blob.text().then((text) => {
      //   console.log("Data dentreo del blob: ", text);
      // });

      // const obj = { hello: "world" };
      // const blob1 = new Blob([JSON.stringify(obj, null, 2)], {
      //   type: "application/json",
      // });

      // console.log(1111, blob1);

      // blob1.text().then((text) => {
      //     console.log("Data dentreo del blob: ", text);
      //   });
    } catch (error) {
      console.error("Error al descargar el archivo:", error);
    }
  };

  return (
    <>
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <Modal
          centered
          show={show}
          onHide={closeModal}
          className="modal-lg"
          dialogClassName={maximized ? "modal-maximized" : ""}
        >
          <Modal.Header>
            <Modal.Title>{logName}</Modal.Title>
            <div className="d-flex justify-content-end">
              <button
                className="btn btn-light btn-sm ml-2 "
                onClick={handleMaximize}
              >
                {maximized ? (
                  <i className="bi bi bi-zoom-out icon_table"></i>
                ) : (
                  <i className="bi bi bi-zoom-in icon_table"></i>
                )}
              </button>
            </div>
          </Modal.Header>
          <Modal.Body
            style={{ height: "100%", maxWidth: "100%", width: "100%" }}
          >
            <div style={{ maxHeight: "450px", overflow: "auto" }}>
              <div className="card">
                <div className="card-header">
                  <div>Procesamiento de la Orden</div>
                  <div className="col-md-12 d-flex justify-content-end"></div>
                </div>
                <div className="card-body">
                  <pre>{messages.join("\n")}</pre>
                </div>
                <div className="card-footer text-muted"></div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <div
              className="d-flex justify-content-between"
              style={{ width: "100%" }}
            >
              <div
                className="d-flex justify-content-start"
                style={{ width: "80%" }}
              >
                <Button
                  variant="primary"
                  onClick={handleDownload}
                  className="btn btn-secundary btn-sm m-1"
                >
                  Descargar
                </Button>
              </div>
              <div
                className="d-flex justify-content-end"
                style={{ width: "20%" }}
              >
                <Button
                  variant="secondary"
                  onClick={closeModal}
                  className="btn btn-danger btn-sm pd-4 m-1"
                >
                  Cancelar
                </Button>
              </div>
              <div className="d-flex justify-content-end">
                <Button
                  variant="secondary"
                  className="btn btn-primary btn-sm m-1"
                  onClick={refresh}
                >
                  Actualizar
                </Button>
              </div>
            </div>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default ModalViewLog;
