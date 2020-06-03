import React from "react";
import {
	Badge,
	Card,
	CardHeader,
	DropdownMenu,
	DropdownItem,
	UncontrolledDropdown,
	DropdownToggle,
	Input,
	Table,
	Container,
	Row,
	Col,
	Button,
} from "reactstrap";
// core components
import Header from "components/Headers/Header.jsx";
import Pagination from "components/Pagination.jsx";
import SearchField from "react-search-field";
import fire from "../../config";
import swal from "sweetalert";

const db = fire.firestore();

class ListProduct extends React.Component {
	state = {
		data: [],
		pageNumber: 1,
		last: null,
		first: null,
		status: true,
		limit: 10,
		search: "",
		error: "",
	};

	componentDidMount() {
		this.getdata();
	}

	getAllData = () => {
		const first = db.collection("products").orderBy("nama").limit(10);
		first
			.get()
			.then((snapshot) => {
				let last = snapshot.docs[snapshot.docs.length - 1].data().nama;

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
		const first = db.collection("products").orderBy("nama").limit(limit);
		first
			.get()
			.then((snapshot) => {
				let last = snapshot.docs[snapshot.docs.length - 1].data().nama;

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
		db.collection("products")
			.orderBy("nama")
			.endBefore(first)
			.limit(limit)
			.get()
			.then((snapshot) => {
				let last = snapshot.docs[snapshot.docs.length - 1].data().nama;
				let first = snapshot.docs[0].data().nama;

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
		db.collection("products")
			.orderBy("nama")
			.startAfter(last)
			.limit(limit)
			.get()
			.then((snapshot) => {
				let last = snapshot.docs[snapshot.docs.length - 1].data().nama;
				let first = snapshot.docs[0].data().nama;

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

	handleDelete = (data) => {
		db.collection("products")
			.doc(data.id)
			.delete()
			.then(() => {
				this.props.history.push("/app/produk");
				swal(`Poof! ${data.data.nama} has been deleted!`, {
					icon: "success",
				});
				this.getdata();
			})
			.catch((error) => {
				console.log("Error!", error);
			});
	};

	handleSearch = (search) => {
		const index = search.toUpperCase();
		this.setState({ error: "" });
		db.collection("products")
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

		db.collection("products")
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

	onChangeStatus = (id) => {
		db.collection("products")
			.doc(id)
			.get()
			.then((doc) => {
				this.setState({
					status: doc.data().status,
				});
			})
			.then(() => {
				this.setState({
					status: !this.state.status,
					pageNumber: 1,
				});
				db.collection("products")
					.doc(id)
					.update({
						status: this.state.status,
					})
					.then(() => {
						this.getdata();
						swal("Status updated!", {
							icon: "success",
						});
					});
			})
			.catch((error) => {
				console.log("Error!", error);
			});
	};

	onClickEdit = (data) => {
		this.props.history.push(`/app/produk/edit/${data.id}`);
	};

	onClickAdd = () => {
		this.props.history.push("/app/produk/create");
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
											<h3>Data Produk</h3>
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
											<th scope="col">Produk</th>
											<th scope="col">Harga</th>
											<th scope="col">Category</th>
											<th scope="col">Status</th>
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
														<td>{data.data.harga}</td>
														<td>
															<Badge color="" className="badge-dot mr-4">
																{data.data.category}
															</Badge>
														</td>
														<th scope="row">
															<Button
																onClick={() => this.onChangeStatus(data.id)}
																style={{
																	color: "white",
																	fontSize: 10,
																	alignItems: "center",
																	justifyContent: "center",
																	height: 30,
																	width: 100,
																	backgroundColor: data.data.status
																		? "#36B37E"
																		: "#FF5630",
																}}
															>
																{data.data.status ? "Active" : "Non Active"}
															</Button>
														</th>
														<td>
															{data.data.description.length > 50
																? `${data.data.description.slice(0, 50)}...`
																: data.data.description}
														</td>
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
																		onClick={() => this.onClickEdit(data)}
																	>
																		<i
																			className="fas fa-pencil-alt"
																			style={{ color: "orange" }}
																		/>
																		Edit
																	</DropdownItem>
																	<DropdownItem
																		onClick={() => this.onClickDelete(data)}
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

export default ListProduct;
