const connectionButton = document.querySelector(".connection-button");
const valueInputEmail = document.getElementById("email");
const valueInputPassword = document.getElementById("password");
const formularSection = document.querySelector(".formular");

connectionButton.addEventListener("click", function () {
    //Remove Error if already existing
    const errorMessage = formularSection.querySelector(".error-message");
    if (errorMessage) {
        formularSection.removeChild(errorMessage);
    }
    if (!(valueInputEmail.value === "sophie.bluel@test.tld" && valueInputPassword.value === "S0phie")) { //use the negation operator (!) only once to reverse the boolean value of the condition, if not logic error
        const addMessageError = document.createElement("p");
       //Add text and class 
       addMessageError.innerHTML = "Identifiants incorrects";
       addMessageError.classList.add("error-message");
       //add tag <p> before Log in
       formularSection.insertBefore(addMessageError, formularSection.firstChild);
    }else if (valueInputEmail.value === "sophie.bluel@test.tld" && valueInputPassword.value === "S0phie") { // Connection if input email and password is correct
        window.location.href = "/FrontEnd/index.html"
    }
    
})
