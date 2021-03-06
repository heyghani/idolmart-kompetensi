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
import React, { Fragment, useMemo } from "react";

// reactstrap components
import { Card, CardHeader, CardBody, Container, Row, Col } from "reactstrap";
import {
	TextField,
	Typography,
	MenuItem,
	// TableContainer,
	// Table,
	// TableHead,
	// TableBody,
	// TableRow,
	// TableCell,
	// Paper,
} from "@material-ui/core";

import Table from "../components/Table";
import swal from "sweetalert";

import Header from "components/Headers/Header.jsx";

class Index extends React.Component {
	state = {
		showTable: false,
		categories: [],
		karyawan: [],
		nilai: [],
		nik: "",
		nama: "",
		divisi: "",
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
				this.getAnggota();
				this.getCategory();
			})
			.catch((err) => console.log(err));
	};

	getAnggota = () => {
		const { kelas, kode_divisi } = this.state;
		fetch(`http://localhost:5000/api/report/anggota`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				kode_divisi,
				kelas,
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

	getCategory = () => {
		fetch(`http://localhost:5000/api/category/all`)
			.then((res) => res.json())
			.then((json) => {
				this.setState({ categories: json.response });
			});
	};

	onSelectPeriode = (event) => {
		this.setState({ periode: event.target.value, showTable: true });
		fetch(`http://localhost:5000/api/report/get`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				kelas: this.state.kelas,
				kode_divisi: this.state.kode_divisi,
				periode: event.target.value,
			}),
		})
			.then((res) => res.json())
			.then((json) => {
				this.setState({
					nilai: json.response,
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

	Tabel = () => {
		const columns = [
			{
				Header: "Karyawan",
				columns: [
					{
						Header: "Nik",
						accessor: "nik",
					},
					{
						Header: "Nama",
						accessor: "name",
					},
					{
						Header: "Jabatan",
						accessor: "jabatan",
					},
				],
			},
			{
				Header: "Kompetensi",
				columns: this.state.categories.map((doc, i) => ({
					Header: doc.kode_kompetensi,
					accessor: doc.kode_kompetensi,
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
			categories,
			karyawan,
			nilai,
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
										</Col>
									</Row>
								</CardHeader>
								<CardBody>
									<Row>
										<Col>{this.Tabel()}</Col>
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
