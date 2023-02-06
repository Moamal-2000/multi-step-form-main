"use strict";

const nextButton = document.querySelector(".steps-buttons-holder .next-step"),
  nextButtonMobile = document.querySelector(
    "footer .steps-buttons-holder .next-step"
  ),
  nameInput = document.getElementById("name-input"),
  emailInput = document.getElementById("email-input"),
  phoneInput = document.getElementById("phone-input"),
  buttonsContainer = document.querySelector("footer .steps-buttons-holder"),
  messageContainer = nameInput.parentElement.children[0],
  userNameMessageSpan = document.createElement("span"),
  emailMessageSpan = document.createElement("span"),
  phoneMessageSpan = document.createElement("span");



let specialChars = "~`!@#$%^&*()_-=+/?.>,<'\":;}]{[|\\~";
let isInputPhoneContainsPlus = false;
let isValidatedPhoneNumber = false;
let isInputPhoneFocused = false;


let test = document.querySelector('.test')

console.log(test);


if (localStorage.getItem('validPhoneNumber') === 'true')
  isValidatedPhoneNumber = localStorage.getItem('validPhoneNumber')




//! Input user name logic
function userNameValidation(e) {
  let val = e.target.value.trim();
  let lastChar = val[val.length - 1];

  if (isNaN(parseFloat(lastChar))) {
    // if char was not number reset border and message to default
    nameInput.style.border = "";
    userNameMessageSpan.textContent = "";
  } else {
    // Show error message if char was number
    userNameMessageSpan.textContent = "";
    userNameMessageSpan.appendChild(
      document.createTextNode("Username must not contains numbers")
    );
    messageContainer.appendChild(userNameMessageSpan);

    nameInput.style.border = "solid 2px #ff5454";
    // Delete wrote char if its number
    e.target.value = e.target.value.slice(0, -1);
  }


  for (let i in specialChars) {
    if (specialChars[i] === lastChar) {
      // Show error message if char equal to one of the special characters
      userNameMessageSpan.textContent = "";
      userNameMessageSpan.appendChild(
        document.createTextNode(`Username must not contains (${specialChars})`)
      );
      messageContainer.appendChild(userNameMessageSpan);

      nameInput.style.border = "solid 2px #ff5454";

      // Delete wrote char if its special character
      e.target.value = e.target.value.slice(0, -1);
    }
  }

  localStorage.setItem("validUserName", /[a-z] [a-z]/gi.test(val));
  handleSubmit(false);
}





userNameMessageSpan.id = "user-message";

messageContainer.appendChild(userNameMessageSpan);
nameInput.addEventListener("input", (e) => userNameValidation(e));
nameInput.addEventListener("blur", (e) => {
  // Reset text message
  userNameMessageSpan.textContent = "";
  // Reset input's border
  nameInput.style.border = "";

  if (localStorage.getItem("validUserName") === "false") {
    userNameMessageSpan.appendChild(
      e.target.value.length === 0
        ? document.createTextNode("This field must not be empty")
        : document.createTextNode("Username require first name & last name")
    );
    messageContainer.appendChild(userNameMessageSpan);
    nameInput.style.border = "solid 2px #ff5454";
  }
  handleSubmit(false);
});




nameInput.addEventListener("focus", (e) => {
  localStorage.setItem("validUserName", /[a-z] [a-z]/gi.test(nameInput.value.trim()));

  const arrOfElements = Array.from(e.target.parentElement.children[0].children);
  arrOfElements.forEach((element) => {
    // Delete message element
    if (element.id === "user-message") {
      element.textContent = "";
      element.remove();
    }
    nameInput.style.border = "";
  });
  handleSubmit(false);
});




//! Input email logic
function emailValidation(e) {
  // I used Regex code from internet for validation email
  let val = e.target.value.trim();
  localStorage.setItem(
    "validEmail",
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      val
    )
  );
  handleSubmit(false);
}




emailMessageSpan.id = "email-message";

emailInput.addEventListener("input", (e) => emailValidation(e));
emailInput.addEventListener("blur", (e) => {
  const messageContainer = emailInput.parentElement.children[0];

  emailMessageSpan.appendChild(
    e.target.value.length === 0
      ? document.createTextNode("This field must not be empty")
      : document.createTextNode("Email is not valid")
  );

  if (localStorage.getItem("validEmail") === "false") {
    messageContainer.appendChild(emailMessageSpan);
    emailInput.style.border = "solid 2px #ff5454";
  }
  handleSubmit(false);
});





