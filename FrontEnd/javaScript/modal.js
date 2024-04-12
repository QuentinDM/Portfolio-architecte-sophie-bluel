const modalAddPictures = document.querySelector(".modal-wrapper2");
const modalDeletedPics = document.querySelector(".modal-wrapper");


const closeModalBox = document.querySelectorAll(".icon-cross");
const returnModal = document.querySelector(".arrow-left");
const openModalBox = document.querySelector(".modified");
const modal = document.querySelector(".modal");

// Function to open and close modal
function OpenAndCloseModal() {

  // Open the modal when the open button is clicked
  openModalBox.addEventListener("click", function () {
    modal.style.display = "flex";
    modalAddPictures.style.display = "none";//make the focus on the first modal   
    modalDeletedPics.style.display = "flex";//make the focus on the first modal 
  });

  // Close the modal when the close button is clicked
  // Iterate over each time there is a class="icon-cross"
  closeModalBox.forEach(icon => {
    icon.addEventListener("click", function() {
        // Code à exécuter lors du clic sur l'icône
        modal.style.display = "none"
    });
  });

  //if we cliked outside from the modal
  window.addEventListener("click", (e) =>{
    if (e.target === modal) {
      console.log(e.target);
      modal.style.display = "none";
    }
  })

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

const token = JSON.parse(window.localStorage.getItem("token")); // token for delete and Post works

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
        imageElement.classList.add("images-modal-one");

        // Create trash icon
        const deletedIcons = document.createElement("i");
        deletedIcons.classList.add("fa-solid", "fa-trash-can", "trash-icons"); // Add classes for the trash icon

        // Create a container for the image and trash icon
        const container = document.createElement("div");
        container.appendChild(imageElement);
        container.appendChild(deletedIcons);

        // Append the container to the gallery
        divGallery.appendChild(container);

    }
}

// Function to log the ids of items and request to delet from the API HTTP
function deletWorkIds(data) {
  const deletedIcons = document.querySelectorAll(".trash-icons");
  // On stocke chaque id des travaux dans une variable, à l'aide de la fonction map(qui sera dans un tableau automatiquement)
  const id = data.map(data => data.id);
  // Parcourir chaque icône de suppression
  for (let i = 0; i < deletedIcons.length; i++) {
    // Ajouter l'attribut id à l'icône de suppression
    deletedIcons[i].setAttribute('id', id[i]);

    // Éviter de créer 100 fois un événement "click", si on met juste "deletedIcons", mais si on met "deletedIcons[i]", on cible et crée un seul événement "click" sur chaque icône
    deletedIcons[i].addEventListener("click", function (event) {
      
      // Récupérer l'ID de l'icône spécifique sur laquelle vous avez cliqué
      const iconId = this.getAttribute('id');

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
          event.preventDefault();//page don't refresh
        })
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
    deletWorkIds(data);
  })
  // Handle Error
  .catch(error => {
    console.error('Une erreur est survenue lors de la récupération des données :', error);
  });




// Replace all content in div class="uploaded" with images from files
const input = document.getElementById("new-work-pics"); // Input element for selecting images
const preview = document.getElementById("preview"); // Container to display preview of selected images
let newImage = ""; // Variable to hold the selected image globally
const categoryValue = document.querySelector("#categories"); // Input element for selecting categories
let formaDataSet = ""; // Variable to store the selected category

// Event listener to trigger when files are selected
input.addEventListener("change", updateImageDisplay);

const form = document.querySelector("#workinfo"); // Form element
const output = document.querySelector("#output"); // Output container
const trye = document.querySelector(".box-timer");// timer container

// Event listener for form submission
form.addEventListener("submit", async (event) => {
    event.preventDefault();

  // Determine the category value based on the selected option
  switch (categoryValue.value) {
    case "Objets":
        formaDataSet = parseInt(1);
        break;
    case "Appartements":
        formaDataSet = 2;
        break;
    case "Hotels & restaurants":
        formaDataSet = 3;
        break;
    default:
        // Handle default case if necessary
        break;
  }

    // Add elements to FormData within the form submission callback function
    const formData = new FormData(form);
    
    // Append the selected image to FormData
    formData.append("image", newImage, "image/jpeg");
    
    formData.set("category", parseInt(formaDataSet)); // Replace input.value with a number, paresint to keep like INTEGER, set() default change it like string
   
    // Remaining time in seconds
    let remainingTime = 3;

    // Function to update the message with the timer
    function updateMessage() { 
      trye.classList.add('output');
      output.innerHTML = `Your form will be sent in ${remainingTime} seconds...`;
    }

    function myAnimation() {
      const timer = document.createElement("div");
      timer.classList.add("timer-animation");
      trye.append(timer);
    }

    // Update the message initially
    updateMessage();
    myAnimation();
    // Countdown
    const countdownInterval = setInterval(() => {
        
        remainingTime--;
        updateMessage();
        // If the remaining time reaches 0, stop the counter and send the form
        if (remainingTime === 0) {
            output.innerHTML = "Your form has been successfully sent!";
            trye.style.background = "green"
            clearInterval(countdownInterval);

            setTimeout(() => {
              // Perform fetch request with FormData
              fetch("http://localhost:5678/api/works", {
                  method: "POST",
                  headers: { "Authorization": `Bearer ${token}`},
                  body: formData
              })
              .then((response) => {
                  if (!response.ok) {
                      throw new Error(`Error ${response.status} while trying to upload the file.`);
                  }
                  return response.json();
              })
              .catch((error) => {
                console.error('Une erreur est survenue lors de la connexion :', error);
              });
            }, 1000)
        }
    }, 1000); // Call every second (1000 milliseconds)
});
// Function to update the display with selected images
function updateImageDisplay() {
    // Clear previous content in preview
    while (preview.firstChild) {
        preview.removeChild(preview.firstChild);
    }

    const curFiles = input.files; // Get the selected files
    
    // Check if files are selected
    if (curFiles.length === 0) {
        const para = document.createElement("p");
        para.textContent = "No file selected for upload";
        preview.appendChild(para);
    } else {
        // Display the selected image
        const image = document.createElement("img");
        preview.appendChild(image);
        for (let i = 0; i < curFiles.length; i++) {
            // Check if the file type is valid
            if (validFileType(curFiles[i])) {
                image.src = window.URL.createObjectURL(curFiles[i]);
                image.classList.add("image-src");
                newImage = curFiles[i];
            }
        }
    }
}

// Array containing valid file types
var fileTypes = ["image/jpeg", "image/png"];

// Function to validate file type
function validFileType(file) {
    // Logic to validate file type
    for (var i = 0; i < fileTypes.length; i++) {
        if (file.type === fileTypes[i]) {
            return true;
        }
    }
    return false;
}
