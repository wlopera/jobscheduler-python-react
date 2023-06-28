import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";

const ModalChains = ({
  title,
  show,
  showModal,
  processModal,
  data,
  options,
  positions,
}) => {
  const [inputValue, setInputValue] = useState({});
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    setInputValue(data);
  }, [data, show]);

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

  return (
    <>
      <Modal centered show={show} onHide={showModal}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div class="modal-body">
            <div class="row mb-3">
              <label htmlFor="txtPosition" class="col-sm-4 col-form-label">
                Posición:
              </label>
              <div class="col-sm-8">
                <select id="txtPosition" name="txtPosition" class="form-select">
                  {positions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div class="row mb-3">
              <label htmlFor="txtPackage" class="col-sm-4 col-form-label">
                Paquete:
              </label>
              <div class="col-sm-8">
                <input
                  type="text"
                  id="txtPackage"
                  name="txtPackage"
                  class="form-control"
                  //value="{{ data.job['package'] }}"
                />
              </div>
            </div>
            <div class="row mb-3">
              <label htmlFor="txtClass" class="col-sm-4 col-form-label">
                Clase:
              </label>
              <div class="col-sm-8">
                <input
                  type="text"
                  id="txtClass"
                  name="txtClass"
                  class="form-control"
                  // value="{{ data.job['class'] }}"
                />
              </div>
            </div>
            <div class="row mb-3">
              <label htmlFor="txtNext" class="col-sm-4 col-form-label">
                Próxima tarea:
              </label>
              <div class="col-sm-8">
                <select id="txtNext" name="txtNext" class="form-select">
                  {options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div class="row mb-3">
              <label htmlFor="txtError" class="col-sm-4 col-form-label">
                Error:
              </label>
              <div class="col-sm-8">
                <select id="txtError" name="txtError" class="form-select">
                  {options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>
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
