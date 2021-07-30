import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from "react-router-dom";
import './Header.css';
import LoginButton from './LoginButton'
import LogoutButton from './LogoutButton'
import {withAuth0} from '@auth0/auth0-react';

class Header extends React.Component {
  render() {
    const { isAuthenticated } = this.props.auth0;
    return (
      <Navbar  className='header' collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand>301 Exam</Navbar.Brand>
        <Link  className='heaader' to="/">My-Fav</Link>
        <Link  className='heaader' to="/profile">Profile</Link>
        <Link  className='heaader' to="/API-Data">API-Data</Link>
        {/* TODO: if the user is logged in, render the `LogoutButton` - if the user is logged out, render the `LoginButton` */}
        {this.props.auth0.isAuthenticated? <LogoutButton /> : <LoginButton />}
      </Navbar>
    );
  }
}

export default withAuth0(Header);
