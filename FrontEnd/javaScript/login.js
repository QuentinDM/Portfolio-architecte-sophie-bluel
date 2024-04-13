function usersConnexion() {
  const connexionFormular = document.querySelector(".connexion-formular");
  connexionFormular.addEventListener("submit", function (event) {
      event.preventDefault();
      
      // Récupérer les valeurs des champs de saisie du formulaire
      const email = event.target.querySelector("[name=email]").value;
      const password = event.target.querySelector("[name=password]").value;

      // Création de l'objet utilisateur avec les valeurs des champs de saisie
      const user = {
          email: email,
          password: password
      }

      // Création de la charge utile au format JSON
      const chargeUtile = JSON.stringify(user);

      // Appel de la fonction fetch avec toutes les informations nécessaires
      fetch("http://localhost:5678/api/users/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: chargeUtile
      })
      .then(response => {
          if (!response.ok) {
              throw new Error('Erreur lors de la connexion');
          }
          return response.json();
      })
      .then(data => {
        //mettre le token disponible
          localStorage.setItem("token", JSON.stringify(data.token));
          //console.log(JSON.parse(localStorage.getItem("token")));
          // Exemple de redirection vers  une autre page
          window.location.href = "./homepage.edit.html";
          
      })
      .catch(error => {
            const formularSection = document.querySelector(".formular");
            console.error('Une erreur est survenue lors de la connexion :', error);
            // Afficher un message d'erreur à l'utilisateur
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

// Appeler la fonction lors du chargement de la page
usersConnexion();


