import Login from "views/Index.jsx";
import Home from "views/Home.jsx";
import NilaiAtasan from "views/NilaiAtasan";
import ReportNilai from "views/ReportNilai";
import Roles from "views/Roles";
import Bobot from "views/RekapBobot";
import Kompetensi from "views/Kompetensi";
import Logout from "views/Logout";

var routes = [
	{
		path: "/index",
		name: "Login",
		icon: "ni ni-tv-2 text-primary",
		component: Login,
		layout: "/auth",
		invisible: true,
	},
	{
		path: "/home",
		name: "Form Karyawan",
		icon: "ni ni-book-bookmark text-primary",
		component: Home,
		layout: "/app",
	},
	{
		path: "/atasan",
		name: "Nilai Atasan",
		icon: "ni ni-archive-2 text-blue",
		component: NilaiAtasan,
		layout: "/app",
		class: true,
	},
	{
		path: "/report",
		name: "Report Karyawan",
		icon: "ni ni-archive-2 text-blue",
		component: ReportNilai,
		layout: "/app",
		class: true,
	},

	{
		path: "/kompetensi",
		name: "Kompetensi",
		icon: "ni ni-books text-blue",
		component: Kompetensi,
		layout: "/app",
		permission: "admin",
	},
	{
		path: "/bobot",
		name: "Rekap Bobot",
		icon: "ni ni-diamond text-blue",
		component: Bobot,
		layout: "/app",
		permission: "admin",
	},
	{
		path: "/roles",
		name: "Setting",
		icon: "ni ni-bullet-list-67 text-blue",
		component: Roles,
		layout: "/app",
		permission: "admin",
	},
	{
		path: "/logout",
		name: "Logout",
		icon: "ni ni-button-power text-blue",
		component: Logout,
		layout: "/app",
	},
];

export default routes;
