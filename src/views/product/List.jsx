import React from "react";
import {
    Badge,
    Card,
    CardHeader,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    DropdownToggle,
    Media,
    Table,
    Container,
    Row,
    Col,
    Button,

} from "reactstrap";
// core components
import Header from "components/Headers/Header.jsx";
import firebase from 'firebase'
import fire from "../../config";
import swal from 'sweetalert';


class ListProduct extends React.Component {

    state = {
        nama: "",
        harga: "",
        category: "",
        photo: "",
        photoUrl: "",
        data: []
    }

    componentDidMount() {
        const db = fire.firestore()

        db.collection('products').orderBy('nama', 'asc').get()
            .then(snapshot => {
                const data = []
                snapshot.forEach(doc => {
                    console.log(doc.data())
                    data.push(doc.data())
                })
                this.setState({ data: data })
            }).catch(error => {
                console.log('Error!', error);
            })

    }

    handleDelete = () => {
        const db = fire.firestore()
        const ref = db.collection('products').doc()
        const id = ref.id

        ref.id.delete()
            .then(() => {
                swal("Poof! Your imaginary file has been deleted!", {
                    icon: "success",
                });
                this.props.history.push("/app/produk");
            }).catch(error => {
                console.log('Error!', error);
            })
    }

    onClickAdd = () => {
        this.props.history.push("/app/produk/create");
    };

    onClickDelete = () => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this imaginary file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    this.handleDelete()
                } else {
                    swal("Your imaginary file is safe!");
                }
            });
    }

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

                                <Table className="align-items-center table-flush" responsive>
                                    <thead className="thead-light">
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Produk</th>
                                            <th scope="col">Harga</th>
                                            <th scope="col">Category</th>
                                            <th scope="col">Gambar</th>
                                            <th scope="col">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.data && this.state.data.map((data, i) => {

                                            return (
                                                <tr key={i}>
                                                    <th>{i++}</th>
                                                    <th scope="row">

                                                        <span className="mb-0 text-sm">
                                                            {data.nama}
                                                        </span>

                                                    </th>
                                                    <td>{data.harga}</td>
                                                    <td>
                                                        <Badge color="" className="badge-dot mr-4">
                                                            {data.category}
                                                        </Badge>
                                                    </td>
                                                    <td>

                                                        <img
                                                            alt={data.photo}
                                                            className="img-fluid rounded-circle shadow"
                                                            src={data.photoUrl}
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
                                                                onClick={e => e.preventDefault()}
                                                            >
                                                                <i className="fas fa-ellipsis-v" />
                                                            </DropdownToggle>
                                                            <DropdownMenu className="dropdown-menu-arrow" right>
                                                                <DropdownItem
                                                                    href="#pablo"
                                                                    onClick={e => e.preventDefault()}
                                                                >
                                                                    Edit
                            </DropdownItem>
                                                                <DropdownItem
                                                                    href="#pablo"
                                                                    onClick={this.onClickDelete}
                                                                >
                                                                    Delete
                            </DropdownItem>

                                                            </DropdownMenu>
                                                        </UncontrolledDropdown>
                                                    </td>
                                                </tr>
                                            )
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
