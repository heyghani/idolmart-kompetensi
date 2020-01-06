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
import { toast } from "react-toastify"

// core components
import LoginNavbar from "components/Navbars/LoginNavbar";
//import LoginFooter from "components/Footers/LoginFooter";


const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const formValid = ({ formErrors, ...rest }) => {
  let valid = true;

  // validate form errors being empty
  Object.values(formErrors).forEach(val => {
    val.length > 0 && (valid = false);
  });

  // validate the form was filled out
  Object.values(rest).forEach(val => {
    val === null && (valid = false);
  });

  return valid;
  
}

class Signup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      input: null,
      formErrors: {
       input: "",
      },
      isSubmitting: false,
      setSubmitting: false,

    };
  }

  handleSubmit = event => {
    event.preventDefault();
    this.setState({ isSubmitting: true, formError: "" });
    const { input } = this.state;

    Auth.register({
      input
    })
      .then(result => {
        console.log(result)
        if (result.code === 201) {
          this.props.history.push("/validation-page");
          toast.success(result.message)
        } else if (result.code === 400) {
          this.setState({ isSubmitting: false, formError: toast.error() })
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

  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };


  
    switch (name) {
      case "input":
        formErrors.input = emailRegex.test(value) ? "" : "*invalid email address";
        break;
        case "phone": 
        formErrors.phone = 
          value.length < 11 ? "*minimum 11 characthers required" : "";
        break;    
      default:
        break;
    }
    this.setState({ formErrors, [name]: value }, () => console.log(this.state))
  }  

  render() {
    const { isSubmitting, input, setSubmitting,formErrors } = this.state;
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
                      <div className="text-center text-muted mb-4">
                        <small>Or sign up with credentials</small>
                      </div>
                      <Form role="form" onSubmit={this.handleSubmit} >

                        <FormGroup>
                          <InputGroup className="input-group-alternative mb-3">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-single-02" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input 
                            placeholder="Email or Phone Number"
                              // onChange={event =>
                              //   this.setState({
                              //     input: event.target.value
                              //   })
                              // }
                              type="text" 
                              NoValidate
                              name="input"
                              onChange={this.handleChange}
                              className={formErrors.input.length > 0 ? "error" : null }
                              />
                          </InputGroup>
                          {formErrors.input.length > 0 && setSubmitting && (
                             <i> <span style={{color: 'red', fontSize: 11}}className="errorMessage">{formErrors.input}</span></i>
                            )}  
                        </FormGroup>
                        <div className="text-center">
                          <Button
                            className="mt-4"
                            color="primary"
                            type="submit"
                            disabled={isSubmitting}
                            onClick={() => this.setState({
                              setSubmitting: true
                            })}
                          >
                            Sign Up
                          </Button>
                          <Button
                            className="mt-4"
                            color="danger"
                            onClick={() => this.props.history.push("/login-page")}
                          >
                            Cancel
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

export default Signup;
