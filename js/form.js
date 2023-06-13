// (1) Variablen initialisieren
const formContainer = document.getElementById("form");
const thankYouContainer = document.getElementById("game");
const submitButton = document.getElementById("start-button");
submitButton.disabled = true;
const emailField = document.getElementById("email");
const prenameField = document.getElementById("prename");
const nameField = document.getElementById("name");
const newsletterField = document.getElementById("newsletter");
const hintText = document.getElementById("hint");
const requiredFields = [prenameField, nameField, emailField];


// (3) Interaktionen Code
const onChangeField = () => {
  // submitButton.style.backgroundColor = "red";
  // const requiredFields = [prenameField, nameField, emailField];

  let submitButtonDisabled = true;
  let filledFields = 0;
  for (let i = 0; i < requiredFields.length; i++) {
    if (requiredFields[i].value !== "") filledFields++;
  }

  if (filledFields == requiredFields.length) submitButtonDisabled = false;
  submitButton.disabled = submitButtonDisabled;
};

const checkSubmit = () => {
  const emailPattern = /^[a-z0-9]+@[a-z]+\.[a-z]{2,}$/;
  if (!emailPattern.test(emailField.value)) {
    hintText.innerHTML = "Die Email-Adresse muss dem folgenden Muster entsprechen: name@provider.xy";
    return;
  }

  onClickSubmit();
}

const onClickSubmit = async () => {
  // Daten aus dem Formular für die Datenbank bereitstellen
  const data = {
    group: "b6", // SQL Gruppen Namen
    pw: "298fd54f", // SQL Passwort
    tableName: "user", // Name der Tabelle in der SQL Datenbank

    columns: {
      // "email" Name der Spalte in der SQL Tabelle
      // "emailField.value" Eingabe des Benutzers aus dem Formularfeld
      email: emailField.value,
      vorname: prenameField.value,
      name: nameField.value,
      newsletter: (newsletterField.checked ? 1 : 0),
    },
  };

  // Speichert die Daten in der Datenbank
  let DBAnswer = await databaseClient.insertInto(data);

  if (DBAnswer.error) {
    let errorMsg = DBAnswer.error.sqlMessage;
    if (errorMsg.includes("Duplicate entry")) {
      hintText.innerHTML = "Diese Email-Adresse existiert bereits. Verwenden Sie eine andere Email-Adresse um am Gewinnspiel teilzunehmen.";
    }
    else {
      hintText.innerHTML = "Unbekannter Fehler: " + errorMsg;
    }
  } else {
    // Nach dem Speichern verschwindet das Formular, eine das Game erscheint
    formContainer.classList.add("hidden");
    thankYouContainer.classList.remove("hidden");

    // Name einfüllen
    document.getElementById("firstPlayer-nickname").innerHTML = prenameField.value;
  }
};



// (2) Interaktionen festlegen
requiredFields.forEach(element => element.addEventListener("keyup", onChangeField));

submitButton.addEventListener("click", async (event) => {
  event.preventDefault();
  checkSubmit();
});