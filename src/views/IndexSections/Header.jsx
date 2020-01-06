import React from "react";

// reactstrap components
import { Container, Row, Col } from "reactstrap";

class Header extends React.Component {
	render() {
		return (
			<>
				<div className="header bg-gradient-info pb-1 pt-8 pt-md">
					<Container fluid>
						<div className="header-body">
							<Row>
								<Col lg="6" xl="3">
								</Col>
							</Row>
						</div>
					</Container>
				</div>
			</>
		);
	}
}

export default Header;
