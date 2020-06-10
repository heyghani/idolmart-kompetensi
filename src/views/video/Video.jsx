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
import { Player } from "video-react";
import "video-react/dist/video-react.css"; // import css

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
		db.collection("video")
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

	handleDelete = (id) => {
		db.collection("settings")
			.doc(id)
			.delete()
			.then(() => {
				this.props.history.push("/app/video");
				swal("Poof! Your imaginary file has been deleted!", {
					icon: "success",
				});
			})
			.catch((error) => {
				console.log("Error!", error);
			});
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
											<h3>Data Video</h3>
										</Col>
									</Row>
								</CardHeader>

								<Table className="align-items-center table-flush" responsive>
									<thead className="thead-light">
										<tr>
											<th scope="col">Judul</th>
											<th scope="col">Deskripsi</th>
											<th scope="col">Video</th>
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
															<Player
																fluid={false}
																width={320}
																height={240}
																src={data.data.photoUrl}
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
																				`/app/video/edit/${data.id}`
																			)
																		}
																	>
																		<i
																			className="fas fa-pencil-alt"
																			style={{ color: "orange" }}
																		/>
																		Edit
																	</DropdownItem>
																	{/* <DropdownItem
																		onClick={() => this.onClickDelete(data.id)}
																	>
																		<i
																			className="fas fa-trash-alt"
																			style={{ color: "red" }}
																		/>
																		Delete
																	</DropdownItem> */}
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
