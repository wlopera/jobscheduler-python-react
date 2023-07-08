import React from "react";
import { Row, Col } from "reactstrap";
import {
  Stats3,
  TotalRevenue,
  SalesSummary,
  BrowserStats,
  UserProfile,
  Chat,
  RecentComment,
  Visits,
  Notifications,
} from "../../components/dashboard";

import Calendar from "../calendar/Calendar";

const Analytical = () => {
  return (
    <div>
      <Stats3 />
      <Row>
        <Col lg={8}>
          <TotalRevenue />
        </Col>
        <Col lg={4}>
          <SalesSummary />
        </Col>
      </Row>
      <Row>
        <Col lg={7}>
          <Visits />
        </Col>
        <Col lg={5}>
          <BrowserStats />
        </Col>
      </Row>
      <Row>
        <Col lg={8}>
          <Notifications />
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
        <Col lg={12}>
          <Calendar />
        </Col>
      </Row>
    </div>
  );
};

export default Analytical;
