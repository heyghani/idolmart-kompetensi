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

	onSignin = (e) => {
		e.preventDefault();
		localStorage.setItem("nik", this.state.username);
		this.props.history.push(`/app/home`);
	};

	render() {
		const { username, password, error } = this.state;
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
									<h1 className="text-black">Welcome!</h1>
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
										<b>Dashboard Kompetensi Karyawan</b>
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
												placeholder="NIK"
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
