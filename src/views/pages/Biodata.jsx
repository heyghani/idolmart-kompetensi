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
import { toast } from "react-toastify";
import Cookies from "js-cookie";

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
class Biodata extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: null,
      email: null,
      phone: null,
      username: null,
      password: null,
      password_confirmation: null,
      gender: "Male",
      formError: null,
      isSubmitting: false,
      setSubmiting: false,
      passwordtype: "password",
      passwordtype2: "password",
      nametype: "fa fa-eye",
      nametype2: "fa fa-eye",
      formErrors: {
        name: "",
        username: "",
        email: "",
        password: "",
        password_confirmation: "",
        phone: "",
        gender: "Male"
      }
    };
  }



  handleSubmit = event => {
    event.preventDefault();
    this.setState({ isSubmitting: true, formError: "" });
    const { name, email, phone, username, password, password_confirmation, gender } = this.state;

    Auth.biodata({
      name,
      email,
      phone,
      username,
      password,
      password_confirmation,
      gender,
      id: this.props.match.params.id
    })
      .then(result => {
        console.log(result)
        if (result.code === 200) {
          this.props.history.push("/login-page");
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

  };

  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };

  
    switch (name) {
      case "name":
        formErrors.name = 
          value.length < 3 ? "*minimum 3 characters required" : "";
          break;
      case "username": 
        formErrors.username =
          value.length < 5 ? "*minimum 5 characters required" : "";
          break;
      case "email":
        formErrors.email = emailRegex.test(value) ? "" : "*invalid email address";
        break;
        case "phone": 
        formErrors.phone = 
          value.length < 11 ? "*minimum 11 characthers required" : "";
        break;    
      case "password": 
        formErrors.password = 
          value.length < 8 ? "*minimum 8 characthers required" : "";
        break;
      case "password_confirmation":
        formErrors.password_confirmation =
          value !== this.state.password ? "*password confirmation is not match" : "";
        break;
      default:
        break;
    }
    this.setState({ formErrors, [name]: value }, () => console.log(this.state))
  }

  render() {
    const { formErrors, isSubmitting, email, passwordtype, passwordtype2, gender, nametype, nametype2, setSubmiting } = this.state;
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
                    <CardHeader className="bg-white">
                      <div className="text-muted text-center mb-3">
                        <h1 className="display-3">Input detail user</h1>
                      </div>
                    </CardHeader>
                    <CardBody className="px-lg-5 py-lg-5">

                      <Form role="form" onSubmit={this.handleSubmit}>  
                        <FormGroup>
                          <InputGroup className="input-group-alternative mb-0">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-single-02" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input 
                              name="name"
                              NoValidate
                              className={formErrors.name.length > 0 ? "error" : null }
                              placeholder="Name"
                              // onChange={event =>
                              //   this.setState({
                              //     name: event.target.value
                              //   })
                              // }
                              onChange={this.handleChange}
                              type="text"
                            // required
                              
                              />
                          </InputGroup>
                          {formErrors.name.length > 0 && setSubmiting && (
                             <i> <span style={{color: 'red', fontSize: 11}}className="errorMessage">{formErrors.name}</span></i>
                            )}  
                        </FormGroup> 
                        <FormGroup>
                        {!!Cookies.get("email") &&  
                          <FormGroup>
                            <InputGroup className="input-group-alternative mb-0">
                              <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                  <i className="ni ni-email-83" />
                                </InputGroupText>
                              </InputGroupAddon>
                              <Input 
                                placeholder="Email"
                                // value={email}
                                // onChange={event =>
                                //   this.setState({
                                //     email: event.target.value
                                //   })
                                // }
                                className={formErrors.name.length > 0 ? "error" : null }
                                name="email"
                                NoValidate
                                onChange={this.handleChange}
                                // type="email" 
                                />
                                	
                            </InputGroup>
                            {formErrors.email.length > 0 && setSubmiting && (
                             <i> <span style={{color: 'red', fontSize: 11}}className="errorMessage">{formErrors.email}</span></i>
                            )}  
                           </FormGroup> }
                           {!Cookies.get("phone") &&   
                          <FormGroup>
                            <InputGroup className="input-group-alternative mb-0">
                              <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                  <i className="fa fa-phone" />
                                </InputGroupText>
                              </InputGroupAddon>
                              <Input 
                                name="phone"
                                NoValidate
                                placeholder="ex. 08xxxxxxxx"
                                // onChange={event =>
                                //   this.setState({
                                //     phone: event.target.value
                                //   })
                                // }
                                onChange={this.handleChange}
                                type="text" 
                                // required 
                                />
                            </InputGroup>
                            {formErrors.phone.length > 0 &&  setSubmiting && (
                              <i><span style={{color: 'red', fontSize: 11}}className="errorMessage">{formErrors.phone}</span></i>
                            )}  
                          </FormGroup> }
                          <FormGroup>
                            <InputGroup className="input-group-alternative mb-0">
                              <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                  <i className="fa fa-address-card" />
                                </InputGroupText>
                              </InputGroupAddon>
                              <Input 
                                NoValidate
                                placeholder="Username"
                                name="username"
                                // onChange={event =>
                                //   this.setState({
                                //     username: event.target.value
                                //   })
                                // }
                                onChange={this.handleChange}
                                type="text" 
                                // required 
                                />
                            </InputGroup>
                            {formErrors.username.length > 0 && setSubmiting && (
                              <i><span style={{color: 'red', fontSize: 11}}className="errorMessage">{formErrors.username}</span></i>
                            )}  
                          </FormGroup>
                          <FormGroup>
                            <InputGroup className="input-group-alternative mb-0">
                              <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                  <i className="fa fa-lock" />
                                </InputGroupText>
                              </InputGroupAddon>
                              <Input 
                                NoValidate
                                name="password"
                                placeholder="Password"
                                // onChange={event =>
                                //   this.setState({
                                //     password: event.target.value
                                //   })
                                // }
                                onChange={this.handleChange}
                                type={passwordtype} 
                                // required 
                                />
                              <InputGroupAddon addonType="append">
                                <InputGroupText style={{ cursor: "pointer" }} onClick={() => {
                                  this.setState({
                                    passwordtype: passwordtype == "password" ? "text" : "password"
                                  })
                                }}>
                                  <i className={nametype}
                                    onClick={() => {
                                      this.setState({
                                        nametype: nametype == "fa fa-eye" ? "fa fa-eye-slash" : "fa fa-eye"
                                      })
                                    }}
                                  /> 
                                </InputGroupText>
                              </InputGroupAddon>
                            </InputGroup>
                            {formErrors.password.length > 0 && setSubmiting && (
                             <i> <span style={{color: 'red', fontSize: 11}}className="errorMessage">{formErrors.password}</span></i>
                            )}  
                          </FormGroup>
                          <FormGroup>
                            <InputGroup className="input-group-alternative mb-0">
                              <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                  <i className="fa fa-unlock-alt" />
                                </InputGroupText>
                              </InputGroupAddon>
                              <Input 
                                NoValidate
                                name="password_confirmation"
                                placeholder="Password Confirmation"
                                // onChange={event =>
                                //   this.setState({
                                //     passwordConfirmation: event.target.value
                                //   })
                                // }
                                onChange={this.handleChange}
                                type={passwordtype2} 
                                // required 
                                />
                              <InputGroupAddon addonType="append">
                                <InputGroupText style={{ cursor: "pointer" }} onClick={() => {
                                  this.setState({
                                    passwordtype2: passwordtype2 == "password" ? "text" : "password"
                                  })
                                }}>
                                  <i className={nametype2}
                                    onClick={() => {
                                      this.setState({
                                        nametype2: nametype2 == "fa fa-eye" ? "fa fa-eye-slash" : "fa fa-eye"
                                      })
                                    }}
                                  />
                                </InputGroupText>
                              </InputGroupAddon>
                            </InputGroup>
                            {formErrors.password_confirmation.length > 0 && setSubmiting && (
                             <i> <span style={{color: 'red', fontSize: 11}}className="errorMessage">{formErrors.password_confirmation}</span></i>
                            )}  
                          </FormGroup>
                          <InputGroup className="input-group-alternative mb-3">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="fa fa-intersex" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input name="gender"
                              className="form-control-alternative"
                              value={gender}
                              onChange={event =>
                                this.setState({
                                  gender: event.target.value
                                })
                              }
                              type="select"
                              //required
                            >
                              <option value="Male">Laki-Laki</option>
                              <option value="Female">Perempuan</option>
                            </Input>
                          </InputGroup>
                        </FormGroup> 


                        <div className="text-center">
                          <Button
                            className="mt-4"
                            color="primary"
                            type="submit"
                            onClick={() => this.setState({setSubmiting: true})}
                            disabled={isSubmitting}>
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

export default Biodata;
