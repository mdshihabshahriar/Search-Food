const searchBtn = document.getElementById('search-btn');
const mealList = document.getElementById('meal');
const mealDetailsContent = document.querySelector('.meal-details-content');
const recipeModal = new bootstrap.Modal(document.getElementById('recipeModal'));

searchBtn.addEventListener('click', getMealList);
mealList.addEventListener('click', getMealRecipe);

function getMealList() {
    const searchInputTxt = document.getElementById('search-input').value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInputTxt}`)
        .then(response => response.json())
        .then(data => {
            let html = "";
            if (data.meals) {
                data.meals.forEach(meal => {
                    html += `
                        <div class="col-md-4 mb-4">
                            <div class="card meal-item" data-id="${meal.idMeal}">
                                <img src="${meal.strMealThumb}" class="card-img-top" alt="${meal.strMeal}">
                                <div class="card-body text-center">
                                    <h5 class="card-title">${meal.strMeal}</h5>
                                    <a href="#" class="btn btn-primary recipe-btn">Get Recipe</a>
                                </div>
                            </div>
                        </div>
                    `;
                });
            } else {
                html = `<div class="col-12 text-center"><p class="text-danger">No meals found for "${searchInputTxt}"!</p></div>`;
            }
            mealList.innerHTML = html;
        });
}

function getMealRecipe(e) {
    e.preventDefault();
    if (e.target.classList.contains('recipe-btn')) {
        const mealId = e.target.closest('.meal-item').dataset.id;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
            .then(response => response.json())
            .then(data => {
                const meal = data.meals[0];
                const html = `
                    <h2 class="recipe-title">${meal.strMeal}</h2>
                    <p class="recipe-category">${meal.strCategory}</p>
                    <div class="recipe-instruct">
                        <h3>Instructions:</h3>
                        <p>${meal.strInstructions}</p>
                    </div>
                    <img src="${meal.strMealThumb}" class="img-fluid" alt="${meal.strMeal}">
                    <div class="recipe-link">
                        <a href="${meal.strYoutube}" target="_blank">Watch Video</a>
                    </div>
                `;
                mealDetailsContent.innerHTML = html;
                recipeModal.show();
            });
    }
}
