import React from "react";
import {
  Switch,
  BrowserRouter as Router,
} from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "./redux/Store";

import indexRoutes from "./routes/";
import { PrivateRoute } from "./routes/PrivateRoutes";
import "./assets/scss/style.scss";

function App() {
  return (
    <Provider store={configureStore()}>
      <Router history={History}>
        <Switch>
          {indexRoutes.map((prop, key) => {
            return (
              <PrivateRoute
                path={prop.path}
                key={key}
                component={prop.component}
              />
            );
          })}
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
