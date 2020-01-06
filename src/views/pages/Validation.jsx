/*!

=========================================================
* Argon Design System React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-design-system-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-design-system-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import Auth from "services/Auth"
import { toast } from "react-toastify"

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col
} from "reactstrap";

// core components
import LoginNavbar from "components/Navbars/LoginNavbar";
//import LoginFooter from "components/Footers/LoginFooter";

class Validation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      verify_code: "",
      formError: "",
      isSubmitting: false
    };
  }

  handleSubmit = event => {
    event.preventDefault();
    this.setState({ isSubmitting: true, formError: "" });
    const { verify_code } = this.state;

    Auth.validation({
      verify_code
    })
      .then(result => {
        console.log(result)
        if (result.code === 200) {
          this.props.history.push(`/detail-page/${result.data}`);
          toast.success(result.message)
        } else if (result.code === 400) {
          this.setState({ isSubmitting: false, formError: toast.error(result.message) })
        }
      })
      .catch(error => {
        let formError = "Error"
        if (error)
          formError = error
        console.log(error)
        this.setState({ isSubmitting: false, formError });
      })

  }

  render() {
    const { isSubmitting } = this.state;
    return (
      <>
        <LoginNavbar />
        <main ref="main">
          <section className="section section-shaped section-lg">
            <div className="shape shape-style-1 bg-gradient-default">
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>
            <Container className="pt-lg-md">
              <Row className="justify-content-center">
                <Col lg="5">
                  <Card className="bg-secondary shadow border-0">
                    <CardHeader className="bg-white pb-5">
                      <div className="text-muted text-center mb-3">
                        <small>Sign up with</small>
                      </div>
                      <div className="text-center">
                        <Button
                          className="btn-neutral btn-icon mr-4"
                          color="default"
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                        >
                          <span className="btn-inner--icon mr-1">
                            <img
                              alt="..."
                              src={require("assets/img/icons/common/facebook.svg")}
                            />
                          </span>
                          <span className="btn-inner--text">Facebook</span>
                        </Button>
                        <Button
                          className="btn-neutral btn-icon ml-1"
                          color="default"
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                        >
                          <span className="btn-inner--icon mr-1">
                            <img
                              alt="..."
                              src={require("assets/img/icons/common/google.svg")}
                            />
                          </span>
                          <span className="btn-inner--text">Google</span>
                        </Button>
                      </div>
                    </CardHeader>
                    <CardBody className="px-lg-5 py-lg-5">

                      <Form role="form" onSubmit={this.handleSubmit}>

                        <FormGroup>
                          <InputGroup className="input-group-alternative mb-3">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-lock-circle-open" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input placeholder="Input verification code" onChange={event =>
                              this.setState({
                                verify_code: event.target.value
                              })
                            }
                              type="text" required />
                          </InputGroup>
                        </FormGroup>


                        <div className="text-center">
                          <Button
                            className="mt-4"
                            color="primary"
                            type="submit"
                            disabled={isSubmitting}                          >
                            Submit
                          </Button>
                        </div>

                      </Form>

                    </CardBody>
                  </Card>
                  <Row className="mt-3">
                    <Col xs="6">
                      <a
                        className="text-light"
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                      >
                        <small>Forgot password?</small>
                      </a>
                    </Col>
                    <Col className="text-right" xs="6">
                      <a
                        className="text-light"
                        href="/login-page"
                      // onClick={e => e.preventDefault()}
                      >
                        <small>Sign In</small>
                      </a>
                    </Col>
                  </Row>
                </Col>
              </Row>

            </Container>
          </section>
        </main>

      </>
    );
  }
}

export default Validation;
