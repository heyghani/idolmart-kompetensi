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
// import firebase from 'firebase'
import fire from "../../config";
import swal from "sweetalert";

const db = fire.firestore();

class ListProduct extends React.Component {
	state = {
		data: [],
	};

	componentDidMount() {
		this.getData();
	}

	getData = () => {
		db.collection("activities")
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
			})
			.catch((error) => {
				console.log("Error!", error);
			});
	};

	handleDelete = (id, filename) => {
		const db = fire.firestore();

		db.collection("activities")
			.doc(id)
			.delete()
			.then(() => {
				this.props.history.push("/app/activity");
				swal("Poof! Activity has been deleted!", {
					icon: "success",
				});
				this.getdata();
			})
			.catch((error) => {
				console.log("Error!", error);
			});
	};

	onClickAdd = () => {
		this.props.history.push("/app/activity/create");
	};

	onClickDelete = (id) => {
		swal({
			title: "Apakah anda yakin?",
			text: "tekan OK untuk menghapus data!",
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
											<h3>Data Activity</h3>
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
											<th scope="col">#</th>
											<th scope="col">Judul</th>
											<th scope="col">Caption</th>
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
																{data.data.judul}
															</span>
														</th>
														<td>
															{data.data.body.length > 50
																? `${data.data.body.slice(0, 50)}...`
																: data.data.body}
														</td>
														<td>
															<img
																alt={data.data.photo}
																className="img-fluid rounded-circle shadow"
																src={data.data.postImage}
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
																				`/app/activity/edit/${data.id}`
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

export default ListProduct;
