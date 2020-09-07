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
	MenuItem,
	TextareaAutosize,
	Table,
	TableHead,
	TableBody,
	TableRow,
	TableCell,
} from "@material-ui/core";

import swal from "sweetalert";

import Header from "components/Headers/Header.jsx";

class Index extends React.Component {
	state = {
		isExist: [],
		rekap: null,
		nilai: [],
		assignment: null,
		periode: "",
		nik: "",
		nama: "",
		divisi: "",
		jabatan: "",
		kode_jabatan: "",
		level_jabatan: "",
		kelas: null,
		description: [],
		bobot: [],
		form: [],
		categories: [],
		skor: [],
	};

	componentWillMount = () => {
		this.getUser();
	};

	getUser = () => {
		const user = JSON.parse(localStorage.getItem("user"));
		const nik = user[0].nik;

		fetch(`http://localhost:5000/api/user/${nik}`, {
			method: "GET",
		})
			.then((res) => res.json())
			.then((json) => {
				this.setState({
					nik: json.response[0].nik,
					nama: json.response[0].nama,
					divisi: json.response[0].divisi,
					jabatan: json.response[0].jabatan,
					kode_jabatan: json.response[0].kode_jabatan,
					level_jabatan: json.response[0].level_jabatan,
					kelas: json.response[0].kelas,
				});
			})
			.finally(() => {
				this.getForm();
				this.getCategory();
			});
	};

