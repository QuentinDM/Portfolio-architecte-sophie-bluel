/************************************************************************************************************ 
**                                                                                                         **
**                     //DYNAMICALLY ADD BUTTON FILTERS in the “btn-filters” class tag                     **
**                                                                                                         **
*************************************************************************************************************/
fetch("http://localhost:5678/api/categories")
  //When promise is return, response convert HTTP in object JSON
  .then(response => {
    //Check if response is responding
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  // receive data from response.JSON() and call createWorksElements(data) function
  .then(data => {
    const categoryName =  data.map(data => data.name);
    categoryName.unshift("Tous");
    console.log(categoryName);
    const addButtonsFilters = document.querySelector(".btn-filters");
    // Boucler à travers le tableau textButton
    for (let i = 0; i < categoryName.length; i++) {
            if (categoryName[i] === Array()) {
                console.log("ta mere");
            }
        const buttons = document.createElement("button");
        buttons.innerHTML = categoryName[i];
        buttons.classList.add("button-categories");

        // Ajouter les boutons au HTML
        addButtonsFilters.appendChild(buttons);

        // Utiliser un switch pour ajouter une classe spécifique à chaque bouton
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
  })
  // Handle Error
  .catch(error => {
    console.error('Une erreur est survenue lors de la récupération des données :', error);
  });
/************************************************************************************************************ 
**                                                                                                         **
**                              //fUCTION TO FILTER WORKS BY CATEGORIES                                    **
**                                                                                                         **
*************************************************************************************************************/

export function filtersButton(data) {
    // Select the buttons and figure elements
    const buttonFilterTous = document.querySelector(".btn-tous");
    const tous = document.querySelectorAll("figure[data-value]");
    const objets = document.querySelectorAll('figure[data-value="1"]');
    const appartements = document.querySelectorAll('figure[data-value="2"]');
    const hotelAndRestaurant = document.querySelectorAll('figure[data-value="3"]');
    
    // Function to display elements with a given style
    function displayElements(elements, displayStyle) {//******************************************
        elements.forEach(element => {
            element.style.display = displayStyle;
        });
    }

    // Event listener for the "Tous" button
    buttonFilterTous.addEventListener("click", function () {
        // Display all elements
        displayElements(tous, "grid");//************************************ 
    });

    // Event listener for the "Objets" button
    const buttonFilterObjets = document.querySelector(".btn-objets");
    buttonFilterObjets.addEventListener("click", function () {
        // Display objets and hide other categories
        displayElements(objets, "grid");//************************************ 
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
