import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";

const ModalChains = ({
  title,
  placeHolder,
  show,
  showModal,
  processModal,
  value,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    setInputValue(value);
  }, [value, show]);
  

  const handleValue = (input) => {
    setDisabled(input.trim().length > 0 ? false : true);
    setInputValue(input);
  };

  const handleProcess = () => {
    processModal(inputValue, type);
  };


  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !disabled) {
      handleProcess();
    } else if (e.key === "Escape") {
      showModal();
    }
  };

  const type = value ? "MODIFY" : "ADD";

  return (
    <>
      <Modal centered show={show} onHide={showModal}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              id="recipient-name"
              placeholder={placeHolder}
              value={inputValue || ""}
              onChange={(e) => handleValue(e.target.value)}
              autoFocus
              onKeyDown={handleKeyPress}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={showModal}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleProcess} disabled={disabled}>
            Procesar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalChains;
