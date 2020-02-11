import React from "react"

// reactstrap components
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Input,
    Container,
    Row,
    Col
} from "reactstrap";
// core components
import Header from "components/Headers/Header.jsx"
import Progress from 'components/Progress'
import FileUploader from 'react-firebase-file-uploader'
import classnames from 'classnames'
import firebase from 'firebase'
import fire from "../../config";
import CurrencyFormat from 'react-currency-format';
import swal from 'sweetalert';

if (!firebase.apps.length) {
    firebase.initializeApp({ fire });
}

// const imageMaxSize = 2000000 // bytes

class CreateProduct extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            nama: "",
            harga: "",
            category: "Promotion",
            photo: "",
            photoUrl: "",
            progress: 0,
            value: ""
        }
    }

    handleUploadStart = () => {
        this.setState({
            isUploading: true,
            progress: 0
        })
    }

    handleProgress = progress => this.setState({ progress });

    handleUploadSuccess = filename => {
        console.log(this.state)
        this.setState({
            photo: filename,
            progress: 100
        })

        firebase.storage().ref('products').child(filename).getDownloadURL()
            .then(url => this.setState({
                photoUrl: url
            }))
    }

    handleChangeStatus = ({ meta }, status) => {
        console.log(status, meta)
    }

    onSubmit = e => {
        e.preventDefault()
        const db = fire.firestore();
        db.collection('products').add({
            nama: this.state.nama,
            harga: this.state.harga,
            category: this.state.category,
            photo: this.state.photo,
            photoUrl: this.state.photoUrl,
            createdAt: new Date()
        });
        this.setState({
            nama: "",
            harga: "",
            category: "",
            photo: "",
            photoUrl: "",
        })
        swal({
            title: "Berhasil!",
            text: "Data telah ditambahkan!",
            icon: "success",
            button: "OK",
        });
        this.props.history.push("/app/produk");

    }

    render() {
        console.log(this.state)
        const { nama, harga, category, isSubmitting, value } = this.state;
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
                                            <h3 className="mb-0">Tambah Produk</h3>
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
                                                            Nama Produk
                            </label>
                                                        <Input
                                                            className="form-control-alternative"
                                                            value={nama}
                                                            onChange={event =>
                                                                this.setState({
                                                                    nama: event.target.value
                                                                })
                                                            }
                                                            type="text"
                                                        />
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                            <Row>

                                                <div className="col-md-4">
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="input-harga"
                                                        >
                                                            Harga
														</label>
                                                        <InputGroup
                                                            className={classnames("input-group-merge")}
                                                        >
                                                            {/* <InputGroupAddon addonType="prepend">
                                                                <InputGroupText>Rp</InputGroupText>
                                                            </InputGroupAddon> */}
                                                            <CurrencyFormat
                                                                value={harga}
                                                                onValueChange={(values) => {
                                                                    const { formattedValue, value } = values;

                                                                    this.setState({ harga: formattedValue })
                                                                }}
                                                                thousandSeparator={true} prefix={'Rp. '} />
                                                            {/* <Input
                                                                value={harga}
                                                                onChange={event =>
                                                                    this.setState({
                                                                        harga: event.target.value
                                                                    })
                                                                }
                                                                type="number"

                                                            /> */}
                                                        </InputGroup>
                                                    </FormGroup>
                                                </div>
                                                <div className="col-md-4">
                                                    <Row>
                                                        <Col lg="6">
                                                            <FormGroup>
                                                                <label
                                                                    className="form-control-label"
                                                                    htmlFor="input-kategori"
                                                                >
                                                                    Kategori

                            </label>
                                                                <Input name="category"
                                                                    className="form-control-alternative"
                                                                    value={category}
                                                                    onChange={event =>
                                                                        this.setState({
                                                                            category: event.target.value
                                                                        })
                                                                    }
                                                                    type="select"
                                                                >
                                                                    <option value="Promotion">Promotion</option>
                                                                    <option value="Hot Product">Hot Product</option>
                                                                </Input>

                                                            </FormGroup>
                                                        </Col>
                                                    </Row>

                                                </div>

                                            </Row>

                                            <Row>
                                                <Col xl="12" >
                                                    <div>
                                                        <label className="form-control-label">Foto Produk</label><br />
                                                        <br />
                                                        {this.state.photo && <img alt={this.state.photo} src={this.state.photoUrl} style={{ padding: 15, width: 250, height: 300, resizeMode: 'center' }} />}
                                                        <FileUploader
                                                            accept="image/*"
                                                            name='photo'
                                                            storageRef={firebase.storage().ref('products')}
                                                            onUploadStart={this.handleUploadStart}
                                                            onUploadSuccess={this.handleUploadSuccess}
                                                        />
                                                        <Progress percentage={this.state.isUploading && this.state.progress + "%"} value={this.state.isUploading && this.state.progress} />
                                                    </div>
                                                </Col>
                                            </Row>
                                            <p></p>
                                            <Row>
                                                <Col lg="6" className="text-center">
                                                    <FormGroup>
                                                        <Button
                                                            color="danger"
                                                            onClick={() => this.props.history.push("/app/produk")}
                                                        >
                                                            Batal
                            </Button>
                                                        <Button
                                                            color="success"
                                                            type="submit"
                                                            disabled={isSubmitting}
                                                        >
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

export default CreateProduct;
