/************************************************************************************************************ 
**                                                                                                         **
**                                // Function for submit connecion request                                 **
**                                                                                                         **
*************************************************************************************************************/

function usersConnexion() {
  const connexionFormular = document.querySelector(".connexion-formular");
  connexionFormular.addEventListener("submit", function (event) {

        //NO RELOADING 
        event.preventDefault();

        // Take the values ​​of the form input fields
        const email = event.target.querySelector("[name=email]").value;
        const password = event.target.querySelector("[name=password]").value;   

        // Creation of the user object with the values ​​of the input fields
        const user = {
            email: email,
            password: password
        }   

        // Convert object "user" in JSON format, for send data to the serveur cuz this : headers: { "Content-Type": "application/json" },
        const chargeUtile = JSON.stringify(user);   

        /**************************************************
        *          Request API HTTP POST                  *
        * (used to submit data for processing to a server)*
        ***************************************************/
        fetch("http://localhost:5678/api/users/login", {//****************** 
            method: "POST",
            headers: { "Content-Type": "application/json" },// en-tete qui specifie que la requete est au format JSON  en definissant application/json qui est le format demander
            body: chargeUtile // data i want to send with the request 
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erreur lors de la connexion');
            }
            return response.json();
        })
        .then(data => {

            // Get the token and stock into browser (navigateur)
            localStorage.setItem("token", JSON.stringify(data.token)); 
            // why use JSON.stringify(data.token) cuz localStorage only store strings data.token is a data object.

            // Go to the edit page
            window.location.href = "./homepage.edit.html";

        })
        .catch(error => {
              const formularSection = document.querySelector(".formular");

              // Show a error message to the user 
              const removeMessageError = document.querySelector(".error-message")
              if (removeMessageError) {
                  formularSection.removeChild(removeMessageError);
              }
              const addMessageError = document.createElement("p");

              //Add text and class 
              addMessageError.innerHTML = "Erreur dans l’identifiant ou le mot de passe";
              addMessageError.classList.add("error-message");

              //add tag <p> before Log in
              formularSection.insertBefore(addMessageError, formularSection.firstChild);
          
        });
  });
}

// call the fuction When the page load
usersConnexion();


