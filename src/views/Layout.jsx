/*!

=========================================================
* Argon Dashboard React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";

// reactstrap components
import {
	Button,
	Card,
	CardHeader,
	CardBody,
	PopoverBody,
	UncontrolledPopover,
	Table,
	Container,
	Row,
	Col,
} from "reactstrap";

// core components

import Header from "components/Headers/Header";
import swal from "sweetalert";
import { SwatchesPicker } from "react-color";
import FileUploader from "react-firebase-file-uploader";
import firebase from "firebase";

const db = firebase.firestore();

class Layout extends React.Component {
	state = {};

	componentDidMount = async () => {
		await this.getLayouts();
	};

	getLayouts = () => {
		this.getPromo();
		this.getFeatured();
		this.getCategory();
		this.getHeader();
		this.getProfile();
		this.getHelloIcon();
		this.getSplashIcon();
	};

	getPromo = () => {
		db.collection("layouts")
			.doc("promo")
			.get()
			.then((doc) => this.setState({ promo: doc.data().color }));
	};

	getFeatured = () => {
		db.collection("layouts")
			.doc("featured")
			.get()
			.then((doc) => this.setState({ featured: doc.data().color }));
	};

	getCategory = () => {
		db.collection("layouts")
			.doc("category")
			.get()
			.then((doc) => this.setState({ category: doc.data().color }));
	};

	getHeader = () => {
		db.collection("layouts")
			.doc("header")
			.get()
			.then((doc) => this.setState({ header: doc.data().color }));
	};

	getProfile = () => {
		db.collection("layouts")
			.doc("profile")
			.get()
			.then((doc) => this.setState({ profile: doc.data().color }));
	};

	getHelloIcon = () => {
		db.collection("layouts")
			.doc("hello")
			.get()
			.then((doc) =>
				this.setState({
					photo: doc.data().photo,
					photoUrl: doc.data().photoUrl,
				})
			);
	};

	getSplashIcon = () => {
		db.collection("layouts")
			.doc("splash")
			.get()
			.then((doc) =>
				this.setState({
					splash: doc.data().photo,
					splashUrl: doc.data().photoUrl,
				})
			);
	};

	handleId = (event) => {
		this.setState({ id: event.target.id });
	};

	handleChange = (color, event) => {
		let id = this.state.id;
		db.collection("layouts")
			.doc(id)
			.set({
				color: color.hex,
			})
			.then(() => {
				this.setState({ [id]: color.hex });
			});
	};

	handleIcon = (filename) => {
		let id = this.state.id;
		this.setState({
			photo: filename,
		});

		firebase
			.storage()
			.ref("icons")
			.child(filename)
			.getDownloadURL()
			.then((url) =>
				this.setState({
					photoUrl: url,
				})
			)
			.then(() => {
				db.collection("layouts")
					.doc(id)
					.set({
						photo: this.state.photo,
						photoUrl: this.state.photoUrl,
					})
					.then(() => {
						swal({
							title: "Berhasil!",
							text: "Icon telah diupdate!",
							icon: "success",
							button: "OK",
						});
					});
			});
	};

	handleSplash = (filename) => {
		let id = this.state.id;
		this.setState({
			splash: filename,
		});

		firebase
			.storage()
			.ref("icons")
			.child(filename)
			.getDownloadURL()
			.then((url) =>
				this.setState({
					splashUrl: url,
				})
			)
			.then(() => {
				db.collection("layouts")
					.doc(id)
					.set({
						photo: this.state.splash,
						photoUrl: this.state.splashUrl,
					})
					.then(() => {
						swal({
							title: "Berhasil!",
							text: "Icon telah diupdate!",
							icon: "success",
							button: "OK",
						});
					});
			});
	};

	render() {
		return (
			<>
				<Header />
				{/* Page content */}
				<Container className="mt--7" fluid>
					<Row>
						<Col className="mb-5 mb-xl-0" xl="6">
							<Card className="shadow ">
								<CardHeader className="bg-transparent">
									<Row className="align-items-center">
										<div className="col">
											<h6 className="text-uppercase text-light ls-1 mb-1">
												Customize
											</h6>
											<h2 className="mb-0">Layout</h2>
										</div>
									</Row>
								</CardHeader>
								<CardBody>
									<Table className="align-items-center" responsive>
										<thead className="thead-light">
											<tr>
												<th scope="col">Layout</th>
												<th scope="col">Color</th>
												<th scope="col" />
											</tr>
										</thead>
										<tbody>
											<tr>
												<th>
													<p>Promo Container</p>
												</th>
												<th>
													<Button
														id="promo"
														style={{
															height: 30,
															width: 70,
															backgroundColor: this.state.promo,
														}}
														onClick={this.handleId}
													/>
													<UncontrolledPopover
														placement="right"
														target="promo"
														className="popover-default"
														trigger="legacy"
													>
														<PopoverBody>
															<SwatchesPicker
																id="promo"
																color={this.state.promo}
																onChangeComplete={this.handleChange}
															/>
														</PopoverBody>
													</UncontrolledPopover>
												</th>
											</tr>
											<tr>
												<th>
													<p>Hot Product Container</p>
												</th>
												<th>
													<Button
														id="featured"
														style={{
															height: 30,
															width: 70,
															backgroundColor: this.state.featured,
														}}
														onClick={this.handleId}
													/>
													<UncontrolledPopover
														placement="right"
														target="featured"
														className="popover-default"
														trigger="legacy"
													>
														<PopoverBody>
															<SwatchesPicker
																id="featured"
																color={this.state.featured}
																onChangeComplete={this.handleChange}
															/>
														</PopoverBody>
													</UncontrolledPopover>
												</th>
											</tr>
											<tr>
												<th>
													<p>Category Container</p>
												</th>
												<th>
													<Button
														id="category"
														style={{
															height: 30,
															width: 70,
															backgroundColor: this.state.category,
														}}
														onClick={this.handleId}
													/>
													<UncontrolledPopover
														placement="right"
														target="category"
														className="popover-default"
														trigger="legacy"
													>
														<PopoverBody>
															<SwatchesPicker
																id="category"
																color={this.state.category}
																onChangeComplete={this.handleChange}
															/>
														</PopoverBody>
													</UncontrolledPopover>
												</th>
											</tr>
											<tr>
												<th>
													<p>Header Container</p>
												</th>
												<th>
													<Button
														id="header"
														style={{
															height: 30,
															width: 70,
															backgroundColor: this.state.header,
														}}
														onClick={this.handleId}
													/>
													<UncontrolledPopover
														placement="right"
														target="header"
														className="popover-default"
														trigger="legacy"
													>
														<PopoverBody>
															<SwatchesPicker
																id="header"
																color={this.state.header}
																onChangeComplete={this.handleChange}
															/>
														</PopoverBody>
													</UncontrolledPopover>
												</th>
											</tr>
											<tr>
												<th>
													<p>Profile Menu</p>
												</th>
												<th>
													<Button
														id="profile"
														style={{
															height: 30,
															width: 70,
															backgroundColor: this.state.profile,
														}}
														onClick={this.handleId}
													/>
													<UncontrolledPopover
														placement="right"
														target="profile"
														className="popover-default"
														trigger="legacy"
													>
														<PopoverBody>
															<SwatchesPicker
																id="profile"
																color={this.state.profile}
																onChangeComplete={this.handleChange}
															/>
														</PopoverBody>
													</UncontrolledPopover>
												</th>
											</tr>
										</tbody>
									</Table>
								</CardBody>
							</Card>
						</Col>
						<Col xl="6">
							<Card className="shadow">
								<CardHeader className="bg-transparent">
									<Row className="align-items-center">
										<div className="col">
											<h6 className="text-uppercase text-muted ls-1 mb-1">
												Customize
											</h6>
											<h2 className="mb-0">Icons</h2>
										</div>
									</Row>
								</CardHeader>
								<CardBody>
									<Table className="align-items-center" responsive>
										<thead className="thead-light">
											<tr>
												<th scope="col">Layout</th>
												<th scope="col">Icon</th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<th>
													<p>Hello Icon</p>
												</th>
												<th>
													<img
														id="hello"
														alt={this.state.photo}
														className="img-fluid rounded-circle shadow"
														src={this.state.photoUrl}
														style={{ width: 80, height: 80 }}
														onClick={this.handleId}
													/>
													<UncontrolledPopover
														placement="right"
														target="hello"
														className="popover-default"
														trigger="legacy"
													>
														<PopoverBody>
															<img
																className="img-fluid rounded-circle shadow"
																alt={this.state.photo}
																src={this.state.photoUrl}
																style={{
																	margin: 15,
																	width: 100,
																	height: 100,
																	resizeMode: "center",
																}}
															/>
															<FileUploader
																accept="images/*"
																name="images"
																storageRef={firebase.storage().ref("icons")}
																onUploadSuccess={this.handleIcon}
															/>
														</PopoverBody>
													</UncontrolledPopover>
												</th>
											</tr>
											<tr>
												<th>
													<p>Splash Icon</p>
												</th>
												<th>
													<img
														id="splash"
														alt={this.state.splash}
														className="img-fluid rounded-circle shadow"
														src={this.state.splashUrl}
														style={{ width: 80, height: 80 }}
														onClick={this.handleId}
													/>
													<UncontrolledPopover
														placement="right"
														target="splash"
														className="popover-default"
														trigger="legacy"
													>
														<PopoverBody>
															<img
																className="img-fluid rounded-circle shadow"
																alt={this.state.splash}
																src={this.state.splashUrl}
																style={{
																	margin: 15,
																	width: 100,
																	height: 100,
																	resizeMode: "center",
																}}
															/>
															<FileUploader
																accept="images/*"
																name="images"
																storageRef={firebase.storage().ref("icons")}
																onUploadSuccess={this.handleSplash}
															/>
														</PopoverBody>
													</UncontrolledPopover>
												</th>
											</tr>
										</tbody>
									</Table>
								</CardBody>
							</Card>
						</Col>
					</Row>
				</Container>
			</>
		);
	}
}

export default Layout;
