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

switcherSpan.style.transform = "translateX(4px)";

function switchPrices() {
  if (switcherSpan.style.transform === "translateX(4px)") {
    switcherSpan.style.transform = "translateX(23px)";
    yearlyLabel.classList.add("active");
    monthlyLabel.classList.remove("active");

    pricesElements[0].textContent = "$90/yr";
    pricesElements[1].textContent = "$120/yr";
    pricesElements[2].textContent = "$150/yr";

    for (let i = 0; i < pricesContainersEle.length; i++) {
      let span = document.createElement("span");
      span.className = 'discount'
      span.appendChild(document.createTextNode("2 months free"));
      pricesContainersEle[i].appendChild(span);
    }
  } else {
    switcherSpan.style.transform = "translateX(4px)";
    monthlyLabel.classList.add("active");
    yearlyLabel.classList.remove("active");

    pricesElements[0].textContent = "$9/mo";
    pricesElements[1].textContent = "$12/mo";
    pricesElements[2].textContent = "$15/mo";

    for (let i = 0; i < pricesContainersEle.length; i++) {
      for (let j = 0; j < pricesContainersEle[i].children.length; j++) {
        if (j === pricesContainersEle[i].children.length - 1)
          pricesContainersEle[i].children[j].remove();
      }
    }
  }
}

switcher.addEventListener("click", switchPrices);
monthlyLabel.addEventListener("click", switchPrices);
yearlyLabel.addEventListener("click", switchPrices);

plans.forEach((plan) => {
  plan.addEventListener("click", () => {
    plans.forEach((plan) => {
      if (plan.classList.contains("active")) plan.classList.remove("active");
    });

    plan.classList.add("active");
  });
});
