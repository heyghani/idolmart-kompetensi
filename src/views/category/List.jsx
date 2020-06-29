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

const db = fire.firestore();

export default class ListCategory extends React.Component {
	state = {
		nama: "",
		data: [],
	};

	componentDidMount() {
		this.getData();
	}

	getData = () => {
		db.collection("category")
			.get()
			.then((snapshot) => {
				let data = [];
				snapshot.forEach((doc) => {
					data.push({
						id: doc.id,
						data: doc.data(),
					});
					this.setState({ data });
				});
			});
	};

	handleDelete = (id) => {
		db.collection("category")
			.doc(id)
			.delete()
			.then(() => {
				this.props.history.push("/app/category");
				swal("Poof! Category has been deleted!", {
					icon: "success",
				});
				this.getData();
			})
			.catch((error) => {
				console.log("Error!", error);
			});
	};

	onClickAdd = () => {
		this.props.history.push("/app/category/create");
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
											<h3>Data category</h3>
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

								<Table className="align-items-center table-flush" responsive>
									<thead className="thead-light">
										<tr>
											<th scope="col">Category</th>
											<th scope="col">Color</th>
											<th scope="col">Action</th>
										</tr>
									</thead>
									<tbody>
										{Object.keys(this.state.data).map((key, index) => {
											let data = this.state.data[key];

											return (
												<tr key={data.id}>
													<th scope="row">
														<span className="mb-0 text-sm">
															{data.data.nama}
														</span>
													</th>
													<th scope="row">
														<Button
															style={{
																height: 30,
																width: 70,
																backgroundColor: data.data.select.color,
															}}
														></Button>
													</th>
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
																			`/app/category/edit/${data.id}`
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
