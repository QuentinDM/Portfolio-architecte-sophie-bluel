const modalAddPictures = document.querySelector(".modal-wrapper2");
const modalDeletedPics = document.querySelector(".modal-wrapper");

// Function to open and close modal
function OpenAndCloseModal() {
  const openModalBox = document.querySelector(".modified");
  const closeModalBox = document.querySelectorAll(".icon-cross");
  const modal = document.querySelector(".modal");
  const returnModal = document.querySelector(".arrow-left");
  // Open the modal when the open button is clicked
  openModalBox.addEventListener("click", function () {
      modal.style.display = "flex";
  });

  // Close the modal when the close button is clicked
  // Iterate over each time there is a class="icon-cross"
  closeModalBox.forEach(icon => {
    icon.addEventListener("click", function() {
        // Code à exécuter lors du clic sur l'icône
        console.log("Icon clicked");
        modal.style.display = "none"
    });
  });

  // Close the modal when the Escape key is pressed
  window.addEventListener("keydown", function (e) {
      if (e.key === "Escape" || e.key === "Esc") {
          modal.style.display = "none";
      }
  });
  // Return to the last modal
  returnModal.addEventListener("click", function () {
    modalAddPictures.style.display = "none";
    modalDeletedPics.style.display = "flex";
  })
}


function modalswitch() {
  const replaceModal = document.querySelector(".btn")
  //Event click on button for change Modal (Modal who can add Picture)
  replaceModal.addEventListener("click", function () {
    modalAddPictures.style.display = "flex";
    modalDeletedPics.style.display = "none";
  })
}
//call each function for Modal
OpenAndCloseModal();
modalswitch();

// Function to create DOM elements from working data
function createWorksElements(data) {
    // select DOM Element with class .gallery
    const divGallery = document.querySelector(".gallery-modal");
    
    // Loop through data and add image and title into figure tag, then append the figure tag to the DOM element with class .gallery
    for (let i = 0; i < data.length; i++) {
        const works = data[i];

        // Create image element and set its src attribute
        const imageElement = document.createElement("img");
        imageElement.src = works.imageUrl;

        // Create trash icon
        const deletedIcons = document.createElement("i");
        deletedIcons.classList.add("fa-solid", "fa-trash-can", "trash-icons"); // Add classes for the trash icon

        // Create a container for the image and trash icon
        const container = document.createElement("div");
        container.appendChild(imageElement);
        container.appendChild(deletedIcons);

        // Append the container to the gallery
        divGallery.appendChild(container);

        // Add event listener to each trash icon
        /*deletedIcons.addEventListener("click", function () {
            const parentContainer = this.parentNode;
            parentContainer.remove(); // Remove the parent container when the trash icon is clicked
        });*/
    }
}

// Function to log the ids of items in the data array
function getWorkIds(data) {

  const token = JSON.parse(window.localStorage.getItem("token")); // recuperation du token

  const deletedIcons = document.querySelectorAll(".trash-icons");
  // On stocke chaque id des travaux dans une variable, à l'aide de la fonction map(qui sera dans un tableau automatiquement)
  const id = data.map(data => data.id);
  // Parcourir chaque icône de suppression
  for (let i = 0; i < deletedIcons.length; i++) {
    // Ajouter l'attribut id à l'icône de suppression
    deletedIcons[i].setAttribute('id', id[i]);

    // Éviter de créer 100 fois un événement "click", si on met juste "deletedIcons", mais si on met "deletedIcons[i]", on cible et crée un seul événement "click" sur chaque icône
    deletedIcons[i].addEventListener("click", function () {
      // Récupérer l'ID de l'icône spécifique sur laquelle vous avez cliqué
      const iconId = this.getAttribute('id');
      // Afficher l'ID dans la console
      console.log("ID de l'icône cliquée :", iconId);
      // Effectuer une requête FETCH avec l'ID de l'icône pour récupérer les données spécifiques du travail
      fetch(`http://localhost:5678/api/works/${iconId}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}` // Utilisation du token obtenu à partir de la réponse précédente
      } 
      })
        .then(response => {
          // Vérifier si la réponse est correcte
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        // Récupérer les données de la réponse JSON et les afficher dans la console
        .then(data => console.log(data))
        // Gérer les erreurs
        .catch(error => {
          console.error('Une erreur est survenue lors de la récupération des données :', error);
        });
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
    getWorkIds(data);
  })
  // Handle Error
  .catch(error => {
    console.error('Une erreur est survenue lors de la récupération des données :', error);
  });

  







//Replace all content in div class="uploded" by image from files
const input = document.getElementById("new-work-pics");
const preview = document.getElementById("preview");

const title = document.querySelector("[name=title]");
const categories = document.querySelector("[name=categories]").value;

const sendRequest = document.querySelector(".btn-send");

console.log(sendRequest);
input.addEventListener("change", updateImageDisplay);

function updateImageDisplay() {
    while (preview.firstChild) {
        preview.removeChild(preview.firstChild);
    }

    const curFiles = input.files;
    console.log(curFiles.name);
    if (curFiles.length === 0) {
        const para = document.createElement("p");
        para.textContent = "Aucun fichier sélectionné pour le téléversement";
        preview.appendChild(para);
    } else {
        const image = document.createElement("img");
        preview.appendChild(image);
        for (let i = 0; i < curFiles.length; i++) {
            if (validFileType(curFiles[i])) {
              image.src = window.URL.createObjectURL(curFiles[i]);
              image.classList.add("image-src");
              console.log(curFiles[i].name);
              sendRequest.addEventListener("click", function (event) {

                event.preventDefault();

                const title = document.querySelector("[name=title]").value;
                //const categories = event.target.querySelector("[name=categories]").value;

                curFiles[i].name = title;
                console.log(curFiles[i].name);
              })
          }
        }
    }
}

var fileTypes = ["image/jpeg", "image/pjpeg", "image/png"];
function validFileType(file) {
    // Logique pour valider le type de fichier
    for (var i = 0; i < fileTypes.length; i++) {
      if (file.type === fileTypes[i]) {
        return true;
      }
    }
    return false;
}

