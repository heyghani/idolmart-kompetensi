import React from "react";
import {
	Card,
	CardHeader,
	DropdownMenu,
	DropdownItem,
	UncontrolledDropdown,
	DropdownToggle,
	Table,
	Input,
	Container,
	Row,
	Col,
	Button,
} from "reactstrap";
// core components
import Header from "components/Headers/Header.jsx";
import Pagination from "components/Pagination";
import SearchField from "react-search-field";
import fire from "../../config";
import swal from "sweetalert";

const db = fire.firestore();

class ListActivity extends React.Component {
	state = {
		data: [],
		pageNumber: 1,
		last: null,
		first: null,
		limit: 10,
		search: "",
		error: "",
	};

	componentDidMount() {
		this.getdata();
	}

	getdata = (limit) => {
		if (!limit) {
			limit = 10;
		} else if (limit === "10") {
			limit = 10;
		} else if (limit === "20") {
			limit = 20;
		} else if (limit === "50") {
			limit = 50;
		}
		const first = db.collection("activities").orderBy("judul").limit(limit);
		first
			.get()
			.then((snapshot) => {
				let last = snapshot.docs[snapshot.docs.length - 1].data().judul;

				const data = [];
				snapshot.forEach((doc) => {
					data.push({
						data: doc.data(),
						id: doc.id,
					});
					this.setState({ data, last });
				});
			})
			.catch((error) => {
				console.log("Error!", error);
			});
	};

	handleChange = (event) => {
		this.setState({ limit: event.target.value });
		this.getdata(event.target.value);
	};

	handlePrevious = (limit) => {
		const { first, pageNumber } = this.state;

		if (!limit) {
			limit = 10;
		} else if (limit === "10") {
			limit = 10;
		} else if (limit === "20") {
			limit = 20;
		} else if (limit === "50") {
			limit = 50;
		}
		db.collection("activities")
			.orderBy("judul")
			.endBefore(first)
			.limit(limit)
			.get()
			.then((snapshot) => {
				let last = snapshot.docs[snapshot.docs.length - 1].data().judul;
				let first = snapshot.docs[0].data().judul;

				let data = [];
				snapshot.forEach((doc) => {
					data.push({
						data: doc.data(),
						id: doc.id,
					});
					this.setState({ data, last, first, pageNumber: pageNumber - 1 });
				});
			});
	};

	handleNext = (limit) => {
		const { last, pageNumber } = this.state;

		if (!limit) {
			limit = 10;
		} else if (limit === "10") {
			limit = 10;
		} else if (limit === "20") {
			limit = 20;
		} else if (limit === "50") {
			limit = 50;
		}
		db.collection("activities")
			.orderBy("judul")
			.startAfter(last)
			.limit(limit)
			.get()
			.then((snapshot) => {
				let last = snapshot.docs[snapshot.docs.length - 1].data().judul;
				let first = snapshot.docs[0].data().judul;

				const next = [];
				snapshot.forEach((doc) => {
					next.push({
						data: doc.data(),
						id: doc.id,
					});
					this.setState({
						data: next,
						last,
						first,
						pageNumber: pageNumber + 1,
					});
				});
			})
			.catch(() => {
				alert("last page");
			});
	};

	handleDelete = (id) => {
		db.collection("activities")
			.doc(id)
			.delete()
			.then(() =>
				swal("Poof! Activity has been deleted!", {
					icon: "success",
				})
			)
			.finally(() => window.location.reload(false))
			.catch((error) => {
				console.log("Error!", error);
			});
	};

	handleSearch = (search) => {
		const index = search.toUpperCase();
		console.log(index);
		this.setState({ error: "" });
		db.collection("activities")
			.orderBy("index")
			.startAt(index)
			.endAt(index + "\uf8ff")
			.get()
			.then((snapshot) => {
				if (!snapshot.empty) {
					const data = [];
					snapshot.forEach((doc) => {
						data.push({
							id: doc.id,
							data: doc.data(),
						});
						this.setState({ data, index });
					});
				} else {
					this.setState({ error: "Item not found" });
				}
			});
	};

	onEnter = (search) => {
		if (search === "") {
			window.location.reload(false);
		}

		db.collection("activities")
			.where("nama", "==", search + "\uf8ff")
			.orderBy("nama")
			.get()
			.then((snapshot) => {
				if (!snapshot.empty) {
					let data = [];
					snapshot.forEach((doc) => {
						data.push({
							id: doc.id,
							data: doc.data(),
						});
						this.setState({ data });
						console.log(data);
					});
				} else {
					this.setState({ error: "Item not found" });
				}
			});
	};

	onClickEdit = (id) => {
		this.props.history.push(`/app/activity/edit/${id}`);
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

								<Row>
									<Col xl="3" style={{ margin: 10, bottom: 10 }}>
										<SearchField
											placeholder="Search item"
											onEnter={(search) => {
												this.onEnter(search);
											}}
											onSearchClick={(search) => {
												this.onEnter(search);
											}}
											onChange={(search) => this.handleSearch(search)}
										/>
										<p>{this.state.error}</p>
									</Col>
								</Row>

								<Table className="align-items-center table-flush" responsive>
									<thead className="thead-light">
										<tr>
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
													<tr key={data.id}>
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
								<Row>
									<Col sm={{ size: 2.5 }} style={{ marginLeft: 20 }}>
										<Input
											value={this.state.limit}
											onChange={this.handleChange}
											type="select"
										>
											<option value="10">10 rows</option>
											<option value="20">20 rows</option>
											<option value="50">50 rows</option>
										</Input>
									</Col>
									<Col style={{ marginRight: 20 }}>
										<Pagination
											handlePrevious={() =>
												this.handlePrevious(this.state.limit)
											}
											handleNext={() => this.handleNext(this.state.limit)}
											pageNumber={this.state.pageNumber}
											lastPage={this.state.lastPage}
										/>
									</Col>
								</Row>
							</Card>
						</div>
					</Row>
				</Container>
			</>
		);
	}
}

export default ListActivity;
