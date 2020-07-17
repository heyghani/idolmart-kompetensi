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
	Table,
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
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

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
		selectedAnggota: "",
		showTable: false,
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
					showTable: false,
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

	getAnggota = () => {
		const { selectedAnggota, periode } = this.state;
		fetch(`http://localhost:5000/api/anggota`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				nik: selectedAnggota,
				periode,
			}),
		})
			.then((res) => res.json())
			.then((json) => {
				this.setState({
					karyawan: json.response,
					jumlah_atasan: json.response[0].jumlah_atasan,
					rekap_atasan: json.response[0].rekap_atasan,
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

	getSkor = () => {
		const { selectedAnggota, periode } = this.state;
		fetch(`http://localhost:5000/api/skor`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				nik: selectedAnggota,
				periode,
			}),
		})
			.then((res) => res.json())
			.then((json) => {
				const skor = json.response.map((doc) => doc.skor);
				this.setState({ skor });
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
		const { selectedAnggota, periode } = this.state;
		fetch(`http://localhost:5000/api/nilai`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				nik: selectedAnggota,
				periode,
			}),
		})
			.then((res) => res.json())
			.then((json) => {
				const nilai = json.response.map((doc) => doc.nilai);
				const nilai_atasan = json.response.map((doc) => doc.nilai_atasan);
				const description = json.response.map((doc) => doc.keterangan);
				this.setState({ nilai, nilai_atasan, description });
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

	getRekap = () => {
		const { selectedAnggota, periode } = this.state;
		fetch(`http://localhost:5000/api/rekap`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				nik: selectedAnggota,
				periode,
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

	onSelectPeriode = (event) => {
		this.setState({ periode: event.target.value });
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
					showTable: true,
				});
			})
			.finally(() => {
				this.getForm();
				this.getCategory();
				this.getDivisi();
				this.getSkor();
				this.getNilai();
				this.getRekap();
				this.getAnggota();
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
		} = this.state;

		const body = [];
		for (var i = 0; i < categories.length; i++) {
			body.push([
				selectedAnggota,
				categories[i].code_category,
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
				periode,
			]);
		}
		fetch("http://localhost:5000/api/delete", {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				nik: selectedAnggota,
				periode,
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
					periode,
				}),
			}).then(() => {
				swal({
					title: "Berhasil!",
					text: "Data telah ditambahkan!",
					icon: "success",
					button: "OK",
				}).then(() => this.getAnggota());
			});
		});
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
			jumlah,
			jumlah_atasan,
			rekap,
			rekap_atasan,
			selectedAnggota,
			anggota,
			karyawan,
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
											<TextField
												id="periode"
												select
												label="Pilih Periode"
												value={periode}
												onChange={this.onSelectPeriode}
												style={{ width: 190, marginLeft: 10 }}
											>
												{option.map((option) => (
													<MenuItem key={option.value} value={option.value}>
														{option.label}
													</MenuItem>
												))}
											</TextField>
											<TextField
												id="anggota-divisi"
												select
												label="Pilih Anggota Divisi"
												value={selectedAnggota}
												onChange={this.onSelectDivisi}
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
									{this.state.showTable ? (
										<Fragment>
											<Table
												className="align-items-center table-flush"
												responsive
											>
												<thead className="thead-light">
													<tr>
														<th scope="col">Kompentesi</th>
														<th scope="col">Bobot</th>
														<th scope="col">Nilai</th>
														<th scope="col">Skor</th>
														<th scope="col">Nilai Atasan</th>
														<th scope="col">Skor Atasan</th>
													</tr>
												</thead>
												<tbody>
													{karyawan.map((karyawan, index) => {
														return (
															<tr key={index}>
																<th scope="row">
																	<span className="mb-0 text-sm">
																		{karyawan.kompetensi}
																	</span>
																</th>
																<th scope="row">
																	<h5>{karyawan.bobot}</h5>
																</th>
																<th scope="row">
																	<h5>{karyawan.nilai}</h5>
																</th>
																<th scope="row">
																	<h5>{karyawan.skor}</h5>
																</th>
																<th scope="row">
																	<h5>{karyawan.nilai_atasan}</h5>
																</th>
																<th scope="row">
																	<h5>{karyawan.skor_atasan}</h5>
																</th>
															</tr>
														);
													})}
												</tbody>
											</Table>
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
																onChange={this.handleChange(i, category.bobot)}
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
