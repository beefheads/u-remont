"use strict"
/**
 * Бургер
 */
const BURGER_OPENED_WIDTH = 920;
const headerNavLinks = document.querySelectorAll('.header__nav-link');
const HEADER_NAV_LINK_OPENED = "header__nav-link--opened";
headerNavLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    if (!link.parentElement.classList.contains('header__nav-item--mobile-open')) return
    link.parentElement.classList.toggle(HEADER_NAV_LINK_OPENED);
  });
});



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
 * Кнопки атунтикации
 */
function showAuth() {
    buttonAuth.parentElement.querySelector('.auth').classList.add('auth--visible')
    buttonAuth.classList.add('header__button--active');
    hideMinicart();
}
function hideAuth() {
    buttonAuth.parentElement.querySelector('.auth').classList.remove('auth--visible')
    buttonAuth.classList.remove('header__button--active');
}
function toggleAuth() {
    if (miniAuth.classList.contains('auth--visible')) {
      hideAuth()
    } else {
      showAuth()
    }
}

if (buttonAuth) {
  buttonAuth.addEventListener('click', () => {
    toggleAuth();
  })

  const authMethodsTogglers = document.querySelectorAll('.auth__button-method-toggler')
  const authFieldsetClass = 'auth__fieldset';
  const authFieldsetClassActive = 'auth__fieldset--visible';
  authMethodsTogglers.forEach(button => {
    button.addEventListener('click', () => {
      const toggleName = button.dataset.toggler;
      // const activeToggler = document.querySelector(`.${authFieldsetClass}[data-toggler="${toggleName}"]`);
      document.querySelectorAll(`.${authFieldsetClass}`).forEach(fieldset => {
        if (fieldset.dataset.toggler != toggleName) {
          fieldset.classList.remove(authFieldsetClassActive)
        } else {
          fieldset.classList.add(authFieldsetClassActive)
        }
      })
    })
  })

  const authTabsTogglers = document.querySelectorAll('.auth__tabs .tabs__toggler')
  const authTabsPages = document.querySelectorAll('.auth__tabs .tabs__page')
  authTabsTogglers.forEach((toggler, togglerIndex) => {
    toggler.addEventListener('click', () => {
      authTabsPages.forEach((page, pageIndex) => {
        page.querySelectorAll(`.${authFieldsetClass}`).forEach(fieldset => {
          fieldset.classList.remove(authFieldsetClassActive)
        })
        page.querySelector(`.${authFieldsetClass}`).classList.add(authFieldsetClassActive)
      })
    })
  })
  window.addEventListener('scroll', () => {
    hideAuth();
  })

  window.addEventListener('click', (e) => {
    const path = e.path || (e.composedPath && e.composedPath());
    if (!path) return
    if (path.includes(miniAuth)) return;
    if (path.includes(buttonAuth)) return;

    hideAuth();
  })
}

function isClickedBeyond(e, selector) {
    let isClickBeyond = true;
    const path = event.path || (event.composedPath && event.composedPath());
    const isSelect = path.map((item, index, pathElems) => {
      if (pathElems.length - 4 < index) return;
      if (item.classList.includes(selector)) {
        isClickBeyond = false;
      }
    })
    return isClickBeyond;
}

/**
 * Снекбары выбора языка и города
 */
const SNACKS_SHOW_CLASS = 'header__snacks--show';
const SNACK_VISIBLE_CLASS = 'header-snack--visible';
const headerSnacksContainer = document.querySelector(".header__snacks");

function closeSnack(currentSnack) {
  headerSnacksContainer.classList.remove(SNACKS_SHOW_CLASS);
  if (currentSnack) currentSnack.classList.remove(SNACK_VISIBLE_CLASS);
}
function openSnack(currentSnack) {
  headerSnacksContainer.classList.add(SNACKS_SHOW_CLASS);
  currentSnack.classList.add(SNACK_VISIBLE_CLASS);

  document.querySelectorAll(".header-snack").forEach((snack) => {
    if (snack.dataset.snack === currentSnack.dataset.snack) return;
    snack.classList.remove(SNACK_VISIBLE_CLASS);
  });
}
function toggleSnackVisibility(snackName) {
  const currentSnack = document.querySelector(`.header-snack[data-snack="${snackName}"]`)
  if (currentSnack.classList.contains(SNACK_VISIBLE_CLASS)) {
    closeSnack(currentSnack);
  } else {
    openSnack(currentSnack)
  }
}

const headerPickers = document.querySelectorAll(".header__picker");
headerPickers.forEach((picker) => {
  picker.addEventListener("click", () => {
    const snackName = picker.dataset.snack;
    if (!snackName) return;
    toggleSnackVisibility(snackName)
  });
});

const headerSnacks = document.querySelectorAll(".header-snack");
headerSnacks.forEach((snack) => {
  const closer = snack.querySelector(".header-snack__close");
  closer.addEventListener("click", () => {
    closeSnack(snack)
  });
});
document.addEventListener('keyup', (e) => {
  if (e.keyCode == 27) {
    const currentSnack = document.querySelector('.header-snack--visible');
    if (!currentSnack) return

    closeSnack(currentSnack);
  }
})
// window.addEventListener("scroll", () => {
//   if (headerSnacksContainer.classList.contains(SNACKS_SHOW_CLASS)) {
//     closeSnack();
//   }
// });


/**
 * При выборе нового языка меняет надпись языка в шапке
 */
document.getElementById("dropdown-city").addEventListener("change", (e) => {
  document.querySelector(".header__geo .header__picker-text").innerText = e.target.value;
});



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


/**
 * Липкая «купить» на странице товара в десктопе
 */

window.addEventListener('DOMContentLoaded', (event) => {
  const productSticky = document.querySelector('.product-sticky');

  if (!productSticky) return;

  function getProductStickyOffset() {
    let productStickyOffset = productSticky.previousElementSibling.offsetTop + 100
    
    return productStickyOffset;
  }

  let productStickyOffset = getProductStickyOffset();
  window.addEventListener('resize', () => {
    productStickyOffset = getProductStickyOffset()
  });

  header.addEventListener('header-show', (e) => {
    productSticky.style.top = header.getBoundingClientRect().height + 'px';
  });
  header.addEventListener('header-hide', (e) => {
    productSticky.style.top = '';
  });

  window.addEventListener("scroll", (e) => {
    const offset = productSticky.getBoundingClientRect()

    console.log(window.scrollY, productStickyOffset)

    if (window.scrollY <= productStickyOffset) {
      productSticky.classList.remove('product-sticky--visible');
      header.classList.remove('header--no-shadow');
    } else {
      productSticky.classList.add('product-sticky--visible');
      header.classList.add('header--no-shadow');
    }
  });
});
