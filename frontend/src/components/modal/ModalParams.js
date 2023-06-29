import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import uuid from "react-uuid";

import "./ModalParams.css";

const ModalParams = ({ show, showModal, processModal, params, row }) => {
  const [data, setData] = useState([]);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    const records = params.map((param) => [
      { name: "ID-" + uuid(), value: param.name, type: "NAME" },
      { name: "ID-" + uuid(), value: param.value, type: "VALUE" },
    ]);
    setData(records);
  }, [params, show]);

  const handleChange = (input) => {
    const { name, value } = input.target;

    const records = data.map((item) => {
      if (name === item[0].name) {
        item[0].value = value;
      }
      if (name === item[1].name) {
        item[1].value = value;
      }
      return item;
    });
    setData(records);
  };

  const addRow = () => {
    setData((prevData) => [
      ...prevData,
      [
        { name: "ID-" + uuid(), value: "", type: "NAME" },
        { name: "ID-" + uuid(), value: "", type: "VALUE" },
      ],
    ]);
  };

  const removeRow = (id) => {
    setData((prevData) => {
      const records = [];
      prevData.forEach((item) => {
        if (item[0].name !== id) {
          records.push(item);
        }
      });
      return records;
    });
  };

  // const isValidateData = (input) => {
  //   if (input.package.trim().length === 0) {
  //     return false;
  //   }
  //   if (input.class.trim().length === 0) {
  //     return false;
  //   }
  //   if (input.name === input.next) {
  //     return false;
  //   }
  //   if (input.name === input.error) {
  //     return false;
  //   }
  //   if (input.next === input.error) {
  //     return false;
  //   }

  //   return true;
  // };

  const handleProcess = () => {
    const output = [];
    data.forEach((item) =>
      output.push({
        name: item[0].value,
        value: item[1].value,
      })
    );

    const payload = {
      params: output,
    };
    processModal(payload);
  };

  return (
    <>
      <Modal centered show={show} onHide={showModal}>
        <Modal.Header>
          <Modal.Title>{`Parámetros ${row.job_id}`}</Modal.Title>
          <div className="d-flex justify-content-end">
            <button
              className="btn btn-light btn-sm ml-2 "
              onClick={() => addRow()}
            >
              <i className="bi bi-plus-square-fill icon_table"></i>
            </button>
          </div>
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
                          name={item[0].name}
                          value={item[0].value}
                          onChange={(e) => handleChange(e)}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          className="form-control"
                          name={item[1].name}
                          value={item[1].value}
                          onChange={(e) => handleChange(e)}
                        />
                      </td>
                      <td>
                        <button
                          className="btn btn-light btn-sm"
                          onClick={() => {
                            removeRow(item[0].name);
                          }}
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
