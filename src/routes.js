import Login from "views/Index.jsx";
import Home from "views/Home.jsx";
import CreateProduct from "views/product/Create";
import EditProduct from "views/product/Edit";
import ListProduct from "views/product/List";
import ListActivity from "views/activity/List";
import CreateActivity from "views/activity/Create";
import EditActivity from "views/activity/Edit";
import Settings from "views/setting/Setting";
import ListSettings from "views/setting/List";
import CreateCategory from "views/category/Create";
import EditCategory from "views/category/Edit";
import ListCategory from "views/category/List";
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
		name: "Home",
		icon: "ni ni-tv-2 text-primary",
		component: Home,
		layout: "/app",
	},
	{
		path: "/produk/create",
		name: "Tambah Product",
		icon: "ni ni-planet text-blue",
		component: CreateProduct,
		layout: "/app",
		invisible: true,
	},
	{
		path: "/produk/edit/:id",
		name: "Edit Product",
		icon: "ni ni-planet text-blue",
		component: EditProduct,
		layout: "/app",
		invisible: true,
	},
	{
		path: "/produk",
		name: "Produk",
		icon: "ni ni-shop text-blue",
		component: ListProduct,
		layout: "/app",
	},
	{
		path: "/category/create",
		name: "Category",
		icon: "ni ni-app text-blue",
		component: CreateCategory,
		layout: "/app",
		invisible: true,
	},
	{
		path: "/category/edit/:id",
		name: "Edit Category",
		icon: "ni ni-app text-blue",
		component: EditCategory,
		layout: "/app",
		invisible: true,
	},
	{
		path: "/category",
		name: "Category",
		icon: "ni ni-app text-blue",
		component: ListCategory,
		layout: "/app",
	},
	{
		path: "/activity/create",
		name: "Tambah Activity",
		icon: "ni ni-world text-blue",
		component: CreateActivity,
		layout: "/app",
		invisible: true,
	},
	{
		path: "/activity/edit/:id",
		name: "Edit Activity",
		icon: "ni ni-app text-blue",
		component: EditActivity,
		layout: "/app",
		invisible: true,
	},
	{
		path: "/activity",
		name: "Activity",
		icon: "ni ni-world text-blue",
		component: ListActivity,
		layout: "/app",
	},
	{
		path: "/setting/create",
		name: "Customize",
		icon: "ni ni-settings-gear-65 text-blue",
		component: Settings,
		layout: "/app",
		invisible: true,
	},
	{
		path: "/setting",
		name: "Customize",
		icon: "ni ni-settings-gear-65 text-blue",
		component: ListSettings,
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
