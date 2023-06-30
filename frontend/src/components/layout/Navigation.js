import React from "react";
import { NavLink } from "react-router-dom";

import classes from "./Navigation.module.css";

const Navigation = () => {
  return (
    <nav
      className="navbar navbar-expand-lg navbar-light bg-custom-secondary"
      style={{ color: "white", backgroundColor: "#51e451" }}
    >
      <div className="container-fluid">
        <h1>JobScheduler</h1>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <nav className={classes.nav}>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink
                  to="/home"
                  activeClassName={classes.active}
                  className="nav-link"
                >
                  Inicio
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/orders"
                  activeClassName={classes.active}
                  className="nav-link"
                >
                  Ordenes
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/chains"
                  activeClassName={classes.active}
                  className="nav-link"
                >
                  Configuración
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
