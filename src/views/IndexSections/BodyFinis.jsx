import React from "react";
import { Link } from "react-router-dom";
// nodejs library that concatenates classes
import classnames from "classnames";

// reactstrap components
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardImg,
  FormGroup,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col
} from "reactstrap";

// core components
import DemoNavbar from "components/Navbars/DemoNavbar.jsx";
import CardsFooter from "components/Footers/CardsFooter.jsx";

// index page sections
import Download from "../IndexSections/Download.jsx";

class Landing extends React.Component {
  state = {};
  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;
  }
  render() {
    return (
      <>
        <DemoNavbar />
        <main ref="main">
          <div className="position-relative">
            {/* shape Hero */}
            <section className="section section-lg section-shaped pb-250">
              <div className="shape shape-style-1 shape-default">
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
              </div>
              <Container className="py-lg-md d-flex">
                <div className="col px-0">
                  <Row>
                    <Col lg="6">
                      <h5 style={{fontFamily: "sans-serif"}}className="display-3 text-white">
                       Terimakasih, transaksi anda sedang diproses{" "}
                        <span></span>
                      </h5>
                      <p className="lead text-white">
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Beatae accusamus debitis nulla et saepe eligendi laborum modi, atque minus voluptatum, ex officiis nihil repellat veniam ea quia laudantium voluptatibus? Ipsa.
                      </p>
                      <div className="btn-wrapper">
                        <Button
                          style={{borderRadius: 20}}
                          className="btn-icon mb-3 mb-sm-0"
                          color="info"
                          to="/documentation/alerts"
                          tag={Link}
                        >
                          <span className="btn-inner--icon mr-1">
                          </span>
                          <span className="btn-inner--text">History</span>
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </div>
              </Container>
              </section>
           </div>
        </main>
        <CardsFooter/>
      </>
    );
  }
}

export default Landing;
