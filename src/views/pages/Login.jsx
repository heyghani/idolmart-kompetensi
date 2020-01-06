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
import Auth from "services/Auth";
import queryString from "query-string";

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

class Login extends React.Component {
  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;
  }

    constructor(props){
      console.log(props)
      super(props);

      const parsed = queryString.parse(props.location.search);
      console.log(parsed);

      this.state = {
        email: "",
        password: "",
        formError: "",
        isSubmitting: false,
        ref: parsed ? parsed.ref : ""
      };
    }
    
    handleSubmit = event => {
      event.preventDefault();
      this.setState({ isSubmitting: true,  formError: ""});
      const { email, password, ref } = this.state;

      Auth.login({
        email,
        password
      })

      .then((result) =>  {
        this.props.history.push("/" + ref);
      })
      .catch(error => {
        let formError = "Error";
        if (error.status === 401 || error.status === 404 ) {
          formError = "Username atau Password salah";
        } else if (!error.status) {
          formError = "Sorry, its didn't work. please try again";
        }

        this.setState({ isSubmitting: false, formError }); 
      })
    } 
  render() {
    const { email, password, formError, isSubmitting } = this.state;
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
                <Col lg="5" md="7">
                  <Card className="bg-secondary shadow border-0">
                    <CardHeader className="bg-white pb-5">
                      <div className="text-muted text-center mb-3">
                        <small>Sign in with</small>
                      </div>
                      <div className="btn-wrapper text-center">
                        <Button
                          className="btn-neutral btn-icon"
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
                         <i> <p style={{fontSize: 12}}className="text-danger form-error text-center">
                              {formError}
                          </p></i>
                        <FormGroup className="mb-3">
                          <InputGroup className="input-group-alternative">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-email-83" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input 
                            placeholder="Email" 
                            type="email" 
                            value={email}
                            onChange={event =>
                                this.setState({
                                    email: event.target.value
                                })
                            }
                            
                            />
                          </InputGroup>
                        </FormGroup>
                        <FormGroup>
                          <InputGroup className="input-group-alternative">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-lock-circle-open" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              placeholder="Password"
                              type="password"
                              autoComplete="off"
                              value={password}
                              onChange={event =>
                                  this.setState({
                                      password: event.target.value
                                  })
                              }
                              
                            />
                          </InputGroup>
                        </FormGroup>
                        
                        <div className="text-center">
                          <Button
                            className="my-4"
                            color="primary"
                            type="submit"
                            disabled={isSubmitting}
                          >
                            Sign in
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
                        href="/register-page"
                        // onClick={e => e.preventDefault()}
                      >
                        <small>Sign Up</small>
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

export default Login;
