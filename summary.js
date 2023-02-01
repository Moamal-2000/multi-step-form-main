"use strict";

const backButton = document.querySelector(".steps-buttons-holder .back-step");

backButton.addEventListener("click", () => {
  location.href = "add-ons.html";
});

const typeSub = document.querySelector(".finish-section h3.type-sub");
if (localStorage.getItem("priceSub").slice(-2) === "mo") {
  typeSub.textContent = `${localStorage.getItem("typeSub")} (Monthly)`;
} else {
  typeSub.textContent = `${localStorage.getItem('typeSub')} (Yearly)`
}

const priceSub = document.querySelector(".finish-section .price-sub");
priceSub.textContent = localStorage.getItem('priceSub')