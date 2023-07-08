import React from 'react';
import { Row, Col } from 'reactstrap';

import {
    OsChart,
    BandwidthDownload,
    Notifications,
    Visits,
    Download,
    Reviews,
    Products,
    Profile,
    SocialProfile,
    Experiences
}
    from '../../components/dashboard';

const Classy = () => {

    return (
        <div>
            <Row>
                <Col sm={12}>
                    <OsChart />
                </Col>
            </Row>
            <BandwidthDownload />
            <Row>
                <Col lg={6}>
                    <Notifications />
                </Col>
                <Col lg={6}>
                    <Visits />
                </Col>
            </Row>
            <Row>
                <Col sm={12}>
                    <Download />
                </Col>
            </Row>
            <Row>
                <Col sm={12}>
                    <Reviews />
                </Col>
            </Row>
            <Row>
                <Col sm={12}>
                    <Products />
                </Col>
            </Row>
            <Row>
                <Col lg={4} xl={3}>
                    <SocialProfile />
                </Col>
                <Col lg={8} xl={9}>
                    <Experiences />
                </Col>
            </Row>
            <Profile />
        </div>
    );
}

export default Classy;
