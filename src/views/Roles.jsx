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
	Card,
	CardHeader,
	CardBody,
	Container,
	Row,
	Col,
	Button,
} from "reactstrap";
import {
	Divider,
	TextField,
	Typography,
	MenuItem,
	FormControl,
	FormLabel,
	FormGroup,
	FormControlLabel,
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
		modal: false,
		title: "",
		kode_kompetensi: "",
	};

	componentDidMount = () => {
		this.getJabatan();
		this.getKompetensi();
		this.getTable();
	};

	toggleModal = () => {
		this.setState({
			modal: !this.state.modal,
			title: "",
		});
	};

	getTable = () => {
		fetch("http://localhost:5000/api/table", {
			method: "GET",
		})
			.then((res) => res.json())
			.then((json) => {
				this.setState({ table: json.response });
			})
			.catch((err) => console.log(err));
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
				fetch("http://localhost:5000/api/roles", {
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						kode_kompetensi,
					}),
				})
					.then((res) => res.json())
					.then((json) => {
						swal({
							title: "Berhasil!",
							text: json.response,
							icon: "success",
							button: "OK",
						}).then(() => window.location.reload());
					});
			} else {
				swal("Data berhasil diamankan");
			}
		});
	};

	onSelectKompetensi = (event) => {
		this.setState({
			kompetensi: event.target.value,
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
			fetch("http://localhost:5000/api/kompetensi/submit", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					kode_kompetensi: kompetensi.slice(0, 3),
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
			bobot,
			table,
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
												Setting Kompetensi Jabatan
											</Typography>
										</div>
									</Row>
								</CardHeader>
								<CardBody>
									<Row>
										<Col>
											<TableContainer component={Paper}>
												<Table size="small" aria-label="a dense table">
													<TableHead>
														<TableRow>
															<TableCell>
																<b>Kompetensi</b>
															</TableCell>
															<TableCell>
																<b>Jabatan</b>
															</TableCell>
															<TableCell>
																<b>Action</b>
															</TableCell>
														</TableRow>
													</TableHead>
													<TableBody>
														{table.map((data, i) => (
															<TableRow key={i}>
																<TableCell component="th" scope="row">
																	{" "}
																	{data.nama}{" "}
																</TableCell>
																<TableCell component="th" scope="row">
																	{" "}
																	{data.nama_jabatan}{" "}
																</TableCell>
																<TableCell component="th" scope="row">
																	<Button
																		style={{
																			backgroundColor: "CRIMSON",
																			color: "white",
																		}}
																		onClick={() => this.handleDelete(data)}
																	>
																		<i className="fas fa-trash" />
																	</Button>
																</TableCell>
															</TableRow>
														))}
														{jabatan || kompetensi ? (
															<TableRow>
																<TableCell>
																	<TextField
																		value={kompetensi.slice(3)}
																		label="Kompetensi"
																		InputProps={{
																			readOnly: true,
																		}}
																	/>
																</TableCell>
																<TableCell>
																	<TextField
																		value={jabatan}
																		label="Jabatan"
																		InputProps={{
																			readOnly: true,
																		}}
																	/>
																</TableCell>
															</TableRow>
														) : null}
													</TableBody>
												</Table>
											</TableContainer>
										</Col>
									</Row>
									<Row className="mt-5">
										<Col className="ml-2" md={4} xs={4}>
											<FormControl component="fieldset">
												<FormLabel component="legend">Pilih Jabatan</FormLabel>
												<FormGroup>
													{jabatans.map((data) => {
														return (
															<FormControlLabel
																control={
																	<input
																		id={data.data.jabatan_id}
																		type="checkbox"
																		value={data.data.level_jabatan}
																		name={data.data.nama}
																		style={{ margin: 5 }}
																		onChange={() => this.handleChange()}
																		required
																	/>
																}
																label={data.data.nama}
															/>
														);
													})}
												</FormGroup>
											</FormControl>
										</Col>
										<Col md={4} xs={4}>
											<TextField
												id="kompetensi"
												select
												label="Pilih Kompetensi"
												value={kompetensi}
												onChange={(event) => this.onSelectKompetensi(event)}
												style={{ width: 150, marginLeft: 10 }}
												required
											>
												{categories.map((data) => (
													<MenuItem
														onClick={(event) => console.log(event.target)}
														key={data.id}
														id={data.kode_kompetensi}
														value={data.kode_kompetensi + data.nama}
													>
														{data.nama}
													</MenuItem>
												))}
											</TextField>
										</Col>
										<Col>
											<FormGroup>
												<TextField
													value={bobot}
													onChange={this.handleBobot}
													label="Bobot"
													variant="outlined"
													style={{ width: 100 }}
													required
												/>
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
									onClick={this.onSubmitKompetensi}
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
