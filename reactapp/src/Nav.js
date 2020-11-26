import React, { useState } from 'react';
import './App.css';
import { Menu, Icon } from 'antd';
import { Link } from "react-router-dom";
import { Redirect } from 'react-router-dom';

function Nav() {

  const [isLogout, setIsLogout] = useState(false);
/* 
if ( isLogout === false) {
  setIsLogout(true);
} */
  var handleLogout = () => {
    async function loadLogout() {
      let response = await fetch('/users/logout')
      var session = await response.json();
      if (session.status == null) {
        setIsLogout(true)
      }
    }
    loadLogout();
  }

if (isLogout === true) {
    return (
      <Redirect to='/' />
    )
  } else { 
    return (
      <nav >
        <Menu style={{ textAlign: 'center' }} mode="horizontal" theme="dark">

          <Menu.Item key="mail">
            <Link style={{ color: "#FFFFFF" }} to="/ScreenSource">
              <Icon type="home" />
          Sources</Link>
          </Menu.Item>

          <Menu.Item key="test">
            <Link style={{ color: "#FFFFFF" }} to="/ScreenMyArticles">
              <Icon type="read" />
          My Articles</Link>
          </Menu.Item>

          <Menu.Item key="app">
            <Link style={{ color: "#FFFFFF" }} onClick={() => handleLogout()}>
              <Icon type="logout" />
          Logout</Link>
          </Menu.Item>

        </Menu>
      </nav>
    );
  }
}
/* 
function mapStateToProps(state) {
  console.log("hello", state.sessionUser)
  return { sessionUser: state.sessionUser }
} */

export default Nav;

