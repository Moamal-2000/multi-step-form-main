"use strict";

const nextButton = document.querySelector(".steps-buttons-holder .next-step"),
  nextButtonMobile = document.querySelector("footer .steps-buttons-holder .next-step"),
  nameInput = document.getElementById("name-input"),
  emailInput = document.getElementById("email-input"),
  phoneInput = document.getElementById("phone-input");



//! Input user name logic
function userNameValidation(e) {
  let val = e.target.value.trim();
  localStorage.setItem("validUserName", /[a-z] [a-z]/gi.test(val));
  handleSubmit(false);
}



const userNameMessageSpan = document.createElement("span");
userNameMessageSpan.id = "user-message";
userNameMessageSpan.appendChild(
  document.createTextNode("user name is not valid")
);



nameInput.addEventListener("input", (e) => userNameValidation(e));
nameInput.addEventListener("blur", () => {
  const messageContainer = nameInput.parentElement.children[0];

  if (localStorage.getItem("validUserName") === "false") {
    messageContainer.appendChild(userNameMessageSpan);
    nameInput.style.border = 'solid 2px #ff5454'
  }
  handleSubmit(false);
});



nameInput.addEventListener("focus", (e) => {
  localStorage.setItem(
    "validUserName",
    /[a-z] [a-z]/gi.test(nameInput.value.trim())
  );
  const arrOfElements = Array.from(e.target.parentElement.children[0].children);
  arrOfElements.forEach((element) => {
    if (element.id === "user-message") element.remove();
    nameInput.style.border = ''
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



const emailMessageSpan = document.createElement("span");
emailMessageSpan.id = "email-message";
emailMessageSpan.appendChild(document.createTextNode("email is not valid"));



emailInput.addEventListener("input", (e) => emailValidation(e));
emailInput.addEventListener("blur", () => {
  const messageContainer = emailInput.parentElement.children[0];
  if (localStorage.getItem("validEmail") === "false") {
    messageContainer.appendChild(emailMessageSpan);
    emailInput.style.border = 'solid 2px #ff5454'
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
    if (element.id === "email-message") element.remove();
    emailInput.style.border = ''
  });
  handleSubmit(false);
});



//! Input phone number logic
function phoneNumberValidation(e) {
  let val = e.target.value.trim();
  localStorage.setItem("validPhoneNumber", /\+\d/.test(val));
  handleSubmit(false);
}



const phoneMessageSpan = document.createElement("span");
phoneMessageSpan.id = "phone-message";
phoneMessageSpan.appendChild(
  document.createTextNode("phone number is not valid")
);



phoneInput.addEventListener("input", (e) => phoneNumberValidation(e));
phoneInput.addEventListener("blur", () => {
  const messageContainer = phoneInput.parentElement.children[0];
  if (localStorage.getItem("validPhoneNumber") === "false") {
    messageContainer.appendChild(phoneMessageSpan);
    phoneInput.style.border = 'solid 2px #ff5454'
  }
  handleSubmit(false);
});



phoneInput.addEventListener("focus", (e) => {
  localStorage.setItem(
    "validPhoneNumber",
    /\+\d/.test(phoneInput.value.trim())
  );

  const arrOfElements = Array.from(e.target.parentElement.children[0].children);
  arrOfElements.forEach((element) => {
    if (element.id === "phone-message") element.remove();
    phoneInput.style.border = ''
  });
  handleSubmit(false);
});



//! Submit button logic
function updateValidationLocal() {
  localStorage.setItem(
    "validUserName",
    /[a-z] [a-z]/gi.test(nameInput.value.trim())
  );
  localStorage.setItem(
    "validEmail",
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      emailInput.value.trim()
    )
  );
  localStorage.setItem(
    "validPhoneNumber",
    /\+\d/.test(phoneInput.value.trim())
  );
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