emailInput.addEventListener("focus", (e) => {
  localStorage.setItem(
    "validEmail",
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      emailInput.value.trim()
    )
  );

  const arrOfElements = Array.from(e.target.parentElement.children[0].children);
  arrOfElements.forEach((element) => {
    // Delete message elemnet
    if (element.id === "email-message") {
      element.textContent = "";
      element.remove();
    }
    emailInput.style.border = "";
  });
  handleSubmit(false);
});




//! Input phone number logic
function phoneNumberValidation(e) {
  const messageContainer = phoneInput.parentElement.children[0];
  let numbersCounted = 0;
  let lastChar = e.target.value.trim()[e.target.value.trim().length - 1];


  // Add sign + if phone number doesn't have it
  if (e.target.value.trim()[0] !== "+" && !isInputPhoneContainsPlus) {
    e.target.value = `+${e.target.value}`;
    isInputPhoneContainsPlus = true;
  }

  if (isNaN(parseFloat(lastChar))) {
    // Show error message if char was letter
    phoneMessageSpan.textContent = "";
    phoneMessageSpan.appendChild(
      document.createTextNode("Phone number must not contains Letters")
    );
    messageContainer.appendChild(phoneMessageSpan);

    phoneInput.style.border = "solid 2px #ff5454";
    e.target.value = e.target.value.trim().slice(0, -1)
    isInputPhoneContainsPlus = false;
  } else {
    // if char was not number reset border and message to default
    phoneInput.style.border = "";
    phoneMessageSpan.textContent = "";
  }

  for (let i in specialChars) {
    if (specialChars[i] === '+') continue;
    if (specialChars[i] === lastChar) {
      // Show error message if char equal to one of the special characters
      phoneMessageSpan.textContent = "";
      phoneMessageSpan.appendChild(
        document.createTextNode(
          `Phone number must not contains (${specialChars})`
        )
      );
      messageContainer.appendChild(phoneMessageSpan);

      phoneInput.style.border = "solid 2px #ff5454";

      isInputPhoneContainsPlus = false;
    }
  }

    // Get length numbers
    for (let i in e.target.value) {
      let number = e.target.value[i];
      if (number === "+") continue;
      if (number === " ") continue;
      numbersCounted++;
    }

  // Check if phone number is valid
  /\+\d/.test(e.target.value) && numbersCounted > 10 && numbersCounted < 14
    ? isValidatedPhoneNumber = true
    : isValidatedPhoneNumber = false;

  localStorage.setItem("validPhoneNumber", isValidatedPhoneNumber);
  handleSubmit(false);
}




phoneMessageSpan.id = "phone-message";

phoneInput.addEventListener("input", (e) => phoneNumberValidation(e));
phoneInput.addEventListener("blur", (e) => {
  const messageContainer = phoneInput.parentElement.children[0];
  let msg = "";
  
  isInputPhoneFocused = false;
  // if input have only sign + empty the input
  if (e.target.value.length === 1) e.target.value = "";

  /* set error message depending on
    1- if the input is empty
    2- if the input is less than 14 number
    3- if the input is larger than 14 number
  */
  e.target.value.length === 0
    ? (msg = document.createTextNode("This field must not be empty"))
    : e.target.value.length < 14
    ? (msg = document.createTextNode(
        `Phone number must be larger than ${e.target.value.length - 1} number`
      ))
    : (msg = document.createTextNode(
        `Phone number must be less than 14 number`
      ));

  // if phone number is not valid show error message
  if (localStorage.getItem("validPhoneNumber") === "false") {
    phoneMessageSpan.textContent = ''
    messageContainer.appendChild(phoneMessageSpan);
    phoneMessageSpan.append(msg);
    phoneInput.style.border = "solid 2px #ff5454";
  }
  handleSubmit(false);
});

phoneInput.addEventListener("focus", (e) => {
  isInputPhoneFocused = true
  localStorage.setItem("validPhoneNumber", isValidatedPhoneNumber);

  const arrOfElements = Array.from(e.target.parentElement.children[0].children);
  arrOfElements.forEach((element) => {
    if (element.id === "phone-message") {
      element.textContent = "";
      element.remove();
    }
    phoneInput.style.border = "";
  });
  handleSubmit(false);
});




