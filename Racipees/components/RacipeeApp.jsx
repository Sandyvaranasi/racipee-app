import React, { useState } from 'react';
import axios from 'axios';

const RecipeApp = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [recipes, setRecipes] = useState([]);

  const fetchRecipes =  () => {
      axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`)
      .then((res => {
        const data = res.data;
        setRecipes(data.meals);
      }))
      .catch (error=> {
      console.log('Error fetching recipes:', error);
    })
  }

  const handleSearch = () => {
    if (searchTerm !== '') {
      fetchRecipes();
    }else{
      alert('please fill a valid dish name')
    }
  };

  return (
    <div
  className="recipe-app dark-theme"
  style={{
    minHeight: '93vh',
    width: '96vw',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#222',
    color: '#fff',
    padding: '20px',
  }}
>
  <h1 style={{ fontSize: '36px', marginBottom: '30px', textAlign: 'center' }}>Recipe App</h1>
  <div
    className="search-container"
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
       marginBottom: '20vh'
    }}
  >
    <input
      type="text"
      placeholder="Search recipes"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      style={{
        padding: '10px',
        width: '300px',
        fontSize: '16px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        marginBottom: '10px'
      }}
    />
    <button
      onClick={handleSearch}
      style={{
        padding: '10px 20px',
        fontSize: '16px',
        backgroundColor: '#db0000',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        marginLeft: '10px',
      }}
    >
      Search
    </button>
  </div>

      <div className="recipes-container">
        {recipes && recipes.map((recipe) => (
          <div key={recipe.idMeal} className="recipe-card">
            <h2>{recipe.strMeal}</h2>
            <img src={recipe.strMealThumb} alt={recipe.strMeal} />
            <p>Category: {recipe.strCategory}</p>
            <p>Area: {recipe.strArea}</p>
            <p>
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
            </p>
            <a href={recipe.strSource} target="_blank" rel="noopener noreferrer">Read More</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeApp;