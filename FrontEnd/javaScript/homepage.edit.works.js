/************************************************************************************************************ 
**                                                                                                         **
**                 // Function to create DOM elements from working data FOR HOME PAGE EDIT                 **
**                                                                                                         **
*************************************************************************************************************/
import {elementToCreate} from "./api.works.js"; 

// select DOM Element classe .gallery
const divGallery = document.querySelector(".gallery");

function createWorksElements(data) {
  for (let i = 0; i < data.length; i++) {
      const works = data[i];
      elementToCreate(works, divGallery); // Create the same element created in ./api.works.js file
  }
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