/************************************************************************************************************ 
**                                                                                                         **
**                 // Create const to get element from the DOM to open and close modla with funcion        **
**                                                                                                         **
*************************************************************************************************************/
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

/************************************************************************************************************ 
**                                                                                                         **
**                 // Create works Element added Dynamically, with function createWorksElements(data)      **
**                                                                                                         **
*************************************************************************************************************/

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

/************************************************************************************************************ 
**                                                                                                         **
**       // Function to log the ids of items and request to delet from the API HTTP with token             **
**                                                                                                         **
*************************************************************************************************************/

function deletWorkIds(data) {
  const teste = document.querySelectorAll(".images-works");//remove the parendNode from the image which is apart from the modal
  const deletedIcons = document.querySelectorAll(".trash-icons");//select all trash images 
  
  // We store each job id in a variable, using the map function (which will be in an array automatically)
  const id = data.map(data => data.id);
  
  // Chek into all trash icons and add to each icons an envetListener (ROW 124)
  for (let i = 0; i < deletedIcons.length; i++) {
    
    // Add id attribute to delete icon TO PASS FETCH REQUEST
    deletedIcons[i].setAttribute('id', id[i]);

    // Avoid (éviter) creating a "click" event 100 times, if we just put "deletedIcons", but if we put "deletedIcons[i]", we target and create a single "click" event on each icon
    deletedIcons[i].addEventListener("click", function (event) {

      event.preventDefault();
      
      teste[i].parentNode.remove();//removing  image from DOM, image from outside of the modal

      // GET the ID of the specific icon you clicked
      const iconId = this.getAttribute('id');// TO DO THE REQUEST TO SPECIFY WICH ID WE WANT DELETE

      this.parentNode.remove();//remove the DOM the image click in the modal

      /**************************************************
        *          Request API HTTP DELETE              *
        *     (DO a FETCH request with the icon ID      *
        *          to GET job specific data)            *
        *************************************************/
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
          return response.json()
        })
        // Gérer les erreurs
        .catch(error => {
          console.error('Une erreur est survenue lors de la récupération des données :', error);
        });
    });
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
    deletWorkIds(data);
  })
  // Handle Error
  .catch(error => {
    console.error('Une erreur est survenue lors de la récupération des données :', error);
  });


/************************************************************************************************************ 
**                                                                                                         **
**            // Replace all content in div class="uploaded" with images from files                        **
**                                                                                                         **
*************************************************************************************************************/

const input = document.getElementById("new-work-pics"); // Input element for selecting images
const preview = document.getElementById("preview"); // Container to display preview of selected images
let newImage = ""; // Variable to hold the selected image globally
const categoryValue = document.querySelector("#categories"); // Input element for selecting categories
let formaDataSet = ""; // Variable to store the selected categoryID (ROW 214, 217, 120)

// Event listener to trigger when files are selected
input.addEventListener("change", updateImageDisplay);

const form = document.querySelector("#workinfo"); // Form element
const output = document.querySelector("#output"); // Output container
const timerContainer = document.querySelector(".box-timer");// timer container
const submitButton = document.querySelector("#btn");

/************************************************************************************************************ 
**                                                                                                         **
**                                // Event listener for form submission                                    **
**                                                                                                         **
*************************************************************************************************************/

