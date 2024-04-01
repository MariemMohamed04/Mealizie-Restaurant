
document.addEventListener('DOMContentLoaded', function () {
    const thumbnailList = document.querySelectorAll(".thumbnail-list img");
    const slides = document.querySelector('.slides');
    const slideWidth = document.querySelector('.slide').offsetWidth;
    const slide = document.querySelectorAll('.slide img');
    const modal = document.getElementById("modal");
    const modalImg = document.querySelector(".modal-content");
    const closeBtn = document.querySelector(".close");
    let currentIndex = 0;
    document.querySelector("#meal-price").innerText = "$" + (Math.random() * (20 - 10) + 10).toFixed(2);

    fetch('https://www.themealdb.com/api/json/v1/1/random.php')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Handle the data
            document.querySelector(".breadcrumb-item.active").innerText = data.meals[0].strCategory;
            document.querySelector("#meal-name").innerText = data.meals[0].strMeal;
            document.querySelectorAll(".slide img").forEach(function (imgSrc) {
                imgSrc.src = data.meals[0].strMealThumb;
            });
            thumbnailList.forEach(function (imgSrc) {
                imgSrc.src = data.meals[0].strMealThumb;
            });
            document.querySelector("#meal-description").innerText += concatenateIngredients(data.meals[0], 'strIngredient');

        })
        .catch(error => {
            // Handle errors
            console.error('There was a problem with the fetch operation:', error);
        });

    function concatenateIngredients(object, prefix) {
        let concatenatedIngredients = '';
        for (let i = 1; i <= 20; i++) {
            const key = `${prefix}${i}`;
            if (object[key] !== "") {
                concatenatedIngredients += object[key] + ', ';
            }
        }
        return concatenatedIngredients.trim().slice(0, -1);
    }

    function goToSlide(index) {
        slides.style.transform = `translateX(-${index * slideWidth}px)`;
    }

    function updateThumbnailActive(index) {
        thumbnailList.forEach(function (thumbnail, i) {
            thumbnail.classList.toggle('active', i === index);
        });
    }

    document.querySelector('.prev-slide').addEventListener('click', function () {
        currentIndex = (currentIndex === 0) ? slides.children.length - 1 : currentIndex - 1;
        goToSlide(currentIndex);
        updateThumbnailActive(currentIndex);
    });

    document.querySelector('.next-slide').addEventListener('click', function () {
        currentIndex = (currentIndex === slides.children.length - 1) ? 0 : currentIndex + 1;
        goToSlide(currentIndex);
        updateThumbnailActive(currentIndex);
    });

    thumbnailList.forEach(function (thumbnail, i) {
        thumbnail.addEventListener('click', function () {
            currentIndex = i;
            goToSlide(currentIndex);
            updateThumbnailActive(currentIndex);
        });
    });
    slide.forEach(function (slideI) {
        slideI.addEventListener("click", function () {
            modal.style.display = "block"
            modalImg.src = this.src;
            console.log(modalImg.src);
        });
    });
    closeBtn.addEventListener("click", function () {
        modal.style.display = "none";
    });
});