phoneInput.addEventListener("keypress", (e) => {
  if (isInputPhoneFocused) {
    // if (e.target.value === '+') 
    //   e.target.value = e.target.value.slice(0, -1)

    if (e.key === "Backspace") {
      if (e.target.value === e.target.value[0]) e.preventDefault()
      if (e.target.value[0] === "+") {
        isInputPhoneContainsPlus = false;
      }
    }
  }
});




//! Submit button logic
function updateValidationLocal() {
  localStorage.setItem("validUserName", /[a-z] [a-z]/gi.test(nameInput.value.trim()));
  localStorage.setItem(
    "validEmail",
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      emailInput.value.trim()
    )
  );
  localStorage.setItem("validPhoneNumber", isValidatedPhoneNumber);
}




// Set data from inputs to local storage
function getSubmittedData() {
  localStorage.setItem("userName", nameInput.value.trim());
  localStorage.setItem("email", emailInput.value.trim());
  localStorage.setItem("phoneNumber", phoneInput.value.trim());
  localStorage.setItem("step1", true);
}




function handleSubmit(isValid = true) {
  updateValidationLocal();

  let validUserName = localStorage.getItem("validUserName"),
    validEmail = localStorage.getItem("validEmail"),
    validPhoneNumber = localStorage.getItem("validPhoneNumber"),
    validations = [validUserName, validEmail, validPhoneNumber],
    validated = 0;

  validations.forEach((validation) => {
    if (validation === "true") validated++;
  });

  // Check if all inputs are validated
  if (validated === validations.length) {
    getSubmittedData();
    steps[1].classList.remove("blocked");
    if (isValid) {
      location.href = "select-plan.html";
    }
  } else steps[1].classList.add("blocked");
}




function handleSubmitInvalidated(e) {
  let validUserName = localStorage.getItem("validUserName"),
  validEmail = localStorage.getItem("validEmail"),
  validPhoneNumber = localStorage.getItem("validPhoneNumber"),
  validations = [validUserName, validEmail, validPhoneNumber],
  validated = 0;


validations.forEach((validation) => {
  if (validation === "true") validated++;
});

if (validated !== validations.length) {
    setTimeout(() => {
      e.target.classList.remove('error')
    }, 300);
    e.target.classList.add('error')
  }
}




// Get data from local storage and put them in the inputs
let userNameLocal = localStorage.getItem("userName");
if (userNameLocal !== null) nameInput.value = userNameLocal;

let emailLocal = localStorage.getItem("email");
if (emailLocal !== null) emailInput.value = emailLocal;

let phoneNumberLocal = localStorage.getItem("phoneNumber");
if (phoneNumberLocal !== null) phoneInput.value = phoneNumberLocal;

// Steps logic
const steps = document.querySelectorAll(".container .sidebar nav ul li");

// block all steps
steps.forEach((step) => step.classList.add("blocked"));

// unblock first step
steps[0].classList.remove("blocked");

// If step 1 passed unlock step2
if (localStorage.getItem("step1") === "true") {
  steps[1].classList.remove("blocked");
}

// If step 2 passed unlock step3 and step4
if (localStorage.getItem("step2") === "true") {
  steps[2].classList.remove("blocked");
  steps[3].classList.remove("blocked");
}

// Check if all inputs are validated if not don't unlock next step
steps.forEach((step) => {
  step.addEventListener("click", () => {
    if (!step.classList.contains("blocked")) handleSubmit();
  });
});



// if steps doesn't have class blocked set url path on click
steps[0].addEventListener("click", () => {
  if (!steps[0].classList.contains("blocked")) location.href = "index.html";
});
steps[1].addEventListener("click", () => {
  if (!steps[1].classList.contains("blocked"))
    location.href = "select-plan.html";
});
steps[2].addEventListener("click", () => {
  if (!steps[2].classList.contains("blocked")) location.href = "add-ons.html";
});
steps[3].addEventListener("click", () => {
  if (!steps[3].classList.contains("blocked")) location.href = "summary.html";
});




nextButton.addEventListener("click", (e) => {
  e.preventDefault();
  handleSubmit();
});
nextButtonMobile.addEventListener("click", (e) => {
  e.preventDefault();
  handleSubmit();
});
nextButton.addEventListener("click", (e) => handleSubmitInvalidated(e));
nextButtonMobile.addEventListener("click", (e) => handleSubmitInvalidated(e));

