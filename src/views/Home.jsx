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
} from "@material-ui/core";
// import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
// import DateFnsUtils from "@date-io/date-fns";

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
		nilai_atasan: 0,
		skor_atasan: 0,
		jumlah_atasan: 0,
		rekap_atasan: 0,
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
				this.setState({ assignment: json.response[0].nilai_atasan });
			})
			.finally(() => {
				if (this.state.assignment > 0) {
					swal({
						title: "Assignment Failed!",
						text:
							"Atasan anda telah melakukan assignment. anda tidak dapat merubah data ini lagi.",
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

	getNilai = () => {
		const { isExist, nik, periode } = this.state;

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
					this.setState({ nilai, isExist: [] });
				})
				.then(() => this.getAssignment())
				.catch((err) => console.log(err));
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
		const { nik } = this.state;
		this.setState({
			periode: event.target.value,
			nilai: [],
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
					jumlah: json.response[0].jumlah,
					rekap: json.response[0].rekap,
				});
			})
			.finally(() => {
				this.getNilai();
			})
			.catch(() => this.setState({ jumlah: "", rekap: "", nilai: [] }));
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
			nilai_atasan,
			skor_atasan,
			jumlah_atasan,
			rekap_atasan,
		} = this.state;

		const body = [];
		for (var i = 0; i < categories.length; i++) {
			body.push([
				nik,
				categories[i].code_category,
				categories[i].bobot,
				nilai[i],
				skor[i],
				jumlah,
				rekap,
				description[i],
				nilai_atasan,
				skor_atasan,
				jumlah_atasan,
				rekap_atasan,
				periode,
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
			}).then(() => window.scrollTo(0, 0));
		});
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
			categories,
		} = this.state;
		const option = [
			{ value: "periode1", label: "Periode 1 Jan-Apr" },
			{ value: "periode2", label: "Periode 2 May-Aug" },
			{ value: "periode3", label: "Periode 3 Sep-Des" },
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
											{/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
												<DatePicker
													autoOk
													animateYearScrolling
													views={["month", "year"]}
													label="Periode"
													minDate={new Date("2020-07-01")}
													maxDate={new Date("2030-01-01")}
													value={date}
													onChange={(date) => this.setState({ date })}
												/>
											</MuiPickersUtilsProvider> */}
										</Col>
									</Row>
								</CardHeader>
								<CardBody>
									<Row>
										<Col md={6} xs={7}>
											<Typography
												color="textPrimary"
												variant="h6"
												align="justify"
											>
												Kompetensi
											</Typography>
											{categories.map((data) => {
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
											{categories.map((data) => {
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
											{nilai.map((data, i) => {
												return (
													<Typography
														key={i}
														color="textSecondary"
														variant="subtitle1"
														align="center"
													>
														{nilai[i] ? data : 0}
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
											{categories.map((category, i) => {
												return (
													<Typography
														key={i}
														color="textSecondary"
														variant="subtitle1"
														align="center"
													>
														{nilai[i] ? (nilai[i] * category.bobot) / 100 : 0}
													</Typography>
												);
											})}
										</Col>
									</Row>
									<Divider />
									<Row>
										<Col md={6} xs={6}>
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
												{jumlah}
											</Typography>{" "}
										</Col>
									</Row>
									<Row>
										<Col md={6} xs={6}>
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
																{form.map((data, i) => {
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
																value={nilai.length > 0 ? nilai[i] : ""}
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
