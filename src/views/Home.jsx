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
import React, { Fragment } from "react";

// reactstrap components
import {
	Card,
	CardHeader,
	CardBody,
	Container,
	Row,
	Col,
	UncontrolledCollapse,
} from "reactstrap";
import {
	Divider,
	Grid,
	Button,
	TextField,
	Typography,
} from "@material-ui/core";

import Header from "components/Headers/Header.jsx";

class Index extends React.Component {
	state = {
		nilai: "",
		logo: "",
		logoUrl: "",
		phone: "",
		form: [],
		category: [],
	};

	componentWillMount() {
		this.getCategory();
		this.getForm();
	}

	getForm = () => {
		fetch("http://localhost:5000/api/form")
			.then((res) => res.json())
			.then((json) => {
				this.setState({ form: json.response });
			});
	};

	getCategory = () => {
		fetch("http://localhost:5000/api/category")
			.then((res) => res.json())
			.then((json) => {
				this.setState({ category: json.response });
			});
	};

	onSubmit = () => {};

	render() {
		console.log(this.state.form, this.state.category);
		return (
			<>
				<Header />
				{/* Page content */}
				<Container className="mt--7" fluid>
					<Row>
						<Col xl="5">
							<Card className="shadow">
								<CardHeader className="bg-transparent">
									<Row>
										<Col className="align-items-center">
											<div className="col">
												<h5 className="mb-0">PT.Idola Cahaya Semesta</h5>
												<img
													alt="logo"
													src={require("../assets/img/idolmart.PNG")}
													style={{ width: 100, height: 60 }}
												/>
											</div>
										</Col>

										<Col className="align-items-center">
											<div className="col">
												<h5 className="mt-0">Nama : Ghani </h5>
												<h5 className="mt-0">NIK : 202394 </h5>
												<h5 className="mt-0">Jabatan : Staff </h5>
												<h5 className="mt-0">Toko/Dept : IT </h5>
											</div>
										</Col>
									</Row>
								</CardHeader>
								<CardBody>
									<Row>
										<Col md={5} xs={6}>
											<h2>Kompentesi</h2>
											{this.state.category.map((data) => {
												return <p>{data.nama}</p>;
											})}
										</Col>
										<Col>
											<h2>Bobot</h2>
											{this.state.category.map((data) => {
												return <p>{data.bobot}</p>;
											})}
										</Col>
										<Col className="align-item-center">
											<h2>Skor</h2>
											<p>{(this.state.nilai * 12) / 100}</p>
											<p>{(this.state.nilai * 12) / 100}</p>
										</Col>
									</Row>
								</CardBody>
							</Card>
						</Col>
						<Col className="mb-5 mb-xl-0" xl="7">
							<Card className="shadow">
								<CardHeader className="bg-transparent">
									<Row className="align-items-center">
										<div className="col">
											<h2 className="text-uppercase text-muted ls-1 mb-1">
												Form Penilaian Sikap/Kompentesi
											</h2>
										</div>
									</Row>
								</CardHeader>
								<CardBody>
									{this.state.category.map((category) => {
										return (
											<Fragment>
												<Button
													color="default"
													size="large"
													// id={`${category.code_category}`}
													style={{ width: "100%", margin: 10 }}
												>
													{category.nama}
												</Button>
												<UncontrolledCollapse
													// toggler={`#${category.code_category}`}
													style={{ padding: 15 }}
												>
													<Grid container spacing={3}>
														<Row>
															<Col>
																<h2>Standard Nilai</h2>
																{this.state.form.map((data) => {
																	return (
																		<Typography
																			color="textSecondary"
																			variant="h4"
																			style={{ marginBottom: 20 }}
																		>
																			{data.nama === category.nama
																				? data.standard
																				: null}
																		</Typography>
																	);
																})}
															</Col>
															<Col>
																<h2>Kamus Penilaian</h2>
																{this.state.form.map((data) => {
																	return (
																		<Typography
																			color="textSecondary"
																			variant="body2"
																		>
																			{data.nama === category.nama
																				? data.kamus
																				: null}
																			<Divider />
																		</Typography>
																	);
																})}
															</Col>
														</Row>
														<Divider style={{ borderWidth: 3 }} />
														<Grid item md={6} xs={12}>
															<TextField
																fullWidth
																label="Point Nilai"
																margin="dense"
																name="pointNilai"
																onChange={(event) =>
																	this.setState({ nilai: event.target.value })
																}
																required
																value={this.state.nilai}
																variant="outlined"
																type="number"
																helperText="Isilah Kolom Nilai dengan angka 0 s/d 100 sesuai kategori penilaian."
															/>
														</Grid>
														<Grid item md={6} xs={12}>
															<TextField
																fullWidth
																label="Skor"
																margin="dense"
																name="pointNilai"
																required
																value={(this.state.nilai * 12) / 100}
																disabled
																variant="outlined"
															/>
														</Grid>
													</Grid>
												</UncontrolledCollapse>
											</Fragment>
										);
									})}
								</CardBody>
								<Divider />
								<Button
									color="primary"
									size="large"
									id="tj"
									style={{ width: "50%", margin: 10 }}
								>
									Save
								</Button>
							</Card>
						</Col>
					</Row>
				</Container>
			</>
		);
	}
}

export default Index;
