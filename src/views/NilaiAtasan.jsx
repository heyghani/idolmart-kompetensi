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
} from "@material-ui/core";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

import swal from "sweetalert";

import Header from "components/Headers/Header.jsx";
import { set } from "date-fns/esm";

class Index extends React.Component {
	state = {
		rekap: null,
		nilai: [],
		date: new Date(),
		logo: "",
		logoUrl: "",
		nik: "",
		nama: "",
		jumlah: "",
		divisi: "",
		kode_divisi: "",
		jabatan: "",
		kode_jabatan: "",
		nilai_atasan: [],
		skor_atasan: [],
		jumlah_atasan: "",
		rekap_atasan: null,
		form: [],
		categories: [],
		skor: [],
		anggota: [],
		selectedAnggota: "",
	};

	componentDidMount = () => {
		this.getUser();
	};

	getUser = () => {
		const nik = localStorage.getItem("nik");
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
				});
			})
			.finally(() => {
				this.getForm();
				this.getCategory();
				this.getDivisi();
			});
	};

	getForm = () => {
		fetch(`http://localhost:5000/api/form/${this.state.kode_jabatan}`, {
			method: "GET",
		})
			.then((res) => res.json())
			.then((json) => {
				this.setState({ form: json.response });
			});
	};

	getCategory = () => {
		fetch(`http://localhost:5000/api/category/${this.state.kode_jabatan}`)
			.then((res) => res.json())
			.then((json) => {
				this.setState({ categories: json.response });
			});
	};

	getDivisi = () => {
		fetch(`http://localhost:5000/api/divisi/${this.state.kode_divisi}`)
			.then((res) => res.json())
			.then((json) => {
				this.setState({ anggota: json.response });
			});
	};

	getSkor = () => {
		const { selectedAnggota, date } = this.state;
		const month = date.toString().slice(4, 7);
		const year = date.toString().slice(11, 15);
		fetch(`http://localhost:5000/api/skor`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				nik: selectedAnggota,
				date: month + " " + year,
			}),
		})
			.then((res) => res.json())
			.then((json) => {
				this.setState({ skor: json.response });
			})
			.catch((err) => console.log(err));
	};

	getNilai = () => {
		const { selectedAnggota, date } = this.state;
		const month = date.toString().slice(4, 7);
		const year = date.toString().slice(11, 15);
		fetch(`http://localhost:5000/api/nilai`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				nik: selectedAnggota,
				date: month + " " + year,
			}),
		})
			.then((res) => res.json())
			.then((json) => {
				const nilai = json.response.map((doc) => doc.nilai);
				this.setState({ nilai });
			})
			.catch((err) => console.log(err));
	};

	getRekap = () => {
		const { selectedAnggota, date } = this.state;
		const month = date.toString().slice(4, 7);
		const year = date.toString().slice(11, 15);
		fetch(`http://localhost:5000/api/rekap`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				nik: selectedAnggota,
				date: month + " " + year,
			}),
		})
			.then((res) => res.json())
			.then((json) => {
				this.setState({
					jumlah: json.response[0].jumlah,
					rekap: json.response[0].rekap,
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

	handleChange = (index, bobot) => (event) => {
		const { nilai_atasan, skor_atasan } = this.state;
		const newNilai = nilai_atasan.slice(0);
		const newSkor = skor_atasan.slice(0);
		const reducer = (accumulator, currentValue) => accumulator + currentValue;
		newNilai[index] = event.target.value;
		newSkor[index] = (event.target.value * bobot) / 100;
		this.setState({
			nilai_atasan: newNilai,
			skor_atasan: newSkor,
			jumlah_atasan: skor_atasan.reduce(reducer, 0).toFixed(2),
		});
		this.handleNilai();
	};

	handleNilai = () => {
		const { jumlah_atasan } = this.state;
		const rumus = (jumlah_atasan * 40) / 100;
		const rekap_atasan = rumus.toFixed(2);
		this.setState({ rekap_atasan });
	};

	reduce = (total, num) => {
		return total + num;
	};

	onSelect = (event) => {
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
				});
			})
			.finally(() => {
				this.getForm();
				this.getCategory();
				this.getDivisi();
				this.getSkor();
				this.getNilai();
				this.getRekap();
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
			nilai_atasan,
			skor_atasan,
			categories,
			date,
			jumlah_atasan,
			rekap_atasan,
		} = this.state;
		const month = date.toString().slice(4, 7);
		const year = date.toString().slice(11, 15);

		const body = [];
		for (var i = 0; i < categories.length; i++) {
			body.push([
				selectedAnggota,
				categories[i].code_category,
				nilai[i].nilai,
				skor[i].skor,
				jumlah,
				rekap,
				nilai_atasan[i],
				skor_atasan[i],
				jumlah_atasan,
				rekap_atasan,
				month + " " + year,
			]);
		}

		fetch("http://localhost:5000/api/delete", {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				nik: selectedAnggota,
				date: month + " " + year,
			}),
		}).then(() => {
			fetch("http://localhost:5000/api/update", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					values: body,
					nik: selectedAnggota,
					date: month + " " + year,
				}),
			}).then(() => {
				swal({
					title: "Berhasil!",
					text: "Data telah ditambahkan!",
					icon: "success",
					button: "OK",
				});
			});
		});
	};

	render() {
		const {
			nik,
			nama,
			divisi,
			jabatan,
			date,
			nilai,
			nilai_atasan,
			skor,
			jumlah,
			rekap,
			selectedAnggota,
			anggota,
		} = this.state;
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
											<MuiPickersUtilsProvider utils={DateFnsUtils}>
												<DatePicker
													autoOk
													animateYearScrolling
													views={["year", "month"]}
													label="Periode"
													minDate={new Date("2020-07-01")}
													maxDate={new Date("2030-01-01")}
													value={date}
													onChange={(date) => this.setState({ date })}
													style={{ marginLeft: 10 }}
												/>
											</MuiPickersUtilsProvider>
											<TextField
												id="anggota-divisi"
												select
												label="Pilih Anggota Divisi"
												value={selectedAnggota}
												onChange={this.onSelect}
												style={{ width: 190, marginLeft: 10 }}
											>
												{anggota.map((anggota) => (
													<MenuItem key={anggota.nik} value={anggota.nik}>
														{anggota.nik} - {anggota.name}
													</MenuItem>
												))}
											</TextField>
										</Col>
									</Row>
								</CardHeader>
								<CardBody>
									<Row>
										<Col md={4}>
											<Typography
												color="textPrimary"
												variant="h6"
												align="justify"
											>
												Kompetensi
											</Typography>
											{this.state.categories.map((data) => {
												return (
													<Typography
														key={data.id}
														color="textPrimary"
														variant="subtitle1"
														align="justify"
													>
														{data.nama}
													</Typography>
												);
											})}
										</Col>
										<Col>
											<Typography
												color="textPrimary"
												variant="body1"
												align="center"
											>
												Bobot
											</Typography>
											{this.state.categories.map((data) => {
												return (
													<Typography
														key={data.id}
														color="textSecondary"
														variant="subtitle1"
														align="center"
													>
														{data.bobot}
													</Typography>
												);
											})}
										</Col>

										<Col>
											<Typography
												color="textPrimary"
												variant="body1"
												align="center"
											>
												Nilai
											</Typography>
											{nilai.map((data, i) => {
												return (
													<Typography
														key={i}
														color="textSecondary"
														variant="subtitle1"
														align="center"
													>
														{data}
													</Typography>
												);
											})}
										</Col>

										<Col>
											<Typography
												color="textPrimary"
												variant="body1"
												align="center"
											>
												Skor
											</Typography>
											{this.state.skor.map((value, index) => {
												return (
													<Typography
														key={index}
														color="textSecondary"
														variant="subtitle1"
														align="center"
													>
														{this.state.skor ? value.skor : 0}
													</Typography>
												);
											})}
										</Col>
										<Col>
											<Typography
												color="textPrimary"
												variant="body1"
												align="center"
											>
												Nilai Atasan
											</Typography>
											{this.state.skor.map((value, index) => {
												return (
													<Typography
														key={index}
														color="textSecondary"
														variant="subtitle1"
														align="center"
													>
														{this.state.skor ? value.skor : 0}
													</Typography>
												);
											})}
										</Col>
										<Col>
											<Typography
												color="textPrimary"
												variant="body2"
												align="center"
											>
												Skor Atasan
											</Typography>
											{this.state.skor.map((value, index) => {
												return (
													<Typography
														key={index}
														color="textSecondary"
														variant="subtitle1"
														align="center"
													>
														{this.state.skor ? value.skor : 0}
													</Typography>
												);
											})}
										</Col>
									</Row>
									<Divider />
									<Row>
										<Col md={6}>
											{" "}
											<Typography
												color="textPrimary"
												variant="h6"
												align="justify"
											>
												Jumlah
											</Typography>{" "}
										</Col>
										<Col />
										<Col />
										<Col>
											<Typography
												color="textPrimary"
												variant="subtitle1"
												align="center"
											>
												{this.state.jumlah}
											</Typography>{" "}
										</Col>
									</Row>
									<Row>
										<Col md={6} xs={4}>
											{" "}
											<Typography
												color="textPrimary"
												variant="h6"
												align="justify"
												style={{ marginTop: 20 }}
											>
												Nilai Sikap (40%)
											</Typography>{" "}
										</Col>
										<Col />
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
									</Row>
								</CardBody>
							</Card>
						</Col>
					</Row>
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
										const id = category.code_category;
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
																		<Typography
																			key={i}
																			color="textPrimary"
																			variant="body1"
																			style={{ marginBottom: 20 }}
																		>
																			{data.nama === category.nama
																				? data.standard +
																				  " | ".concat(data.kamus)
																				: null}
																			{data.nama === category.nama && (
																				<Divider />
																			)}
																		</Typography>
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
																required
																variant="outlined"
																type="number"
																disabled
															/>
														</Grid>

														<Grid item md={6} xs={12}>
															<TextField
																fullWidth
																label="Point Atasan"
																margin="dense"
																name="PointAtasan"
																onChange={this.handleChange(i, category.bobot)}
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
																name="pointAtasan"
																required
																value={
																	nilai_atasan[i]
																		? (nilai_atasan[i] * category.bobot) / 100
																		: 0
																}
																disabled
																variant="outlined"
															/>
														</Grid>
													</Grid>
												</UncontrolledCollapse>
												{i !== this.state.categories.length - 1 && <Divider />}
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
