'use strict'

const steps = document.querySelectorAll(".container .sidebar nav ul li");

localStorage.clear()

steps.forEach(step => {
  step.classList.add("blocked");
  step.children[0].href = '#'
})

steps[0].classList.remove('blocked')
steps[0].children[0].href = 'index.html'