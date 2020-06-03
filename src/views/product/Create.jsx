import React from "react";

// reactstrap components
import {
	Button,
	Card,
	CardHeader,
	CardBody,
	FormGroup,
	Form,
	InputGroup,
	Input,
	Container,
	Row,
	Col,
} from "reactstrap";
// core components
import Header from "components/Headers/Header.jsx";
import Progress from "components/Progress";
import FileUploader from "react-firebase-file-uploader";
import classnames from "classnames";
import firebase from "firebase";
import fire from "../../config";
import CurrencyFormat from "react-currency-format";
import swal from "sweetalert";

const db = fire.firestore();

class CreateProduct extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			nama: "",
			harga: "",
			category: "",
			selectedCategory: "",
			description: "",
			photo: "",
			photoUrl: "",
			progress: 0,
			value: "",
			status: true,
		};
	}

	componentDidMount = () => {
		db.collection("category")
			.orderBy("nama")
			.startAfter("All")
			.get()
			.then((snapshot) => {
				let first = snapshot.docs[0].data().nama;
				let data = [];
				snapshot.forEach((doc) => {
					data.push(doc.data().nama);
					console.log(this.state.selectedCategory);
					this.setState({
						category: data,
						selectedCategory: first,
					});
				});
			});
	};

	handleUploadStart = () => {
		this.setState({
			isUploading: true,
			progress: 0,
		});
	};

	handleProgress = (progress) => this.setState({ progress });

	handleUploadSuccess = (filename) => {
		this.setState({
			photo: filename,
			progress: 100,
		});
		firebase
			.storage()
			.ref("products")
			.child(filename)
			.getDownloadURL()
			.then((url) =>
				this.setState({
					photoUrl: url,
				})
			);
	};

	handleChangeStatus = ({ meta }, status) => {
		console.log(status, meta);
	};

	onSubmit = (e) => {
		e.preventDefault();

		const {
			nama,
			harga,
			selectedCategory,
			description,
			photo,
			photoUrl,
			status,
		} = this.state;

		db.collection("products")
			.doc()
			.set({
				nama,
				index: nama.toUpperCase(),
				harga: harga,
				category: selectedCategory,
				description: description,
				photo: photo,
				photoUrl: photoUrl,
				status: status,
				createdAt: new Date().toISOString(),
			})
			.then(() => {
				this.setState({
					nama: "",
					harga: "",
					category: "",
					photo: "",
					photoUrl: "",
					status: true,
				});
				swal({
					title: "Berhasil!",
					text: `${nama} Data telah ditambahkan!`,
					icon: "success",
					button: "OK",
				});

				this.props.history.push("/app/produk");
			})
			.catch((err) => console.log(err));
	};

	render() {
		const {
			nama,
			harga,
			category,
			selectedCategory,
			description,
			isSubmitting,
		} = this.state;
		console.log("category : " + category, "selected : " + selectedCategory);
		return (
			<>
				<Header />
				{/* Page content */}
				<Container className="mt--5" fluid>
					<Row>
						<Col className="order-xl-1" xl="12">
							<Card className="bg-secondary shadow">
								<CardHeader className="bg-white border-0">
									<Row className="align-items-center">
										<Col>
											<h3 className="mb-0">Tambah Produk</h3>
										</Col>
									</Row>
								</CardHeader>

								<CardBody>
									<Form role="form" onSubmit={this.onSubmit}>
										<div className="pl-lg-4">
											<Row>
												<Col lg="6">
													<FormGroup>
														<label
															className="form-control-label"
															htmlFor="input-nama"
														>
															Nama Produk
														</label>
														<Input
															className="form-control-alternative"
															value={nama}
															onChange={(event) =>
																this.setState({
																	nama: event.target.value,
																})
															}
															type="text"
														/>
													</FormGroup>
												</Col>
											</Row>
											<Row>
												<div className="col-md-4">
													<FormGroup>
														<label
															className="form-control-label"
															htmlFor="input-harga"
														>
															Harga
														</label>
														<InputGroup
															className={classnames("input-group-merge")}
														>
															{/* <InputGroupAddon addonType="prepend">
                                                                <InputGroupText>Rp</InputGroupText>
                                                            </InputGroupAddon> */}
															<CurrencyFormat
																customInput={Input}
																value={harga}
																onValueChange={(values) => {
																	const { formattedValue } = values;

																	this.setState({ harga: formattedValue });
																}}
																thousandSeparator={true}
																prefix={"Rp. "}
															/>
															{/* <Input
                                                                value={harga}
                                                                onChange={event =>
                                                                    this.setState({
                                                                        harga: event.target.value
                                                                    })
                                                                }
                                                                type="number"

                                                            /> */}
														</InputGroup>
													</FormGroup>
												</div>
												<div className="col-md-4">
													<Row>
														<Col lg="6">
															<FormGroup>
																<label
																	className="form-control-label"
																	htmlFor="input-kategori"
																>
																	Kategori
																</label>
																<Input
																	name="category"
																	className="form-control-alternative"
																	value={selectedCategory}
																	onChange={(event) =>
																		this.setState({
																			selectedCategory: event.target.value,
																		})
																	}
																	type="select"
																>
																	{Object.keys(category).map((key, index) => {
																		let data = this.state.category[key];

																		return (
																			<option key={index} value={data}>
																				{data}
																			</option>
																		);
																	})}
																</Input>
															</FormGroup>
														</Col>
													</Row>
												</div>
											</Row>
											<Row>
												<Col lg="6">
													<FormGroup>
														<label
															className="form-control-label"
															htmlFor="input-description"
														>
															Deskripsi
														</label>
														<Input
															className="form-control-alternative"
															value={description}
															onChange={(event) =>
																this.setState({
																	description: event.target.value,
																})
															}
															type="textarea"
														/>
													</FormGroup>
												</Col>
											</Row>

											<Row>
												<Col xl="12">
													<div>
														<label className="form-control-label">
															Foto Produk
														</label>
														<br />
														<br />
														{this.state.photo && (
															<img
																alt={this.state.photo}
																src={this.state.photoUrl}
																style={{
																	padding: 15,
																	width: 150,
																	height: 155,
																	resizeMode: "center",
																}}
															/>
														)}
														<FileUploader
															accept="image/*"
															name="photo"
															storageRef={firebase.storage().ref("products")}
															onUploadStart={this.handleUploadStart}
															onUploadSuccess={this.handleUploadSuccess}
														/>
														<Progress
															percentage={
																this.state.isUploading &&
																this.state.progress + "%"
															}
															value={
																this.state.isUploading && this.state.progress
															}
														/>
													</div>
												</Col>
											</Row>
											<p></p>
											<Row>
												<Col lg="6" className="text-center">
													<FormGroup>
														<Button
															color="danger"
															onClick={() =>
																this.props.history.push("/app/produk")
															}
														>
															Batal
														</Button>
														<Button
															color="success"
															type="submit"
															disabled={isSubmitting}
														>
															Save
														</Button>
													</FormGroup>
												</Col>
											</Row>
										</div>
									</Form>
								</CardBody>
							</Card>
						</Col>
					</Row>
				</Container>
			</>
		);
	}
}

export default CreateProduct;
