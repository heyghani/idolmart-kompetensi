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
/*eslint-disable*/
import React from "react";
import { NavLink as NavLinkRRD, Link } from "react-router-dom";
// nodejs library to set properties for components
import { PropTypes } from "prop-types";

// reactstrap components
import {
	Button,
	Card,
	CardHeader,
	CardBody,
	CardTitle,
	Collapse,
	DropdownMenu,
	DropdownItem,
	UncontrolledDropdown,
	DropdownToggle,
	FormGroup,
	Form,
	Input,
	InputGroupAddon,
	InputGroupText,
	InputGroup,
	Media,
	NavbarBrand,
	Navbar,
	NavItem,
	NavLink,
	Nav,
	Table,
	Container,
	Row,
	Col,
	Modal,
} from "reactstrap";

import firebase from "firebase";
import Progress from "components/Progress";
import FileUploader from "react-firebase-file-uploader";
import "react-dropzone-uploader/dist/styles.css";

var ps;

const db = firebase.firestore();

class Sidebar extends React.Component {
	state = {
		collapseOpen: false,
		modal: false,
		title: "",
		logo: "",
		logoUrl: "",
		progress: 0,
	};
	constructor(props) {
		super(props);
		this.activeRoute.bind(this);
	}
	// verifies if routeName is the one active (in browser input)
	activeRoute(routeName) {
		return this.props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
	}
	// toggles collapse between opened and closed (true/false)
	toggleCollapse = () => {
		this.setState({
			collapseOpen: !this.state.collapseOpen,
		});
	};
	// closes the collapse
	closeCollapse = () => {
		this.setState({
			collapseOpen: false,
		});
	};
	// creates the links that appear in the left menu / Sidebar
	createLinks = (routes) => {
		return routes.map((prop, key) => {
			if (prop.invisible) return null;
			return (
				<NavItem key={key}>
					<NavLink
						to={prop.layout + prop.path}
						tag={NavLinkRRD}
						onClick={this.closeCollapse}
						activeClassName="active"
					>
						<i className={prop.icon} />
						{prop.name}
					</NavLink>
				</NavItem>
			);
		});
	};

	componentDidMount = () => {
		db.collection("logo")
			.doc("VP8hruD8nXJJsIsvhX8i")
			.get()
			.then((doc) => {
				this.setState({
					title: doc.data().title,
					logo: doc.data().logo,
					logoUrl: doc.data().logoUrl,
				});
			});
	};

