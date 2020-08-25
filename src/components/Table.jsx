import React from "react";
import { useTable } from "react-table";
import {
	TableContainer,
	Table,
	TableHead,
	TableBody,
	TableRow,
	TableCell,
	Paper,
} from "@material-ui/core";
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
	} = useTable({
		columns,
		data,
	});

	/* 
    Render the UI for your table
    - react-table doesn't have UI, it's headless. We just need to put the react-table props from the Hooks, and it will do its magic automatically
  */
	return (
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
								<StyledTableCell align="center" {...column.getHeaderProps()}>
									{column.render("Header")}
								</StyledTableCell>
							))}
						</TableRow>
					))}
				</TableHead>
				<TableBody {...getTableBodyProps()}>
					{rows.map((row, i) => {
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
	);
}
