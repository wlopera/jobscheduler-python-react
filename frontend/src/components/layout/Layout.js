import React from "react";

import Navigation from "./Navigation";

const Layout = (props) => {
  return (
    <div>
      <div
        className="d-flex flex-column justify-content-center bg-image"
        style={{
          right: 0,
          top: 0,
          zIndex: -100,
        }}
      >
        <Navigation />
        <section className="container w-100 mt-2 me-auto">
          {props.children}
        </section>
      </div>
    </div>
  );
};

export default Layout;
