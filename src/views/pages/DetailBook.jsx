/*!

=========================================================
* Argon Dashboard PRO React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-pro-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import Header from "../IndexSections/Header";
import Navbar from "components/Navbars/DemoNavbar";
import CardsFooter from "components/Footers/CardsFooter.jsx";
import Booking from "services/Booking";
import * as moment from 'moment';


// reactstrap components
import {
  Button,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Card,
  CardFooter,
  CardHeader,
  CardBody,
  CardImg,
  CardTitle,
  FormGroup,
  Form,
  Input,
  ListGroupItem,
  ListGroup,
  Progress,
  Container,
  Row,
  Col
} from "reactstrap";
import Payment from "services/Payment";
// core components


const IMAGE_URL = process.env.REACT_APP_BASE_URL
class Profile extends React.Component {

  constructor(props){
    super(props);
    this.state = {

      isLoding: true,
      data: [],
      images: ""

    }
  }

  getData() {
    Payment.get({slug: this.props.match.params.slug}).then(result => {
      console.log(result)
      this.setState({
        redirect_url: result.data.data.redirect_url
      })
    })
    Booking.get({ slug: this.props.match.params.slug }).then(result => {
      const showImage = result.data.query.doctor_id.images_path.length ? result.data.query.doctor_id.images_path[0].path : ""
      console.log(result)
       this.setState({
         isLoding: false,
         hospital_id: result.data.query.hospital_id.name,
         doctor_id: result.data.query.doctor_id.name,
         price: result.data.query.hospital_id.price,
         date: result.data.query.booked_at,
         name_patient: result.data.patient.name,
         title_patient:result.data.patient.title,
         gender_patient: result.data.patient.gender,
         dob_patient: result.data.patient.dob,
         age_patient: result.data.patient.age,
         id_patient: result.data.patient.id_number,
         address_patient: result.data.patient.address,
         image: showImage ? `${IMAGE_URL}${showImage}` : "",
        //  images: result.data.query.doctor_id.images_path ? result.data.query.doctor_id.images_path : ""
       });
      //  console.log(result.data)
     });
   }

   componentDidMount() {
    //  window.snap()
     console.log(window.snap)
		this.getData();
  }
  


  render() {
    const { hospital_id, date, doctor_id, price, id_patient, dob_patient, title_patient, gender_patient, age_patient, address_patient, name_patient, images, image, redirect_url } = this.state;
    return (
      <>
      {/* <Navbar/> */}
      <Header/>
        <Container className="pt-5">
          <h5>Detail Booking</h5>
          <Card className="mb-2" style={{borderRadius: 20, borderColor: "grey"}}>

            <CardBody>
              <Row className="align-items-center">
                <Col className="col-auto">

                 
                {image ? <img
                          alt="..."
                          style={{ width: "100px", height: "100px" }}
                          className="avatar avatar-lg rounded-circle"
                          src={`${image}`}
                          
                        /> :
                           <img
                                    alt="..."
                                    style={{ width: "100px" }}
                                    className="avatar avatar-lg rounded-circle"
                                    src={require("assets/img/theme/doctor.jpg")}
                                  /> }
                  
                </Col>
                <div className="col ml--2">
                  <h6 className="mb-0">
                     {doctor_id}
                  </h6>
                  <p className="text-sm text-muted mb-0"> {hospital_id}</p>
                  <p  style={{fontSize: 12}} className="text-bold">Jadwal Praktek : {moment(date).format('MMMM Do YYYY')}</p>
                </div>
              </Row>
            </CardBody>
            </Card>
            <Card style={{borderRadius: 20, borderColor: "grey"}} className="col-12 ml-0">
            <Row className="justify-content-center">
                  <Col className="order-lg-2" lg="3">
                    
                  </Col>
                </Row>
                <CardBody className="pt-0">
                  <Row>
                    <Col>
                  <div className="row" style={{fontFamily: 'Helvetica'}}>
                    <div className="col-4">Nama pasien</div>
                    <div className="col-2">{name_patient} </div>
                  </div>
                  <div className="row" style={{fontFamily: 'Helvetica'}}>
                    <div className="col-4">Tanggal lahir</div>
                    <div className="col-2">{dob_patient} </div>
                  </div>
                  <div className="row" style={{fontFamily: 'Helvetica'}}>
                    <div className="col-4">No identitas</div>
                    <div className="col-4">{id_patient} </div>
                  </div>
                  <div className="row"style={{fontFamily: 'Helvetica'}}>
                    <div className="col-4">Alamat</div>
                    <div className="col-4">{address_patient} </div>
                  </div>
                  <hr className="mb-3 mt-3"/>
                  <div className="row">
                    <div className="col-4">Biaya</div>
                    <div className="col-8 text-right text-primary">Rp. {price} </div>
                  </div> 
                  </Col>
                  </Row> 
                </CardBody>
                <CardFooter className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                  <div className="d-flex justify-content-between">
                    <Button
                      className="mr-4"
                      color="danger"
                      size="sm"
                      onClick ={()=> {
                        this.props.history.push("/outpatient-page")
                      }}
                    >
                      cancel
                    </Button>
                    <Button
                      className="float-right"
                      color="success"
                      // href="https://app.sandbox.midtrans.com/snap/v2/vtweb/dd978d4e-560a-431f-bcf8-f5016538aa1e"
                      onClick={() => {window.location.href = redirect_url }}
                      size="sm"
                    >
                      bayar
                    </Button>
                  </div>
                </CardFooter>
            </Card>
        </Container>
         {/* <Container className="pt-sm-md">
              <Row className="content-center">
                <div className="col-md-8">
                  <Col>
                   
                   
                  </Col>
                </div>
              </Row>
            </Container> */}
          
        {/* <CardFooter/> */}
      </>
    );
  }
}

export default Profile;
