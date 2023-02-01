"use strict";

// localStorage.clear()

const addOns = document.querySelectorAll(".add-ons-section .add-ons .add");
const checkboxes = document.querySelectorAll(".add-ons .add input");
const prices = document.querySelectorAll(".add-ons-section .add .price");




function setSelectedAddOnsToLocal() {
  let data = ''
  for (let i = 0; i < checkboxes.length; i++) {
    data += ` ${checkboxes[i].dataset.checked}`
    localStorage.setItem('selectedAddOns', data)
  }
}




addOns.forEach(addOn => {

  addOn.addEventListener("click", () => {
    addOn.classList.toggle("active");

    if (addOn.children[0].dataset.checked === "true") {
      addOn.children[0].dataset.checked = false;
      addOn.children[0].checked = false;
      setSelectedAddOnsToLocal()
    } else {
      addOn.children[0].dataset.checked = true;
      addOn.children[0].checked = true;
      setSelectedAddOnsToLocal()
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



const nextButton = document.querySelector(".steps-buttons-holder .next-step");
const backButton = document.querySelector(".steps-buttons-holder .back-step");
backButton.addEventListener("click", () => {
  location.href = "select-plan.html";
});

nextButton.addEventListener("click", () => {
  location.href = "summary.html";
});


let selectedAddOns = localStorage.getItem('selectedAddOns')

if (selectedAddOns !== null) {
  let selectedAddOnsArr = selectedAddOns.split(' ')
  selectedAddOnsArr.shift()

  addOns.forEach((addOn, i) => {
    addOn.children[0].dataset.checked = selectedAddOnsArr[i]
  
    if (addOn.children[0].dataset.checked === 'true') {
      addOn.children[0].checked = true
      addOn.classList.add('active')
    } else {
      addOn.children[0].checked = false
      addOn.classList.remove('active')
    }
  })
}


// Got add-ons to local storage
// console.log(localStorage.getItem('selectedAddOns'));