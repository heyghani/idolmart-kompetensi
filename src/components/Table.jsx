import React, { Fragment } from "react";
import { useTable, useSortBy, usePagination } from "react-table";
import {
	TableContainer,
	Table,
	TableHead,
	TableBody,
	TableRow,
	TableCell,
	Paper,
} from "@material-ui/core";
import { Row, Col } from "reactstrap";
import { withStyles, makeStyles } from "@material-ui/core/styles";

const StyledTableCell = withStyles((theme) => ({
	head: {
		backgroundColor: theme.palette.common.black,
		color: theme.palette.common.white,
	},
	body: {
		fontSize: 14,
	},
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
	root: {
		"&:nth-of-type(odd)": {
			backgroundColor: theme.palette.action.hover,
		},
	},
}))(TableRow);

const useStyles = makeStyles({
	table: {
		minWidth: 700,
	},
});

export default function ReactTable({ columns, data }) {
	// Use the useTable Hook to send the columns and data to build the table

	const classes = useStyles();

	const {
		getTableProps, // table props from react-table
		getTableBodyProps, // table body props from react-table
		headerGroups, // headerGroups, if your table has groupings
		rows, // rows for the table based on the data passed
		prepareRow, // Prepare the row (this function needs to be called for each row before getting the row props)
		page,
		canPreviousPage,
		canNextPage,
		pageOptions,
		pageCount,
		gotoPage,
		nextPage,
		previousPage,
		setPageSize,
		state: { pageIndex, pageSize },
	} = useTable(
		{
			columns,
			data,
			initialState: { pageIndex: 0 },
		},
		useSortBy,
		usePagination
	);

	/* 
    Render the UI for your table
    - react-table doesn't have UI, it's headless. We just need to put the react-table props from the Hooks, and it will do its magic automatically
  */
	return (
		<Fragment>
			<TableContainer component={Paper}>
				<Table
					className={classes.table}
					aria-label="customized table"
					{...getTableProps()}
				>
					<TableHead>
						{headerGroups.map((headerGroup) => (
							<TableRow {...headerGroup.getHeaderGroupProps()}>
								{headerGroup.headers.map((column) => (
									<TableCell
										align="center"
										{...column.getHeaderProps(column.getSortByToggleProps())}
									>
										<Row>
											<Col>{column.render("Header")}</Col>
											<Col>
												<span>
													{column.isSorted
														? column.isSortedDesc
															? " 🔽"
															: " 🔼"
														: ""}
												</span>
											</Col>
										</Row>
									</TableCell>
								))}
							</TableRow>
						))}
					</TableHead>
					<TableBody {...getTableBodyProps()}>
						{page.map((row, i) => {
							prepareRow(row);
							return (
								<StyledTableRow {...row.getRowProps()}>
									{row.cells.map((cell) => {
										return (
											<StyledTableCell align="center" {...cell.getCellProps()}>
												{cell.render("Cell")}
											</StyledTableCell>
										);
									})}
								</StyledTableRow>
							);
						})}
					</TableBody>
				</Table>
			</TableContainer>
			<div style={{ marginTop: 10 }}>
				<button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
					{"<<"}
				</button>{" "}
				<button onClick={() => previousPage()} disabled={!canPreviousPage}>
					{"<"}
				</button>{" "}
				<button onClick={() => nextPage()} disabled={!canNextPage}>
					{">"}
				</button>{" "}
				<button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
					{">>"}
				</button>{" "}
				<span>
					Page{" "}
					<strong>
						{pageIndex + 1} of {pageOptions.length}
					</strong>{" "}
				</span>
				<span>
					| Go to page:{" "}
					<input
						type="number"
						defaultValue={pageIndex + 1}
						onChange={(e) => {
							const page = e.target.value ? Number(e.target.value) - 1 : 0;
							gotoPage(page);
						}}
						style={{ width: "100px" }}
					/>
				</span>{" "}
				<select
					value={pageSize}
					onChange={(e) => {
						setPageSize(Number(e.target.value));
					}}
				>
					{[10, 20, 30, 40, 50].map((pageSize) => (
						<option key={pageSize} value={pageSize}>
							Show {pageSize}
						</option>
					))}
				</select>
			</div>
		</Fragment>
	);
}
