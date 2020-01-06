

// export default DemoNavbar;
import React, {useState} from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
// JavaScript plugin that hides or shows a component based on your scroll
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faHome, faBookOpen, faBell, faUserCircle, faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import Cookies from "js-cookie";
import Auth from "services/Auth";
import SweetAlert from 'react-bootstrap-sweetalert';
import Sidebar from "../Sidebar/Sidebar";

// reactstrap components
import {
	Media,
	Button,
	UncontrolledCollapse,
	NavbarBrand,
	Navbar,
	Container,
	Row,
	Col,
	Nav,
	NavLink,
	NavItem,
	UncontrolledDropdown,
	Collapse,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
	Input,
	InputGroupAddon,
	InputGroupText,
	InputGroup
} from "reactstrap";
// import { setSourceMapRange } from "typescript";

const localData = JSON.parse(localStorage.getItem("data"));

class DemoNavbar extends React.Component {
	state = {
		alert: null
	}

	// logout = () => {
	// 	Auth.clearAuthCookies();
	// 	this.props.history.push("/");
	// };


  showAlert() {
    const getAlert = () => (
      <SweetAlert
        warning
        showCancel
        confirmBtnText="Yes!"
        confirmBtnBsStyle="warning"
        cancelBtnBsStyle="default"
        title="Are you sure you want to logout?"
        onConfirm={() => this.logout()}
        onCancel={() => this.cancelLogout()}
      >
      </SweetAlert>
    );
    this.setState({
      alert: getAlert()
    });
  }

  logout = () => {
		Auth.clearAuthCookies();
		this.props.history.push("/");
    this.setState({
      alert: null
    });
  }

  cancelLogout() {
    this.setState({
      alert: null
    });
  }

	render() {
		return (
			<>
				<header className="header-global">
				{this.state.alert}
					<Navbar
						className="navbar-horizontal bg-primary navbar-dark fixed-top"
						expand="lg"
						id="navbar-main"
					>
						  
						<Container fluid>
							<Sidebar/>
							<NavbarBrand className="ml-lg-5" to="/" tag={Link}>
								<img
									alt="..."
									src={require("assets/img/brand/logo healthcare.png")}
								/>
							</NavbarBrand>

							<button className="navbar-toggler" id="navbar_global">
								<span className="navbar-toggler-icon"/>
							</button>
							<UncontrolledCollapse navbar toggler="#navbar_global">
								<div className="navbar-collapse-header">
									<Row>
										<Col className="collapse-brand"  xs="6">
											<Link to="/">
												<img
													alt="..."
													src={require("assets/img/brand/logo healthcare.png")}
												/>
											</Link>
										</Col>
										<Col className="collapse-close" xs="6">
											<button className="navbar-toggler" id="navbar_global">
												<span />
												<span />
											</button>
										</Col>
									</Row>
								</div>
								<Nav className="ml-auto" navbar>
								{/* <Button
									className="btn-icon btn-2 mr-1"
									color="primary"
									type="button"
									
								>
									<span className="btn-inner--icon mr-1">
										<i className="fa fa-home" style={{color: "black"}}/>
									</span>
									<span className="btn-inner--text">Beranda</span>
								</Button>
								<Button
									className="btn-icon btn-2 mr
									-1"
									color="primary"
									type="button"
									
								>
									<span className="btn-inner--icon mr-1">
										<i className="fa fa-envelope" />
									</span>
									<span className="btn-inner--text">Pesanan</span>
								</Button>
								<Button
									className="btn-icon btn-2 mr
									-1"
									color="primary"
									type="button"
									
								>
									<span className="btn-inner--icon mr-1">
										<i className="fa fa-bell" />
									</span>
									<span className="btn-inner--text">Notifikasi</span>
								</Button>
								<Button
									className="btn-icon btn-2 mr
									-1"
									color="primary"
									type="button"
									
								>
									<span className="btn-inner--icon mr-1">
										<i className="fa fa-user" />
									</span>
									<span className="btn-inner--text">Profil</span>
								</Button>
								<Button className="btn-icon btn-2" color="primary" type="button">
								<a href="/login-page" style={{color: "white"}}>
									<span className="btn-inner--icon">
									<i class="fa fa-sign-in" aria-hidden="true"></i>

									</span>
									<span className="btn-inner--text">Login</span>
								</a>		
								</Button>
								
								  */}
										<NavItem>
											<NavLink tag={Link} to={'/page-1'} style={{color: "white"}}> <FontAwesomeIcon icon={faHome} style={{color: "black"}} className="mr-2"/>Beranda</NavLink>
										</NavItem>
										<NavItem>
											<NavLink tag={Link} to={'/page-2'} style={{color: "white"}}> <FontAwesomeIcon icon={faBookOpen} style={{color: "black"}} className="mr-2"/>Pesanan</NavLink>
										</NavItem>
										<NavItem>
											<NavLink tag={Link} to={'/page-3'} style={{color: "white"}}> <FontAwesomeIcon icon={faBell} style={{color: "black"}} className="mr-2 text-center"/>Notifikasi</NavLink>
										</NavItem>
										{!!Cookies.get("name") && 

										<Nav className="align-items-left d-md-flex" navbar>
										<UncontrolledDropdown nav>
											<DropdownToggle className="pr-0" nav>
												<Media className="align-items-center">
												<FontAwesomeIcon icon={faUserCircle} style={{color: "black"}} />
													<Media className="ml-2 d-lg-block">
														<span className="mb-0 text-sm font-weight-bold">
															{Cookies.get("name")}
														</span>
													</Media>
												</Media>
											</DropdownToggle>
											<DropdownMenu className="dropdown-menu dropdown-menu-bottom" direction="left" right style={{left: -120}}>
												<DropdownItem className="noti-title" header tag="div">
													<h6>my account</h6>
												</DropdownItem>
												<DropdownItem to="/admin/user-profile" tag={Link}>
													<i className="ni ni-single-02" />
													<span>My profile</span>
												</DropdownItem>
												<DropdownItem to="/admin/user-profile" tag={Link}>
													<i className="ni ni-settings-gear-65" />
													<span>Settings</span>
												</DropdownItem>
												<DropdownItem to="/admin/user-profile" tag={Link}>
													<i className="ni ni-calendar-grid-58" />
													<span>Activity</span>
												</DropdownItem>
												<DropdownItem to="/admin/user-profile" tag={Link}>
													<i className="ni ni-support-16" />
													<span>Support</span>
												</DropdownItem>
												<DropdownItem divider />
												{/* <DropdownItem onClick={e => window.confirm("Are you sure want to logout?") && this.logout(e)}> */}
												<DropdownItem onClick={() => this.showAlert()} >
													<i className="ni ni-user-run" />
													<span>Logout</span>
												</DropdownItem>
											</DropdownMenu>
										</UncontrolledDropdown>
										</Nav>
									
										// < NavItem>
										// 	<NavLink tag={Link} style={{color: "white"}} to={'/page-4'}> <FontAwesomeIcon icon={faUserCircle} className="mr-2" style={{color: "black"}}/>	{Cookies.get("name")}</NavLink>
										// </NavItem>
										}
										{!Cookies.get("name") && 	<NavItem>
											<NavLink href="/login-page" style={{color: "white"}}> <FontAwesomeIcon icon={faSignInAlt} className="mr-2" style={{color: "black"}}/>Login</NavLink>
										</NavItem>}
									</Nav>
									
								
							</UncontrolledCollapse>
						</Container>
					</Navbar>
				</header>
			</>
		);
	}
}

export default withRouter(DemoNavbar);
