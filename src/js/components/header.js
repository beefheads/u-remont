"use strict"

import "../unstable/burger.js"



/**
 * Кнопки открытия и закрытия миникорзины и аутенфикации
 */
const minicart = document.querySelector('.minicart');
const buttonCart = document.querySelector('.button-cart');
const miniAuth = document.querySelector('.auth');
const buttonAuth = document.querySelector('.button-auth');

function showMinicat() {
  buttonCart.parentElement.querySelector('.minicart').classList.add('minicart--visible')
  buttonCart.classList.add('header__button--active');
  hideAuth();
}
function hideMinicart() {
  buttonCart.classList.remove('header__button--active');
  buttonCart.parentElement.querySelector('.minicart').classList.remove('minicart--visible')
}
function toggleMinicart() {
  if (minicart.classList.contains('minicart--visible')) {
    hideMinicart();
  } else {
    showMinicat();
  }
}
if (buttonCart && minicart) {
  buttonCart.addEventListener('click', () => {
    toggleMinicart()
  });

  // scroll direcionts dim detector
  if (minicart.querySelector('.minicart__content')) {
    minicart.querySelector('.minicart__content').addEventListener('scroll', (e) => {
      const yOffset = e.target.scrollTop;
      if (yOffset > 20) {
        e.target.classList.add('minicart__content--scrolled')
      } else {
        e.target.classList.remove('minicart__content--scrolled')
      }
    })
  }

  window.addEventListener('scroll', () => {
    hideMinicart();
  })
  window.addEventListener('click', (e) => {
    const path = e.path || (e.composedPath && e.composedPath());
    if (!path) return;
    if (path.includes(minicart)) return;
    if (path.includes(buttonCart)) return;

    hideMinicart();
  });
}


/**
 * Липкая шапка
 */
const header = document.querySelector('.header');
const HEADER_SCROLLED_CLASS = 'header--scrolled'

let lastScrollY = 0;
function isWindowScrolled() {
  if (window.scrollY < 0) return;

  if (window.scrollY > lastScrollY) {
    header.classList.add('header--hidden');

    const event = new Event("header-hide");
    header.dispatchEvent(event);
  } else {
    header.classList.remove('header--hidden');

    const event = new Event("header-show");
    header.dispatchEvent(event);
  }

  setTimeout(() => {
    lastScrollY  = window.scrollY;
  }, 5)

  return lastScrollY > 5;
}

const debounce = (callback, wait) => {
  let timeoutId = null;
  return (...args) => {
    window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => {
      callback.apply(null, args);
    }, wait);
  };
}

header.addEventListener("header-hide", (e) => {
  const stickyHeader = document.querySelector('.page-heading--sticky-run');

  const headerHeight = header.getBoundingClientRect().height;

  if (!stickyHeader) return;

  stickyHeader.style.transform = `translateY(-${headerHeight}px)`;
});
header.addEventListener("header-show", (e) => {
  const stickyHeader = document.querySelector('.page-heading--sticky-run');

  if (!stickyHeader) return;

  stickyHeader.style.transform = '';
});

function stickyHeader() {
  if (isWindowScrolled()) {
    header.classList.add(HEADER_SCROLLED_CLASS);
  } else {
    header.classList.remove(HEADER_SCROLLED_CLASS);
  }
}

window.addEventListener('scroll', stickyHeader);
window.addEventListener('orientationchange', stickyHeader);
stickyHeader();

function calcHeaderInvert() {
 invertHeaderBlocks.forEach((inverter, index, arr) => {
    const bounds = inverter.getBoundingClientRect();

    if (arr[0].getBoundingClientRect().top > 100) {
      header.classList.remove('header--light')
    }
    if (bounds.top > 100) return;

    if (bounds.top < 100) {
        header.classList.add('header--light')
    }  else {
      header.classList.remove('header--light')
    }
    if (bounds.bottom < 100) {
      header.classList.remove('header--light')
    }

  })
}
const invertHeaderBlocks = document.querySelectorAll('[data-invert-header]');
window.addEventListener("scroll", (e) => {
  calcHeaderInvert();
});
calcHeaderInvert();
   

