/*!

=========================================================
* Argon Dashboard React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";

// reactstrap components
import { Card, CardBody, CardTitle, Container, Row, Col, CardImg } from "reactstrap";

class Header extends React.Component {
  render() {
    return (
      <>
        <div className="header bg-gradient pb-5 pt-5 pt-md-5">
          <Container fluid>
            <div className="header-body">
              {/* Card stats */}
              <Row>
                <Col lg="6" xl="6">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardImg
                      alt="..."
                      src={require("assets/img/theme/adult-doctor-girl-healthcare.jpg")}
                      top
                      style={{ height: "260px" }}
                    />
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            Doctor
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            350,897
                          </span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-success text-white rounded-circle shadow">
                            <i class="fa fa-envelope"></i>
                          </div>
                        </Col>
                      </Row>

                    </CardBody>
                  </Card>
                </Col>
                <Col lg="6" xl="6">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardImg
                      alt="..."
                      src={require("assets/img/theme/computer-desk-laptop-stethoscope.jpg")}
                      top
                      style={{ height: "260px" }}
                    />
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            Medical Check Up
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            49,65%
                          </span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                            <i className="fa fa-phone" />
                          </div>
                        </Col>
                      </Row>

                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </div>
          </Container>
        </div>
      </>
    );
  }
}

export default Header;
