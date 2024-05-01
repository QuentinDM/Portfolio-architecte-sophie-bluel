/************************************************************************************************************ 
**                                                                                                         **
**                     //DYNAMICALLY ADD BUTTON FILTERS in the “btn-filters” class tag                     **
**                                                                                                         **
*************************************************************************************************************/

//Partie qui Ajoute nos bouton de filtres et filtre les elements
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
    categoryName.unshift("Tous");//add TOUS in the map 
    const addButtonsFilters = document.querySelector(".btn-filters");
    
    // Ajout visuel des bouton de filtre
    for (let i = 0; i < categoryName.length; i++) {
        console.log(categoryName[i]);
        const buttons = document.createElement("button");
        buttons.innerHTML = categoryName[i];
        buttons.classList.add("button-categories");

        // Ajouter les boutons au HTML
        addButtonsFilters.appendChild(buttons);
    }  

    //Ecouteur d'événement pour filtrer nos travaux
    document.querySelectorAll(".button-categories").forEach(button => {
        button.addEventListener("click", function() {
            const category = this.textContent; // Récupère le nom de la catégorie du bouton cliqué
            const figures = document.querySelectorAll('.gallery figure');
    
            figures.forEach(figure => {
                const figureCategory = figure.getAttribute('id'); // Récupère la catégorie de la figure à partir de l'attribut id (ou un autre attribut approprié)
                console.log(figureCategory);
                if (category === "Tous") {
                    figure.style.display = "grid"; // si le bouton cliqué, à pour textContent "Tous", alors on affiche tous les element
                }else if (figureCategory === category) {
                    figure.style.display = "grid";
                } else if(figureCategory !== category) {
                    figure.style.display = "none";// Supprime la figure si sa catégorie ne correspond pas à la catégorie sélectionnée
                }
            });
    
            console.log(category);
        });
    });
  })
  // Handle Error
  .catch(error => {
    console.error('Une erreur est survenue lors de la récupération des données :', error);
  });