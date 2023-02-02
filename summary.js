"use strict";


const backButton = document.querySelector(".steps-buttons-holder .back-step");
backButton.addEventListener("click", () => {
  location.href = "add-ons.html";
});



const typeSub = document.querySelector(".finish-section h3.type-sub");
const totalPer = document.querySelector(".finish-section p.per");
if (localStorage.getItem("priceSub").slice(-2) === "mo") {
  typeSub.textContent = `${localStorage.getItem("typeSub")} (Monthly)`;
  totalPer.textContent = "Total (per month)";
} else {
  typeSub.textContent = `${localStorage.getItem("typeSub")} (Yearly)`;
  totalPer.textContent = "Total (per year)";
}



const priceSub = document.querySelector(".finish-section .price-sub");
const showAddOnsEle = document.querySelector(".finish-section .content .layout-content");
priceSub.textContent = localStorage.getItem("priceSub");



let addOnsLocal = localStorage.getItem("selectedAddOns")
let total = 0;
if (addOnsLocal !== null) {
  addOnsLocal = addOnsLocal.split(" ");
  addOnsLocal.shift();

  let addOnsTextLocal = localStorage.getItem("addOnsText");
  let addOnsTextLocalArr = addOnsTextLocal.split(",");
  addOnsTextLocalArr.pop();

  let addOnsPriceLocal = localStorage.getItem("addOnsPrice");
  let addOnsPriceLocalArr = addOnsPriceLocal.split(",");
  addOnsPriceLocalArr.pop();

  addOnsLocal.forEach((addOn, i) => {
    if (addOn === "true") {
      let div = document.createElement("div");
      let p = document.createElement("p");
      let span = document.createElement("span");
      
      p.appendChild(document.createTextNode(addOnsTextLocalArr[i]));
      span.appendChild(document.createTextNode(addOnsPriceLocalArr[i]));
      showAddOnsEle.appendChild(div);
      
      div.classList.add("line");
      div.append(p, span);
      
      total += parseFloat(addOnsPriceLocalArr[i].slice(2).slice(0, -3));
    }
  });
}



const totalPrice = document.querySelector(".finish-section .total-price");
// Get total price and show it in the site
function getTotalPrice() {
  total += parseFloat(localStorage.getItem("priceSub").slice(1).slice(0, -3));
  if (localStorage.getItem("priceSub").slice(-2) === "mo")
    totalPrice.textContent = `+$${total}/mo`;
  else totalPrice.textContent = `+$${total}/yr`;
}
getTotalPrice()



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



const selectSubButton = document.querySelector('.finish-section .layout-content button select')
selectSubButton.addEventListener('click', () => {
  localStorage.setItem('priceSub', selectSubButton.value)
  getTotalPrice()


  if (localStorage.getItem("priceSub").slice(-2) === 'mo') {
    priceSub.textContent = localStorage.getItem("priceSub");
  } else {
    priceSub.textContent = localStorage.getItem("priceSub");
  }
})