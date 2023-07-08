import React from 'react';
import { Row, Col } from 'reactstrap';
import {
    Stats2,
    ProductCalc,
    Members,
    CustomerSupport,
    Schedule,
    SalesOverview,
    Carousels,
    Earnings,
    Feeds
}
    from '../../components/dashboard';


const Awesome = () => {
    return (
        <div>
            < Stats2 />
            <Row>
                <Col sm={12}>
                    < ProductCalc />
                </Col>
            </Row>
            <Row>
                <Col lg={6}>
                    <Members />
                </Col>
                <Col lg={6}>
                    < CustomerSupport />
                </Col>
            </Row>
            <Row>
                <Col lg={4}>
                    <Schedule />
                </Col>
                <Col lg={8}>
                    < SalesOverview />
                </Col>
            </Row>
            < Carousels />
            <Row>
                <Col lg={6}>
                    <Earnings />
                </Col>
                <Col lg={6}>
                    <Feeds />
                </Col>
            </Row>
        </div>
    );
}

export default Awesome;
