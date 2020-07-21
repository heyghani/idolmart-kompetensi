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
import { Card, CardHeader, CardBody, Container, Row, Col } from "reactstrap";
import {
	Divider,
	Grid,
	Button,
	TextField,
	Typography,
	MenuItem,
	TextareaAutosize,
	FormGroup,
	FormControlLabel,
} from "@material-ui/core";

import swal from "sweetalert";

import Header from "components/Headers/Header.jsx";
import Checkbox from "components/Checkbox";

class Index extends React.Component {
	state = {
		jabatan: "",
		jabatans: [],
		selectedjabatan: [],
		kamus: [],
		standard: [],
		bobot: "",
		kode_jabatan: "",
		kompetensi: "",
		checkedItems: new Map(),
		categories: [],
		code_category: "",
	};

	componentWillMount = () => {
		this.getJabatan();
		this.getKompetensi();
	};

	getKompetensi = () => {
		fetch("http://localhost:5000/api/kompetensi", {
			method: "GET",
		})
			.then((res) => res.json())
			.then((json) => {
				this.setState({ categories: json.response });
			})
			.catch((err) => console.log(err));
	};

	getJabatan = () => {
		fetch("http://localhost:5000/api/jabatan", {
			method: "GET",
		})
			.then((res) => res.json())
			.then((json) => {
				this.setState({ jabatans: json.response });
			})
			.catch((err) => console.log(err));
	};

	handleChange = (i) => (event) => {
		const { selectedjabatan, kode_jabatan, checkedItems } = this.state;
		const body = [];

		const item = event.target.name;
		const isChecked = event.target.checked;
		const value = event.target.value;

		body.push(item);
		console.log(body);
		this.setState((prevState) => ({
			checkedItems: prevState.checkedItems.set(item, isChecked),
			kode_jabatan: value,
		}));
	};

	handleKamus = (i) => (event) => {
		const { kamus } = this.state;
		const newDesc = kamus.slice(0);
		newDesc[i] = event.target.value;
		this.setState({
			kamus: newDesc,
		});
	};

	handleBobot = (event) => {
		this.setState({
			bobot: event.target.value,
		});
	};

	handleStandard = (i) => (event) => {
		const { standard } = this.state;
		const newDesc = standard.slice(0);
		newDesc[i] = event.target.value;
		this.setState({
			standard: newDesc,
		});
	};

	onSelectKompetensi = (event) => {
		this.setState({
			code_category: event.target.id,
			kompetensi: event.target.value,
		});
	};

	onSubmitKompetensi = () => {
		const { code_category, kompetensi, kode_jabatan } = this.state;
	};

	render() {
		const {
			kode_jabatan,
			jabatans,
			kompetensi,
			categories,
			checkedItems,
			kamus,
			bobot,
			standard,
		} = this.state;
		const option = [
			{ standard: "Standard Nilai", kamus: "Kamus Kompetensi" },
			{ standard: "Standard Nilai", kamus: "Kamus Kompetensi" },
			{ standard: "Standard Nilai", kamus: "Kamus Kompetensi" },
			{ standard: "Standard Nilai", kamus: "Kamus Kompetensi" },
			{ standard: "Standard Nilai", kamus: "Kamus Kompetensi" },
		];
		return (
			<>
				<Header />
				{/* Page content */}
				<Container className="mt--7" fluid>
					<Row>
						<Col xl="12" xs="12">
							<Card className="shadow">
								<CardHeader className="bg-transparent">
									<Row className="align-items-center">
										<div className="col">
											<Typography
												color="textPrimary"
												variant="h5"
												align="center"
											>
												Setting Kompetensi Jabatan
											</Typography>
										</div>
									</Row>
								</CardHeader>
								<CardBody>
									<Row>
										<Col>
											<TextField
												id="kompetensi"
												select
												label="Pilih Kompetensi"
												value={kompetensi}
												onChange={this.onSelectKompetensi}
												style={{ width: 190, marginLeft: 10 }}
											>
												{categories.map((data) => (
													<MenuItem
														key={data.id}
														id={data.code_category}
														value={data.nama}
													>
														{data.nama}
													</MenuItem>
												))}
											</TextField>
										</Col>
									</Row>
									<Row className="mt-5">
										<Col>
											<FormGroup row>
												{jabatans.map((data, i) => {
													return (
														<FormControlLabel
															control={
																<Checkbox
																	checked={checkedItems.get(data.nama)}
																	onChange={this.handleChange(i)}
																	name={data.nama}
																	color="primary"
																	value={data.kode_jabatan}
																/>
															}
															label={data.nama}
														/>
													);
												})}
											</FormGroup>
										</Col>
									</Row>
									<Row className="mt-5">
										<Col md={3} xs={3}>
											<FormGroup>
												<TextField
													value={bobot}
													onChange={this.handleBobot}
													variant="outlined"
													label="Bobot"
												/>
											</FormGroup>
										</Col>
										<Col md={3} xs={3}>
											<FormGroup>
												{option.map((data, i) => {
													return (
														<TextField
															value={standard[i]}
															onChange={this.handleStandard(i)}
															variant="outlined"
															label={data.standard}
															style={{ marginBottom: 10 }}
														/>
													);
												})}
											</FormGroup>
										</Col>
										<Col>
											<FormGroup>
												{option.map((data, i) => {
													return (
														<TextareaAutosize
															rowsMax={3}
															value={kamus[i]}
															aria-label="maximum height"
															placeholder={data.kamus}
															onChange={this.handleKamus(i)}
															style={{
																width: "100%",
																height: 55,
																marginBottom: 10,
															}}
														/>
													);
												})}
											</FormGroup>
										</Col>
									</Row>
								</CardBody>
								<Divider />
								<Button
									size="large"
									style={{
										width: "40%",
										margin: 10,
										alignSelf: "center",
										backgroundColor: "LIGHTSEAGREEN",
										color: "white",
									}}
									onClick={this.onSubmit}
								>
									Submit
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
