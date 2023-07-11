import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "bootstrap-icons/font/bootstrap-icons.css";

import "./Jobs.css";
import service from "../../../../services/jobs.service";
import chainsService from "../../../../services/chains.service";

import { TITLE_JOB } from "../../../utils/Constants";
import Drawing from "./Drawing";
import { updateHistoryTable } from "../../../../redux/history/Action";
import {
  addProcessOrder,
  removeProcessOrder,
} from "../../../../redux/process/Action";

const Jobs = ({
  orderId,
  setMessageJob,
  onLoading,
  textFooter,
  onUpdateHistory,
}) => {
  const [diagramData, setDiagramData] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    const getData = async () => {
      setMessageJob({ type: "LOADING", text: "Cargando Tareas..." });
      onLoading(true);
      const response = await service.get_from_json(orderId);
      // console.log("Consultar Tareas:", response);
      if (response.code === 200) {
        let diagram = response.data.map((item) => ({
          id: item.id,
          text: item.name,
        }));
        diagram.push({
          id: diagram.length + 1,
          text: "error",
        });
        setDiagramData(diagram);
        diagram.push({
          id: diagram.length + 1,
          text: "exito",
        });
        setDiagramData(diagram);
      }
      setMessageJob(response.alert);
      onLoading(false);
    };
    if (orderId === "") {
      setMessageJob(null);
    } else if (orderId) {
      getData();
    }
  }, [orderId]);

  const process = async () => {
    setMessageJob({ type: "LOADING", text: "Procesando Orden..." });
    onLoading(true);
    onUpdateHistory();

    // Agregar la tarea actual en procesamiento
    dispatch(addProcessOrder({ order: orderId }));

    setTimeout(() => {
      dispatch(updateHistoryTable(true));
    }, 2000);
    const response = await chainsService.process(orderId);
    // console.log("Procesando la orden:", response);
    if (response.code === 200) {
    }
    setMessageJob(response.alert);
    onUpdateHistory(true);
    onLoading(false);
    dispatch(updateHistoryTable(true));

    // remover la tarea actual en procesamiento
    dispatch(removeProcessOrder({ order: orderId }));
  };

  return (
    <div>
      <div className="card">
        <div className="card-header">
          <div className="row">
            <div className="row">
              <div className="col-md-4">{TITLE_JOB}</div>
            </div>
          </div>
        </div>
        <div className="card-body">
          <div className="widthClass">
            {diagramData && diagramData.length > 0 && (
              <div className="col-md-8 d-flex justify-content-end">
                <button
                  className="btn btn-light btn-sm ml-2 "
                  onClick={() => process()}
                >
                  <i className="bi bi-play-btn-fill icon_table"></i>
                </button>
              </div>
            )}
            {diagramData && (
              <Drawing
                width={(diagramData.length - 1) * 100}
                height={(diagramData.length - 1) * 80}
                diagramData={diagramData}
              />
            )}
          </div>
        </div>
        <div className="card-footer">
          <p
            className={
              textFooter && textFooter.type === "ERROR"
                ? "text-danger fs-6"
                : "text-primary fs-6"
            }
          >
            {textFooter ? textFooter.text : ""}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
