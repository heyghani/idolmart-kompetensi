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
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

import swal from "sweetalert";

import Header from "components/Headers/Header.jsx";

class Index extends React.Component {
	state = {
		rekap: null,
		nilai: [],
		date: new Date(),
		logo: "",
		logoUrl: "",
		nik: "",
		nama: "",
		divisi: "",
		jabatan: "",
		kode_jabatan: "",
		nilai_atasan: 0,
		skor_atasan: 0,
		jumlah_atasan: 0,
		rekap_atasan: 0,
		form: [],
		categories: [],
		skor: [],
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
				});
			})
			.finally(() => {
				this.getForm();
				this.getCategory();
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

	onSubmit = (e) => {
		e.preventDefault();
		const {
			nik,
			nilai,
			skor,
			categories,
			date,
			jumlah,
			rekap,
			nilai_atasan,
			skor_atasan,
			jumlah_atasan,
			rekap_atasan,
		} = this.state;

		const body = [];
		const month = date.toString().slice(4, 7);
		const year = date.toString().slice(11, 15);
		for (var i = 0; i < categories.length; i++) {
			body.push([
				nik,
				categories[i].code_category,
				nilai[i],
				skor[i],
				jumlah,
				rekap,
				nilai_atasan,
				skor_atasan,
				jumlah_atasan,
				rekap_atasan,
				month + " " + year,
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
		const { nik, nama, divisi, jabatan, date, rekap } = this.state;

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
												Skor
											</Typography>
											{this.state.categories.map((category, i) => {
												return (
													<Typography
														key={i}
														color="textSecondary"
														variant="subtitle1"
														align="center"
													>
														{this.state.nilai[i]
															? (this.state.nilai[i] * category.bobot) / 100
															: 0}
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
										<Col md={6}>
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
														<Grid item md={6} xs={12}>
															<TextField
																fullWidth
																label="Point Nilai"
																margin="dense"
																name="PointNilai"
																onChange={this.handleChange(i, category.bobot)}
																required
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
																value={
																	this.state.nilai[i]
																		? (this.state.nilai[i] * category.bobot) /
																		  100
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
