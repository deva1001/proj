import React from 'react';
import '../assets/css/navbar.css';

const Home = () => {
  return (
    <div style={{ backgroundColor: '#000', color: '#fff', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h1 style={{ fontSize: '36px', fontWeight: 'bold' }}>Welcome to Our Website</h1>
        <p style={{ maxWidth: '600px', margin: '20px auto', fontSize: '18px' }}>
          Explore our services and learn more about what we offer. Whether you're looking for ways
          to improve your health, find inner peace through meditation, or learn about our latest
          services, we've got you covered.
        </p>
      </div>

      <div style={styles.cardsContainer}>
        <a href="/yoga" style={styles.card}>
          <img
            src="https://img.freepik.com/free-photo/sporty-beautiful-young-woman-taking-professional-yoga-lessons-home_155003-41435.jpg?t=st=1716370926~exp=1716374526~hmac=acf2762e30d5bbd70e93c0364da75e2cffac6a024e4aff220c3bde6d32ccfc3e&w=740"
            alt="Yoga"
            style={styles.cardImage}
          />
          <div style={styles.blur}></div>
        </a>

        <a href="/personalizeddiet" style={styles.card}>
          <img
            src="https://img.free-photo/healthy-fruit-salad-with-vegetables-pecans_53876-104496.jpg?t=st=1716370994~exp=1716374594~hmac=5d2739d48bc80f84734d4fbd95bf8c7a4f2f55682ad91ac537ceb2a2c2d593d2&w=740"
            alt="Diet"
            style={styles.cardImage}
          />
          <div style={styles.blur}></div>
        </a>

        <a href="/meditation" style={styles.card}>
          <img
            src="https://img.freepik.com/free-photo/studio-shot-young-fit-woman-doing-yoga-exercises-green-space_155003-14216.jpg?t=st=1716370944~exp=1716374544~hmac=4da2166c63a2d65de03571fa0d0378b24b4bbcec8f1119a23fab22e0e12d3770&w=740"
            alt="Meditation"
            style={styles.cardImage}
          />
          <div style={styles.blur}></div>
        </a>
      </div>

      <div style={{ textAlign: 'center' }}>
        <a href="/home1" style={styles.getStartedButton}>Get Started</a>
      </div>
    </div>
  );
};

const styles = {
  cardsContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    marginTop: '50px',
  },
  card: {
    position: 'relative',
    width: '12rem',
    height: '16rem',
    overflow: 'hidden',
    borderRadius: '1rem',
    backgroundColor: '#3d3c3d',
    boxShadow: '0 10px 20px rgba(0,0,0,0.5)',
    transition: 'transform 0.3s',
    textDecoration: 'none',
  },
  cardImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: '1rem',
  },
  blur: {
    position: 'absolute',
    width: '14rem',
    height: '12rem',
    backgroundColor: 'white',
    filter: 'blur(50px)',
    left: '-50%',
    top: '-50%',
  },
  getStartedButton: {
    display: 'inline-block',
    marginTop: '30px',
    padding: '15px 30px',
    backgroundColor: '#FF5733',
    color: 'white',
    textDecoration: 'none',
    fontWeight: 'bold',
    borderRadius: '50px',
    transition: 'background-color 0.3s',
    textAlign: 'center',
    fontSize: '18px',
  },
};

export default Home;
