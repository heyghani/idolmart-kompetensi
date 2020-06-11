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
import { Card, CardHeader, CardBody, Container, Row, Col } from "reactstrap";
import firebase from "firebase";
import EdiText from "react-editext";

import Header from "components/Headers/Header.jsx";

const db = firebase.firestore();

class Index extends React.Component {
	state = {
		logo: "",
		logoUrl: "",
		phone: "",
	};

	componentWillMount() {
		this.getCs();
	}

	getCs = () => {
		db.collection("admin")
			.doc("cs")
			.get()
			.then((doc) => this.setState({ phone: doc.data().phone }));
	};

	handleCs = (val) => {
		db.collection("admin")
			.doc("cs")
			.update({ phone: val })
			.then(() => this.setState({ phone: val }));
	};

	render() {
		return (
			<>
				<Header />
				{/* Page content */}
				<Container className="mt--7" fluid>
					<Row>
						<Col className="mb-5 mb-xl-0" xl="8">
							<Card className="bg-gradient-default shadow">
								<CardHeader className="bg-transparent">
									<Row className="align-items-center">
										<div className="col">
											<h2 className="text-white mb-0">Welcome Admin !</h2>
										</div>
									</Row>
								</CardHeader>
								<CardBody>
									{/* Chart */}
									<div className="chart">
										<h4 className="text-grey mb-0 text-muted ls-1 mb-1">
											Selamat datang di dashboard Idolmart Mobile
										</h4>
									</div>
								</CardBody>
							</Card>
						</Col>
						<Col xl="4">
							<Card className="shadow">
								<CardHeader className="bg-transparent">
									<Row className="align-items-center">
										<div className="col">
											<h6 className="text-uppercase text-muted ls-1 mb-1">
												Data
											</h6>
											<h2 className="mb-0">Customer Service</h2>
										</div>
									</Row>
								</CardHeader>
								<CardBody>
									{/* Chart */}
									<div className="chart">
										<label>Contact Person : </label>
										<EdiText
											type="text"
											value={this.state.phone}
											onSave={this.handleCs}
											editOnViewClick={true}
											showButtonsOnHover={true}
										/>
									</div>
								</CardBody>
							</Card>
						</Col>
					</Row>
				</Container>
			</>
		);
	}
}

export default Index;
