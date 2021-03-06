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

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
	TableContainer,
} from "@material-ui/core";

import swal from "sweetalert";

import Header from "components/Headers/Header.jsx";

class Index extends React.Component {
	state = {
		rekap: null,
		nilai: [],
		periode: "",
		nik: "",
		nama: "",
		jumlah: "",
		divisi: "",
		kode_divisi: "",
		jabatan: "",
		kode_jabatan: "",
		level_jabatan: "",
		kelas: null,
		description: [],
		description_atasan: [],
		nilai_atasan: [],
		skor_atasan: [],
		jumlah_atasan: "",
		rekap_atasan: null,
		form: [],
		categories: [],
		skor: [],
		anggota: [],
		karyawan: [],
		lokasi: [],
		selectedLokasi: "",
		selectedAnggota: "",
		isOperational: false,
		isKepalaToko: false,
		showTable: false,
		showKompetensi: false,
	};

	componentDidMount = () => {
		this.getUser();
	};

	getUser = () => {
		const user = JSON.parse(localStorage.getItem("user"));
		const nik = user[0].nik;
		const divisi = user[0].kode_divisi;
		const jabatan = user[0].kode_jabatan;
		const lokasi = user[0].lokasi;
		switch (divisi) {
			case "409":
				if (jabatan === 507) {
					this.setState({ isKepalaToko: true });
				} else {
					this.setState({ isOperational: true });
				}
				break;

			default:
				break;
		}

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
					kode_divisi: json.response[0].kode_divisi,
					level_jabatan: json.response[0].level_jabatan,
					kelas: json.response[0].kelas,
					showTable: false,
				});
			})
			.finally(() => {
				this.getForm();
				this.getCategory();
				this.getLokasi();

				if (this.state.isKepalaToko) {
					fetch(`http://localhost:5000/api/lokasi/anggota/kepala`, {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({
							lokasi: lokasi,
							kelas: this.state.kelas,
						}),
					})
						.then((res) => res.json())
						.then((json) => {
							this.setState({ anggota: json.response });
						});
				} else {
					this.getDivisi();
				}
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

	getLokasi = () => {
		fetch(`http://localhost:5000/api/lokasi`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				spv: this.state.nik,
			}),
		})
			.then((res) => res.json())
			.then((json) => {
				this.setState({ lokasi: json.response });
			});
	};

	getDivisi = () => {
		fetch(`http://localhost:5000/api/divisi`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				divisi: this.state.kode_divisi,
				kelas: this.state.kelas,
			}),
		})
			.then((res) => res.json())
			.then((json) => {
				this.setState({ anggota: json.response });
			});
	};

	getAnggota = () => {
		const { selectedAnggota, periode } = this.state;
		fetch(`http://localhost:5000/api/anggota`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				nik: selectedAnggota,
				periode: periode.toString().slice(4, 15),
			}),
		})
			.then((res) => res.json())
			.then((json) => {
				this.setState({
					karyawan: json.response,
				});
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

	getNilai = () => {
		const { selectedAnggota, periode, kelas } = this.state;
		const user = JSON.parse(localStorage.getItem("user"));
		const lokasi = user[0].lokasi;
		this.setState({ showTable: false, showKompetensi: false });
		fetch(`http://localhost:5000/api/nilai`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				nik: selectedAnggota,
				periode: periode.toString().slice(4, 15),
				kelas,
			}),
		})
			.then((res) => res.json())
			.then((json) => {
				if (json.error) {
					switch (json.code) {
						case 200:
							swal({
								title: "Warning!",
								text: json.response,
								icon: "warning",
								button: "OK",
							});
							break;
						case 400:
							swal({
								title: "Gagal!",
								text: json.response,
								icon: "warning",
								button: "OK",
							});
							break;
						default:
							break;
					}
				} else {
					const nilai = json.response.map((doc) => doc.nilai);
					const skor = json.response.map((doc) => doc.skor);
					const description = json.response.map((doc) => doc.keterangan);
					const reducer = (accumulator, currentValue) =>
						accumulator + currentValue;
					const jumlah = skor.reduce(reducer, 0).toFixed(2);
					const rumus = (jumlah * 40) / 100;
					const rekap = rumus.toFixed(2);
					const nilai_atasan = json.response.map((doc) => doc.nilai_atasan);
					const skor_atasan = json.response.map((doc) => doc.skor_atasan);
					const jumlah_atasan = skor_atasan.reduce(reducer, 0).toFixed(2);
					const rumus_atasan = (jumlah_atasan * 40) / 100;
					const rekap_atasan = rumus_atasan.toFixed(2);
					this.setState({
						nilai,
						skor,
						jumlah,
						rekap,
						description,
						skor_atasan,
						nilai_atasan,
						jumlah_atasan,
						rekap_atasan,
						showTable: true,
						showKompetensi: true,
					});
					this.getForm();
					this.getCategory();
					if (this.state.isKepalaToko) {
						fetch(`http://localhost:5000/api/lokasi/anggota/kepala`, {
							method: "POST",
							headers: {
								"Content-Type": "application/json",
							},
							body: JSON.stringify({
								lokasi: lokasi,
								kelas: kelas,
							}),
						})
							.then((res) => res.json())
							.then((json) => {
								this.setState({ anggota: json.response });
							});
					}
					this.getAnggota();
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};

	handleDesc = (index) => (event) => {
		const { description_atasan } = this.state;
		const newDesc = description_atasan.slice(0);
		newDesc[index] = event.target.value;
		this.setState({
			description_atasan: newDesc,
		});
	};

	handleChange = (index, bobot) => (event) => {
		const { nilai_atasan, skor_atasan } = this.state;
		const reducer = (accumulator, currentValue) => accumulator + currentValue;
		nilai_atasan[index] = event.target.value;
		skor_atasan[index] = (event.target.value * bobot) / 100;
		const jumlah_atasan = skor_atasan.reduce(reducer, 0).toFixed(2);
		const rumus_atasan = (jumlah_atasan * 40) / 100;
		const rekap_atasan = rumus_atasan.toFixed(2);
		this.setState({
			nilai_atasan,
			skor_atasan,
			jumlah_atasan,
			rekap_atasan,
		});
	};

	reduce = (total, num) => {
		return total + num;
	};

	onSelectLokasi = (event) => {
		const user = JSON.parse(localStorage.getItem("user"));
		const nik = user[0].nik;
		this.setState({ selectedLokasi: event.target.value });
		fetch(`http://localhost:5000/api/lokasi/anggota`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				spv: nik,
				lokasi: event.target.value,
			}),
		})
			.then((res) => res.json())
			.then((json) => {
				this.setState({
					anggota: json.response,
				});
			})
			.catch((err) => console.log(err));
	};

	onSelectDivisi = (event) => {
		this.setState({ selectedAnggota: event.target.value });
		fetch(`http://localhost:5000/api/user/${event.target.value}`, {
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
					kode_divisi: json.response[0].kode_divisi,
					level_jabatan: json.response[0].level_jabatan,
				});
			})
			.finally(() => {
				this.getNilai();
			});
	};

	onSubmit = (e) => {
		e.preventDefault();
		const {
			selectedAnggota,
			nilai,
			skor,
			jumlah,
			rekap,
			description,
			description_atasan,
			nilai_atasan,
			skor_atasan,
			categories,
			periode,
			jumlah_atasan,
			rekap_atasan,
			kelas,
			kode_divisi,
		} = this.state;

		const body = [];
		for (var i = 0; i < categories.length; i++) {
			if (nilai_atasan.includes(0) || nilai_atasan.includes("")) {
				swal({
					title: "Gagal!",
					text: `Nilai tidak boleh kosong`,
					icon: "warning",
					button: "OK",
				});
			} else {
				body.push([
					selectedAnggota,
					kode_divisi,
					categories[i].kode_kompetensi,
					categories[i].bobot,
					nilai[i],
					skor[i],
					jumlah,
					rekap,
					description[i],
					description_atasan[i],
					nilai_atasan[i],
					skor_atasan[i],
					jumlah_atasan,
					rekap_atasan,
					periode.toString().slice(4, 15),
					kelas,
				]);
			}
		}

		if (body.length > 0) {
			fetch("http://localhost:5000/api/update", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					values: body,
					nik: selectedAnggota,
					periode: periode.toString().slice(4, 15),
				}),
			}).then(() => {
				swal({
					title: "Berhasil!",
					text: "Data telah ditambahkan!",
					icon: "success",
					button: "OK",
				}).then(() => window.scrollTo(0, 0));
			});
		}
	};

	render() {
		const {
			nik,
			nama,
			divisi,
			jabatan,
			periode,
			description,
			nilai,
			nilai_atasan,
			skor_atasan,
			jumlah,
			jumlah_atasan,
			rekap,
			rekap_atasan,
			selectedAnggota,
			anggota,
			karyawan,
			lokasi,
			selectedLokasi,
			isOperational,
			isKepalaToko,
		} = this.state;

		const Input = ({ value, placeholder, onChange, onClick }) => (
			<TextField
				value={value}
				placeholder={placeholder}
				onClick={onClick}
				label="Pilih Periode"
				style={{ width: 120 }}
			/>
		);

		return (
			<>
				<Header />
				{/* Page content */}
				<Container className="mt--7" fluid>
					<Row>
						<Col>
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
											{isKepalaToko ? (
												<Fragment>
													<DatePicker
														customInput={<Input />}
														selected={periode}
														onChange={(date) => {
															this.setState({ periode: date });
														}}
														dateFormat="yyyy, qqq"
														showQuarterYearPicker
													/>
													<TextField
														id="anggota"
														select
														label="Pilih Anggota"
														value={selectedAnggota}
														onChange={this.onSelectDivisi}
														style={{
															width: 190,
															maxHeight: 100,
															marginLeft: 10,
														}}
													>
														{anggota.map((anggota) => (
															<MenuItem key={anggota.nik} value={anggota.nik}>
																{anggota.nik} - {anggota.name}
															</MenuItem>
														))}
													</TextField>
												</Fragment>
											) : isOperational ? (
												<Fragment>
													<DatePicker
														customInput={<Input />}
														selected={periode}
														onChange={(date) => {
															this.setState({ periode: date });
														}}
														dateFormat="yyyy, qqq"
														showQuarterYearPicker
													/>
													.nav
													<TextField
														id="lokasi"
														select
														label="Pilih Lokasi"
														value={selectedLokasi}
														onChange={this.onSelectLokasi}
														style={{ width: 120, marginLeft: 10 }}
													>
														{lokasi.map((option, i) => (
															<MenuItem key={i} value={option.lokasi}>
																{option.lokasi}
															</MenuItem>
														))}
													</TextField>
													{selectedLokasi ? (
														<TextField
															id="anggota"
															select
															label="Pilih Anggota"
															value={selectedAnggota}
															onChange={this.onSelectDivisi}
															style={{
																width: 190,
																maxHeight: 100,
																marginLeft: 10,
															}}
														>
															{anggota.map((anggota) => (
																<MenuItem key={anggota.nik} value={anggota.nik}>
																	{anggota.nik} - {anggota.name}
																</MenuItem>
															))}
														</TextField>
													) : null}
												</Fragment>
											) : (
												<Fragment>
													<DatePicker
														customInput={<Input />}
														selected={periode}
														onChange={(date) => {
															this.setState({ periode: date });
														}}
														dateFormat="yyyy, qqq"
														showQuarterYearPicker
													/>
													<TextField
														id="anggota"
														select
														label="Pilih Anggota"
														value={selectedAnggota}
														onChange={this.onSelectDivisi}
														style={{
															width: 190,
															maxHeight: 100,
															marginLeft: 10,
														}}
													>
														{anggota.map((anggota) => (
															<MenuItem key={anggota.nik} value={anggota.nik}>
																{anggota.nik} - {anggota.name}
															</MenuItem>
														))}
													</TextField>
												</Fragment>
											)}
										</Col>
									</Row>
								</CardHeader>
								<CardBody>
									<Row>
										<Col>
											{this.state.showTable ? (
												<Fragment>
													<TableContainer>
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
																	<TableCell>
																		<b>Nilai Atasan</b>
																	</TableCell>
																	<TableCell>
																		<b>Skor Atasan</b>
																	</TableCell>
																</TableRow>
															</TableHead>
															<TableBody>
																{karyawan.map((karyawan, index) => {
																	return (
																		<TableRow key={index}>
																			<TableCell component="th" scope="row">
																				{karyawan.kompetensi}
																			</TableCell>
																			<TableCell component="th" scope="row">
																				{karyawan.bobot}
																			</TableCell>
																			<TableCell component="th" scope="row">
																				{karyawan.nilai}
																			</TableCell>
																			<TableCell component="th" scope="row">
																				{karyawan.skor}
																			</TableCell>
																			<TableCell component="th" scope="row">
																				{nilai_atasan[index]}
																			</TableCell>
																			<TableCell component="th" scope="row">
																				{skor_atasan[index]}
																			</TableCell>
																		</TableRow>
																	);
																})}
															</TableBody>
														</Table>
													</TableContainer>
													<Divider />
													<Row>
														<Col md={4} xs={4}>
															{" "}
															<Typography
																color="textPrimary"
																variant="h6"
																align="left"
															>
																Jumlah
															</Typography>{" "}
														</Col>
														<Col />
														<Col>
															<Typography
																color="textPrimary"
																variant="subtitle1"
																align="center"
															>
																{jumlah}
															</Typography>{" "}
														</Col>
														<Col />
														<Col>
															<Typography
																color="textPrimary"
																variant="subtitle1"
																align="left"
															>
																{jumlah_atasan}
															</Typography>{" "}
														</Col>
													</Row>
													<Row>
														<Col md={4} xs={4}>
															{" "}
															<Typography
																color="textPrimary"
																variant="h6"
																align="left"
																style={{ marginTop: 20 }}
															>
																Nilai Sikap (40%)
															</Typography>{" "}
														</Col>
														<Col />
														<Col>
															<Typography
																color="textPrimary"
																variant="subtitle1"
																align="center"
																style={{ marginTop: 20 }}
															>
																{rekap}
															</Typography>{" "}
														</Col>
														<Col />
														<Col>
															<Typography
																color="textPrimary"
																variant="subtitle1"
																align="left"
																style={{ marginTop: 20 }}
															>
																{rekap_atasan}
															</Typography>{" "}
														</Col>
													</Row>
												</Fragment>
											) : (
												<Typography
													color="textSecondary"
													variant="h5"
													align="center"
												>
													Silahkan Pilih Anggota
												</Typography>
											)}
										</Col>
									</Row>
								</CardBody>
							</Card>
						</Col>
					</Row>
					{this.state.showKompetensi ? (
						<Row className="mt-5">
							<Col className="mb-5 mb-xl-0">
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
										{this.state.categories.map((category, i) => {
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
																	{this.state.form.map((data, i) => {
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
																									variant="body1"
																									align="left"
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

															<Grid item md={12} xs={12}>
																<TextField
																	fullWidth
																	label="Point Nilai"
																	margin="dense"
																	name="PointNilai"
																	value={nilai[i]}
																	type="number"
																	style={{ width: "25%" }}
																	InputProps={{
																		readOnly: true,
																	}}
																/>
															</Grid>
															<Grid item md={12} xs={12}>
																<TextareaAutosize
																	rowsMax={3}
																	aria-label="maximum height"
																	placeholder="Keterangan Nilai"
																	defaultValue={description[i]}
																	style={{ width: "100%" }}
																	disabled
																/>
															</Grid>

															<Grid item md={6} xs={12}>
																<TextField
																	fullWidth
																	label="Point Atasan"
																	margin="dense"
																	name="PointAtasan"
																	value={
																		nilai_atasan[i] === 0 ? "" : nilai_atasan[i]
																	}
																	onChange={this.handleChange(
																		i,
																		category.bobot
																	)}
																	variant="outlined"
																	type="number"
																/>
															</Grid>
															<Grid item md={6} xs={12}>
																<TextField
																	fullWidth
																	label="Skor"
																	margin="dense"
																	name="pointAtasan"
																	required
																	value={
																		nilai_atasan[i]
																			? (nilai_atasan[i] * category.bobot) / 100
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
																	aria-label="maximum height"
																	placeholder="Keterangan Nilai Atasan"
																	onChange={this.handleDesc(i)}
																	style={{ width: "100%" }}
																/>
															</Grid>
														</Grid>
													</UncontrolledCollapse>
													{i !== this.state.categories.length - 1 && (
														<Divider />
													)}
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
					) : null}
				</Container>
			</>
		);
	}
}

export default Index;
