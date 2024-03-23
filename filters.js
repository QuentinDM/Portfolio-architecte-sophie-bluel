//DYNAMICALLY ADD BUTTON FILTERS in the “btn-filters” class tag
const addButtonsFilters = document.querySelector(".btn-filters");
//Array for the text of each button
const textButton = ["Tous", "Objets", "Appartements", "Hôtels & restaurants"];
//Creation of 4 buttons in one go with a loop
for (let i = 0; i < 4; i++) {
    const buttons = document.createElement("button");
    //Add text to the buttons, from the textButton array
    buttons.innerHTML = textButton[i]
    //Added the class, to change the CSS
    buttons.classList.add("button-categories")
    //Added buttons in the HTML
    addButtonsFilters.appendChild(buttons);
}

export function filtersButton(data) {
    const buttonFilterTous = document.querySelector(".btn-tous");
    buttonFilterTous.addEventListener("click", function () {
        // Filtrer les données pour ne récupérer que les objets
        const filteredData = data.filter(item => item.category.name);

        // Utiliser les données filtrées comme nécessaire
        console.log(filteredData);
    });

    const buttonFilterObjets = document.querySelector(".btn-objets");
    buttonFilterObjets.addEventListener("click", function () {
        // Filtrer les données pour ne récupérer que les objets
        const filteredData = data.filter(item => item.category.name === "Objets");

        // Utiliser les données filtrées comme nécessaire
        console.log(filteredData);
    });

    const buttonFilterAppartements = document.querySelector(".btn-appartements");
    buttonFilterAppartements.addEventListener("click", function () {
        // Filtrer les données pour ne récupérer que les objets
        const filteredData = data.filter(item => item.category.name === "Appartements");

        // Utiliser les données filtrées comme nécessaire
        console.log(filteredData);
    });

    const buttonFilterHotels = document.querySelector(".btn-hotels");
    buttonFilterHotels.addEventListener("click", function () {
        // Filtrer les données pour ne récupérer que les objets
        const filteredData = data.filter(item => item.category.name === "Hotels & restaurants");

        // Utiliser les données filtrées comme nécessaire
        console.log(filteredData);
    });
}

//******************************************************************************************* 
