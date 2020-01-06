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
import Datetime from "react-datetime";
import Outpatient from "services/Outpatient";
import Patient from "services/Patient";
import Book from "services/Booking";
import City from "services/City";
import { find } from "lodash";
import Select from "../IndexSections/Select";
import Select1 from "../IndexSections/AsyncSelect";
import * as moment from 'moment';
import Modal from "../IndexSections/Modals";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import SweetAlert from "react-bootstrap-sweetalert";

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
  Col,
  CardTitle,
  CardImg,
  CardLink
} from "reactstrap";

// core components
// import LoginNavbar from "components/Navbars/LoginNavbar";
//import LoginFooter from "components/Footers/LoginFooter";

var yesterday = Datetime.moment().subtract( 1, 'day' );
var valid = function( current ){
    return current.isAfter( yesterday );
};

const IMAGE_URL = process.env.REACT_APP_BASE_URL
class Body extends React.Component {
  

  constructor(props){
    super(props);

    this.state = {
      city: "",
      date: "",
      text: "",
      searchResult: [],
      cities: [],
      isLoading: true,
      isSubmitting: false,
      showModal: false,
      poly_id: "",
      user_id: "",
      hospital_id: "",
      category: "",
      doctor_id: "",
      id_number: "",
      name: "",
      gender: "male",
      book_id: "",
      address: "",
      slug: "",
      images: ""

    }

  }

  componentWillMount() {
    this.getCities()
  }

  getCities() {
    return City.get({ }).then(result => {
      console.log(result.data)
      this.setState({
        cities: result.data.map(city => {
          return {
            value: city._id,
            label: city.name
          }
        })
      })
    })
  }

  onSearchCity = (inputValue, callback) => {
    City.get({name: inputValue}).then(result => {
      console.log(result.data)
      callback(
         result.data.map(city => {
          return {
            value: city._id,
            label: city.name
          }
        })
      )
    })
  }

  onSearch = () => {

    console.log(this.state)

    const { text, date, city, cities } = this.state;
    
    this.setState({isLoaded: false});

    Outpatient.search({text, date, cities, city})

    .then((result) => {
      // const showImage = result.datas.poly.img_doctor ? result.datas.poly.img_doctor[0].path : ""
      this.setState({isLoaded: true, searchResult: (result.datas  || [] ).filter(data => {
        let polies = data.poly.filter(data => data.start_at !== "No schedule")
        return polies.length
        
      }) })
      console.log(result.datas.polies)
    })
    .catch(error => {
      throw(error.message)
      console.log(error.message)
    });
  }

  onClickDetail = () => {
		this.setState({
		
		});

		this.showModal();
	};

	showModal = () => {
		this.setState({
			showModal: true
		});
	};

	hideModal = () => {
		this.setState({
			showModal: false
		});
	};

  
  onSubmit = (hospital, poly) => {
    // e.preventDefault()
    this.setState({ isSubmitting: true, formError: "" })
    const { user_id, hospital_id, poly_id, category, doctor_id, booked_at, date } = this.state
    console.log(({
      user_id: Cookies.get("user_id"),
      poly_id: poly.id_poly,
      doctor_id: poly.id_doctor,
      hospital_id: hospital.id_hospital,
      category: "outpatient",
      booked_at: date
    }))
    Book.create({
      user_id: Cookies.get("user_id"),
      poly_id: poly.id_poly,
      doctor_id: poly.id_doctor,
      hospital_id: hospital.id_hospital,
      category: "outpatient",
      booked_at: date
    })
        .then(result => {
          console.log(result)
          if(result.code === 201) {
            // this.props.history.push("/app/booking")
            this.setState({book_id: result.data._id, slug: result.data.slug})
            toast.success()
          } else {
            this.setState({ isSubmitting: false, formError: result.message })
            toast.error(result.message)
          }
        })
        .catch(error => {
            let formError = "Error"
            if(error)
                formError = error

            this.setState({ isSubmitting: false, formError });
        })
}


onHandleLogin= () => {
  const getAlert = () => (
    <SweetAlert
      warning
      showCancel
      confirmBtnText="Login"
      cancelBtnText="Cancel"
      confirmBtnBsStyle="danger"
      cancelBtnBsStyle="default"
      title="Anda harus login terlebih dahulu?"
      onCancel={() => this.hideAlert()}
      onConfirm={() => this.handleLogin()}
    >

      <b>Kamu tidak bisa booking sebelum login!</b>
    </SweetAlert>
  );

  this.setState({
    alert: getAlert()
  });
};

handleLogin = () => {
  this.props.history.push("/login-page?ref=outpatient-page")
};

hideAlert = () => {
  this.setState({
    alert: null
  });
};

