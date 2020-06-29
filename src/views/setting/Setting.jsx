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
	Col
} from "reactstrap";
// core components
import Header from "components/Headers/Header.jsx";
import firebase from "firebase";
import fire from "../../config";
import Progress from "components/Progress";
import FileUploader from "react-firebase-file-uploader";
import "react-dropzone-uploader/dist/styles.css";
import swal from "sweetalert";

if (!firebase.apps.length) {
	firebase.initializeApp({ fire });
}

const imageMaxSize = 2000000; // bytes

class CreateProduct extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			nama: "",
			photo: "",
			photoUrl: "",
			description: "",
			progress: 0
		};
	}

	handleUploadStart = () => {
		this.setState({
			isUploading: true,
			progress: 0
		});
	};

	handleProgress = progress => this.setState({ progress });

	// handleOnDrop = (fileWithMeta, status, filesWithMeta) => {
	// 	const files = filesWithMeta.map(obj => obj.file);

	// 	console.log(files);
	// 	if (files && files.length > 0) {
	// 		const img_filter = files.filter(file => {
	// 			// const currentFileType = file.type
	// 			const currentFileSize = file.size;
	// 			if (currentFileSize > imageMaxSize) {
	// 				alert("File terlalu besar");
	// 				return false;
	// 			}
	// 			return true;
	// 		});
	// 		const currentFile = files[0];

	// 		console.log(currentFile);
	// 		this.setState({ images_path: img_filter });
	// 	}
	// };

	handleUploadSuccess = filename => {
		console.log(this.state);
		this.setState({
			photo: filename,
			progress: 100
		});

		firebase
			.storage()
			.ref("settings")
			.child(filename)
			.getDownloadURL()
			.then(url =>
				this.setState({
					photoUrl: url
				})
			);
	};

	handleChangeStatus = ({ meta }, status) => {
		console.log(status, meta);
	};

	onSubmit = e => {
		e.preventDefault();
		const db = fire.firestore();
		db.collection("setting").add({
			nama: this.state.nama,
			description: this.state.description,
			photo: this.state.photo,
			photoUrl: this.state.photoUrl,
			createdAt: new Date()
		});
		this.setState({});
		swal({
			title: "Berhasil!",
			text: "Data telah ditambahkan!",
			icon: "success",
			button: "OK"
		});
		this.props.history.push("/app/setting");
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
											<h3 className="mb-0">Setting</h3>
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
															onChange={event =>
																this.setState({
																	nama: event.target.value
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
															onChange={event =>
																this.setState({
																	description: event.target.value
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
																	resizeMode: "center"
																}}
															/>
														)}
														<FileUploader
															accept="image/*"
															name="photo"
															storageRef={firebase.storage().ref("settings")}
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
																this.props.history.push("/app/setting")
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
