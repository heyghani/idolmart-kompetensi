import Login from "views/Index.jsx";
import Home from "views/Home.jsx";
import CreateProduct from "views/product/Create";
import EditProduct from "views/product/Edit";
import ListProduct from "views/product/List";
import ListActivity from "views/activity/List";
import CreateActivity from "views/activity/Create";
import EditActivity from "views/activity/Edit";
import CreateSlider from "views/slider/Create";
import ListSlider from "views/slider/List";
import EditSlider from "views/slider/Edit";
import CreateCategory from "views/category/Create";
import EditCategory from "views/category/Edit";
import ListCategory from "views/category/List";
import Logout from "views/Logout";
import Video from "views/video/Video";
import EditVideo from "views/video/Edit";
import Layout from "views/Layout";

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
		path: "/slider/create",
		name: "Create Slider",
		icon: "ni ni-settings-gear-65 text-blue",
		component: CreateSlider,
		layout: "/app",
		invisible: true,
	},
	{
		path: "/slider/edit/:id",
		name: "Edit Slider",
		icon: "ni ni-settings-gear-65 text-blue",
		component: EditSlider,
		layout: "/app",
		invisible: true,
	},
	{
		path: "/slider",
		name: "Slider",
		icon: "ni ni-image text-blue",
		component: ListSlider,
		layout: "/app",
	},
	{
		path: "/video/edit/:id",
		name: "Edit Video",
		icon: "ni ni-tablet-button text-blue",
		component: EditVideo,
		layout: "/app",
		invisible: true,
	},
	{
		path: "/video",
		name: "Video",
		icon: "ni ni-tablet-button text-blue",
		component: Video,
		layout: "/app",
	},
	{
		path: "/layout",
		name: "Layouts",
		icon: "ni ni-palette text-blue",
		component: Layout,
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
