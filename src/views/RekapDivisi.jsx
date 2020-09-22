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
import { Card, CardHeader, CardBody, Container, Row, Col } from "reactstrap";
import { TextField, Typography, MenuItem } from "@material-ui/core";

import Table from "../components/Table";
import swal from "sweetalert";

import Header from "components/Headers/Header.jsx";

class Index extends React.Component {
	state = {
		showTable: false,
		department: [],
		karyawan: [],
		nilai: [],
		periode: "",
		nik: "",
		nama: "",
		divisi: "",
		selectedDivisi: "",
		jabatan: "",
		kode_jabatan: "",
		kode_divisi: "",
		level_jabatan: "",
		kelas: "",
	};

	componentDidMount = () => {
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
					kode_divisi: json.response[0].kode_divisi,
					level_jabatan: json.response[0].level_jabatan,
					kelas: json.response[0].kelas,
				});
			})
			.finally(() => {
				this.getCategory();
				this.getDepartment();
			})
			.catch((err) => console.log(err));
	};

	getCategory = () => {
		fetch(`http://localhost:5000/api/category/all`)
			.then((res) => res.json())
			.then((json) => {
				this.setState({ categories: json.response });
			});
	};

	getDepartment = () => {
		fetch(`http://localhost:5000/api/department/get`)
			.then((res) => res.json())
			.then((json) => {
				this.setState({ department: json.response });
			});
	};

	onSelectPeriode = (event) => {
		this.setState({ periode: event.target.value });
	};

	onSelectDepartment = (event) => {
		this.setState({ selectedDivisi: event.target.value, showTable: false });

		fetch(`http://localhost:5000/api/report/get`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				kode_divisi: event.target.value,
				periode: this.state.periode,
			}),
		})
			.then((res) => res.json())
			.then((json) => {
				if (json.error) {
					swal({
						title: "Warning!",
						text: json.response,
						icon: "warning",
						button: "OK",
					});
				} else {
					this.setState({
						nilai: json.response,
						showTable: true,
					});
				}
			})
			.catch((err) => console.log(err));
	};

	Tabel = () => {
		const columns = [
			{
				Header: "Karyawan",
				columns: [
					{
						Header: (props) => <b>NIK</b>,
						accessor: "nik",
						Cell: (props) => (
							<Typography align="left">{props.value}</Typography>
						),
					},
					{
						Header: (props) => <b>Nama</b>,
						accessor: "nama",
						Cell: (props) => (
							<Typography align="left" style={{ width: 200 }}>
								{" "}
								{props.value}{" "}
							</Typography>
						),
					},
					{
						Header: (props) => <b>Jabatan</b>,
						accessor: "jabatan",
						Cell: (props) => (
							<Typography align="left" style={{ width: 150 }}>
								{" "}
								{props.value}{" "}
							</Typography>
						),
					},
					{
						Header: (props) => <b>Jumlah</b>,
						accessor: "jumlah",
						Cell: (props) => <b>{props.value}</b>,
					},
					{
						Header: (props) => <b>Skor</b>,
						accessor: "skor",
						Cell: (props) => <b>{props.value}</b>,
					},
				],
			},
			{
				Header: "Kompetensi",
				columns: this.state.categories.map((doc, i) => ({
					Header: (props) => (
						<Typography
							color="textSecondary"
							variant="caption"
							align="center"
							style={{ width: 150 }}
						>
							{doc.nama}
						</Typography>
					),
					accessor: `nilai[${i}].nilai`,
				})),
			},
		];

		return <Table columns={columns} data={this.state.nilai} />;
	};

	render() {
		const {
			nik,
			nama,
			divisi,
			jabatan,
			periode,
			department,
			selectedDivisi,
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
												id="periode"
												select
												label="Pilih Department"
												value={selectedDivisi}
												onChange={this.onSelectDepartment}
												style={{ width: 190, marginLeft: 10 }}
											>
												{department.map((option) => (
													<MenuItem
														key={option.divisi_id}
														value={option.kode_divisi}
													>
														{option.nama}
													</MenuItem>
												))}
											</TextField>
										</Col>
									</Row>
								</CardHeader>
								<CardBody>
									<Row>
										<Col>
											{this.state.showTable ? (
												this.Tabel()
											) : (
												<Typography
													color="textSecondary"
													variant="h5"
													align="center"
												>
													Silahkan Pilih Periode
												</Typography>
											)}
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

export default Index;