	isCancel = () => {
		this.setState({ modal: false });
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
			logo: filename,
			progress: 100,
		});

		firebase
			.storage()
			.ref("logo")
			.child(filename)
			.getDownloadURL()
			.then((url) =>
				this.setState({
					logoUrl: url,
				})
			);
	};

	handleChangeStatus = ({ meta }, status) => {
		console.log(status, meta);
	};

	onSubmit = (e) => {
		e.preventDefault();

		db.collection("logo")
			.doc("VP8hruD8nXJJsIsvhX8i")
			.set({
				title: this.state.title,
				logo: this.state.logo,
				logoUrl: this.state.logoUrl,
				updatedAt: new Date(),
			})
			.then(() => this.setState({ modal: false }))
			.then(() =>
				swal({
					title: "Berhasil!",
					text: "Data Berhasil di Update!",
					icon: "success",
					button: "OK",
				})
			)
			.catch((error) => alert(error));
	};
	render() {
		const { bgColor, routes, logo } = this.props;
		let navbarBrandProps;
		if (logo && logo.innerLink) {
			navbarBrandProps = {
				to: logo.innerLink,
				tag: Link,
			};
		} else if (logo && logo.outterLink) {
			navbarBrandProps = {
				href: logo.outterLink,
				target: "_blank",
			};
		}
		return (
			<Navbar
				className="navbar-vertical fixed-left navbar-light bg-white"
				expand="md"
				id="sidenav-main"
			>
				<Container fluid>
					{/* Toggler */}
					<button
						className="navbar-toggler"
						type="button"
						onClick={this.toggleCollapse}
					>
						<span className="navbar-toggler-icon" />
					</button>
					{/* Brand */}
					<NavbarBrand className="pt-0">
						<img
							alt={this.state.logo}
							className="navbar-brand-img"
							src={this.state.logoUrl}
							style={{ width: "60%" }}
							onClick={() => this.setState({ modal: true })}
						/>
					</NavbarBrand>

					<Modal
						className="modal-dialog-centered"
						size="lg"
						isOpen={this.state.modal}
					>
						<div className="modal-body p-0">
							<Card className="bg-secondary shadow border-0">
								<CardHeader className="bg-transparent pb-2">
									<div className="text-muted text-center mt-2 ">
										<h1 className="text-black">Edit Data Header</h1>
									</div>
								</CardHeader>
								<CardBody className="px-lg-5 py-lg-5">
									<Form role="form" onSubmit={this.onSubmit}>
										<div className="pl-lg-4">
											<Row>
												<Col lg="6">
													<FormGroup>
														<label
															className="form-control-label"
															htmlFor="input-nama"
														>
															Title
														</label>
														<Input
															className="form-control-alternative"
															value={this.state.title}
															onChange={(event) =>
																this.setState({
																	title: event.target.value,
																})
															}
															type="text"
														/>
													</FormGroup>
												</Col>
											</Row>

											<Row>
												<Col lg="12">
													<div>
														<label className="form-control-label">Logo</label>
														<br />
														<br />
														{this.state.logo && (
															<img
																alt={this.state.logo}
																src={this.state.logoUrl}
																style={{
																	padding: 10,
																	width: 150,
																	height: 150,
																	resizeMode: "center",
																}}
															/>
														)}
														<FileUploader
															accept="image/*"
															name="photo"
															storageRef={firebase.storage().ref("logo")}
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
															onClick={() => this.isCancel()}
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
						</div>
					</Modal>
					{/* Collapse */}
					<Collapse navbar isOpen={this.state.collapseOpen}>
						{/* Collapse header */}
						<div className="navbar-collapse-header d-md-none">
							<Row>
								{logo ? (
									<Col className="collapse-brand" xs="6">
										{logo.innerLink ? (
											<Link to={logo.innerLink}>
												<img
													alt={logo.imgAlt}
													src={require("assets/img/idolmart.jpeg")}
													onClick={() => console.log("Clicked")}
												/>
											</Link>
										) : (
											<a href={logo.outterLink}>
												<img
													onClick={() => console.log("Clicked")}
													alt={logo.imgAlt}
													src={require("assets/img/idolmart.jpeg")}
												/>
											</a>
										)}
									</Col>
								) : null}
								<Col className="collapse-close" xs="6">
									<button
										className="navbar-toggler"
										type="button"
										onClick={this.toggleCollapse}
									>
										<span />
										<span />
									</button>
								</Col>
							</Row>
						</div>
						{/* Form */}
						<Form className="mt-4 mb-3 d-md-none">
							<InputGroup className="input-group-rounded input-group-merge">
								<Input
									aria-label="Search"
									className="form-control-rounded form-control-prepended"
									placeholder="Search"
									type="search"
								/>
								<InputGroupAddon addonType="prepend">
									<InputGroupText>
										<span className="fa fa-search" />
									</InputGroupText>
								</InputGroupAddon>
							</InputGroup>
						</Form>
						{/* Navigation */}
						<Nav navbar>{this.createLinks(routes)}</Nav>
					</Collapse>
				</Container>
			</Navbar>
		);
	}
}

Sidebar.defaultProps = {
	routes: [{}],
};

Sidebar.propTypes = {
	// links that will be displayed inside the component
	routes: PropTypes.arrayOf(PropTypes.object),
	logo: PropTypes.shape({
		// innerLink is for links that will direct the user within the app
		// it will be rendered as <Link to="...">...</Link> tag
		innerLink: PropTypes.string,
		// outterLink is for links that will direct the user outside the app
		// it will be rendered as simple <a href="...">...</a> tag
		outterLink: PropTypes.string,
		// the image src of the logo
		imgSrc: PropTypes.string.isRequired,
		// the alt for the img
		imgAlt: PropTypes.string.isRequired,
	}),
};

export default Sidebar;
