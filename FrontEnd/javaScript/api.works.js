import { filtersButton } from "./filters.js";  
/************************************************************************************************************ 
**                                                                                                         **
**                     Function to create DOM elements from working data                                   **
**                                                                                                         **
*************************************************************************************************************/

function createWorksElements(data) {
  // select DOM Element classe .gallery;
  const divGallery = document.querySelector(".gallery");
  
  // Loop, Add image and title into figure tag and this figur tag add into Dom element div class .gallery
  for (let i = 0; i < data.length; i++) {
    const works = data[i];
    const worksElement = document.createElement("figure");
    worksElement.setAttribute("data-value", works.categoryId);

    // Create an <img> element for the work image
    const imageElement = document.createElement("img");
    imageElement.src = works.imageUrl;
    imageElement.classList.add("images-works");

    // Create a <figcaption> element for the work title
    const titleElement = document.createElement("figcaption");
    titleElement.innerHTML = works.title;

    // Add the figur element to the DOM in the divGallery
    divGallery.appendChild(worksElement);
    // Add img element to DOM to display image and title
    worksElement.appendChild(imageElement);
    worksElement.appendChild(titleElement);
  }
  // Call the filtersButton function to add event listeners to filter buttons
  filtersButton(data)
}

/************************************************************************************************************ 
**                                                                                                         **
**                                // Request Get to URL woks from API                                      **
**                                                                                                         **
*************************************************************************************************************/

fetch("http://localhost:5678/api/works")
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
    createWorksElements(data);
  })
  // Handle Error
  .catch(error => {
    console.error('Une erreur est survenue lors de la récupération des données :', error);
  });
