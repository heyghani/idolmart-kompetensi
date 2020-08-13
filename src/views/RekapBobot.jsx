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

import swal from "sweetalert";

import Header from "components/Headers/Header.jsx";
// import Checkbox from "components/Checkbox";

class Index extends React.Component {
	state = {
		table: [],
		nama_jabatan: "",
		jabatan: "",
		jabatans: [],
		selectedjabatan: [],
		kamus: [],
		standard: [],
		bobot: "",
		kompetensi: "",
		categories: [],
		showTable: false,
		showTable2: false,
		title: "",
		kode_kompetensi: "",
	};

	componentDidMount = () => {
		this.getJabatan();
		this.getKompetensi();
	};

	toggleModal = () => {
		this.setState({
			modal: !this.state.modal,
			title: "",
		});
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

	handleChange = () => {
		const nama = [];
		const selected = [];
		const checked = document.getElementsByTagName("input");
		for (var i = 0; i < checked.length; i++) {
			if (checked[i].checked) {
				selected.push(checked[i].value);
				nama.push(checked[i].name);
			}
			this.setState({
				selectedjabatan: selected.join(","),
				jabatan: nama.join(","),
			});
		}
	};

	// handleKamus = (i) => (event) => {
	// 	const { kamus } = this.state;
	// 	const newDesc = kamus.slice(0);
	// 	newDesc[i] = event.target.value;
	// 	this.setState({
	// 		kamus: newDesc,
	// 	});
	// };

	handleBobot = (event) => {
		this.setState({
			bobot: event.target.value,
		});
	};

	// handleStandard = (i) => (event) => {
	// 	const { standard } = this.state;
	// 	const newDesc = standard.slice(0);
	// 	newDesc[i] = event.target.value;
	// 	this.setState({
	// 		standard: newDesc,
	// 	});
	// };

	handleDelete = (data) => {
		const kode_kompetensi = data.kode_kompetensi;
		swal({
			title: "Apakah anda yakin?",
			text: "tekan OK untuk menghapus data!",
			icon: "warning",
			buttons: true,
			dangerMode: true,
		}).then((willDelete) => {
			if (willDelete) {
				fetch("http://localhost:5000/api/kompetensi", {
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						kode_kompetensi,
					}),
				}).then(() => {
					swal({
						title: "Berhasil!",
						text: "Data deleted successfully",
						icon: "success",
						button: "OK",
					}).then(() => window.location.reload());
				});
			} else {
				swal("Data berhasil diamankan");
			}
		});
	};

	onSelectJabatan = (event) => {
		this.setState({
			jabatan: event.target.value,
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

	onAddKompetensi = () => {
		const { title, kode_kompetensi } = this.state;

		const { level_jabatan, nama_jabatan } = "";

		fetch("http://localhost:5000/api/addkompetensi", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				kode_kompetensi,
				nama: title,
				level_jabatan,
				nama_jabatan,
			}),
		});
	};

	onSubmitKompetensi = () => {
		const { kompetensi, bobot, selectedjabatan, jabatan } = this.state;

		if (kompetensi === "" || jabatan === "" || bobot === "") {
			swal({
				title: "Gagal!",
				text: "Data tidak boleh kosong",
				icon: "warning",
				button: "OK",
			});
		} else {
			fetch("http://localhost:5000/api/kompetensi", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					kode_kompetensi: kompetensi.slice(0, 2),
					bobot,
					level_jabatan: selectedjabatan,
					jabatan,
				}),
			})
				.then((res) => res.json())
				.then((json) => {
					const message = json.response;
					if (json.error) {
						swal({
							title: "Gagal!",
							text: message,
							icon: "warning",
							button: "OK",
						}).then(() => window.location.reload());
					} else {
						swal({
							title: "Berhasil!",
							text: message,
							icon: "success",
							button: "OK",
						}).then(() => window.location.reload());
					}
				})
				.catch((err) => console.log(err));
		}
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
														onClick={(event) => this.handleMenu(event)}
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
																	<b>Kompetensi</b>
																</TableCell>
																<TableCell align="center">
																	<b>Bobot</b>
																</TableCell>
																{/* <TableCell>
																	<b>Action</b>
																</TableCell> */}
															</TableRow>
														</TableHead>
														<TableBody>
															{table.map((data, i) => (
																<TableRow key={i}>
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
																	{/* <TableCell component="th" scope="row">
																		<Button
																			style={{
																				backgroundColor: "CRIMSON",
																				color: "white",
																			}}
																			onClick={() => this.handleDelete(data)}
																		>
																			<i className="fas fa-trash" />
																		</Button>
																	</TableCell> */}
																</TableRow>
															))}
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
																	<b>Jabatan</b>
																</TableCell>
																<TableCell align="center">
																	<b>Bobot</b>
																</TableCell>
																{/* <TableCell>
																	<b>Action</b>
																</TableCell> */}
															</TableRow>
														</TableHead>
														<TableBody>
															{table2.map((data, i) => (
																<TableRow key={i}>
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
																	{/* <TableCell component="th" scope="row">
																		<Button
																			style={{
																				backgroundColor: "CRIMSON",
																				color: "white",
																			}}
																			onClick={() => this.handleDelete(data)}
																		>
																			<i className="fas fa-trash" />
																		</Button>
																	</TableCell> */}
																</TableRow>
															))}
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
