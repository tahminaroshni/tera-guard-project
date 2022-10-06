const navLinks = document.querySelector('.nav-links');
// const featuresImage = document.querySelector('.features-img');
const toggleNav = document.querySelector('.nav-toggle');
const claimBtn = document.querySelector('.claim-btn');
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
}

function hideNavbar() {
  navLinks.classList.remove('show-nav');
}

toggleNav.addEventListener('click', function () {
  if (navLinks.classList.contains('show-nav')) hideNavbar();
  else showNavbar();
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

claimBtn.addEventListener('click', function () {
  showModal();
})

closeBtn.addEventListener('click', function () {
  hideModal();
})

overlay.addEventListener('click', function () {
  hideModal();
})