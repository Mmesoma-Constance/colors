"use strict";

// reveal on scroll
const allSection = document.querySelectorAll(".section");

const revealSection = function (entries, observer) {
  const [entry] = entries;
  console.log(entry);
  if (!entry.isIntersecting) return;
  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSection.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
});

// tab components

const tabs = document.querySelectorAll(".operations__tab");
const tabContainer = document.querySelector(".operations__tab-container");
const tabContent = document.querySelectorAll(".operations__content");

// tabs.forEach((t) =>
//   t.addEventListener("click", () => {
//     console.log("clicked");
//   })
// );

tabContainer.addEventListener("click", function (e) {
  // const clicked = e.target.parentElement;
  const clicked = e.target.closest(".operations__tab");
  // console.log(clicked);

  // guard clause
  if (!clicked) return;

  // active tab
  tabs.forEach((t) => t.classList.remove("operations__tab--active"));

  tabContent.forEach((c) => c.classList.remove("operations__content--active"));

  // activate tab
  clicked.classList.add("operations__tab--active");

  //activate content area
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add("operations__content--active");
});

//////////////////////////////////////

//slider

const slider = document.querySelector(".slider");
const btnLeft = document.querySelector(".slider__btn--left");
const btnRight = document.querySelector(".slider__btn--right");

slider.style.transform = "scale(0.5) translateX(-800px)";
slider.style.overflow = "visible";

const slides = document.querySelectorAll(".slide");

let currentSlide = 0;
const maxSlide = slides.length;

slides.forEach((s, i) => (s.style.transform = `translateX(${100 * i}%)`));
// 0%, 100%, 200%, 300%

btnRight.addEventListener("click", function () {
  if (currentSlide === maxSlide - 1) {
    currentSlide = 0;
  } else {
    currentSlide++;
  }

  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - currentSlide)}%)`)
  );
  // -100%, 0%, 200%,
});
