import React, { useEffect, useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./Jobs.css";
import service from "../../../../services/jobs.service";

import { TITLE_JOB } from "../../../utils/Constants";
import Drawing from "./Drawing";

const Jobs = ({ orderId, setMessageJob, onLoading, textFooter }) => {
  const [dataTable, setDataTable] = useState(null);

  useEffect(() => {
    const getData = async () => {
      setMessageJob({ type: "LOADING", text: "Cargando Tareas..." });
      onLoading(true);
      const response = await service.get(orderId);
      console.log("Consultar Tareas:", response);
      if (response.code === 200) {
        setDataTable(response.data);
      }
      setMessageJob(response.alert);
      onLoading(false);
    };
    if (orderId === "") {
      setMessageJob(null);
      setDataTable([]);
    } else if (orderId) {
      getData();
    }
  }, [orderId]);

  console.log(12345, orderId, dataTable);
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
            <Drawing />
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
