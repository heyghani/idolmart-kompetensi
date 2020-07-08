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

import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";

import Header from "components/Headers/Header.jsx";

class Index extends React.Component {
	state = {
		nilai: [],
		date: new Date().toISOString(),
		logo: "",
		logoUrl: "",
		nik: "",
		nama: "",
		divisi: "",
		jabatan: "",
		kode_jabatan: "",
		form: [],
		categories: [],
		rekap: [],
		skor: [],
	};

	componentWillMount = () => {
		this.getUser();
	};

	getUser = () => {
		fetch(`http://localhost:5000/api/user/${this.props.match.params.id}`, {
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
		newNilai[index] = event.target.value;
		newSkor[index] = (event.target.value * bobot) / 100;
		this.setState({
			nilai: newNilai,
			skor: newSkor,
		});
	};

	reduce = (total, num) => {
		return total + num;
	};

	onSubmit = (e) => {
		e.preventDefault();
		const { nik, nilai, skor, categories, date } = this.state;

		const body = [];
		for (var i = 0; i < categories.length; i++) {
			body.push([nik, categories[i].code_category, nilai[i], skor[i], date]);
		}
		console.log(body);
		fetch("http://localhost:5000/api/form", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				values: body,
			}),
		});
		this.setState({
			rekap: skor,
			jumlah: skor.reduceRight(this.reduce),
		});
	};

	render() {
		const { nik, nama, divisi, jabatan, date } = this.state;

		return (
			<>
				<Header />
				{/* Page content */}
				<Container className="mt--7" fluid>
					<Row>
						<Col xl="5">
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
											<h5 className="mt-0">Periode</h5>

											<DayPickerInput
												selectedDay={this.state.date}
												onDayChange={(date) => this.setState({ date })}
											/>
										</Col>
									</Row>
								</CardHeader>
								<CardBody>
									<Row>
										<Col md={7} xs={4}>
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
														color="textSecondary"
														variant="subtitle1"
														align="justify"
													>
														{data.nama}
													</Typography>
												);
											})}
										</Col>
										<Col md={3} xs={6}>
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
											{this.state.rekap.map((data, index) => {
												return (
													<Typography
														key={index}
														color="textSecondary"
														variant="subtitle1"
														align="center"
													>
														{data}
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
								</CardBody>
							</Card>
						</Col>
						<Col className="mb-5 mb-xl-0" xl="7">
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
													// onClick={() => this.getForm(id)}
												>
													{category.nama}
												</Button>
												<UncontrolledCollapse
													toggler={`#${id}`}
													style={{ padding: 15 }}
												>
													<Grid container spacing={3}>
														<Row>
															<Col md={4} xs={6}>
																<h2>Standard Nilai</h2>
																{this.state.form.map((data, i) => {
																	return (
																		<Typography
																			key={i}
																			color="textSecondary"
																			variant="h4"
																			style={{ marginBottom: 20 }}
																		>
																			{data.nama === category.nama
																				? data.standard
																				: null}
																		</Typography>
																	);
																})}
															</Col>
															<Col md={8} xs={6}>
																<h2>Kamus Penilaian</h2>
																{this.state.form.map((data, i) => {
																	return (
																		<Typography
																			key={i}
																			color="textSecondary"
																			variant="body2"
																		>
																			{data.nama === category.nama
																				? data.kamus
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
																	(this.state.nilai[i] * category.bobot) / 100
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
									color="primary"
									size="large"
									id="tj"
									style={{ width: "50%", margin: 10 }}
									onClick={this.onSubmit}
								>
									Save
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
