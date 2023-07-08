import React from "react";
import { Row, Col } from "reactstrap";
import {
  Projects,
  Weather,
  RecentComment,
  Tasklist,
  TotalRevenue2,
  Stats4,
  SalesMonth,
  Income,
} from "../../components/dashboard";

const Minimal = () => {
  return (
    <div>
      <Row>
        <Col lg={6}>
          <TotalRevenue2 />
        </Col>
        <Col lg={6}>
          <Stats4 />
        </Col>
      </Row>
      <Row>
        <Col lg={6} className="d-flex align-items-stretch">
          <SalesMonth />
        </Col>
        <Col lg={6}>
          <Income />
        </Col>
      </Row>
      <Row>
        <Col lg={8}>
          <Projects />
        </Col>
        <Col lg={4}>
          <Weather />
        </Col>
      </Row>
      <Row>
        <Col lg={6}>
          <RecentComment />
        </Col>
        <Col lg={6}>
          <Tasklist />
        </Col>
      </Row>
    </div>
  );
};

export default Minimal;
