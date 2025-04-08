import React from 'react';
import '../assets/css/style.css';
import { Link } from 'react-router-dom';

const Home1 = () => {
  return (
    <div>
      <nav>
        <div className="menu">
          <div className="logo">
            <a href="#">Calorie counter</a>
          </div>
          <ul>
            <li><Link to="/home">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/service">Service</Link></li>
          </ul>
        </div>
      </nav>

      <div className="img"></div>

      <div className="center">
        <div className="title">TRACK TODAY TRANSFORM TOMMOROW</div>
        <div className="sub_title">START NOW</div>
        <div className="btns">
          <Link to="/login?form=login"><button>Login</button></Link>
          <Link to="/login?form=signup"><button>Sign Up</button></Link>
        </div>
      </div>
    </div>
  );
};

export default Home1;