	getAssignment = () => {
		const { nik, periode } = this.state;

		fetch("http://localhost:5000/api/assignment", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				nik,
				periode,
			}),
		})
			.then((res) => res.json())
			.then((json) => {
				this.setState({ assignment: json.response[0].kelas });
			})
			.finally(() => {
				if (this.state.assignment < this.state.kelas) {
					swal({
						title: "Assignment Failed!",
						text:
							"Atasan anda telah melakukan adjustment nilai. anda tidak dapat merubah data ini lagi.",
						icon: "warning",
						button: "OK",
					}).then(() => window.location.reload());
				}
			})
			.catch(() => {
				swal({
					title: "Data tidak ditemukan!",
					text: "Data pada bulan ini kosong",
					icon: "warning",
					button: "OK",
				}).then(() => window.location.reload());
			});
	};

	getForm = () => {
		fetch(`http://localhost:5000/api/form/${this.state.level_jabatan}`, {
			method: "GET",
		})
			.then((res) => res.json())
			.then((json) => {
				this.setState({ form: json.response });
			});
	};

	getCategory = () => {
		fetch(`http://localhost:5000/api/category/${this.state.level_jabatan}`)
			.then((res) => res.json())
			.then((json) => {
				this.setState({ categories: json.response });
			});
	};

	getNilai = () => {
		const { isExist, nik, periode } = this.state;
		this.setState({
			nilai: [],
			skor: [],
			description: [],
			jumlah: "",
			rekap: "",
			assignment: null,
		});
		if (isExist.length > 0) {
			fetch(`http://localhost:5000/api/nilai`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					nik,
					periode,
				}),
			})
				.then((res) => res.json())
				.then((json) => {
					const nilai = json.response.map((doc) => doc.nilai);
					const description = json.response.map((doc) => doc.keterangan);
					const skor = json.response.map((doc) => doc.skor);
					const reducer = (accumulator, currentValue) =>
						accumulator + currentValue;
					const jumlah = skor.reduce(reducer, 0).toFixed(2);
					const rumus = (jumlah * 40) / 100;
					const rekap = rumus.toFixed(2);
					this.setState({
						nilai,
						skor,
						rekap,
						jumlah,
						description,
						isExist: [],
					});
				})
				.then(() => this.getAssignment())
				.catch((err) => console.log(err));
		} else {
			const nilai = [];
			const skor = [];
			for (var i = 0; i < this.state.categories.length; i++) {
				nilai.push(0);
				skor.push(0);
			}
			this.setState({ nilai, skor });
		}
	};

	handeDesc = (index) => (event) => {
		const { description } = this.state;
		const newDesc = description.slice(0);
		newDesc[index] = event.target.value;
		this.setState({
			description: newDesc,
		});
	};

	handleChange = (index, bobot) => (event) => {
		const { nilai, skor } = this.state;
		const reducer = (accumulator, currentValue) => accumulator + currentValue;
		nilai[index] = event.target.value;
		skor[index] = (event.target.value * bobot) / 100;
		const jumlah = skor.reduce(reducer, 0).toFixed(2);
		const rumus = (jumlah * 40) / 100;
		const rekap = rumus.toFixed(2);
		this.setState({
			nilai,
			skor,
			jumlah,
			rekap,
		});
	};

	reduce = (total, num) => {
		return total + num;
	};

	onSelect = (event) => {
		const { nik } = this.state;
		this.setState({
			periode: event.target.value,
			nilai: [],
			skor: [],
			description: [],
			jumlah: "",
			rekap: "",
			assignment: null,
		});
		fetch("http://localhost:5000/api/validation", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				nik,
				periode: event.target.value,
			}),
		})
			.then((res) => res.json())
			.then((json) => {
				this.setState({
					isExist: json.response,
				});
			})
			.finally(() => {
				this.getNilai();
			})
			.catch(() =>
				this.setState({
					jumlah: "",
					rekap: "",
					nilai: [],
					skor: [],
					description: [],
				})
			);
	};

	onSubmit = (e) => {
		e.preventDefault();
		const {
			nik,
			nilai,
			skor,
			categories,
			periode,
			jumlah,
			rekap,
			description,
			kelas,
		} = this.state;

		const body = [];
		for (var i = 0; i < categories.length; i++) {
			if (nilai.includes(0) || nilai.includes("")) {
				swal({
					title: "Gagal!",
					text: "Nilai tidak boleh kosong",
					icon: "warning",
					button: "OK",
				});
			} else {
				body.push([
					nik,
					categories[i].kode_kompetensi,
					categories[i].bobot,
					nilai[i],
					skor[i],
					jumlah,
					rekap,
					description[i],
					nilai[i],
					skor[i],
					jumlah,
					rekap,
					periode,
					kelas,
				]);
			}
		}

		if (body.length > 0) {
			fetch("http://localhost:5000/api/form", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					values: body,
					nik,
					periode,
				}),
			})
				.then((res) => res.json())
				.then((json) => {
					if (json.error) {
						swal({
							title: "Gagal!",
							text: json.response,
							icon: "warning",
							button: "OK",
						});
					} else {
						swal({
							title: "Berhasil!",
							text: json.response,
							icon: "success",
							button: "OK",
						}).then(() => window.scrollTo(0, 0));
					}
				});
		}
	};

	render() {
		const {
			nik,
			nama,
			form,
			divisi,
			jabatan,
			periode,
			jumlah,
			rekap,
			nilai,
			skor,
			categories,
			description,
		} = this.state;
		const option = [
			{ value: "periode1", label: "Periode 1 Jan-Mar" },
			{ value: "periode2", label: "Periode 2 Apr-Juni" },
			{ value: "periode3", label: "Periode 3 Juli-Sept" },
			{ value: "periode4", label: "Periode 4 Okt-Des" },
		];

		return (
			<>
				<Header />
				{/* Page content */}
				<Container className="mt--7" fluid>
					<Row>
						<Col className="mt-5" xl="6">
							<Card className="shadow">
								<CardHeader className="bg-transparent">
									<Row>
										<Col>
											<h5 className="mt-0">Nama : {nama} </h5>
											<h5 className="mt-0">NIK : {nik} </h5>
											<h5 className="mt-0">Jabatan : {jabatan} </h5>
											<h5 className="mt-0">Toko/Dept : {divisi} </h5>
										</Col>
										<Col>
											<TextField
												id="periode"
												select
												label="Pilih Periode"
												value={periode}
												onChange={this.onSelect}
												style={{ width: 190, marginLeft: 10 }}
											>
												{option.map((option) => (
													<MenuItem key={option.value} value={option.value}>
														{option.label}
													</MenuItem>
												))}
											</TextField>
										</Col>
									</Row>
								</CardHeader>
								<CardBody>
									<Row>
										<Table size="small" aria-label="a dense table">
											<TableHead>
												<TableRow>
													<TableCell>
														<b>Kompetensi</b>
													</TableCell>
													<TableCell>
														<b>Bobot</b>
													</TableCell>
													<TableCell>
														<b>Nilai</b>
													</TableCell>
													<TableCell>
														<b>Skor</b>
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
														<TableCell component="th" scope="row">
															{" "}
															{data.bobot}{" "}
														</TableCell>
														<TableCell component="th" scope="row">
															<Typography
																key={i}
																color="textSecondary"
																variant="subtitle1"
																align="center"
															>
																{nilai[i] ? nilai[i] : 0}
															</Typography>
														</TableCell>
														<TableCell component="th" scope="row">
															<Typography
																key={i}
																color="textSecondary"
																variant="subtitle1"
																align="center"
															>
																{skor[i] ? skor[i] : 0}
															</Typography>
														</TableCell>
													</TableRow>
												))}
											</TableBody>
											<TableHead>
												<TableRow>
													<TableCell>
														<b>Jumlah : {jumlah}</b>
													</TableCell>
													<TableCell style={{ width: 180 }}>
														<b>Nilai (40%) : {rekap}</b>
													</TableCell>
													<TableCell />
													<TableCell />
												</TableRow>
											</TableHead>
										</Table>
									</Row>
								</CardBody>
							</Card>
						</Col>
						<Col className="mt-5 mb-5 mb-xl-0" xl="6">
							<Card className="shadow">
								<CardHeader className="bg-transparent">
									<Row className="align-items-center">
										<div className="col">
											<Typography
												color="textPrimary"
												variant="h5"
												align="center"
											>
												Form Penilaian Sikap/Kompentesi
											</Typography>
										</div>
									</Row>
								</CardHeader>
								<CardBody>
									{categories.map((category, i) => {
										const id = category.kode_kompetensi;
										return (
											<Fragment key={i}>
												<Button
													color="default"
													size="large"
													id={id}
													style={{ width: "100%", margin: 10 }}
												>
													{category.nama}
												</Button>
												<UncontrolledCollapse
													toggler={`#${id}`}
													style={{ padding: 15 }}
												>
													<Grid container spacing={3}>
														<Row>
															<Col>
																<h2>Kamus Penilaian</h2>
																{form.map((data, i) => {
																	return (
																		<Table
																			size="small"
																			aria-label="a dense table"
																			key={i}
																		>
																			<TableBody>
																				{data.nama === category.nama ? (
																					<TableRow key={i}>
																						<TableCell
																							size="medium"
																							style={{ width: 120 }}
																						>
																							<Typography
																								key={i}
																								color="textPrimary"
																								variant="h6"
																								align="left"
																							>
																								{data.nama === category.nama
																									? data.standard
																									: null}
																							</Typography>
																						</TableCell>
																						<TableCell align="left">
																							<Typography
																								key={i}
																								color="textPrimary"
																								variant="body2"
																								align="justify"
																							>
																								{data.nama === category.nama
																									? data.kamus
																									: null}
																							</Typography>
																						</TableCell>
																					</TableRow>
																				) : null}
																			</TableBody>
																		</Table>
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
																name="PointNilai"
																value={
																	nilai.length > 0 && nilai[i] !== 0
																		? nilai[i]
																		: ""
																}
																onChange={this.handleChange(i, category.bobot)}
																required
																variant="outlined"
																type="number"
															/>
														</Grid>
														<Grid item md={6} xs={12}>
															<TextField
																fullWidth
																label="Skor"
																margin="dense"
																name="pointNilai"
																value={
																	nilai[i]
																		? (nilai[i] * category.bobot) / 100
																		: 0
																}
																InputProps={{
																	readOnly: true,
																}}
															/>
														</Grid>
														<Grid item md={12} xs={12}>
															<TextareaAutosize
																rowsMax={3}
																defaultValue={
																	description.length > 0 ? description[i] : ""
																}
																aria-label="maximum height"
																placeholder="Keterangan Nilai"
																onChange={this.handeDesc(i)}
																style={{ width: "100%" }}
															/>
														</Grid>
													</Grid>
												</UncontrolledCollapse>
												{i !== categories.length - 1 && <Divider />}
											</Fragment>
										);
									})}
								</CardBody>
								<Divider />
								<Button
									size="large"
									id="tj"
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
