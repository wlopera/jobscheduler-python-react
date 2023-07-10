/* eslint-disable */
import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  Nav,
  NavItem,
  NavLink,
  Button,
  Navbar,
  NavbarBrand,
  Collapse,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledCarousel,
  Progress,
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Form,
  FormGroup,
  Input,
} from "reactstrap";
import * as data from "./Data";

/*--------------------------------------------------------------------------------*/
/* Import images which are need for the HEADER                                    */
/*--------------------------------------------------------------------------------*/
import logoreacticon from "../../../assets/images/logo-icon-react.png";
import logopythonicon from "../../../assets/images/logo-icon-python.png";
import logolighticon from "../../../assets/images/logo-light-icon.png";
import logodarktext from "../../../assets/images/logo-text-jobscheduler.png";
import logolighttext from "../../../assets/images/logo-light-text.png";
import profilephoto from "../../../assets/images/users/programmer.png";

export default () => {
  const [isOpen, setIsOpen] = useState(false);

  const settings = useSelector((state) => state.settings);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const showMobilemenu = () => {
    document.getElementById("main-wrapper").classList.toggle("show-sidebar");
  };

  const sidebarHandler = () => {
    let element = document.getElementById("main-wrapper");
    switch (settings.activeSidebarType) {
      case "full":
      case "iconbar":
        element.classList.toggle("mini-sidebar");
        if (element.classList.contains("mini-sidebar")) {
          element.setAttribute("data-sidebartype", "mini-sidebar");
        } else {
          element.setAttribute("data-sidebartype", settings.activeSidebarType);
        }
        break;

      case "overlay":
      case "mini-sidebar":
        element.classList.toggle("full");
        if (element.classList.contains("full")) {
          element.setAttribute("data-sidebartype", "full");
        } else {
          element.setAttribute("data-sidebartype", settings.activeSidebarType);
        }
        break;
      default:
    }
  };

  return (
    <header className="topbar navbarbg" data-navbarbg={settings.activeNavbarBg}>
      <Navbar
        className={
          "top-navbar " +
          (settings.activeNavbarBg === "skin6" ? "navbar-light" : "navbar-dark")
        }
        expand="md"
      >
        <div
          className="navbar-header"
          id="logobg"
          data-logobg={settings.activeLogoBg}
        >
          {/*--------------------------------------------------------------------------------*/}
          {/* Mobile View Toggler  [visible only after 768px screen]                         */}
          {/*--------------------------------------------------------------------------------*/}
          <span
            className="nav-toggler d-block d-md-none"
            onClick={showMobilemenu.bind(null)}
          >
            <i className="ti-menu ti-close" />
          </span>
          {/*--------------------------------------------------------------------------------*/}
          {/* Logos Or Icon will be goes here for Light Layout && Dark Layout                */}
          {/*--------------------------------------------------------------------------------*/}
          <NavbarBrand href="/">
            <b className="logo-icon">
              <img src={logoreacticon} alt="homepage" className="dark-logo" />
            </b>
            <span className="logo-text">
              <img src={logodarktext} alt="homepage" className="dark-logo" />
            </span>
            <b className="logo-icon">
              <img
                src={logopythonicon}
                alt="homepage"
                className="dark-logo"  
                style={{ paddingLeft: "5px" , width:"100%", height:"100%"}}
              />
            </b>
          </NavbarBrand>
          {/*--------------------------------------------------------------------------------*/}
          {/* Mobile View Toggler  [visible only after 768px screen]                         */}
          {/*--------------------------------------------------------------------------------*/}
          <span
            className="topbartoggler d-block d-md-none"
            onClick={toggle.bind(null)}
          >
            <i className="ti-more" />
          </span>
        </div>
        <Collapse
          className="navbarbg"
          isOpen={isOpen}
          navbar
          data-navbarbg={settings.activeNavbarBg}
        >
          <Nav className="float-left" navbar>
            <NavItem>
              <NavLink
                href="#"
                className="d-none d-md-block"
                onClick={sidebarHandler.bind(null)}
              >
                <i className="icon-arrow-left-circle"></i>
              </NavLink>
            </NavItem>
            {/*--------------------------------------------------------------------------------*/}
            {/* Start Notifications Dropdown                                                   */}
            {/*--------------------------------------------------------------------------------*/}
            
            {/*--------------------------------------------------------------------------------*/}
            {/* End Mega Menu Dropdown                                                         */}
            {/*--------------------------------------------------------------------------------*/}
          </Nav>
          <Nav className="ml-auto float-right" navbar>
            <li className="nav-item search-box d-none d-md-block">
              <form className="app-search mt-3 mr-2">
                <input
                  type="text"
                  className="form-control rounded-pill"
                  placeholder="Search for..."
                />
                <a className="srh-btn">
                  <i className="ti-search"></i>
                </a>
              </form>
            </li>
            {/*--------------------------------------------------------------------------------*/}
            {/* Start Profile Dropdown                                                         */}
            {/*--------------------------------------------------------------------------------*/}
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret className="pro-pic">
                <img
                  src={profilephoto}
                  alt="user"
                  className="rounded-circle"
                  width="31"
                />
              </DropdownToggle>
              <DropdownMenu right className="user-dd animated flipInY">
                <div className="d-flex no-block align-items-center p-3 mb-2 border-bottom">
                  <div className="">
                    <img
                      src={profilephoto}
                      alt="user"
                      className="rounded"
                      width="80"
                    />
                  </div>
                  <div className="ml-2">
                    <h4 className="mb-0">William Lopera</h4>
                    <p className=" mb-0">lopera.william@gmail.com</p>
                    <a href="#" className="btn btn-rounded btn-danger btn-sm">
                      Perfil
                    </a>
                  </div>
                </div>
              </DropdownMenu>
            </UncontrolledDropdown>
            {/*--------------------------------------------------------------------------------*/}
            {/* End Profile Dropdown                                                           */}
            {/*--------------------------------------------------------------------------------*/}
            {/*--------------------------------------------------------------------------------*/}
            {/* Start Create New Dropdown                                                      */}
            {/*--------------------------------------------------------------------------------*/}
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav>
                <i className="flag-icon flag-icon-us"></i>
              </DropdownToggle>
              <DropdownMenu right className="animated bounceInDown">
                <DropdownItem>
                  <i className="flag-icon flag-icon-us"></i> English
                </DropdownItem>
                <DropdownItem>
                  <i className="flag-icon flag-icon-es"></i> Spanish
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            {/*--------------------------------------------------------------------------------*/}
            {/* End Create New Dropdown                                                        */}
            {/*--------------------------------------------------------------------------------*/}
          </Nav>
        </Collapse>
      </Navbar>
    </header>
  );
};
