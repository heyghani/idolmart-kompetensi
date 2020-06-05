import React, { Component, Fragment } from "react";
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
	Modal,
} from "reactstrap";
import firebase from "firebase";

const db = firebase.firestore();

class Login extends Component {
	state = {
		defaultModal: true,
		signupModal: false,
		username: "",
		password: "",
		confirmPassword: "",
		error: "",
	};

	toggleModal = (state) => {
		this.setState({
			[state]: !this.state[state],
		});
	};

	handleSignup = () => {
		this.setState({
			defaultModal: false,
			signupModal: true,
			error: "",
			username: "",
			password: "",
		});
	};

	handleSignin = () => {
		this.setState({
			defaultModal: true,
			signupModal: false,
			error: "",
			username: "",
			password: "",
		});
	};

	onSignup = (e) => {
		e.preventDefault();
		const { username, password, confirmPassword } = this.state;
		this.setState({ error: "" });

		if (username === "" || password === "") {
			this.setState({ error: "Username atau password kosong" });
			return null;
		} else {
			db.collection("admin")
				.doc(username)
				.get()
				.then((doc) => {
					if (doc.exists) {
						this.setState({ error: "Username telah digunakan" });
					} else {
						if (password !== confirmPassword) {
							this.setState({ error: "Password tidak cocok" });
						} else {
							db.collection("admin").doc(username).set({
								username,
								password,
							});
							let credential = { username, password };
							localStorage.setItem("UserLogin", credential);
							window.location.reload();
						}
					}
				})
				.catch((error) => console.log(error));
		}
	};

	onSignin = (e) => {
		e.preventDefault();
		const { username, password } = this.state;
		this.setState({ error: "" });

		if (username === "" || password === "") {
			this.setState({ error: "Username atau password kosong" });
			return null;
		} else {
			db.collection("admin")
				.doc(username)
				.get()
				.then((doc) => {
					let credential = {
						username: doc.data().username,
						password: doc.data().password,
					};
					if (doc.exists) {
						if (password === credential.password) {
							let credential = { username, password };
							localStorage.setItem("UserLogin", credential);
							window.location.reload();
						} else {
							this.setState({ error: "Username atau password salah" });
						}
					}
				})
				.catch(() => this.setState({ error: "Username tidak ditemukan" }));
		}
	};

	render() {
		const { username, password, confirmPassword, error } = this.state;
		return (
			<Fragment>
				<Modal
					className="modal-dialog-centered"
					size="sm"
					isOpen={this.state.defaultModal}
					toggle={() => this.toggleModal("formModal")}
				>
					<div className="modal-body p-0">
						<Card className="bg-secondary shadow border-0">
							<CardHeader className="bg-transparent pb-2">
								<div className="text-muted text-center mt-2 ">
									<h1 className="text-black">Welcome Admin!</h1>
								</div>
								<div className="text-center">
									<img
										alt="icon.png"
										style={{ height: 150, width: 150, margin: 10 }}
										src={require("assets/img/icon.png")}
									/>
								</div>
								<div className="text-center text-muted mt-2">
									<small>
										<b>Dashboard Idolmart Mobile</b>
									</small>
								</div>
							</CardHeader>
							<CardBody className="px-lg-5 py-lg-5">
								<Form role="form" onSubmit={this.onSignin}>
									<FormGroup className="mb-3">
										<InputGroup className="input-group-alternative">
											<InputGroupAddon addonType="prepend">
												<InputGroupText>
													<i className="ni ni-circle-08" />
												</InputGroupText>
											</InputGroupAddon>
											<Input
												placeholder="Username"
												type="text"
												value={username}
												onChange={(event) =>
													this.setState({ username: event.target.value })
												}
											/>
										</InputGroup>
									</FormGroup>
									<FormGroup>
										<InputGroup className="input-group-alternative">
											<InputGroupAddon addonType="prepend">
												<InputGroupText>
													<i className="ni ni-lock-circle-open" />
												</InputGroupText>
											</InputGroupAddon>
											<Input
												placeholder="Password"
												type="password"
												value={password}
												onChange={(event) =>
													this.setState({ password: event.target.value })
												}
											/>
										</InputGroup>
									</FormGroup>
									<div className="text-center">
										{error ? <p style={{ color: "red" }}>{error}</p> : null}
										<Button className="my-4" color="primary" type="submit">
											Sign in
										</Button>
										<Button
											className="my-4"
											color="default"
											type="button"
											onClick={() => this.handleSignup()}
										>
											Sign up
										</Button>
									</div>
								</Form>
							</CardBody>
						</Card>
					</div>
				</Modal>

				{/* Signup */}

				<Modal
					className="modal-dialog-centered"
					size="sm"
					isOpen={this.state.signupModal}
					toggle={() => this.toggleModal("formModal")}
				>
					<div className="modal-body p-0">
						<Card className="bg-secondary shadow border-0">
							<CardHeader className="bg-transparent pb-2">
								<div className="text-muted text-center mt-2 ">
									<h1 className="text-black">New Admin?</h1>
								</div>
								<div className="text-center">
									<img
										alt="icon.png"
										style={{ height: 150, width: 150, margin: 10 }}
										src={require("assets/img/icon.png")}
									/>
								</div>
								<div className="text-center text-muted mt-2">
									<small>
										<b>Dashboard Idolmart Mobile</b>
									</small>
								</div>
							</CardHeader>
							<CardBody className="px-lg-5 py-lg-5">
								<Form role="form" onSubmit={this.onSignup}>
									<FormGroup className="mb-3">
										<InputGroup className="input-group-alternative">
											<InputGroupAddon addonType="prepend">
												<InputGroupText>
													<i className="ni ni-circle-08" />
												</InputGroupText>
											</InputGroupAddon>
											<Input
												placeholder="Username"
												type="text"
												value={username}
												onChange={(event) =>
													this.setState({ username: event.target.value })
												}
											/>
										</InputGroup>
									</FormGroup>
									<FormGroup>
										<InputGroup className="input-group-alternative">
											<InputGroupAddon addonType="prepend">
												<InputGroupText>
													<i className="ni ni-lock-circle-open" />
												</InputGroupText>
											</InputGroupAddon>
											<Input
												placeholder="Password"
												type="password"
												value={password}
												onChange={(event) =>
													this.setState({ password: event.target.value })
												}
											/>
										</InputGroup>
									</FormGroup>
									<FormGroup>
										<InputGroup className="input-group-alternative">
											<InputGroupAddon addonType="prepend">
												<InputGroupText>
													<i className="ni ni-lock-circle-open" />
												</InputGroupText>
											</InputGroupAddon>
											<Input
												placeholder="Confirm Password"
												type="password"
												value={confirmPassword}
												onChange={(event) =>
													this.setState({ confirmPassword: event.target.value })
												}
											/>
										</InputGroup>
									</FormGroup>
									<div className="text-center">
										{error ? <p style={{ color: "red" }}>{error}</p> : null}
										<Button
											className="my-4"
											color="primary"
											type="button"
											onClick={() => this.handleSignin()}
										>
											Sign in
										</Button>
										<Button className="my-4" color="default" type="submit">
											Sign up
										</Button>
									</div>
								</Form>
							</CardBody>
						</Card>
					</div>
				</Modal>
			</Fragment>
		);
	}
}
export default Login;
