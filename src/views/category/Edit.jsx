import React from "react";

// reactstrap components
import {
	Button,
	Card,
	CardHeader,
	CardBody,
	FormGroup,
	Form,
	Input,
	Container,
	Row,
	Col,
} from "reactstrap";
// core components
import Header from "components/Headers/Header.jsx";
import firebase from "firebase";
import fire from "../../config";
import swal from "sweetalert";
import Select from "react-select";
import chroma from "chroma-js";

const db = fire.firestore();

const colourOptions = [
	{ value: "black", label: "Black", color: "#000", isFixed: true },
	{ value: "chocolate", label: "Chocolate", color: "#7e4a35", isFixed: true },
	{ value: "brown", label: "Brown", color: "#dac292", isFixed: true },
	{ value: "ocean", label: "Ocean", color: "#00B8D9", isFixed: true },
	{ value: "blue", label: "Blue", color: "#0052CC", isFixed: true },
	{ value: "purple", label: "Purple", color: "#5243AA" },
	{ value: "red", label: "Red", color: "#FF5630", isFixed: true },
	{ value: "pink", label: "Pink", color: "#f7786b", isFixed: true },
	{ value: "orange", label: "Orange", color: "#FF8B00" },
	{ value: "yellow", label: "Yellow", color: "#FFC400" },
	{ value: "green", label: "Green", color: "#36B37E" },
	{ value: "forest", label: "Forest", color: "#00875A" },
	{ value: "slate", label: "Slate", color: "#253858" },
	{ value: "silver", label: "Silver", color: "#666666" },
];

const dot = (color = "#ccc") => ({
	alignItems: "center",
	display: "flex",

	":before": {
		backgroundColor: color,
		borderRadius: 10,
		content: '" "',
		display: "block",
		marginRight: 8,
		height: 10,
		width: 10,
	},
});

const colourStyles = {
	control: (styles) => ({ ...styles, backgroundColor: "white" }),
	option: (styles, { data, isDisabled, isFocused, isSelected }) => {
		const color = chroma(data.color);
		return {
			...styles,
			backgroundColor: isDisabled
				? null
				: isSelected
				? data.color
				: isFocused
				? color.alpha(0.1).css()
				: null,
			color: isDisabled
				? "#ccc"
				: isSelected
				? chroma.contrast(color, "white") > 2
					? "white"
					: "black"
				: data.color,
			cursor: isDisabled ? "not-allowed" : "default",

			":active": {
				...styles[":active"],
				backgroundColor:
					!isDisabled && (isSelected ? data.color : color.alpha(0.3).css()),
			},
		};
	},
	input: (styles) => ({ ...styles, ...dot() }),
	placeholder: (styles) => ({ ...styles, ...dot() }),
	singleValue: (styles, { data }) => ({ ...styles, ...dot(data.color) }),
};

export default class CreateCategory extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			id: null,
			nama: "",
			color: "",
		};
	}

	componentDidMount = () => {
		db.collection("category")
			.doc(`product_category/${this.props.match.params.nama}`)
			.onSnapshot((doc) => {
				this.setState({
					nama: doc.data().nama,
				});
			});
	};

	onSubmit = (e) => {
		e.preventDefault();
		const { nama, id, color } = this.state;
		const categoryRef = db.collection("category").doc("product_category");

		categoryRef
			.update({
				category: firebase.firestore.FieldValue.arrayUnion({
					id: id + 1,
					nama,
					color,
				}),
			})
			.then(() => {
				swal({
					title: "Berhasil!",
					text: `${nama} telah ditambahkan!`,
					icon: "success",
					button: "OK",
				});
				this.props.history.push("/app/category");
			})
			.catch((err) => console.log(err));
	};

	render() {
		const { nama } = this.state;
		return (
			<>
				<Header />
				{/* Page content */}
				<Container className="mt--5" fluid>
					<Row>
						<Col className="order-xl-1" xl="12">
							<Card className="bg-secondary shadow">
								<CardHeader className="bg-white border-0">
									<Row className="align-items-center">
										<Col>
											<h3 className="mb-0">Category</h3>
										</Col>
									</Row>
								</CardHeader>

								<CardBody>
									<Form role="form" onSubmit={this.onSubmit}>
										<div className="pl-lg-4">
											<Row>
												<Col lg="6">
													<FormGroup>
														<label
															className="form-control-label"
															htmlFor="input-nama"
														>
															Nama Category
														</label>
														<Input
															className="form-control-alternative"
															value={nama}
															onChange={(event) =>
																this.setState({
																	nama: event.target.value,
																})
															}
															type="text"
														/>
													</FormGroup>
												</Col>
											</Row>
											<Row>
												<Col lg="6">
													<FormGroup>
														<label
															className="form-control-label"
															htmlFor="input-warna"
														>
															Warna Category
														</label>
														<Select
															defaultValue={colourOptions[0]}
															label="Single select"
															options={colourOptions}
															styles={colourStyles}
															onChange={(select) => {
																this.setState({ color: select.color });
															}}
														/>
													</FormGroup>
												</Col>
											</Row>

											<Row>
												<Col lg="6" className="text-center">
													<FormGroup>
														<Button
															color="danger"
															onClick={() =>
																this.props.history.push("/app/category")
															}
														>
															Batal
														</Button>
														<Button color="success" type="submit">
															Save
														</Button>
													</FormGroup>
												</Col>
											</Row>
										</div>
									</Form>
								</CardBody>
							</Card>
						</Col>
					</Row>
				</Container>
			</>
		);
	}
}
