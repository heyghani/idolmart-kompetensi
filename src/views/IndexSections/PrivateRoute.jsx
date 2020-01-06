import React from "react"
import { Route, Redirect } from "react-router-dom"
import Cookies from "js-cookie"

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    Cookies.get("access_token")
      ? <Component {...props} />
      : <Redirect to={{ pathname: "/", state: { from: props.location } }} />
    )} 
  />
)

export default PrivateRoute
