import React from "react";

// reactstrap components
import {
	Button,
	Card,
	CardHeader,
	CardBody,
	FormGroup,
	Form,
	Input,
	Container,
	Row,
	Col,
} from "reactstrap";
// core components
import Header from "components/Headers/Header.jsx";
import firebase from "firebase";
import Progress from "components/Progress";
import FileUploader from "react-firebase-file-uploader";
import "react-dropzone-uploader/dist/styles.css";
import swal from "sweetalert";

class CreateProduct extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			key: "",
			createdAt: "",
			nama: "",
			photo: "",
			photoUrl: "",
			description: "",
			progress: 0,
		};
	}

	componentDidMount() {
		const ref = firebase
			.firestore()
			.collection("slider")
			.doc(this.props.match.params.id);
		ref.get().then((doc) => {
			if (doc.exists) {
				const data = doc.data();
				this.setState({
					key: doc.id,
					createdAt: data.createdAt,

					nama: data.nama,

					description: data.description,

					photo: data.photo,
					photoUrl: data.photoUrl,
				});
			} else {
				console.log("No such document!");
			}
		});
	}

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
			.ref("sliders")
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
		const { createdAt, nama, description, photo, photoUrl } = this.state;

		const updateRef = firebase
			.firestore()
			.collection("slider")
			.doc(this.state.key);

		updateRef
			.set({
				createdAt,

				nama,

				description,

				photo,
				photoUrl,
			})
			.then(() => {
				swal({
					title: "Berhasil!",
					text: "Data telah diupdate!",
					icon: "success",
					button: "OK",
				});
				this.props.history.push("/app/slider");
			})
			.catch((error) => {
				console.error("Error adding document: ", error);
			});
	};

	render() {
		console.log(this.state);
		const { nama, description, isSubmitting } = this.state;
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
											<h3 className="mb-0">Data Slider</h3>
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
															Judul slider
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
															Image Slider
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
															storageRef={firebase.storage().ref("sliders")}
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
																this.props.history.push("/app/slider")
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
