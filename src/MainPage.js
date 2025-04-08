import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import './MainPage.css';

function MainPage() {
  const [foodName, setFoodName] = useState('');
  const [foodAmount, setFoodAmount] = useState('');
  const [entries, setEntries] = useState([]);
  const [totalCalories, setTotalCalories] = useState(0);
  const [DCI, setDCI] = useState(0);
  const [userGoal, setUserGoal] = useState('');
  const [mealSuggestions, setMealSuggestions] = useState([]);

  const apiKey = '84twkbpNtvyJURDvyx8dVdlhPJCgCJrNgQJP8ECo';
  const EDAMAM_API_ID = 'c863b2b3';
  const EDAMAM_API_KEY = '551e9981ea62c4f075437d6fd4a3c757';

  useEffect(() => {
    let userData = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      userData = { DCI: 2000, goal: 'gain' };
      localStorage.setItem('userData', JSON.stringify(userData));
    }
    setDCI(parseFloat(userData.DCI));
    setUserGoal(userData.goal);
    fetchMealSuggestions(userData.goal);
  }, []);

  const fetchMealSuggestions = async (goal) => {
    let query = goal === 'gain' ? 'high-calorie' : 'low-calorie high-protein';
    const API_URL = `https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${EDAMAM_API_ID}&app_key=${EDAMAM_API_KEY}`;

    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setMealSuggestions(data.hits);
    } catch {
      alert('Error fetching meal suggestions.');
    }
  };

  const fetchCalories = async (name, amount) => {
    const API_URL = `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${apiKey}&query=${encodeURIComponent(name)}`;
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      if (data.foods.length > 0) {
        const foodItem = data.foods[0];
        const energy = foodItem.foodNutrients.find(n => n.nutrientName === 'Energy');
        return energy ? (energy.value / 100) * amount : 0;
      } else {
        alert('Food item not found!');
        return null;
      }
    } catch {
      alert('Error fetching calorie information.');
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const calories = await fetchCalories(foodName, foodAmount);
    if (calories !== null) {
      const newEntry = {
        name: foodName,
        amount: foodAmount,
        calories,
      };
      setEntries([...entries, newEntry]);
      setTotalCalories(prev => prev + calories);
      if (totalCalories + calories >= DCI) {
        if (userGoal === 'loss') showDangerDialog();
        else triggerCelebration();
      }
      setFoodName('');
      setFoodAmount('');
    }
  };

  const triggerCelebration = () => {
    const audio = new Audio('/ConfettiParty.mp3');
    audio.play();
    confetti({ particleCount: 200, spread: 70, origin: { y: 0.6 } });
  };

  const showDangerDialog = () => {
    alert("⚠️ You're exceeding your daily calorie intake!");
  };

  const deleteFood = (index) => {
    const removed = entries[index];
    setEntries(entries.filter((_, i) => i !== index));
    setTotalCalories(prev => prev - removed.calories);
  };

  return (
    <div className="wrapper">
      <div className="top-section">
        <div className="dci-container">
          <h2>Your Daily Calorie Target</h2>
          <p><span>{DCI}</span> kcal</p>
        </div>

        <div className="container">
          <h1>Food Logger</h1>
          <form onSubmit={handleSubmit}>
            <label>Food Name:</label>
            <input
              type="text"
              value={foodName}
              onChange={(e) => setFoodName(e.target.value)}
              required
            />
            <label>Amount (grams):</label>
            <input
              type="number"
              value={foodAmount}
              onChange={(e) => setFoodAmount(e.target.value)}
              required
            />
            <button type="submit">Log Food</button>
          </form>
        </div>

        <div className="food-intake">
          <h2>Food Intake</h2>
          <ul>
            {entries.map((entry, i) => (
              <li key={i}>
                {entry.name} ({entry.amount}g): {entry.calories.toFixed(2)} kcal
                <i
                  className="fas fa-trash delete-icon"
                  onClick={() => deleteFood(i)}
                ></i>
              </li>
            ))}
          </ul>
          <h2>Total Calories: <span>{totalCalories.toFixed(2)}</span> kcal</h2>
        </div>
      </div>

      <div className="suggestions-container">
        <h2>Suggested Meals</h2>
        <div id="suggestions">
          {mealSuggestions.length === 0 ? (
            <p>No suggestions available.</p>
          ) : (
            mealSuggestions.map((meal, idx) => (
              <div className="suggestion" key={idx}>
                <h3>{meal.recipe.label}</h3>
                <img
                  src={meal.recipe.image}
                  alt={meal.recipe.label}
                  style={{ width: '100%', borderRadius: '8px' }}
                />
                <p>Calories: {meal.recipe.calories.toFixed(2)}</p>
                <p>Protein: {meal.recipe.totalNutrients.PROCNT.quantity.toFixed(2)}g</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default MainPage;
