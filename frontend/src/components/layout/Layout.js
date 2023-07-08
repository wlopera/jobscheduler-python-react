import React from "react";

import Navigation from "./Navigation";

const Layout = (props) => {
  return (
    <div>
      <div className="container-fluid" style={{ marginTop: "80px" }}>
        <Navigation />
        <section className="container w-100 mt-2 me-auto">
          {props.children}
        </section>
      </div>
    </div>
  );
};

export default Layout;
