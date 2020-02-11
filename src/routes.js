import Index from "views/Index.jsx";
import CreateProduct from "views/product/Create";
import ListProduct from "views/product/List";

var routes = [
  {
    path: "/index",
    name: "Home",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "/app"
  },
  {
    path: "/produk/create",
    name: "Create Product",
    icon: "ni ni-planet text-blue",
    component: CreateProduct,
    layout: "/app",
    invisible: true
  },
  {
    path: "/produk",
    name: "Produk",
    icon: "ni ni-planet text-blue",
    component: ListProduct,
    layout: "/app",
  },
];

export default routes;