  componentDidMount() {
   
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;
  }

  
  render() {
    const { text, date, cities, city, searchResult, isLoaded, image, book_id, slug, images, alert } = this.state;
    console.log(images)
    return (
      <>
        {/* <LoginNavbar /> */}
        <main ref="main">
          <section className="section section-shaped section-lg">
            <div className="shape shape-style-1 bg-gradient">

            </div>
            <Container className="pt-lg-md">
            {alert}
              <Row className="content-center">
                <div className="col-md-5">
                  <Col>
                    <Card className="bg-secondary shadow border-3">
                      <CardHeader className="bg-white pb-3">
                        <div className="text text-center mb-0">
                          <h5>Rawat Jalan</h5>
                         
                        </div>
                      </CardHeader>
                      <CardBody className="px-lg-5 py-lg-5">
                        <div className="text-center text mb-0">

                        </div>
                        <Form role="form" >
                        <InputGroup>
                            <Input
                              style={{ width: 150, height: 50, borderRadius: '' }}
                              placeholder="Cari Rumah Sakit, Nama Dokter,dll."
                              type="text"
                              className="text-center"
                              value={text}
                              onChange={event => this.setState({
                                text: event.target.value
                              })
                            }
                            />
                          </InputGroup>
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-city"
                            >
                            </label>
                            <Select1
                              loadOptions={this.onSearchCity}
                              options={cities}
                              isClearable={true}
                              value={cities ? 
                                find(cities, { value: city }) :
                                ""
                              }
                              onChange={option => {
                                this.setState({
                                  city: option ? option.value : ""
                                })
                              }}
                            />
                          </FormGroup>
                          <FormGroup>
                            <InputGroup className="input-group-alternative">
                              <InputGroupAddon addonType="prepend">
                              </InputGroupAddon>
                              <Datetime
                                closeOnSelect={true}
                                isValidDate={ valid }
                                inputProps={{
                                  placeholder: "tanggal"
                                }}
                                value={date}
                                timeFormat={false}
                                onChange={event => this.setState({
                                  date: event.format ?event.format ('DD-MMMM-YYYY') : ""
                                })
                                }
                              />
                                <InputGroupText>
                                  <i className="ni ni-calendar-grid-58" />
                                </InputGroupText>
                            </InputGroup>
                          </FormGroup>
                          <FormGroup className="mb-5">
                          <div className="text-center mt-5">
                          <Button
                          onClick ={this.onSearch}
                            color="primary"
                            size="lg"
                            type="button"
                            style={{ borderRadius: '25px', width: '100%' }}
                          >
                            Cari
                          </Button>
                        </div>
                          </FormGroup>
                        </Form>

                        {/* <Col className="mb-2">
                              
                         </Col>
                        <Col className="mt-5">
                              
                        </Col> */}
                       
                      </CardBody>
                    </Card>
                    {/* <Row className="mt-3">  
                  </Row> */}
                  </Col>
                </div>
                <div className="col-md-7">
                  <div className="ml-5 text-center">
                    Hasil Pencarian
                </div>
                  <hr className="mt-2 mb-4" style={{ width: "auto" }} />          
                  <>
                    <div style={{ width: "auto" }}> 
                    {/* tyle={{ width: "40rem" }} */}
                      {isLoaded && !searchResult.length && <h3>"Oops... Data not found"</h3>}
                      {searchResult.map(result => {
                        return(
                          <>
                         <div style={{fontSize: 12}}> {result.name} </div>
                         {result.poly.filter(data => data.start_at !== "No schedule" && data.name_doctor !== "No schedule ").map(polies => {
                           return(
                          <Card className="mb-1" style={{borderRadius: 20, borderColor: "grey"}}>
                            <CardBody >
                            <Row className="align-items-center">
                              <Col className="col-auto">
                
                                <a
                                  href="#pablo"
                                  onClick={e => e.preventDefault()}
                                >
                                  {polies.img_doctor ? <img
                                  className="avatar-xl rounded-circle"
                                  style={{ width: "100px" }}
                                  alt="..."
                                  src={`${IMAGE_URL}${polies.img_doctor}`}
                                  
                                /> :
                                <img
                                    alt="..."
                                    style={{ width: "90px", height: "90px" }}
                                    className="avatar avatar-xl rounded-circle"
                                    src={require("assets/img/theme/doctor.jpg")}
                                  /> }
                                </a>
                              </Col>
                              <div className="col ml--2">
                                <p  style={{fontSize: 12}} className="mb-0">
                                   {polies.name_doctor}
                                </p>
                           <p  style={{fontSize: 12}} className="mb-0">{polies.name_poly}
                           <span className="mb-0 ml-3">⭐⭐</span>
                           </p>
                           <p  style={{fontSize: 12}} className="text-bold">Jadwal Praktek {moment(date).format('dddd')} {polies.start_at}-{polies.end_at}</p>
                              </div>
                              <Col className="col-auto">
                                <Button onClick={() => { if(Cookies.get("name")){
                                   this.onClickDetail()
                                   this.onSubmit(result, polies)
                                } else {
                                  this.onHandleLogin()
                                }
                                 
                                  }}
                                  color="primary" 
                                  type="button" 
                                  className="btn btn-primary btn-md" 
                                  style={{fontSize: 10, borderRadius: 8}}>
                                  Book
                                </Button>
                              </Col>
                            </Row>
                          </CardBody>
                          </Card>
                           )
                         })}
                          <Modal className="modal-dialog modal-lg"
                            backdrop={'static'}
                            tittle={"Form Data Pasien"}
                            isOpen={this.state.showModal}
                            toggle={() =>
                              this.setState({ showModal: !this.state.showModal })
                            }
                            data={book_id}
                            slug={slug}
                            onConfirm={() => this.props.history.push(`/detail-book/${slug}`)}
                            onCancel={() => this.hideModal()}
                          ></Modal>
                        </>
                        )

                      })}
                     
                    </div>
                  </>
                </div>

              </Row>
            </Container>
          </section>
        </main>

      </>
    );
  }
}

export default Body;
