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
		rekap_atasan: "",
		form: [],
		categories: [],
		skor: [],
		anggota: [],
		selectedAnggota: "",
	};

	componentWillMount = () => {
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
		fetch(`http://localhost:5000/api/skor/${selectedAnggota}`)
			.then((res) => res.json())
			.then((json) => {
				this.setState({ skor: json.response });
			});
	};

	getNilai = () => {
		const { selectedAnggota, date } = this.state;
		fetch(`http://localhost:5000/api/nilai/${selectedAnggota}`)
			.then((res) => res.json())
			.then((json) => {
				this.setState({ nilai: json.response });
			})
			.then(() => console.log(this.state.nilai));
	};

	getRekap = () => {
		const { selectedAnggota, date } = this.state;
		fetch(`http://localhost:5000/api/rekap/${selectedAnggota}`)
			.then((res) => res.json())
			.then((json) => {
				this.setState({
					jumlah: json.response[0].jumlah,
					rekap: json.response[0].rekap,
				});
			});
	};

	handleChange = (index, bobot) => (event) => {
		const { nilai, skor } = this.state;
		const newNilai = nilai.slice(0);
		const newSkor = skor.slice(0);
		const reducer = (accumulator, currentValue) => accumulator + currentValue;
		newNilai[index] = event.target.value;
		newSkor[index] = (event.target.value * bobot) / 100;
		this.setState({
			nilai: newNilai,
			skor: newSkor,
			jumlah: skor.reduce(reducer, 0).toFixed(2),
		});
		this.handleNilai();
	};

	handleNilai = () => {
		const { jumlah } = this.state;
		const rumus = (jumlah * 40) / 100;
		const rekap = rumus.toFixed(2);
		this.setState({ rekap });
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
		const { nik, nilai, skor, categories, date, jumlah, rekap } = this.state;

		const body = [];
		for (var i = 0; i < categories.length; i++) {
			body.push([
				nik,
				categories[i].code_category,
				nilai[i],
				skor[i],
				jumlah,
				rekap,
				date,
			]);
		}

		fetch("http://localhost:5000/api/form", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				values: body,
			}),
		}).then(() => {
			swal({
				title: "Berhasil!",
				text: "Data telah ditambahkan!",
				icon: "success",
				button: "OK",
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
						<Col xl="6">
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
												/>
											</MuiPickersUtilsProvider>
											<TextField
												id="anggota-divisi"
												select
												label="Pilih Anggota Divisi"
												value={selectedAnggota}
												onChange={this.onSelect}
												style={{ width: "100%" }}
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
										<Col md={6}>
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
												variant="h6"
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
												variant="h6"
												align="center"
											>
												Nilai
											</Typography>
											{this.state.nilai.map((value, index) => {
												return (
													<Typography
														key={index}
														color="textSecondary"
														variant="subtitle1"
														align="center"
													>
														{this.state.nilai ? value.nilai : 0}
													</Typography>
												);
											})}
										</Col>
										<Col>
											<Typography
												color="textPrimary"
												variant="h6"
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
									</Row>
									<Divider />
									<Row>
										<Col md={7} xs={4}>
											{" "}
											<Typography
												color="textPrimary"
												variant="h6"
												align="justify"
											>
												Jumlah
											</Typography>{" "}
										</Col>
										<Col md={3} xs={6} />
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
										<Col md={7} xs={4}>
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
										<Col md={3} xs={6} />
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
						<Col className="mb-5 mb-xl-0" xl="6">
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
																value={nilai_atasan}
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
