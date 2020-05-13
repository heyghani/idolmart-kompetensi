import Index from "views/Index.jsx";
import CreateProduct from "views/product/Create";
import EditProduct from "views/product/Edit";
import ListProduct from "views/product/List";
import ListActivity from "views/activity/List";
import CreateActivity from "views/activity/Create";
import Settings from "views/setting/Setting";
import ListSettings from "views/setting/List";
import CreateCategory from "views/category/Create";
import ListCategory from "views/category/List";

var routes = [
	{
		path: "/index",
		name: "Home",
		icon: "ni ni-tv-2 text-primary",
		component: Index,
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
		path: "/produk/edit:id",
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
];

export default routes;
