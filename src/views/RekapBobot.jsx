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
import {
	TextField,
	Typography,
	MenuItem,
	Table,
	TableContainer,
	TableHead,
	TableBody,
	TableRow,
	TableCell,
	Paper,
} from "@material-ui/core";

import Header from "components/Headers/Header.jsx";

class Index extends React.Component {
	state = {
		table: [],
		jabatan: "",
		jabatans: [],
		selectedjabatan: [],
		kompetensi: "",
		categories: [],
		showTable: false,
		showTable2: false,
	};

	componentDidMount = () => {
		this.getJabatan();
		this.getKompetensi();
	};

	getKompetensi = () => {
		fetch("http://localhost:5000/api/kompetensi/get", {
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

	onSelectJabatan = (event) => {
		this.setState({
			jabatan: event.target.value,
			showTable: false,
		});

		const body = event.target.value;

		fetch("http://localhost:5000/api/filter/bobot", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				level_jabatan: body,
			}),
		})
			.then((res) => res.json())
			.then((json) => {
				this.setState({ table: json.response, showTable: true });
			})
			.catch((err) => console.log(err));
	};
	onSelectKompetensi = (event) => {
		this.setState({
			kompetensi: event.target.value,
			showTable2: false,
		});

		const body = event.target.value;

		fetch("http://localhost:5000/api/filter/kompetensi", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				kode_kompetensi: body,
			}),
		})
			.then((res) => res.json())
			.then((json) => {
				this.setState({ table2: json.response, showTable2: true });
			})
			.catch((err) => console.log(err));
	};

	render() {
		const {
			jabatan,
			jabatans,
			kompetensi,
			categories,
			table,
			table2,
		} = this.state;
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
												Rekap Bobot Jabatan
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
												label="Pilih Jabatan"
												value={jabatan}
												onChange={(event) => this.onSelectJabatan(event)}
												style={{ width: 200, marginBottom: 20 }}
											>
												{jabatans.map((data) => (
													<MenuItem
														onClick={(event) => this.handleMenu(event)}
														key={data.data.id}
														value={data.data.level_jabatan}
													>
														{data.data.nama}
													</MenuItem>
												))}
											</TextField>
										</Col>
										<Col>
											<TextField
												id="kompetensi"
												select
												label="Pilih Kompetensi"
												value={kompetensi}
												onChange={(event) => this.onSelectKompetensi(event)}
												style={{ width: 200, marginBottom: 20 }}
											>
												{categories.map((data) => (
													<MenuItem
														style={{ maxHeight: 200 }}
														key={data.id}
														value={data.kode_kompetensi}
													>
														{data.nama}
													</MenuItem>
												))}
											</TextField>
										</Col>
									</Row>
									<Row>
										<Col>
											{this.state.showTable ? (
												<TableContainer component={Paper}>
													<Table size="small" aria-label="a dense table">
														<TableHead>
															<TableRow>
																<TableCell>
																	<b>No</b>
																</TableCell>
																<TableCell>
																	<b>Kompetensi</b>
																</TableCell>
																<TableCell align="center">
																	<b>Bobot</b>
																</TableCell>
															</TableRow>
														</TableHead>
														<TableBody>
															{table.map((data, i) => {
																var no = i + 1;
																return (
																	<TableRow key={i}>
																		<TableCell component="th" scope="row">
																			{no}
																		</TableCell>
																		<TableCell component="th" scope="row">
																			{" "}
																			{data.nama}{" "}
																		</TableCell>
																		<TableCell
																			component="th"
																			scope="row"
																			align="center"
																		>
																			{" "}
																			{data.bobot}{" "}
																		</TableCell>
																	</TableRow>
																);
															})}
														</TableBody>
													</Table>
												</TableContainer>
											) : (
												<Typography
													color="textSecondary"
													variant="h5"
													align="left"
												>
													Silahkan Pilih Jabatan
												</Typography>
											)}
										</Col>
										<Col>
											{this.state.showTable2 ? (
												<TableContainer component={Paper}>
													<Table size="small" aria-label="a dense table">
														<TableHead>
															<TableRow>
																<TableCell>
																	<b>No</b>
																</TableCell>
																<TableCell>
																	<b>Jabatan</b>
																</TableCell>
																<TableCell align="center">
																	<b>Bobot</b>
																</TableCell>
															</TableRow>
														</TableHead>
														<TableBody>
															{table2.map((data, i) => {
																var no = i + 1;
																return (
																	<TableRow key={i}>
																		<TableCell component="th" scope="row">
																			{" "}
																			{no}{" "}
																		</TableCell>
																		<TableCell component="th" scope="row">
																			{" "}
																			{data.nama_jabatan}{" "}
																		</TableCell>
																		<TableCell
																			component="th"
																			scope="row"
																			align="center"
																		>
																			{" "}
																			{data.bobot}{" "}
																		</TableCell>
																	</TableRow>
																);
															})}
														</TableBody>
													</Table>
												</TableContainer>
											) : (
												<Typography
													color="textSecondary"
													variant="h5"
													align="left"
												>
													Silahkan Pilih Kompetensi
												</Typography>
											)}
										</Col>
									</Row>
									{/* <Row classname="mt-10">
										
									</Row>
									<Row>
										
									</Row> */}
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
