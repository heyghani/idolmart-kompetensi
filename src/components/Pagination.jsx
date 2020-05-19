import React from "react";
// reactstrap components
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

class PaginationComponent extends React.Component {
	getNumberOfPages() {
		const { limit, total } = this.props;
		return Math.ceil(total / limit);
	}

	handleLimitChange = (e) => {
		const { onChangePaging } = this.props;
		onChangePaging({ limit: Number(e.target.value), page: 1 });
	};

	handlePrevious = () => {
		const { onChangePaging, page } = this.props;
		onChangePaging({ page: page - 1 });
	};

	handleNext = () => {
		const { onChangePaging, page } = this.props;
		onChangePaging({ page: page + 1 });
	};

	handleFirst = () => {
		const { onChangePaging } = this.props;
		onChangePaging({ page: 1 });
	};

	handleLast = () => {
		const { onChangePaging } = this.props;
		onChangePaging({ page: this.getNumberOfPages() });
	};

	render() {
		const { limit, page, total } = this.props;
		const numPages = this.getNumberOfPages();
		const lastIndex = page * limit;
		const firstIndex = lastIndex - limit + 1;
		const status =
			page === numPages
				? `${firstIndex}-${total} dari ${total}`
				: `${firstIndex}-${lastIndex} dari ${total}`;
		const disabledLesser = page === 1 && "disabled";
		const disabledGreater = page === numPages && "disabled";

		return (
			<nav aria-label="..." style={{ marginTop: "15px" }}>
				<Pagination
					className="pagination justify-content-end mb-0"
					listClassName="justify-content-end mb-0"
				>
					<PaginationItem className={disabledLesser}>
						<PaginationLink onClick={this.handleFirst} tabIndex="-1">
							<i className="fas fa-angle-double-left" />
							<span className="sr-only">First</span>
						</PaginationLink>
					</PaginationItem>
					<PaginationItem className={disabledLesser}>
						<PaginationLink onClick={this.handlePrevious} tabIndex="-1">
							<i className="fas fa-angle-left" />
							<span className="sr-only">Previous</span>
						</PaginationLink>
					</PaginationItem>
					<span style={{ marginTop: "0.4rem", cursor: "pointer" }}>
						{status}
					</span>
					<PaginationItem className={disabledGreater}>
						<PaginationLink onClick={this.handleNext}>
							<i className="fas fa-angle-right" />
							<span className="sr-only">Next</span>
						</PaginationLink>
					</PaginationItem>
					<PaginationItem className={disabledGreater}>
						<PaginationLink onClick={this.handleLast}>
							<i className="fas fa-angle-double-right" />
							<span className="sr-only">Last</span>
						</PaginationLink>
					</PaginationItem>
				</Pagination>
			</nav>
		);
	}
}

export default PaginationComponent;
