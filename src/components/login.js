import React, { useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import '../assets/css/style1.css';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const formType = queryParams.get('form');
    if (formType === 'signup') {
      toggleSignup();
    } else {
      toggleLogin();
    }
  }, [location.search]);

  const toggleSignup = () => {
    document.getElementById('login-toggle').style.backgroundColor = '#fff';
    document.getElementById('login-toggle').style.color = '#222';
    document.getElementById('signup-toggle').style.backgroundColor = '#57b846';
    document.getElementById('signup-toggle').style.color = '#fff';
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('signup-form').style.display = 'block';
  };

  const toggleLogin = () => {
    document.getElementById('login-toggle').style.backgroundColor = '#57B846';
    document.getElementById('login-toggle').style.color = '#fff';
    document.getElementById('signup-toggle').style.backgroundColor = '#fff';
    document.getElementById('signup-toggle').style.color = '#222';
    document.getElementById('signup-form').style.display = 'none';
    document.getElementById('login-form').style.display = 'block';
  };

  return (
    <div>
      <div className="navbar">
        <Link to="/home1">
          <button className="back-button">&#8592; Back</button>
        </Link>
      </div>

      <div className="form-modal">
        <div className="form-toggle">
          <button id="login-toggle" onClick={toggleLogin}>log in</button>
          <button id="signup-toggle" onClick={toggleSignup}>sign up</button>
        </div>

        <div id="login-form">
          <form>
            <input type="text" placeholder="Enter email or username" />
            <input type="password" placeholder="Enter password" />
            <Link to="/height-and-weight">
              <button type="button" className="btn login">login</button>
            </Link>
            <p><a href="#">Forgotten account</a></p>
            <hr />
          </form>
        </div>

        <div id="signup-form">
          <form>
            <input type="email" placeholder="Enter your email" />
            <input type="text" placeholder="Choose username" />
            <input type="password" placeholder="Create password" />
            <Link to="/height-and-weight">
              <button type="button" className="btn signup">create account</button>
            </Link>
            <p>
              Clicking <strong>create account</strong> means that you agree to our <a href="#">terms of services</a>.
            </p>
            <hr />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
