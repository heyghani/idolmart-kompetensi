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
			key: "",
			nama: "",
			harga: "",
			category: "",
			listCategory: "",
			photo: "",
			photoUrl: "",
			progress: 0,
		};
	}

	componentDidMount() {
		const ref = firebase
			.firestore()
			.collection("products")
			.doc(this.props.match.params.id);
		ref.get().then((doc) => {
			if (doc.exists) {
				const data = doc.data();
				this.getCategory();
				this.setState({
					key: doc.id,
					nama: data.nama,
					harga: data.harga,
					category: data.category,
					photo: data.photo,
					photoUrl: data.photoUrl,
				});
			} else {
				console.log("No such document!");
			}
		});
	}

	getCategory = () => {
		db.collection("category")
			.doc("product_category")
			.onSnapshot((doc) => {
				this.setState({
					listCategory: doc.data().category,
				});
			});
	};

	onChange = (e) => {
		const state = this.state;
		state[e.target.name] = e.target.value;
		this.setState({ data: state });
	};

	handleUploadStart = () => {
		this.setState({
			isUploading: true,
			progress: 0,
		});
	};

	handleProgress = (progress) => this.setState({ progress });

	handleUploadSuccess = (filename) => {
		console.log(this.state);
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
		const { nama, harga, category, photo, photoUrl } = this.state;

		const updateRef = firebase
			.firestore()
			.collection("products")
			.doc(this.state.key);
		updateRef
			.set({
				nama,
				harga,
				category,
				photo,
				photoUrl,
			})
			.then(() => {
				this.setState({
					key: "",
					nama: "",
					harga: "",
					category: "",
					photo: "",
					photoUrl: "",
				});
				swal({
					title: "Berhasil!",
					text: "Data telah diupdate!",
					icon: "success",
					button: "OK",
				});
				this.props.history.push("/app/produk");
			})
			.catch((error) => {
				console.error("Error adding document: ", error);
			});
	};

	render() {
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
											<h3 className="mb-0">Edit Produk</h3>
										</Col>
									</Row>
								</CardHeader>

								<CardBody>
									<Form role="form" onSubmit={this.onSubmit}>
										<div key={this.state.key} className="pl-lg-4">
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
															value={this.state.nama}
															onChange={this.onChange}
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
															<CurrencyFormat
																customInput={Input}
																value={this.state.harga}
																onValueChange={(values) => {
																	const { formattedValue } = values;

																	this.setState({ harga: formattedValue });
																}}
																thousandSeparator={true}
																prefix={"Rp. "}
															/>
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
																	value={this.state.category}
																	onChange={(event) =>
																		this.setState({
																			category: event.target.value,
																		})
																	}
																	type="select"
																>
																	{Object.keys(this.state.listCategory).map(
																		(key, index) => {
																			let data = this.state.listCategory[key];

																			return (
																				<option key={index} value={data.nama}>
																					{data.nama}
																				</option>
																			);
																		}
																	)}
																</Input>
															</FormGroup>
														</Col>
													</Row>
												</div>
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
																	width: 250,
																	height: 300,
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
														<Button color="success" type="submit">
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
