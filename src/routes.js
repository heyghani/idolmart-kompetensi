import Login from "views/Index.jsx";
import Home from "views/Home.jsx";
import NilaiAtasan from "views/NilaiAtasan";
import Roles from "views/Roles";
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
	},

	{
		path: "/roles",
		name: "Roles",
		icon: "ni ni-bullet-list-67 text-blue",
		component: Roles,
		layout: "/app",
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
