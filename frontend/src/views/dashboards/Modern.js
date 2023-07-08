import React from "react";
import { Row, Col } from "reactstrap";
import {
  Stats,
  Revenue,
  Sales,
  SalesSummary,
  UserProfile,
  Chat,
  RecentComment,
  Projects,
  Weather,
  Cards,
} from "../../components/dashboard";

const Modern = () => {
  return (
    <div>
      <Stats />
      <Revenue />
      <Row>
        <Col lg={4}>
          <Sales />
        </Col>
        <Col lg={4}>
          <SalesSummary />
        </Col>
        <Col lg={4}>
          <UserProfile />
        </Col>
      </Row>
      <Row>
        <Col lg={6}>
          <Chat />
        </Col>
        <Col lg={6}>
          <RecentComment />
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
      <Cards />
    </div>
  );
};

export default Modern;
