import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import * as serviceWorker from "./serviceWorker";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import firebase from "firebase";
import fire from "config";

import "assets/vendor/nucleo/css/nucleo.css";
import "assets/vendor/@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";

import AdminLayout from "layouts/Admin.jsx";
import AuthLayout from "layouts/Auth.jsx";

const hist = createBrowserHistory();

if (!firebase.apps.length) {
	firebase.initializeApp({ fire });
}

// const session = localStorage.getItem("UserLogin");
// if (session) {
// 	hist.push("/app/home");
// } else {
// 	hist.push("/auth/index");
// }

// const PrivateRoute = ({ component: Component, ...rest }) => (
// 	<Route
// 		{...rest}
// 		render={(props) =>
// 			session ? (
// 				<Component {...props} />
// 			) : (
// 				<Redirect to={{ pathname: "/auth/index" }} />
// 			)
// 		}
// 	/>
// );

ReactDOM.render(
	<Router history={hist}>
		<Switch>
			<Route path="/app" component={AdminLayout} />
			<Route path="/auth" render={(props) => <AuthLayout {...props} />} />
			<Redirect from="/" to="/auth/index" />
		</Switch>
	</Router>,
	document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
