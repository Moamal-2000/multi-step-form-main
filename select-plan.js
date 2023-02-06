"use strict";

const switcher = document.getElementById("monthly-yearly"),
  switcherSpan = document.querySelector(".select-sub #monthly-yearly span"),
  monthlyLabel = document.querySelector(".select-sub .monthly"),
  yearlyLabel = document.querySelector(".select-sub .yearly"),
  plans = document.querySelectorAll(".select-plan-section .plans .plan"),
  pricesElements = [...document.querySelectorAll(".select-plan-section .plans .plan .price")],
  pricesContainersEle = document.querySelectorAll(".select-plan-section .plans .plan div");



function switchPrices() {
  switcherSpan.style.transform === "translateX(4px)"
    ? setYearlyContent()
    : setMonthlyContent();
}



function setMonthlyContent() {
  switcherSpan.style.transform = "translateX(4px)";
  monthlyLabel.classList.add("active");
  yearlyLabel.classList.remove("active");

  pricesElements[0].textContent = "$9/mo";
  pricesElements[1].textContent = "$12/mo";
  pricesElements[2].textContent = "$15/mo";

  for (let i = 0; i < pricesContainersEle.length; i++) {
    for (let j = 0; j < pricesContainersEle[i].children.length; j++) {
      if (j === pricesContainersEle[i].children.length - 1) {
        if (pricesContainersEle[i].children[j].textContent.indexOf("yr") !== -1)
          // remove last element
          pricesContainersEle[i].children[j].remove();
      }

      if (pricesContainersEle[i].children[j].textContent === "2 months free")
        pricesContainersEle[i].children[j].remove();
    }
  }

  plans.forEach((plan, i) => {
    if (plan.classList.contains("active")) {

      localStorage.setItem("selectedPlan", i);
      localStorage.setItem("typeSub", plan.children[1].children[0].textContent);
      localStorage.setItem("priceSub", plan.children[1].children[1].textContent);
    }
  });
  localStorage.setItem("monthlySub", monthlyLabel.classList.contains("active"));
}



function setYearlyContent() {
  switcherSpan.style.transform = "translateX(23px)";
  yearlyLabel.classList.add("active");
  monthlyLabel.classList.remove("active");

  pricesElements[0].textContent = "$90/yr";
  pricesElements[1].textContent = "$120/yr";
  pricesElements[2].textContent = "$150/yr";

  for (let i = 0; i < pricesContainersEle.length; i++) {
    let span = document.createElement("span");
    span.className = "discount";
    span.appendChild(document.createTextNode("2 months free"));
    pricesContainersEle[i].appendChild(span);
  }

  plans.forEach((plan, i) => {
    if (plan.classList.contains("active")) {

      localStorage.setItem("selectedPlan", i);
      localStorage.setItem("typeSub", plan.children[1].children[0].textContent);
      localStorage.setItem("priceSub", plan.children[1].children[1].textContent);
    }

  });
  localStorage.setItem("monthlySub", monthlyLabel.classList.contains("active"));
}



let monthlySub = localStorage.getItem("monthlySub");
monthlySub === "true"
  ? setMonthlyContent()
  : monthlySub === "false"
  ? setYearlyContent()
  : "";

switcher.addEventListener("click", switchPrices);
monthlyLabel.addEventListener("click", switchPrices);
yearlyLabel.addEventListener("click", switchPrices);

plans.forEach((plan, i) => {
  plan.addEventListener("click", () => {
    plans.forEach((plan) => {
      if (plan.classList.contains("active")) plan.classList.remove("active");
    });

    localStorage.setItem("selectedPlan", i);
    localStorage.setItem("typeSub", plan.children[1].children[0].textContent);
    localStorage.setItem("priceSub", plan.children[1].children[1].textContent);

    plan.classList.add("active");
    steps[2].classList.remove("blocked");
    localStorage.setItem("step2", true);
  });
});



if (localStorage.getItem("selectedPlan") === null) localStorage.setItem("selectedPlan", 0);



let selectedPlan = localStorage.getItem("selectedPlan");
if (selectedPlan !== null) {
  plans.forEach((plan) => {
    if (plan.classList.contains("active")) plan.classList.remove("active");
  });

  plans[selectedPlan].classList.add("active");
  localStorage.setItem(
    "typeSub",
    plans[selectedPlan].children[1].children[0].textContent
  );
  localStorage.setItem(
    "priceSub",
    plans[selectedPlan].children[1].children[1].textContent
  );
}



const steps = document.querySelectorAll(".container .sidebar nav ul li");
steps.forEach((step) => step.classList.add("blocked"));

steps[0].classList.remove("blocked");
steps[1].classList.remove("blocked");

// If step 2 passed unlock step3 and step4
if (localStorage.getItem("step2") === "true") {
  steps[2].classList.remove("blocked");
  steps[3].classList.remove("blocked");
}



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



const nextButton = document.querySelector(".steps-buttons-holder .next-step"),
  nextButtonMobile = document.querySelector("footer .steps-buttons-holder .next-step"),
  backButton = document.querySelector(".steps-buttons-holder .back-step"),
  backButtonMobile = document.querySelector("footer .steps-buttons-holder .back-step");



nextButton.addEventListener("click", () => {
  location.href = "add-ons.html";
});

nextButtonMobile.addEventListener("click", () => {
  location.href = "add-ons.html";
});

backButton.addEventListener("click", () => (location.href = "index.html"));

backButtonMobile.addEventListener("click", () => (location.href = "index.html"));





//! Phone number must delete error message before another one appears