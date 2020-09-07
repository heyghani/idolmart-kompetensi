import React, { useState, useMemo, useEffect } from "react";
import Table from "../components/Table";

function ListKamus() {
	const [list, setList] = useState([]);

	useEffect(() => {
		(async () => {
			await fetch("http://localhost:5000/api/kamus/get", {
				method: "GET",
			})
				.then((res) => res.json())
				.then((json) => {
					setList(json.response);
				})
				.catch((err) => console.log(err));
		})();
	}, []);

	const column = useMemo(
		() => [
			{
				Header: "Kompetensi",
				accessor: "nama",
			},
			{
				Header: "Standard",
				accessor: "standard",
			},
			{
				Header: "Kamus",
				accessor: "kamus",
			},
		],
		[]
	);

	return <Table columns={column} data={list} />;
}

export default ListKamus;
