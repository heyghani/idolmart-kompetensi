/*eslint-disable*/
import React from "react";
// reactstrap components
import { Container, Row, Col } from "reactstrap";

class Login extends React.Component {
    render() {
        return (
            <>
                <footer className="py-5">
                    <Container>
                        <Row className=" align-items-center justify-content-xl-between">
                            <Col>
                                <div className="copyright text-center text-muted">
                                    © {`${new Date().getFullYear()} PraxisLabs`}
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </footer>
            </>
        );
    }
}

export default Login;
