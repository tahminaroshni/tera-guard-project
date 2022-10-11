
const header = document.querySelector('.header');
const nav = document.querySelector('.nav');
const navLinks = document.querySelector('.nav-links');
const learnMoreBtn = document.querySelector('.learn-more-btn');
const allSection = document.querySelectorAll('.section');
const featuresSection = document.querySelector('#section-features');
const featureImages = document.querySelectorAll('.features-img');
const images = document.querySelectorAll('.features-img[data-src]');
const toggleBtnsContainer = document.querySelector('.toggle-btns-container');
const toggleBtns = document.querySelectorAll('.toggle-btn');
const btnOperations = document.querySelectorAll('.operation');
const backBtn = document.querySelector('.back-arrow');
const nextBtn = document.querySelector('.forward-arrow');
const slides = document.querySelectorAll('.slide-info');
const dotsDiv = document.querySelector('.dots');
const toggleNav = document.querySelector('.nav-toggle');
const openModalBtn = document.querySelectorAll('.open-modal-btn');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const closeBtn = document.querySelector('.close-btn');
const cookies = document.querySelector('.cookies');
const acceptCookie = document.querySelector('.accept-cookie-btn');

// Hide Cookie
acceptCookie.addEventListener('click', function () {
  cookies.classList.add('hide-cookie');
})

// Toggle Navbar
function showNavbar() {
  navLinks.classList.add('show-nav');
  document.querySelector('html').style.overflow = 'hidden';
}

function hideNavbar() {
  navLinks.classList.remove('show-nav');
  document.querySelector('html').style.overflow = 'visible';
}

toggleNav.addEventListener('click', function () {
  if (navLinks.classList.contains('show-nav')) hideNavbar();
  else showNavbar();
})

navLinks.addEventListener('click', function (event) {
  event.preventDefault();
  if ((navLinks.classList.contains('show-nav')) && (event.target.classList.contains('nav-link-a'))) {
    navLinks.classList.remove('show-nav');
    document.querySelector('html').style.overflow = 'visible';
  }
})

// Show Modal
function showModal() {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
}

// Hide Modal
function hideModal() {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
}

openModalBtn.forEach(btn => {
  btn.addEventListener('click', function (e) {
    e.preventDefault();
    showModal();
  })
})

closeBtn.addEventListener('click', function () {
  hideModal();
})

overlay.addEventListener('click', function () {
  hideModal();
})

// Sticky Navbar
const navHeight = nav.getBoundingClientRect().height;
console.log(navHeight);
function stickyNav(entries) {
  const entry = entries[0];
  if (!entry.isIntersecting) {
    header.classList.add('sticky');
  }
  else header.classList.remove('sticky');
}

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null, //viewport
  threshold: 0,
  rootMargin: `-${navHeight}px`,
})
headerObserver.observe(header);
// console.log(headerObserver);

// Reveal Section
const sectionReveal = (entries, observer) => {
  const entry = entries[0];
  // console.log(entry.target);
  if (!entry.isIntersecting) return;
  else entry.target.classList.remove('section-reveal');
  observer.unobserve(entry.target);
  // console.log(entry);
}
const sectionObserver = new IntersectionObserver(sectionReveal, {
  root: null, //viewport
  threshold: 0.2,
});
allSection.forEach(section => {
  sectionObserver.observe(section);
  section.classList.add('section-reveal');
})

// Scroll Behavior
navLinks.addEventListener('click', function (event) {
  event.preventDefault();
  if (event.target.classList.contains('nav-link-a')) {
    const id = event.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
})

// Learn More
learnMoreBtn.addEventListener('click', function (event) {
  event.preventDefault();
  featuresSection.scrollIntoView({ behavior: 'smooth' });
})

// Lazy image loading
const loadImg = (entries, observer) => {
  const entry = entries[0];
  // console.log(entry);
  if (entry.isIntersecting) {
    const src = entry.target.dataset.src;
    entry.target.setAttribute('src', `${src}`);
    entry.target.addEventListener('load', function () {
      entry.target.classList.remove('lazy-img');
    })
  }
  else return;
}

const featuresImgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});

featureImages.forEach(featureImage => {
  featuresImgObserver.observe(featureImage);
})

// Slider
let currentSlideNum = 0;
const maxSlideNum = slides.length - 1;

function previousSlide() {
  if (currentSlideNum === 0) {
    currentSlideNum = maxSlideNum;
  }
  else currentSlideNum--;
  slides.forEach((slide, i) => {
    changeSlide(slide, i);
  })
}

function nextSlide() {
  if (currentSlideNum === 2) {
    currentSlideNum = 0;
  }
  else currentSlideNum++;
  slides.forEach((slide, i) => {
    changeSlide(slide, i);
  })
}

function changeSlide(cs, i) {
  cs.style.transform = `translateX(${((i - currentSlideNum) * 100)}%)`;
}

// Arrow Handler
backBtn.addEventListener('click', function () {
  previousSlide();
})

nextBtn.addEventListener('click', function () {
  nextSlide();
})

// Slide Key Handler
document.addEventListener('keydown', function (event) {
  if (event.key === "ArrowLeft") previousSlide();
  if (event.key === "ArrowRight") nextSlide();
})

// Dots
const createDots = () => {
  dotsDiv.textContent = '';
  slides.forEach((_, i) => {
    const btnDot = document.createElement('button');
    btnDot.classList.add('dot');
    dotsDiv.appendChild(btnDot);
  })
}

createDots();

// Activate Dots
function activateDots(dot, currentSlideNum) {
  dots.forEach(dot => {
    dot.classList.remove('dot-active')
  })
  dot.classList.add('dot-active');

  // Update Slide
  slides.forEach((slide, i) => {
    slide.style.transform = `translateX(${((i - currentSlideNum) * 100)}%)`;
  })
}

// Dot Handler
const dots = document.querySelectorAll('.dot');
dots.forEach((dot, i) => {
  dot.addEventListener('click', function (event) {
    activateDots(event.target, i);
  })
})

// Toggle Operations
toggleBtnsContainer.addEventListener('click', function (event) {
  if (event.target.closest('.toggle-btn')) {
    toggleBtns.forEach(toggleBtn => {
      toggleBtn.classList.remove('toggle-btn-active');
    })
    event.target.classList.add('toggle-btn-active');
    const btnNumber = event.target.dataset.btn;
    console.log(btnNumber);
    btnOperations.forEach(btnOperation => {
      btnOperation.classList.add('hidden');
    })
    document.querySelector(`.operation--${btnNumber}`).classList.remove('hidden');
  }
  else return;
})