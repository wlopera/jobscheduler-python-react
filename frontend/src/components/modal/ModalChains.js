import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";

const ModalChains = ({
  show,
  showModal,
  processModal,
  row,
  options,
  positions,
}) => {
  const [data, setData] = useState(row);
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    setData({ ...row, ["old_id"]: row.id });
  }, [row, show]);

  const handleChange = (input) => {
    const { name, value } = input.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
    setDisabled(!isValidateData({ ...data, [name]: value }));
  };

  const isValidateData = (input) => {
    if (input.package.trim().length === 0) {
      return false;
    }
    if (input.class.trim().length === 0) {
      return false;
    }
    if (input.name === input.next) {
      return false;
    }
    if (input.name === input.error) {
      return false;
    }
    if (input.next === input.error) {
      return false;
    }

    return true;
  };

  const handleProcess = () => {
    processModal(data);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleProcess();
    } else if (e.key === "Escape") {
      showModal();
    }
  };

  return (
    <>
      <Modal centered show={show} onHide={showModal}>
        <Modal.Header closeButton>
          <Modal.Title>{`Tarea - ${data.name}`}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="modal-body">
            <div className="row mb-3">
              <label htmlFor="txtPosition" className="col-sm-4 col-form-label">
                Posición:
              </label>
              <div className="col-sm-8">
                <select
                  className="form-select"
                  value={data.id}
                  name="id"
                  onChange={handleChange}
                >
                  {positions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="row mb-3">
              <label htmlFor="txtPackage" className="col-sm-4 col-form-label">
                Paquete:
              </label>
              <div className="col-sm-8">
                <input
                  type="text"
                  className="form-control"
                  name="package"
                  value={data.package}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="row mb-3">
              <label htmlFor="txtClass" className="col-sm-4 col-form-label">
                Clase:
              </label>
              <div className="col-sm-8">
                <input
                  type="text"
                  className="form-control"
                  name="class"
                  value={data.class}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="row mb-3">
              <label htmlFor="txtNext" className="col-sm-4 col-form-label">
                Siguiente:
              </label>
              <div className="col-sm-8">
                <select
                  className="form-select"
                  value={data.next}
                  name="next"
                  onChange={handleChange}
                >
                  {options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="row mb-3">
              <label htmlFor="txtError" className="col-sm-4 col-form-label">
                Error:
              </label>
              <div className="col-sm-8">
                <select
                  className="form-select"
                  name="error"
                  value={data.error}
                  onChange={handleChange}
                >
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
          <Button variant="secondary" onClick={showModal} className="btn btn-danger">
            Cancelar
          </Button>
          <Button
            variant="primary"
            onClick={handleProcess}
            disabled={disabled}
            className={disabled ? "btn btn-secondary" : "btn btn-primary"}
          >
            Procesar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalChains;
