

// Function to create DOM elements from working data

function createWorksElements(data) {
    // select DOM Element with class .gallery
    const divGallery = document.querySelector(".gallery");
    
    // Loop through data and add image and title into figure tag, then append the figure tag to the DOM element with class .gallery
    for (let i = 0; i < data.length; i++) {
        const works = data[i];

        // Create image element and set its src attribute
        const imageElement = document.createElement("img");
        imageElement.src = works.imageUrl;

        // Create trash icon
        const deletedIcons = document.createElement("i");
        deletedIcons.classList.add("fa", "fa-trash", "trash-icons"); // Add classes for the trash icon

        // Create a container for the image and trash icon
        const container = document.createElement("div");
        container.appendChild(imageElement);
        container.appendChild(deletedIcons);

        // Append the container to the gallery
        divGallery.appendChild(container);

        // Add event listener to each trash icon
        deletedIcons.addEventListener("click", function () {
            const parentContainer = this.parentNode;
            parentContainer.remove(); // Remove the parent container when the trash icon is clicked
        });
    }
}

// Request Get to URL woks from API 
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
