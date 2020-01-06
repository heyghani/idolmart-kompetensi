
import React from "react";
import Carding from "../IndexSections/Card";

// reactstrap components
import { Card, CardBody, CardTitle, Container, Row, Col, Badge, Button } from "reactstrap";

class Header extends React.Component {
  render() {
    return (
      <>
        <div className=" header bg-secondary pb-8 pt-5 pt-md-8" style={{height: "auto"}}>
          <Container>
            {/* <div className="header-body"> */}
              {/* Card stats */}
              {/* <Row> */}
                {/* <Col lg="12" xl="3"> */}

                  <Card className="card-stats mb-4 mb-xl-0 mt-5 shadow-sm p-3 mb-5 bg-white rounded" style={{boxShadow: "0.5px 0.5px 0.5px 0.5px"}}>
                    <CardBody>
                      <Row className="mt-3">
                        <div className="col-lg-2 col-md-3 col-sm-4 col-6">
                          <CardTitle
                            tag="h5"
                            className="text"
                          >
                         <Button size="lg" type="button" className="rounded-circle btn-outline-secondary" style={{width: "100px", height:"100px"}}>
                         <a href="/outpatient-page">
                         <img
                            alt="HEALTCAREICON1"
                            className="rounded-circle"
                            src={require("assets/img/theme/HEALTH CARE ICON MENU-01.svg")}
                            style={{width: "70px", height:"70px"}}
                          />
                          </a>
                          </Button>
                         
                          </CardTitle>
                          <span className="h6">
                            Rawat Jalan
                          </span>
                        </div>
                        <div className="col-lg-2 col-md-3 col-sm-4 col-6">
                          <CardTitle
                            tag="h5"
                            className="text"
                          >
                         <Button size="lg"  type="button" className="rounded-circle btn-outline-secondary" style={{width: "100px", height:"100px"}}>
                         <a href="/ranip-page">
                         <img
                            alt="HEALTCAREICON1"
                            className="rounded-circle"
                            src={require("assets/img/theme/HEALTH CARE ICON MENU-02.svg")}
                            style={{width: "70px", height:"70px"}}
                          />
                          </a>
                          </Button>
                          </CardTitle>
                          <span className="h6">
                            Rawat Inap
                          </span>
                        </div>
                        <div className="col-lg-2 col-md-3 col-sm-4 col-6">
                          <CardTitle
                            tag="h5"
                            className="text"
                          >
                         <Button size="lg"  type="button" className="rounded-circle btn-outline-secondary" style={{width: "100px", height:"100px"}}>
                         <img
                            alt="HEALTCAREICON1"
                            className="rounded-circle"
                            src={require("assets/img/theme/HEALTH CARE ICON MENU-03.svg")}
                            style={{width: "70px", height:"70px"}}
                          />
                          </Button>
                          </CardTitle>
                          <span className="h6">
                            Konsultasi Dokter
                          </span>
                        </div>
                        <div className="col-lg-2 col-md-3 col-sm-4 col-6">
                          <CardTitle
                            tag="h5"
                            className="text"
                          >
                         <Button size="lg"  type="button" className="rounded-circle btn-outline-secondary" style={{width: "100px", height:"100px"}}>
                         <img
                            alt="HEALTCAREICON1"
                            className="rounded-circle"
                            src={require("assets/img/theme/HEALTH CARE ICON MENU-04.svg")}
                            style={{width: "70px", height:"70px"}}
                          />
                          </Button>
                          </CardTitle>
                          <span className="h6">
                            Konsultasi Obat
                          </span>
                        </div>
                        <div className="col-lg-2 col-md-3 col-sm-4 col-6">
                          <CardTitle
                            tag="h5"
                            className="text"
                          >
                        <Button size="lg"  type="button" className="rounded-circle btn-outline-secondary" style={{width: "100px", height:"100px"}}>
                        <img
                            alt="HEALTCAREICON1"
                            className="rounded-circle"
                            src={require("assets/img/theme/HEALTH CARE ICON MENU-05.svg")}
                            style={{width: "70px", height:"70px"}}
                          />
                          </Button>
                          </CardTitle>
                          <span className="h6">
                            Asuransi Kesehatan
                          </span>
                        </div>
                        <div className="col-lg-2 col-md-3 col-sm-4 col-6">
                          <CardTitle
                            tag="h5"
                            className="text"
                          >
                         <Button size="lg"  type="button" className="rounded-circle btn-outline-secondary" style={{width: "100px", height:"100px"}}>
                         <img
                            alt="HEALTCAREICON1"
                            className="rounded-circle"
                            src={require("assets/img/theme/HEALTH CARE ICON MENU-06.svg")}
                            style={{width: "70px", height:"70px"}}
                          />
                          </Button>
                          </CardTitle>
                          <span className="h6">
                            Konsultasi Gizi
                          </span>
                        </div>
                      </Row>

                      <Row className="mt-5">
                        <div className="col-lg-2 col-md-3 col-sm-4 col-6">
                          <CardTitle
                            tag="h5"
                            className="text"
                          >
                         <Button size="lg"  type="button" className="rounded-circle btn-outline-secondary" style={{width: "100px", height:"100px"}}>
                         <img
                            alt="HEALTCAREICON1"
                            className="rounded-circle"
                            src={require("assets/img/theme/HEALTH CARE ICON MENU-07.svg")}
                            style={{width: "70px", height:"70px"}}
                          />
                          </Button>
                          </CardTitle>
                          <span className="h6">
                            Ambulance
                          </span>
                        </div>
                        <div className="col-lg-2 col-md-3 col-sm-4 col-6">
                          <CardTitle
                            tag="h5"
                            className="text"
                          >
                        <Button size="lg"  type="button" className="rounded-circle btn-outline-secondary" style={{width: "100px", height:"100px"}}>
                        <img
                            alt="HEALTCAREICON1"
                            className="rounded-circle"
                            src={require("assets/img/theme/HEALTH CARE ICON MENU-08.svg")}
                            style={{width: "70px", height:"70px"}}
                          />
                          </Button>
                          </CardTitle>
                          <span className="h6">
                            Jual Alat Medis
                          </span>
                        </div>
                        <div className="col-lg-2 col-md-3 col-sm-4 col-6">
                          <CardTitle
                            tag="h5"
                            className="text"
                          >
                         <Button size="lg"  type="button" className="rounded-circle btn-outline-secondary" style={{width: "100px", height:"100px"}}>
                         <img
                            alt="HEALTCAREICON1"
                            className="rounded-circle"
                            src={require("assets/img/theme/HEALTH CARE ICON MENU-11.svg")}
                            style={{width: "70px", height:"70px"}}
                          />
                          </Button>
                          </CardTitle>
                          <span className="h6">
                            Konsultasi Dr.Spesialis
                          </span>
                        </div>
                        <div className="col-lg-2 col-md-3 col-sm-4 col-6">
                          <CardTitle
                            tag="h5"
                            className="text"
                          >
                           <Button size="lg"  type="button" className="rounded-circle btn-outline-secondary" style={{width: "100px", height:"100px"}}>
                           <img
                            alt="HEALTCAREICON1"
                            className="rounded-circle"
                            src={require("assets/img/theme/HEALTH CARE ICON MENU-10.svg")}
                            style={{width: "70px", height:"70px"}}
                          />
                          </Button>
                          </CardTitle>
                          <span className="h6">
                            Air Ambulance
                          </span>
                        </div>
                        <div className="col-lg-2 col-md-3 col-sm-4 col-6">
                          <CardTitle
                            tag="h5"
                            className="text"
                          >
                         <Button size="lg"  type="button" className="rounded-circle btn-outline-secondary" class=""style={{width: "100px", height:"100px"}}>
                         <img
                            alt="HEALTCAREICON1"
                            className="rounded-circle"
                            src={require("assets/img/theme/HEALTH CARE ICON MENU-09.svg")}
                            style={{width: "70px", height:"70px"}}
                          />
                          </Button>
                          </CardTitle>
                          <span className="h6">
                            Executive
                          </span>
                        </div>
                        <div className="col-lg-2 col-md-3 col-sm-4 col-6">
                          <CardTitle
                            tag="h5"
                            className="text"
                          >
                         <Button size="lg"  type="button" className="rounded-circle btn-outline-secondary" style={{width: "100px", height:"100px"}}>
                         <img
                            alt="HEALTCAREICON1"
                            className="rounded-circle"
                            src={require("assets/img/theme/HEALTH CARE ICON MENU-12.svg")}
                            style={{width: "70px", height:"70px"}}
                          />
                          </Button>
                          </CardTitle>
                          <span className="h6">
                            Semua Layanan
                          </span>
                        </div>
                     

                      </Row>
                      <p className="mt-3 mb-0 text-muted text-sm">
                        <span className="text-success mr-2">
                          {/* <i className="fas fa-arrow-up" />  */}
                        </span>{" "}
                        <span className="text-nowrap"></span>
                      </p>
                    </CardBody>
                  </Card>
                  <Carding/>
                {/* </Col> */}
              {/* </Row> */}
            {/* </div> */}
          </Container>
        </div>
      </>
    );
  }
}

export default Header;
