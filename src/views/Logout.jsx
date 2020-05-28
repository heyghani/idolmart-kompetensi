import React, { Component, Fragment } from "react";
import { Button, Card, CardHeader, CardBody, Modal } from "reactstrap";
import Header from "components/Headers/Header.jsx";

class Logout extends Component {
	state = {
		defaultModal: true,
	};

	isCancel = () => {
		this.setState({ defaultModal: false });
		this.props.history.push("/app/home");
	};

	onSubmit = () => {
		localStorage.removeItem("UserLogin");
		this.props.history.push("/auth/index");
	};

	render() {
		return (
			<Fragment>
				<Header />
				<Modal
					className="modal-dialog-centered"
					size="sm"
					isOpen={this.state.defaultModal}
				>
					<div className="modal-body p-0">
						<Card className="bg-secondary shadow border-0">
							<CardHeader className="bg-transparent pb-2">
								<div className="text-muted text-center mt-2 ">
									<h1 className="text-black">Anda yakin ingin keluar?</h1>
								</div>
							</CardHeader>
							<CardBody className="px-lg-5 py-lg-5">
								<div className="text-center">
									<Button
										className="my-4"
										color="danger"
										onClick={() => this.isCancel()}
									>
										Cancel
									</Button>
									<Button
										className="my-4"
										color="primary"
										type="button"
										onClick={() => this.onSubmit()}
									>
										Logout
									</Button>
								</div>
							</CardBody>
						</Card>
					</div>
				</Modal>
			</Fragment>
		);
	}
}
export default Logout;
