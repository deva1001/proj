import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/css/height.css';

const HeightAndWeight = () => {
  const [formData, setFormData] = useState({
    height: '',
    weight: '',
    age: '',
    goal: '',
  });
  const [dci, setDci] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const weight = parseFloat(formData.weight);
    const height = parseFloat(formData.height);
    const age = parseInt(formData.age);

    let DCI = 66.47 + (13.75 * weight) + (5.003 * height) - (6.755 * age);
    if (formData.goal === 'gain') {
      DCI += 1000;
    } else if (formData.goal === 'loss') {
      DCI -= 500;
    }

    const fullData = { ...formData, DCI: DCI.toFixed(2) };
    localStorage.setItem('userData', JSON.stringify(fullData));
    navigate('/mainpage');
  };

  return (
    <div>
      <div className="navbar">
        <button className="back-button" onClick={() => navigate('/login')}>&#8592; Back</button>
      </div>

      <div className="container">
        <h2>User Information Form</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="height">Height (cm):</label>
            <input type="number" id="height" name="height" required onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="weight">Weight (kg):</label>
            <input type="number" id="weight" name="weight" required onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="age">Age:</label>
            <input type="number" id="age" name="age" required onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Goal:</label><br />
            <input type="radio" id="weightGain" name="goal" value="gain" required onChange={handleChange} />
            <label htmlFor="weightGain">Weight Gain</label><br />
            <input type="radio" id="weightLoss" name="goal" value="loss" required onChange={handleChange} />
            <label htmlFor="weightLoss">Weight Loss</label>
          </div>
          <button type="submit">Submit</button>
        </form>

        {dci && (
          <div id="dci-result" style={{ marginTop: '20px' }}>
            <h3>Your Daily Calorie Intake (DCI): <span>{dci}</span> kcal</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default HeightAndWeight;
