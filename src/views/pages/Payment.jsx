/*!

=========================================================
* Argon Design System React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-design-system-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-design-system-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";

// reactstrap components
import { Container, Row } from "reactstrap";

// core components
import DemoNavbar from "components/Navbars/DemoNavbar.jsx";
import CardsFooter from "components/Footers/CardsFooter.jsx";

// index page sections




class Index extends React.Component {
  componentDidMount() {
    window.snap.status("", {onSuccess: console.log})
    
  }
  render() {https://demos.creative-tim.com/argon-design-system-react/#/documentation/overview
    
    return (
      <>
       <h1>Hallo</h1>
      </>
    );
  }
}

export default Index;
