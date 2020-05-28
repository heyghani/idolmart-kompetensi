import React from "react";
// reactstrap components
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

class PaginationComponent extends React.Component {
	render() {
		return (
			<nav aria-label="..." style={{ marginTop: "15px" }}>
				<Pagination
					className="pagination justify-content-end mb-0"
					listClassName="justify-content-end mb-0"
				>
					{this.props.pageNumber === 1 ? null : (
						<PaginationItem>
							<PaginationLink onClick={this.props.handlePrevious} tabIndex="-1">
								<i className="fas fa-angle-left" />
								<span className="sr-only">Previous</span>
							</PaginationLink>
						</PaginationItem>
					)}
					<span style={{ marginTop: "0.4rem", cursor: "pointer" }}>
						{" "}
						{this.props.pageNumber}{" "}
					</span>
					<PaginationItem>
						<PaginationLink onClick={this.props.handleNext}>
							<i className="fas fa-angle-right" />
							<span className="sr-only">Next</span>
						</PaginationLink>
					</PaginationItem>
				</Pagination>
			</nav>
		);
	}
}

export default PaginationComponent;
