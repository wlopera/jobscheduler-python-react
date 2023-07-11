import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import "bootstrap-icons/font/bootstrap-icons.css";

import service from "../../../../services/chains.service";

import { TITLE_ORDER } from "../../../utils/Constants";

import "./History.css";
import ModalViewLog from "../../../modal/ModalViewLog";
import { updateHistoryTable } from "../../../../redux/history/Action";
import { useDispatch } from "react-redux";

const History = (props) => {
  const { updateHistory = false, onUpdateHistory = null } = props;

  const [logName, setLogName] = useState(null);
  const [dataTable, setDataTable] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [showViewLog, setShowViewLog] = useState(false);

  const dispatch = useDispatch();

  const updateHistoryRedux = useSelector(
    (state) => state.historyReducer.updateHistory
  );

  useEffect(() => {
    const getData = async () => {
      const response = await service.history();
      console.log("Historial:", response);
      if (response.code === 200) {
        setDataTable(response.data);
        if (onUpdateHistory) {
          onUpdateHistory(false);
        }
      }
    };
    if (updateHistory || updateHistoryRedux) {
      getData();
      dispatch(updateHistoryTable(false));
    }
  }, [updateHistory, updateHistoryRedux, setDataTable]);

  const showLog = async (item) => {
    setLogName(item.log);
    setSelectedRow(item.id);
    setShowViewLog(true);
  };

  const HandleCloseModal = () => {
    setShowViewLog(false);
  };

  return (
    <div>
      <div className="card">
        <div className="card-header">
          <div className="row">
            <div className="row">
              <div className="col-md-4">{TITLE_ORDER}</div>
            </div>
          </div>
        </div>
        <div className="card-body">
          <div className="widthClass">
            <table id="myTable" className="table table-hover">
              <thead>
                <tr>
                  <th>Orden ID</th>
                  <th>Estado</th>
                  <th>Fecha de inicio</th>
                  <th>Fecha de fin</th>
                  <th>Duración</th>
                  <th>Nodo</th>
                  <th>Archivo LOG</th>
                </tr>
              </thead>
              <tbody>
                {dataTable &&
                  dataTable.map((item) => (
                    <tr
                      key={item.id}
                      className={selectedRow === item.id ? "table-primary" : ""}
                      onClick={() => showLog(item)}
                    >
                      <td>{item.order_id}</td>
                      <td>
                        <span
                          className={
                            item.node == "error"
                              ? "row_color_error"
                              : item.node == "success"
                              ? "row_color_success"
                              : "row_color_init"
                          }
                        >
                          {item.status}
                        </span>
                      </td>
                      <td>{item.startDate}</td>
                      <td>{item.endDate}</td>
                      <td>{item.duration}</td>
                      <td>{item.node}</td>
                      <td>{item.log}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="card-footer"></div>
      </div>
      {logName && (
        <ModalViewLog
          logName={logName}
          show={showViewLog}
          closeModal={HandleCloseModal}
        />
      )}
    </div>
  );
};

export default History;
