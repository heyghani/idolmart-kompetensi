import React from "react";
import {
	Card,
	CardHeader,
	DropdownMenu,
	DropdownItem,
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
import fire from "../../config";
import swal from "sweetalert";
import EdiText from "react-editext";

const db = fire.firestore();

class Listslider extends React.Component {
	state = {
		data: [],
		limit: 0,
	};

	componentDidMount() {
		this.getData();
		this.getLimit();
	}

	getData = () => {
		db.collection("slider")
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

	getLimit = () => {
		db.collection("slider")
			.doc("limit")
			.get()
			.then((doc) => this.setState({ limit: doc.data().limit }));
	};

	handleLimit = (val) => {
		let limit = parseInt(val);
		db.collection("slider")
			.doc("limit")
			.update({ limit: limit })
			.then(() => this.setState({ limit }));
	};

	handleDelete = (id) => {
		db.collection("slider")
			.doc(id)
			.delete()
			.then(() => {
				this.props.history.push("/app/slider");
				swal("Poof! Your imaginary file has been deleted!", {
					icon: "success",
				});
			})
			.catch((error) => {
				console.log("Error!", error);
			});
	};

	onClickAdd = () => {
		this.props.history.push("/app/slider/create");
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
											<h3>Data Slider</h3>
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
									<Col md="6" style={{ marginLeft: 22 }}>
										<label>Jumlah slider : </label>
										<EdiText
											type="number"
											value={this.state.limit}
											onSave={this.handleLimit}
											editOnViewClick={true}
											showButtonsOnHover={true}
										/>
									</Col>
								</Row>

								<Table className="align-items-center table-flush" responsive>
									<thead className="thead-light">
										<tr>
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
													<tr key={data.id}>
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
																				`/app/slider/edit/${data.id}`
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

export default Listslider;
