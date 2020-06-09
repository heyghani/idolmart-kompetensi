import React from "react";
import {
	Card,
	CardHeader,
	DropdownMenu,
	DropdownItem,
	FormGroup,
	UncontrolledDropdown,
	DropdownToggle,
	Table,
	Container,
	Row,
	Col,
	Button,
} from "reactstrap";
// core components
import Header from "components/Headers/Header.jsx";
import EdiText from "react-editext";
import fire from "../../config";
import swal from "sweetalert";

const db = fire.firestore();

class ListSetting extends React.Component {
	state = {
		data: [],
		phone: "",
	};

	componentDidMount() {
		this.getData();
		this.getCs();
	}

	getCs = () => {
		db.collection("admin")
			.doc("cs")
			.get()
			.then((doc) => this.setState({ phone: doc.data().phone }));
	};

	getData = () => {
		db.collection("setting")
			.orderBy("createdAt", "desc")
			.get()
			.then((snapshot) => {
				const data = [];
				snapshot.forEach((doc) => {
					data.push({
						data: doc.data(),
						id: doc.id,
					});
				});
				this.setState({ data: data });
				console.log(data);
			})
			.catch((error) => {
				console.log("Error!", error);
			});
	};

	handleCs = (val) => {
		db.collection("admin")
			.doc("cs")
			.update({ phone: val })
			.then(() => this.setState({ phone: val }));
	};

	handleDelete = (id) => {
		db.collection("settings")
			.doc(id)
			.delete()
			.then(() => {
				this.props.history.push("/app/setting");
				swal("Poof! Your imaginary file has been deleted!", {
					icon: "success",
				});
			})
			.catch((error) => {
				console.log("Error!", error);
			});
	};

	onClickAdd = () => {
		this.props.history.push("/app/setting/create");
	};

	onClickDelete = (id) => {
		swal({
			title: "Apakah anda yakin?",
			text: "tekan OK untuk menghapus file!",
			icon: "warning",
			buttons: true,
			dangerMode: true,
		}).then((willDelete) => {
			if (willDelete) {
				this.handleDelete(id);
			} else {
				swal("Your imaginary file is safe!");
			}
		});
	};

	render() {
		let id = 1;
		return (
			<>
				<Header />
				{/* Page content */}
				<Container className="mt--7" fluid>
					{/* Table */}
					<Row>
						<div className="col">
							<Card className="shadow">
								<CardHeader className="border-0">
									<Row>
										<Col xl="6">
											<h3>Data setting</h3>
										</Col>
										<Col sm={{ size: 1, offset: 5 }}>
											<Button
												className="float-left"
												color="primary"
												onClick={this.onClickAdd}
											>
												<i className="fas fa-plus" />
											</Button>
										</Col>
									</Row>
								</CardHeader>

								<Row>
									<Col
										xl="3"
										style={{ margin: 10, bottom: 10, marginLeft: 25 }}
									>
										<label className="form-control-label" htmlFor="input-nama">
											Customer Service
										</label>
										<EdiText
											type="text"
											value={this.state.phone}
											onSave={this.handleCs}
											editOnViewClick={true}
											showButtonsOnHover={true}
										/>
									</Col>
								</Row>

								<Table className="align-items-center table-flush" responsive>
									<thead className="thead-light">
										<tr>
											<th scope="col">#</th>
											<th scope="col">Judul</th>
											<th scope="col">Deskripsi</th>
											<th scope="col">Gambar</th>
											<th scope="col">Action</th>
										</tr>
									</thead>
									<tbody>
										{this.state.data &&
											this.state.data.map((data) => {
												return (
													<tr key={id}>
														<th>{id++}</th>
														<th scope="row">
															<span className="mb-0 text-sm">
																{data.data.nama}
															</span>
														</th>
														<th>{data.data.description}</th>
														<td>
															<img
																alt={data.data.photo}
																className="img-fluid rounded-circle shadow"
																src={data.data.photoUrl}
																style={{ width: 100, height: 100 }}
															/>
														</td>
														<td className="text-center">
															<UncontrolledDropdown>
																<DropdownToggle
																	className="btn-icon-only text-light"
																	href="#pablo"
																	role="button"
																	size="sm"
																	color=""
																	onClick={(e) => e.preventDefault()}
																>
																	<i className="fas fa-ellipsis-v" />
																</DropdownToggle>
																<DropdownMenu
																	className="dropdown-menu-arrow"
																	right
																>
																	<DropdownItem
																		onClick={() =>
																			this.props.history.push(
																				`/app/setting/edit/${data.id}`
																			)
																		}
																	>
																		<i
																			className="fas fa-pencil-alt"
																			style={{ color: "orange" }}
																		/>
																		Edit
																	</DropdownItem>
																	<DropdownItem
																		onClick={() => this.onClickDelete(data.id)}
																	>
																		<i
																			className="fas fa-trash-alt"
																			style={{ color: "red" }}
																		/>
																		Delete
																	</DropdownItem>
																</DropdownMenu>
															</UncontrolledDropdown>
														</td>
													</tr>
												);
											})}
									</tbody>
								</Table>
							</Card>
						</div>
					</Row>
				</Container>
			</>
		);
	}
}

export default ListSetting;
