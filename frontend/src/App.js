import React from "react";
import {
  Route,
  Switch,
  Redirect,
  BrowserRouter as Router,
} from "react-router-dom";

import Layout from "./components/layout/Layout";
import Home from "./components/templates/Home";
import TemplateChains from "./components/templates/templateChains/TemplateChains";
import TemplateOrders from "./components/templates/templateOrders/TemplateOrders";

function App() {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route path="/" exact>
            <Redirect to="home" />
          </Route>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/orders">
            <TemplateOrders />
          </Route>
          <Route path="/chains">
            <TemplateChains />
          </Route>
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;