form.addEventListener("submit", async (event) => {
    event.preventDefault();

  // Determine the category value based on the selected option VARIABLE CALL AT ROW 197
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

   // This code creates a new FormData object using data from a specified HTML form.
   const formData = new FormData(form);
  
   // For each message error exist remove it (like we don't submitted error message again )
   const removeMessageError = document.querySelectorAll(".error")
   removeMessageError.forEach(element => {
     element.remove();
   });
   
   //Image error if no error then append image into formData
   const imgElement = preview.querySelector(".image-src");
   if (!imgElement) {
       const addErrorImg = document.querySelector(".upload-picture");
       const errorMessage = document.createElement("p");
       errorMessage.innerHTML = "Vous avez oublié d'ajouter une photo";
       errorMessage.classList.add("error")
       addErrorImg.append(errorMessage);
   } else {
       // Append the selected image to FormData
       formData.append("image", newImage /* row 355*/, "image/jpeg");
   }

   // Title error if no error then append image into formData
   if(!formData.get("title")){//If there is no string, give an error
       const addErrorTxt = document.querySelector(".title-input");
       const errorMessage = document.createElement("p");
       errorMessage.innerHTML = "Vous avez oublié de mettre un titre";
       errorMessage.classList.add("error")
       addErrorTxt.append(errorMessage);
   }

   // Replace input.value with a number, paresint to keep like INTEGER, set() default change it like string (ROW 214, 217, 120)
   formData.set("category", parseInt(formaDataSet));
  
   // Remaining time in seconds
   let remainingTime = 3;
   
   //Condition if image and title be there 
   if (imgElement &&  formData.get("title")) {
     
     submitButton.parentNode.remove();// remove button "Valider" 

     // Function to update the message with the timer
     function updateMessage() { 
       timerContainer.classList.add('output');
       output.innerHTML = `Your form will be sent in ${remainingTime} seconds...`;
     }
     // fuction to created an animation 
     function myAnimation() {
       const timer = document.createElement("div");
       timer.classList.add("timer-animation");
       timerContainer.append(timer);
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
          //create a message to send to the user than form is sended 
          output.innerHTML = "Votre formulaire a bien été envoyé !";
          timerContainer.style.background = "green"
          clearInterval(countdownInterval);
      
          setTimeout(() => {
            /**************************************************
            *          Request API HTTP POST                  *
            *   ( Perform fetch request with FormData)        *
            ***************************************************/

            fetch("http://localhost:5678/api/works", {
                method: "POST",
                headers: { "Authorization": `Bearer ${token}`},
                body: formData
            })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Error ${response.status} while trying to upload the file.`);
                }
                window.location.reload();
            })
            .catch((error) => {
              console.error('Une erreur est survenue lors de la connexion :', error);
            });
          }, 1000)
        }
     }, 1000); // Call every second (1000 milliseconds)
   }
});

/************************************************************************************************************ 
**                                                                                                         **
**                        // Function to update the display with selected images                           **
**                                                                                                         **
*************************************************************************************************************/

function updateImageDisplay() {

    const curFiles = input.files; // Get the selected files
    // Check if files are selected
    if (curFiles.length === 0) {
        const para = document.createElement("p");
        para.textContent = "No file selected for upload";
        preview.appendChild(para);
    } else {
        submitButton.style.background = "#1D6154";// change background to btn submit
        for (let i = 0; i < curFiles.length; i++) {
            // Check if the file type is valid
            if (validFileType(curFiles[i])) {
              // Clear all element in div class="preview" (row 194)
              while (preview.firstChild) {
                  preview.removeChild(preview.firstChild);
              }
              //Add img inside the DIV CLASS=".upload-pictures"(row 193)
                const image = document.createElement("img");
                image.src = window.URL.createObjectURL(curFiles[i]);
                image.classList.add("image-src");
                newImage = curFiles[i];
                preview.appendChild(image);
            }
        }
    }
}

/************************************************************************************************************ 
**                                                                                                         **
**                // Array containing valid file types and // Function to validate file type               **
**                                                                                                         **
*************************************************************************************************************/

var fileTypes = ["image/jpeg", "image/png"];

function validFileType(file) {
    // Logic to validate file type
    for (var i = 0; i < fileTypes.length; i++) {
        if (file.type === fileTypes[i]) {
            return true;
        }
    }
    /*******************************************************************
    *     // Create the message error if the files types isn't good    *
    ********************************************************************/
    const addErrorFilesType = document.querySelector(".upload-picture");
    const errorMessage = document.createElement("p");
    errorMessage.innerHTML = "Veuillez sélectionner une image au format JPG ou PNG."
    errorMessage.classList.add("error")
    addErrorFilesType.append(errorMessage);
  
    return false;
}
