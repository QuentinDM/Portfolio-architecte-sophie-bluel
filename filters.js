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

    // Using the switch to add the specific class to each button
    switch (i) {
        case 0:
            buttons.classList.add("btn-tous");
            break;
        case 1:
            buttons.classList.add("btn-objets");
            break;
        case 2:
            buttons.classList.add("btn-appartements");
            break;
        case 3:
            buttons.classList.add("btn-hotels");
            break;
        default:
            break;
    }
}

export function filtersButton(data) {
    // Select the buttons and figure elements
    const buttonFilterTous = document.querySelector(".btn-tous");
    const tous = document.querySelectorAll("figure[data-value]");
    const objets = document.querySelectorAll('figure[data-value="1"]');
    const appartements = document.querySelectorAll('figure[data-value="2"]');
    const hotelAndRestaurant = document.querySelectorAll('figure[data-value="3"]');
    
    // Function to display elements with a given style
    function displayElements(elements, displayStyle) {
        elements.forEach(element => {
            element.style.display = displayStyle;
        });
    }

    // Event listener for the "Tous" button
    buttonFilterTous.addEventListener("click", function () {
        // Display all elements
        displayElements(tous, "grid");
    });

    // Event listener for the "Objets" button
    const buttonFilterObjets = document.querySelector(".btn-objets");
    buttonFilterObjets.addEventListener("click", function () {
        // Display objets and hide other categories
        displayElements(objets, "grid");
        displayElements(appartements, "none");
        displayElements(hotelAndRestaurant, "none");
    });

    // Event listener for the "Appartements" button
    const buttonFilterAppartements = document.querySelector(".btn-appartements");
    buttonFilterAppartements.addEventListener("click", function () {
        // Display appartements and hide other categories
        displayElements(objets, "none");
        displayElements(appartements, "grid");
        displayElements(hotelAndRestaurant, "none");
    });

    // Event listener for the "Hotels" button
    const buttonFilterHotels = document.querySelector(".btn-hotels");
    buttonFilterHotels.addEventListener("click", function () {
        // Display hotels and restaurants and hide other categories
        displayElements(objets, "none");
        displayElements(appartements, "none");
        displayElements(hotelAndRestaurant, "grid");
    });
}

//******************************************************************************************* 
