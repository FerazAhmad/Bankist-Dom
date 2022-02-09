"use strict";

///////////////////////////////////////
// Modal window

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");
const tabs = document.querySelectorAll(".operations__tab");
const tabContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");
const nav = document.querySelector(".nav");

const handlerHover = function (e, opacity) {
  // console.log(this);
  if (e.target.classList.contains("nav__link")) {
    const link = e.target;
    // console.log(opacity)
    const siblings = link.closest(".nav").querySelectorAll(".nav__link");
    const logo = link.closest(".nav").querySelector("img");
    siblings.forEach((el) => {
      // console.log(el);
      if (el !== link) {
        el.style.opacity = this;
        logo.style.opacity = this;
      }
    });
  }
};

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener("click", openModal);

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

btnScrollTo.addEventListener("click", function (e) {
  e.preventDefault();
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);

  // window.scrollTo(s1coords.left + window.pageXOffset,s1coords.top + window.pageYOffset);

  // window.scrollTo({
  //   left:s1coords.left + window.pageXOffset,
  //   top:s1coords.top + window.pageYOffset,
  //   behavior:'smooth'
  // })
  section1.scrollIntoView({ behavior: "smooth" });
});

// document.querySelectorAll('.nav__link').forEach(function(el){

//     el.addEventListener('click',function(e){
//      e.preventDefault();
//      const id = this.getAttribute('href');
//      console.log(id + "linksss");

//       const element = document.querySelector(id)
//       console.log(element);
//       element.scrollIntoView({behavior:'smooth'})
//     });
// })

document.querySelector(".nav__links").addEventListener("click", function (e) {
  e.preventDefault();
  // console.log(e.target);
  if (e.target.classList.contains("nav__link")) {
    e.preventDefault();
    const id = e.target.getAttribute("href");
    // console.log(id + "linksss");

    const element = document.querySelector(id);
    // console.log(element);
    element.scrollIntoView({ behavior: "smooth" });
  }
});

tabContainer.addEventListener("click", function (e) {
  const clicked = e.target.closest(".operations__tab");
  // console.log(clicked);
  // console.log(`${clicked.dataset.tab}`);
  console.log(document.querySelector(`.operations__content--3`));

  if (!clicked) return;

  tabs.forEach((t) => t.classList.remove("operations__tab--active"));
  clicked.classList.add("operations__tab--active");
  tabsContent.forEach((c) => c.classList.remove("operations__content--active"));
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add("operations__content--active");
});

nav.addEventListener("mouseover", handlerHover.bind(0.5));

nav.addEventListener("mouseout", handlerHover.bind(1));

// const initialCoords = section1.getBoundingClientRect();
// console.log(initialCoords);

// window.addEventListener('scroll',function(e){
// console.log(this.scrollY);
//    if(this.scrollY > initialCoords.top){
//      nav.classList.add('sticky');
//    }else{
//     nav.classList.remove('sticky');
//    }

// })

///////////////////////////////////////

// selecting elements
// const header = document.querySelector('.header')
// console.log(document.documentElement)
// console.log(document.head)
// console.log(document.body)

// const allsection = document.querySelectorAll('.section');
// console.log(allsection);
//  const button = document.getElementsByTagName('button');
//  console.log(button);
//  console.log(document.getElementsByClassName('btn'));

// ceating and inserting element
// const message = document.createElement('div');
// message.classList.add('cookie-message');
// message.textContent='we use cookies for improve functionality and analytics';
// message.innerHTML = 'we use cookies for improve functionality and analytics.<button class = "btn btn--close--cookie">Got it</button>';
//header.prepend(message);
// header.append(message.cloneNode(true))
// header.append(message)

// header.before(message);
// header.after(message);
// delete elementd
// })

// h1.addEventListener('mouseenter',function(){

// })

const h1 = document.querySelector("h1");
console.log(h1.querySelectorAll(".highlight"));
//  h1.closest('.header').style.background='white'

// const obsCallBack = function (entries, observer) {
//   entries.forEach((entry) => {
//     console.log(entry);
//   });
// };

// const obsOption = {
//   root: null,
//   threshold: [0, 0.2],
// };

// const observer = new IntersectionObserver(obsCallBack, obsOption);
// observer.observe(section1);
// console.log(section1);

const header = document.querySelector(".header");
const navHeight = nav.getBoundingClientRect().height;
console.log(navHeight);

const stickyNav = function (entries) {
  const [entry] = entries;
  //  console.log(entry);
  if (!entry.isIntersecting) {
    nav.classList.add("sticky");
  } else {
    nav.classList.remove("sticky");
  }
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);

// reveal section
const allSection = document.querySelectorAll(".section");
const revealSection = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);
  if (!entry.isIntersecting) return;

  entry.target.classList.remove("section--hidden");
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});
allSection.forEach(function (section) {
  sectionObserver.observe(section);
  // section.classList.add('section--hidden')
});

/////////////////////

const loadimg = function (entries, observer) {
  const [entry] = entries;
  console.log(entry);
  console.log(observer);
  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener("load", function () {
    entry.target.classList.remove("lazy-img");
  });
  observer.unobserve(entry.target);
};

const imgTargets = document.querySelectorAll("img[data-src]");
console.log(imgTargets);

const imgObserver = new IntersectionObserver(loadimg, {
  root: null,
  threshold: 0,
  rootMargin: "200px",
});

imgTargets.forEach((img) => imgObserver.observe(img));

// slider

const slides = document.querySelectorAll(".slide");
const btnRight = document.querySelector(".slider__btn--right");
const btnLeft = document.querySelector(".slider__btn--left");
const slider = document.querySelector(".slider");
const dotContainer = document.querySelector(".dots");
let currentslide = 0;
const maxSlide = slides.length;

// function


const creteDots = function () {
  slides.forEach((s, i) =>
    dotContainer.insertAdjacentHTML(
      "beforeend",
      `<button class= "dots__dot"  data-slide ="${i}"></button>`
    )
  );
};
const activateDots = function (slide) {
  document
    .querySelectorAll(".dots__dot")
    .forEach((dots) => dots.classList.remove("dots__dot--active"));

  document
    .querySelector(`.dots__dot[data-slide ="${slide}"]`)
    .classList.add("dots__dot--active");
};
const gotoslide = function (slide) {
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
  );
};
const init = function () {
  creteDots();
  activateDots(0);
  gotoslide(0);
};
init();

// next slide
const nextSlide = function () {
  if (currentslide === maxSlide - 1) {
    currentslide = 0;
  } else {
    currentslide++;
  }
  gotoslide(currentslide);
  activateDots(currentslide);
};
const previousSlide = function () {
  if (currentslide === 0) {
    currentslide = maxSlide - 1;
  } else {
    currentslide--;
  }
  gotoslide(currentslide);
  activateDots(currentslide);
};

//event handler
btnRight.addEventListener("click", nextSlide);
btnLeft.addEventListener("click", previousSlide);

document.addEventListener("keydown", function (e) {
  console.log(e);
  if (e.key === "ArrowLeft") previousSlide();
  e.key === "ArrowRight" && nextSlide();
});

dotContainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("dots__dot")) {
    const { slide } = e.target.dataset;
    console.log(slide);
    gotoslide(slide);
    activateDots(slide);
  }
});
