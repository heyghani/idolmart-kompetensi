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
	Button
} from "reactstrap";
// core components
import Header from "components/Headers/Header.jsx";
import ListSlider from "./ListSlider";
// import firebase from 'firebase'
import fire from "../../config";
import swal from "sweetalert";

class ListSetting extends React.Component {
	state = {
		data: []
	};

	componentDidMount() {
		const db = fire.firestore();

		db.collection("setting")
			.orderBy("createdAt", "desc")
			.get()
			.then(snapshot => {
				const data = [];
				snapshot.forEach(doc => {
					data.push({
						data: doc.data(),
						id: doc.id
					});
				});
				this.setState({ data: data });
				console.log(data);
			})
			.catch(error => {
				console.log("Error!", error);
			});
	}

	handleDelete = (id, filename) => {
		const db = fire.firestore();
		// const ref = fire.storage().refFromURL(filename)

		// ref.delete().then(() => {
		//     console.log(`${filename} deleted`)
		// }).catch(error => {
		//     console.log('Error!', error)
		// })

		db.collection("settings")
			.doc(id)
			.delete()
			.then(() => {
				this.props.history.push("/app/setting");
				swal("Poof! Your imaginary file has been deleted!", {
					icon: "success"
				});
			})
			.catch(error => {
				console.log("Error!", error);
			});
	};

	onClickAdd = () => {
		this.props.history.push("/app/setting/create");
	};

	onClickDelete = id => {
		swal({
			title: "Apakah anda yakin?",
			text: "tekan OK untuk menghapus file!",
			icon: "warning",
			buttons: true,
			dangerMode: true
		}).then(willDelete => {
			if (willDelete) {
				this.handleDelete(id);
			} else {
				swal("Your imaginary file is safe!");
			}
		});
	};

	handleOnChange = event => {
		const image = event.target.files[0];
		console.log(image);
	};

	render() {
		let id = 1;
		return (
			<>
				<Header />
				{/* Page content */}
				<Container className="mt--7" fluid>
					{/* Table */}
					<ListSlider />
				</Container>
			</>
		);
	}
}

export default ListSetting;
