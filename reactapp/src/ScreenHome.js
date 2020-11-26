import React, { useState } from 'react';
import './App.css';
import { Input, Button } from 'antd';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';

function ScreenHome(props) {

  /*SIGN UP*/
  const [isSignUp, setIsSignUp] = useState(false)
  const [isLogin, setIsLogin] = useState(false)
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [signInEmail, setSignInEmail] = useState('')
  const [signInPassword, setSignInPassword] = useState('')
  const [listErrorsSignin, setErrorsSignin] = useState('')
  const [listErrorsSignup, setErrorsSignup] = useState('')


  var handleSubmitSignUp = () => {
    async function loadData() {
      let newUser = await fetch('/users/sign-up', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `usernameFromFront=${username}&emailFromFront=${email}&passwordFromFront=${password}`
      });
      var response = await newUser.json();
      var userStatus = response.saved
      var errorSignup = response.error
      var token = response.token
      if (userStatus === true) {
        props.onSignupClick(token);
        setIsSignUp(true);
      } else {
        setErrorsSignup(errorSignup);
      }
    }
    loadData();
  }

  var handleSubmitSignIn = () => {
    async function loadData() {
      let response = await fetch('/users/sign-in', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `emailFromFront=${signInEmail}&passwordFromFront=${signInPassword}`
      });
      var logStatus = await response.json();
      var isLogin = logStatus.exist
      var errorSignin = logStatus.error
      var token = logStatus.token
      if (isLogin === true) {
        props.onSignupClick(token);
        setIsLogin(true)
      } else {
        setErrorsSignin(errorSignin);
      }
    }
    loadData();
  }

  if (isSignUp === true) {
    return (
      <Redirect to='/ScreenSource' />
    )
  } else if (isLogin === true) {
    return (
      <Redirect to='/ScreenSource' />
    )
  } else {
    return (
      <div className="Login-page" >

        {/* SIGN-IN */}

        <div className="Sign">
          <h2>{listErrorsSignin}</h2>
          <Input className="Login-input" placeholder="arthur@lacapsule.com"
            onChange={(e) => setSignInEmail(e.target.value)}
            value={signInEmail}
          />

          <Input.Password className="Login-input" placeholder="password"
            onChange={(e) => setSignInPassword(e.target.value)}
            value={signInPassword}
          />


          <Button style={{ width: '80px' }} type="primary" onClick={() => handleSubmitSignIn()}>Sign-in</Button>

        </div>

        {/* SIGN-UP */}

        <div className="Sign">
          <h2>{listErrorsSignup}</h2>
          <Input className="Login-input" placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />

          <Input className="Login-input" placeholder="email" type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />

          <Input.Password className="Login-input" placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />


          <Button style={{ width: '80px' }} type="primary" onClick={() => handleSubmitSignUp()}>Sign-up</Button>

        </div>

      </div>
    );
  }

}

function mapDispatchToProps(dispatch) {
  return {
    onSignupClick: function (token) {
      dispatch({ type: 'newSession', token: token })
    }
  }
}

export default connect(
  null,
  mapDispatchToProps
)(ScreenHome);

