"use strict";

const addOns = document.querySelectorAll(".add-ons-section .add-ons .add");
const checkboxes = document.querySelectorAll(".add-ons .add input");
const prices = document.querySelectorAll(".add-ons-section .add .price");



function setSelectedAddOnsToLocal() {
  let data = "";
  for (let i = 0; i < checkboxes.length; i++) {
    data += ` ${checkboxes[i].dataset.checked}`;
    localStorage.setItem("selectedAddOns", data);
  }
}



let addOnsText = "";
let addOnsPrice = "";
addOns.forEach((addOn) => {
  addOn.addEventListener("click", () => {
    addOn.classList.toggle("active");

    if (addOn.children[0].dataset.checked === "true") {
      addOn.children[0].dataset.checked = false;
      addOn.children[0].checked = false;
      setSelectedAddOnsToLocal();
    } else {
      addOn.children[0].dataset.checked = true;
      addOn.children[0].checked = true;
      setSelectedAddOnsToLocal();
    }
  });
});



let monthlySub = localStorage.getItem("monthlySub");
if (monthlySub === "false") {
  prices[0].textContent = "+$10/yr";
  prices[1].textContent = "+$20/yr";
  prices[2].textContent = "+$20/yr";
} else if (monthlySub === "true") {
  prices[0].textContent = "+$1/mo";
  prices[1].textContent = "+$2/mo";
  prices[2].textContent = "+$2/mo";
}


let selectedAddOns = localStorage.getItem("selectedAddOns");
if (selectedAddOns !== null) {
  let selectedAddOnsArr = selectedAddOns.split(" ");
  selectedAddOnsArr.shift();

  addOns.forEach((addOn, i) => {
    addOn.children[0].dataset.checked = selectedAddOnsArr[i];

    if (addOn.children[0].dataset.checked === "true") {
      addOn.children[0].checked = true;
      addOn.classList.add("active");
    } else {
      addOn.children[0].checked = false;
      addOn.classList.remove("active");
    }
  });
}



addOns.forEach((addOn) => {
  addOnsText += `${addOn.children[1].children[0].textContent},`;
  localStorage.setItem("addOnsText", addOnsText);

  addOnsPrice += `${addOn.children[2].textContent},`;
  localStorage.setItem("addOnsPrice", addOnsPrice);
});


const steps = document.querySelectorAll(".container .sidebar nav ul li");

steps[0].addEventListener("click", () => {
  if (!steps[0].classList.contains("blocked")) location.href = "index.html";
});
steps[1].addEventListener("click", () => {
  if (!steps[1].classList.contains("blocked")) location.href = "select-plan.html";
});
steps[2].addEventListener("click", () => {
  if (!steps[2].classList.contains("blocked")) location.href = "add-ons.html";
});
steps[3].addEventListener("click", () => {
  if (!steps[3].classList.contains("blocked")) location.href = "summary.html";
});



const nextButton = document.querySelector(".steps-buttons-holder .next-step"),
  backButton = document.querySelector(".steps-buttons-holder .back-step"),
  nextButtonMobile = document.querySelector("footer .steps-buttons-holder .next-step"),
  backButtonMobile = document.querySelector("footer .steps-buttons-holder .back-step");

nextButton.addEventListener("click", () => (location.href = "summary.html"));

nextButtonMobile.addEventListener("click", () => {
  location.href = "summary.html";
});

backButton.addEventListener(
  "click",
  () => (location.href = "select-plan.html")
);

backButtonMobile.addEventListener("click", () => (location.href = "select-plan.html"));
