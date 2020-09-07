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
	Modal,
	Input,
	Form,
} from "reactstrap";
import {
	Typography,
	Table,
	TableContainer,
	TableHead,
	TableBody,
	TableRow,
	TableCell,
	Paper,
	FormGroup,
} from "@material-ui/core";

import swal from "sweetalert";

import Header from "components/Headers/Header.jsx";
import Kamus from "./Kamus";

class Kompetensi extends React.Component {
	state = {
		modal: false,
		showEdit: false,
		categories: [],
		id: "",
		nama: "",
		kode_kompetensi: "",
	};

	componentDidMount = () => {
		this.getKompetensi();
	};

	toggleModal = () => {
		this.setState({
			modal: !this.state.modal,
			nama: "",
			kode_kompetensi: "",
		});
	};

	toggleEdit = (id) => {
		this.setState({
			showEdit: !this.state.showEdit,
			id,
		});
		this.handleEdit(id);
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

	handleEdit = (id) => {
		fetch(`http://localhost:5000/api/kompetensi/${id}`, {
			method: "GET",
		})
			.then((res) => res.json())
			.then((json) => {
				this.setState({
					nama: json.response[0].nama,
					kode_kompetensi: json.response[0].kode_kompetensi,
				});
			})
			.catch((err) => console.log(err));
	};

	ModalEdit = () => {
		const { nama, kode_kompetensi } = this.state;
		return (
			<Modal
				className="modal-dialog-centered"
				size="lg"
				isOpen={this.state.showEdit}
			>
				<div className="modal-body p-0">
					<Card className="bg-secondary shadow border-0">
						<CardHeader className="bg-transparent pb-2">
							<div className="text-muted text-center mt-2 ">
								<h1 className="text-black">Edit Kompetensi</h1>
							</div>
						</CardHeader>
						<CardBody className="px-lg-5 py-lg-5">
							<Form role="form" onSubmit={this.onEdit}>
								<div className="pl-lg-4">
									<Row>
										<Col lg="6">
											<FormGroup>
												<label
													className="form-control-label"
													htmlFor="input-nama"
												>
													Nama Kompetensi
												</label>
												<Input
													className="form-control-alternative"
													value={nama}
													onChange={(event) =>
														this.setState({
															nama: event.target.value,
														})
													}
													type="text"
												/>
											</FormGroup>
										</Col>
										<Col lg="6">
											<FormGroup>
												<label
													className="form-control-label"
													htmlFor="input-nama"
												>
													Kode Kompetensi
												</label>
												<Input
													className="form-control-alternative"
													value={kode_kompetensi}
													onChange={(event) =>
														this.setState({
															kode_kompetensi: event.target.value,
														})
													}
													type="text"
												/>
											</FormGroup>
										</Col>
									</Row>
									<Row className="mt-5">
										<Col className="text-center">
											<FormGroup>
												<Button color="danger" onClick={this.toggleEdit}>
													Batal
												</Button>
											</FormGroup>
										</Col>
										<Col className="text-center">
											<FormGroup>
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
		);
	};

	handleDelete = (id) => {
		swal({
			title: "Apakah anda yakin?",
			text: "tekan OK untuk menghapus data!",
			icon: "warning",
			buttons: true,
			dangerMode: true,
		}).then((willDelete) => {
			if (willDelete) {
				fetch("http://localhost:5000/api/kompetensi/delete", {
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						id,
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

	onEdit = () => {
		const { nama, kode_kompetensi, id } = this.state;

		fetch("http://localhost:5000/api/kompetensi/update", {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				kode_kompetensi,
				nama,
				id,
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
			})
			.catch((err) => console.log(err));
	};

	onSubmit = () => {
		const { nama, kode_kompetensi } = this.state;

		fetch("http://localhost:5000/api/kompetensi/add", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				kode_kompetensi,
				nama,
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
			})
			.catch((err) => console.log(err));
	};

	render() {
		const { categories, nama, kode_kompetensi } = this.state;

		return (
			<>
				<Header />
				{/* Page content */}
				<Container className="mt--7" fluid>
					<Row>
						<Col>
							<Card className="shadow">
								<CardHeader className="bg-transparent">
									<Row className="align-items-center">
										<div className="col">
											<Typography
												color="textPrimary"
												variant="h5"
												align="center"
											>
												Data Kompetensi
											</Typography>
										</div>
									</Row>
								</CardHeader>
								<CardBody>
									<Row>
										<Col>
											<Button
												className="float-left"
												color="primary"
												onClick={this.toggleModal}
												style={{ marginBottom: 10 }}
											>
												<i className="fas fa-plus" />
											</Button>
											<Modal
												className="modal-dialog-centered"
												size="lg"
												isOpen={this.state.modal}
											>
												<div className="modal-body p-0">
													<Card className="bg-secondary shadow border-0">
														<CardHeader className="bg-transparent pb-2">
															<div className="text-muted text-center mt-2 ">
																<h1 className="text-black">
																	Tambah Kompetensi
																</h1>
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
																					Nama Kompetensi
																				</label>
																				<Input
																					className="form-control-alternative"
																					value={nama}
																					onChange={(event) =>
																						this.setState({
																							nama: event.target.value,
																						})
																					}
																					type="text"
																				/>
																			</FormGroup>
																		</Col>
																		<Col lg="6">
																			<FormGroup>
																				<label
																					className="form-control-label"
																					htmlFor="input-nama"
																				>
																					Kode Kompetensi
																				</label>
																				<Input
																					className="form-control-alternative"
																					value={kode_kompetensi}
																					onChange={(event) =>
																						this.setState({
																							kode_kompetensi:
																								event.target.value,
																						})
																					}
																					type="text"
																				/>
																			</FormGroup>
																		</Col>
																	</Row>
																	<Row className="mt-5">
																		<Col className="text-center">
																			<FormGroup>
																				<Button
																					color="danger"
																					onClick={this.toggleModal}
																				>
																					Batal
																				</Button>
																			</FormGroup>
																		</Col>
																		<Col className="text-center">
																			<FormGroup>
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
										</Col>
									</Row>
									<Row>
										<Col>
											<TableContainer
												component={Paper}
												style={{ maxHeight: 475 }}
											>
												<Table
													stickyHeader
													size="small"
													aria-label="a dense table"
												>
													<TableHead>
														<TableRow>
															<TableCell>
																<b>Kompetensi</b>
															</TableCell>
															<TableCell align="center">
																<b>Kode Kompetensi</b>
															</TableCell>
															<TableCell>
																<b>Action</b>
															</TableCell>
														</TableRow>
													</TableHead>
													<TableBody>
														{categories.map((data, i) => (
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
																	{data.kode_kompetensi}{" "}
																</TableCell>
																<TableCell component="th" scope="row">
																	<Button
																		style={{
																			backgroundColor: "DARKORANGE",
																			color: "white",
																		}}
																		onClick={() => this.toggleEdit(data.id)}
																	>
																		<i className="fas fa-pencil-alt" />
																	</Button>
																	<Button
																		style={{
																			backgroundColor: "CRIMSON",
																			color: "white",
																		}}
																		onClick={() => this.handleDelete(data.id)}
																	>
																		<i className="fas fa-trash" />
																	</Button>
																</TableCell>
															</TableRow>
														))}
														{this.ModalEdit()}
													</TableBody>
												</Table>
											</TableContainer>
										</Col>
									</Row>
									<Row className="mt-5">
										<Col>
											<Kamus />
										</Col>
									</Row>
								</CardBody>
							</Card>
						</Col>
					</Row>
				</Container>
			</>
		);
	}
}

export default Kompetensi;
