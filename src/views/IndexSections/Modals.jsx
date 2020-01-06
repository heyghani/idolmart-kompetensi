import React from "react";
// reactstrap components
import { Button, Row, Col, Modal, Form, FormGroup, Input, InputGroup, InputGroupAddon, InputGroupText } from "reactstrap";
import ReactDatetime from "react-datetime";
import { toast } from "react-toastify";
import Patient from "services/Patient";
import Book from "services/Booking";
import SweetAlert from "react-bootstrap-sweetalert";
import Moment from "moment";


let m = function calcAge(dob) {
	let format = Moment(dob, 'DD-MM-YYYY').format('YYYY-MM-DD')
	var birthday = +new Date(format);
	return~~ ((Date.now() - birthday) / (31557600000));
}

class ModalComponent extends React.Component {

	constructor(props){
    super(props);

    this.state = {
			isLoading: true,
      isSubmitting: false,
      showModal: false,
      id_number: "",
      name: "",
      gender: "male",
      book_id: "",
			address: "",
			id_type: "KTP",
			dob: "",
			title: "Mr",
			age: "",
			book: ""
    }

  }

	onCreatePatient = () => {
		this.setState({ isSubmitting: true, formError: "" })
		const { id_number,name, gender, book_id, email, last_education, address, age, title, id_type, dob } = this.state
	
		Patient.create({
				id_number,
				name,
				gender,
				book_id: this.props.data,
				address,
				id_type,
				dob,
				title,
				age,
				last_education,
				email
		})
				.then(result => {
					console.log(result)
					if(result.code === 201) {
						console.log(result.message)
						this.props.onConfirm()
						toast.success(result.message)
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
	

	onClickDelete = (slug) => {
		
		const getAlert = () => (
			<SweetAlert
				warning
				showCancel
				confirmBtnText="Iya"
				cancelBtnText="Tidak"
				confirmBtnBsStyle="danger"
				cancelBtnBsStyle="default"
				title="Apakah Anda yakin?"
				onCancel={() => this.hideAlert()}
				onConfirm={() => this.handleDelete(slug)}
			>

				<b>Bookingan akan dihapus lho!</b>
			</SweetAlert>
		);

		this.setState({
			alert: getAlert()
		});
	};

	handleDelete = (slug) => {
		Book.delete(slug).then(result => {
			this.setState({
				isLoading: true
			});

			if (result.code === 400) {
				this.setState({ isLoading: false });
				toast.error(result.message);
				this.hideAlert();
			} else {
				// this.getData();
				toast.success();
				console.log(result)
				this.hideAlert();
			}
		});

		this.props.onCancel()
	};

	hideAlert = () => {
		this.setState({
			alert: null
		});
	};

	render() {
		const { book_id, alert, isLoading, email, last_education, id_number, address, name, gender, age, dob, id_type, title } = this.state
		const {tittle, onConfirm, ...untitled } = this.props  /*  */
		
		return (
			<>
				<Modal className="modal-dialog modal-lg" {...untitled}>
				{alert}
					<div className="modal-header bg-white border-0" data-keyboard="false" data-backdrop="static">
						<h3 className="modal-title" id="exampleModalLabel" data-keyboard="false" data-backdrop="static">
							{this.props.tittle}
						</h3>
						{/* <button
							aria-label="Close"
							className="close"
							data-dismiss="modal"
							type="button"
							onClick={this.props.toggle}
						>
							<span aria-hidden={true}>×</span>
						</button> */}
					</div>
					<div className="modal-body bg-secondary">
          <Form role="form">
					<FormGroup>
											<Row>
												<Col>
												<InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                      
                            </InputGroupText>
                          </InputGroupAddon>
													<Input 
													  value={id_type}
														onChange={event =>
															this.setState({
																	id_type: event.target.value
															})
														}
														type="select"
													placeholder="~Pilih jenis identitas~">
														<option value="KTP">KTP</option>
                            <option value="SIM">SIM</option>
														<option value="others">Yang lain</option>
												</Input>		
                        </InputGroup>
												</Col>
												<Col>
												<InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                      
                            </InputGroupText>
                          </InputGroupAddon>
													<Input 
													  value={id_number}
														onChange={event =>
															this.setState({
																	id_number: event.target.value
															})
														}
													placeholder="-masukan nomor identitas-" />
                        </InputGroup>
												</Col>
											</Row>
										</FormGroup>
                      <FormGroup className="mb-3">
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                             
                            </InputGroupText>
                          </InputGroupAddon>
													<Input 
													  value={name}
														onChange={event =>
															this.setState({
																	name: event.target.value
															})
														}
													placeholder="-input nama pasien-" type="text" />
                        </InputGroup>
												<p style={{ fontSize: 11, marginRight: 3}}>*Isi sesuai KTP/SIM/Passpor(tanpa tanda baca dan gelar)</p>
                      </FormGroup>
											<FormGroup>
												<Row>
													<Col>
											<div className="custom-control custom-radio mb-2">
												<Input
													value={gender}
													onChange={event =>
														this.setState({
																gender: event.target.value
														})
													}
													defaultChecked
													className="custom-control-input"
													id="customRadio6"
													name="custom-radio-2"
													type="radio"
												/>
												<label className="custom-control-label" htmlFor="customRadio6">
												Laki-Laki
												</label>
											</div>
												</Col>
											<Col>	
											<div className="custom-control custom-radio mb-2">
												<Input
													value={gender}
													onChange={event =>
														this.setState({
																gender: event.target.value
														})
													}
													className="custom-control-input"
													id="customRadio7"
													name="custom-radio-2"
													type="radio"
												/>
												<label className="custom-control-label" htmlFor="customRadio7">
													Perempuan
												</label>
											</div>
											</Col>
													</Row>
											</FormGroup>
											<FormGroup>
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
														{/* <i className="ni ni-calendar-grid-58" /> */}
                            </InputGroupText>
                          </InputGroupAddon>
													{/* <Input 
													  value={dob}
														onChange={event =>
															this.setState({
																	dob: event.target.value
															})
														}
													placeholder="tanggal lahir" /> */}
													  <ReactDatetime
																closeOnSelect={true}
                                inputProps={{
                                  placeholder: "Tanggal lahir"
                                }}
                                value={dob}
                                timeFormat={false}
                                onChange={event => this.setState({
                                  dob: event.format ?event.format ('DD-MM-YYYY') : ""
                                })
                                }
                              />
                        </InputGroup>
                      </FormGroup>
											<FormGroup>
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                      
                            </InputGroupText>
                          </InputGroupAddon>
													<Input 
														value={`${m(dob)} tahun`}
														disabled
														onChange={event =>
															this.setState({
																dob: event.target.value
															})
														}
													/>
                        </InputGroup>
                      </FormGroup>
											<FormGroup>
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon style={{borderRadius: 20}} addonType="prepend">
                            <InputGroupText>
                      
                            </InputGroupText>
                          </InputGroupAddon>
													<Input
													
													value={address}
													onChange={event =>
														this.setState({
																address: event.target.value
														})
													}
													type="textarea"
													placeholder=" input detail alamat" />
                        </InputGroup>
                      </FormGroup>  	
                      {/* <FormGroup>
                        <InputGroup style={{borderRadius: 20}} className="input-group-alternative">
                          <InputGroupAddon style={{borderRadius: 20}} addonType="prepend">
                            <InputGroupText >
                      
                            </InputGroupText>
                          </InputGroupAddon>
													<Input 
													  value={gender}
														onChange={event =>
															this.setState({
																	gender: event.target.value
															})
														}
														type="select"
													placeholder="" >
														<option value="Male">Laki-Laki</option>
                            <option value="Female">Perempuan</option>
												</Input>		
                        </InputGroup>
                      </FormGroup>   */}
											<FormGroup>
                        <InputGroup style={{borderRadius: 20}} className="input-group-alternative">
                          <InputGroupAddon style={{borderRadius: 20}} addonType="prepend">
                            <InputGroupText >
                      
                            </InputGroupText>
                          </InputGroupAddon>
													<Input 
													  value={last_education}
														onChange={event =>
															this.setState({
																	last_education: event.target.value
															})
														}
														type="select"
														 >
														<option value="SD">SD</option>
                            <option value="SMP">SMP</option>
														<option value="SMA">SMA</option>
														<option value="D3">D3</option>
														<option value="S1">S1</option>
												</Input>		
                        </InputGroup>
                      </FormGroup>  
											<FormGroup className="mb-3">
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                             
                            </InputGroupText>
                          </InputGroupAddon>
													<Input 
													  value={email}
														onChange={event =>
															this.setState({
																	email: event.target.value
															})
														}
													placeholder="-input alamat email-" type="text" />
                        </InputGroup>
                      </FormGroup>
											<FormGroup className="mb-3">
                        <InputGroup className="input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                             
                            </InputGroupText>
                          </InputGroupAddon>
													<Input 
													  // value={name}
														// onChange={event =>
														// 	this.setState({
														// 			name: event.target.value
														// 	})
														// }
													placeholder="-input nomor telepon-" type="text" />
                        </InputGroup>
                      </FormGroup>	
                    </Form> 
          </div>
					<div className="modal-footer">
						<Button
							style={{borderRadius: 15}}
							color="danger"
							data-dismiss="modal"
							type="submit"
							onClick={() => this.onClickDelete(this.props.slug)}
						>
							Batal
						</Button>
						
							<Button
								style={{borderRadius: 15}}
								color="success"
								data-dismiss="modal"
								type="submit"
								onClick ={()=> {
									this.onCreatePatient()
								}}
							>
								Kirim
							</Button>
						
					</div>
				</Modal>
			</>
		);
	}
}

export default ModalComponent;
