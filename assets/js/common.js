window.onload = function () {
  GetData();
};

function GetData() {
  fetch("https://www.themealdb.com/api/json/v1/1/filter.php?c=Beef")
    .then(response => response.json())
    .then(data => {

      var cardContainer = document.getElementById("card-container");
      data.meals.forEach(function (meal) {
        var col = document.createElement("div");
        col.className = "col-4";
        col.innerHTML =
          `<div class="card border-0 " >
            <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title ">${meal.strMeal}</h5>
              <p class="card-text">34$</p>
              <a href="#" class="card-cart">
                <span class="pe-2"><i class="fa fa-cart-plus"></i></span>
                <span class="cart">Add To Cart</span>
              </a>
            </div>
          </div>`;
        cardContainer.appendChild(col);
      });
    })
    .catch(error => console.error("Error: ", error));
}
