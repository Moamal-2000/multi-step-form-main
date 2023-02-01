"use strict";

const switcher = document.getElementById("monthly-yearly");
const switcherSpan = document.querySelector(".select-sub #monthly-yearly span");
const monthlyLabel = document.querySelector(".select-sub .monthly");
const yearlyLabel = document.querySelector(".select-sub .yearly");
const plans = document.querySelectorAll(".select-plan-section .plans .plan");
const pricesElements = [
  ...document.querySelectorAll(".select-plan-section .plans .plan .price"),
];
const pricesContainersEle = document.querySelectorAll(
  ".select-plan-section .plans .plan div"
);

function switchPrices() {
  if (switcherSpan.style.transform === "translateX(4px)") {
    setYearlyContent();
  } else {
    setMonthlyContent();
  }
}

function setMonthlyContent() {
  switcherSpan.style.transform = "translateX(4px)";
  monthlyLabel.classList.add("active");
  yearlyLabel.classList.remove("active");

  pricesElements[0].textContent = "$9/mo";
  pricesElements[1].textContent = "$12/mo";
  pricesElements[2].textContent = "$15/mo";

  loopOnParentElements: for (let i = 0; i < pricesContainersEle.length; i++) {
    loopOnChildrenElements: for (
      let j = 0;
      j < pricesContainersEle[i].children.length;
      j++
    ) {
      // get last element
      if (j === pricesContainersEle[i].children.length - 1) {
        if (pricesContainersEle[i].children[j].textContent.indexOf("yr") !== -1)
          pricesContainersEle[i].children[j].remove();
      }

      if (pricesContainersEle[i].children[j].textContent === "2 months free")
        pricesContainersEle[i].children[j].remove();
    }
  }

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

  localStorage.setItem("monthlySub", monthlyLabel.classList.contains("active"));
}

let monthlySub = localStorage.getItem("monthlySub");
monthlySub === "true" ? setMonthlyContent() : setYearlyContent();

switcher.addEventListener("click", switchPrices);
monthlyLabel.addEventListener("click", switchPrices);
yearlyLabel.addEventListener("click", switchPrices);

plans.forEach((plan, i) => {
  plan.addEventListener("click", () => {
    plans.forEach((plan) => {
      if (plan.classList.contains("active")) plan.classList.remove("active");
    });

    localStorage.setItem("selectedPlan", i);
    plan.classList.add("active");
  });
});

// set Default plan in local storage
// localStorage.setItem("selectedPlan", 0);

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
} else localStorage.setItem("selectedPlan", 0);

const nextButton = document.querySelector(".steps-buttons-holder .next-step");
const backButton = document.querySelector(".steps-buttons-holder .back-step");
backButton.addEventListener("click", () => {
  location.href = "index.html";
});

nextButton.addEventListener("click", () => {
  location.href = "add-ons.html";
});

// Got Type the sub and Price sub
// console.log(localStorage.getItem("typeSub"));
// console.log(localStorage.getItem("priceSub"));
// localStorage.clear()
