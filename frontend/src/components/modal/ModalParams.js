import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";

import "./ModalParams.css";

const ModalParams = ({ show, showModal, processModal, params, row }) => {
  const [data, setData] = useState([]);
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    setData(params);
  }, [params, show]);

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
          <Modal.Title>{`Parámetros - ${row.job_id}`}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="heightMaxModalParams">
          <div className="mb-3">
            <table id="myTable" className="table table-hover">
              <thead>
                <tr>
                  <th className="text-center">Nombre</th>
                  <th className="text-center">Valor</th>
                </tr>
              </thead>
              <tbody>
                {data &&
                  data.map((item, index) => (
                    <tr key={index}>
                      <td>
                        <input
                          type="text"
                          className="form-control"
                          id={`${item.name}-${index}`}
                          value={item.name}
                          onChange={(e) => handleValue(e.target.value)}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          className="form-control"
                          id={`${item.value}-${index}`}
                          value={item.value}
                          onChange={(e) => handleValue(e.target.value)}
                        />
                      </td>
                      <td>
                        <button
                          className="btn btn-light btn-sm"
                          onClick={() => {}}
                        >
                          <i className="bi bi-trash-fill icon_table"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={showModal}
            className="btn btn-danger"
          >
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

export default ModalParams;
