import React from "react";
import Chart from "chart.js";

import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col,
  Navbar
} from "reactstrap";

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2
} from "variables/charts.jsx";

import Carding from "views/IndexSections/Card";
import Carousel from "views/IndexSections/Carousel.jsx";
import Navbars from "views/IndexSections/Navbars";
import Header from "components/Headers/Header.jsx";
import ReactPlayer from 'react-player'


class Index extends React.Component {
  state = {
    activeNav: 1,
    chartExample1Data: "data1"
  };
  toggleNavs = (e, index) => {
    e.preventDefault();
    this.setState({
      activeNav: index,
      chartExample1Data:
        this.state.chartExample1Data === "data1" ? "data2" : "data1"
    });
    let wow = () => {
      console.log(this.state);
    };
    wow.bind(this);
    setTimeout(() => wow(), 1000);
    // this.chartReference.update();
  };
  componentWillMount() {
    if (window.Chart) {
      parseOptions(Chart, chartOptions());
    }
  }
  render() {
    return (
      <>
        <Navbar>
          <Container>
            <Carousel />
          </Container>
        </Navbar>


        {/* Page content */}
        <Navbars />
        <Container className="mt--10">
          <Row className="mt-3">

            <Card>
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb--3">Promo Bulan Ini</h3>
                  </div>
                  <CardBody>
                    <Carding />
                  </CardBody>

                </Row>
              </CardHeader>
            </Card>
          </Row>

          <Row>
            <Card className="mt-5">
              <CardTitle tag="h3"
                className="ml-4 mt-3">Video</CardTitle>
              <CardBody>
                <ReactPlayer
                  url="https://youtu.be/zTitoHKsyJg"
                  controls={true}
                  width="500px"
                />
              </CardBody>
            </Card>
          </Row>
        </Container>
      </>
    );
  }
}

export default Index;
