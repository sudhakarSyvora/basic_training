import React, { useState } from "react";
import "./loginRegister.css";
import googleOAuthConfig from '../../secret'

const clientId = googleOAuthConfig.web.client_id;
const redirectUri = googleOAuthConfig.web.redirect_uris[0];
const authUrl = `${googleOAuthConfig.web.auth_uri}?response_type=code&redirect_uri=${redirectUri}&client_id=${clientId}&scope=email%20profile&access_type=offline&prompt=consent`;
const LoginRegister = () => {
  const handleClick = () => {
    window.location.href =  authUrl;
  };

  return (
    <div className="login-register-container">
      <h2>Login</h2>
      <button onClick={handleClick} className="submit-btn">
        Login with Google
      </button>
    </div>
  );
};

export default LoginRegister;
