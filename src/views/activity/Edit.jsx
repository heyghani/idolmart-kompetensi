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
import Progress from "components/Progress";
import FileUploader from "react-firebase-file-uploader";
import firebase from "firebase";
import fire from "../../config";
import swal from "sweetalert";

const db = fire.firestore();

class CreateProduct extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			createdAt: "",
			key: "",
			likeCount: "",
			commentCount: "",
			judul: "",
			caption: "",
			data: "",
			photo: "",
			photoUrl: "",
			user: "",
			isUploading: false,
			progress: 0,
		};
	}

	componentDidMount = () => {
		const ref = firebase
			.firestore()
			.collection("activities")
			.doc(this.props.match.params.id);
		ref.get().then((doc) => {
			if (doc.exists) {
				const data = doc.data();
				this.setState({
					key: doc.id,
					createdAt: data.createdAt,
					judul: data.judul,
					caption: data.body,
					likeCount: data.likeCount,
					commentCount: data.commentCount,
					photo: data.photo,
					photoUrl: data.postImage,
				});
			} else {
				console.log("No such document!");
			}
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
		console.log(this.state);
		this.setState({
			photo: filename,
			progress: 100,
		});

		firebase
			.storage()
			.ref("activities")
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

		db.collection("activities")
			.doc(this.state.key)
			.set({
				judul: this.state.judul,
				body: this.state.caption,
				photo: this.state.photo,
				postImage: this.state.photoUrl,
				likeCount: this.state.likeCount,
				commentCount: this.state.commentCount,
				createdAt: this.state.createdAt,
			})
			.then(() => {
				swal({
					title: "Berhasil!",
					text: "Data berhasil di update!",
					icon: "success",
					button: "OK",
				});
				this.props.history.push("/app/activity");
			})
			.catch((err) => console.log(err));
	};

	render() {
		const { judul, caption, isSubmitting } = this.state;
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
											<h3 className="mb-0">Edit Aktivitas</h3>
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
															htmlFor="input-judul"
														>
															Judul Aktivitas
														</label>
														<Input
															className="form-control-alternative"
															value={judul}
															onChange={(event) =>
																this.setState({
																	judul: event.target.value,
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
															htmlFor="input-caption"
														>
															Caption
														</label>
														<Input
															className="form-control-alternative"
															value={caption}
															onChange={(event) =>
																this.setState({
																	caption: event.target.value,
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
															Foto Aktivitas
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
															storageRef={firebase.storage().ref("activities")}
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
																this.props.history.push("/app/activity")
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
