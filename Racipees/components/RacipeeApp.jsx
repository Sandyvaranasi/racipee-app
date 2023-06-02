import React, { useState } from 'react';
import axios from 'axios';

const RecipeApp = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [recipes, setRecipes] = useState([]);

  const fetchRecipes = async () => {
    try {
      const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`);
      const data = response.data;
      setRecipes(data.meals);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  }

  const handleSearch = () => {
    if (searchTerm !== '') {
      fetchRecipes();
    }
  };

  return (
    <div className="recipe-app dark-theme">
      <h1>Recipe App</h1>
      <div className="search-container">
        <input type="text" placeholder="Search recipes" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        <button onClick={handleSearch}>Search</button>
      </div>

      <div className="recipes-container">
        {recipes && recipes.map((recipe) => (
          <div key={recipe.idMeal} className="recipe-card">
            <h2>{recipe.strMeal}</h2>
            <img src={recipe.strMealThumb} alt={recipe.strMeal} />
            <p>Category: {recipe.strCategory}</p>
            <p>Area: {recipe.strArea}</p>
            <ul>
              {Array.from(Array(20).keys()).map((index) => {
                const ingredient = recipe[`strIngredient${index + 1}`];
                const measure = recipe[`strMeasure${index + 1}`];

                if (ingredient && ingredient.trim() !== '' && measure && measure.trim() !== '') {
                  return (
                    <li key={index}>{`${measure} ${ingredient}`}</li>
                  );
                }

                return null;
              })}
            </ul>
            <a href={recipe.strSource} target="_blank" rel="noopener noreferrer">Read More</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeApp;
