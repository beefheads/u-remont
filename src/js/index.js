"use strict";

// import { removeAllClasses, bodyLock } from "./utils/functions.js";
// import DismalModules, { acc } from "./utils/modules.js";


import "./components/header.js";
import "./components/attach.js";
import "./components/megachips.js";
import { Fancybox, Carousel } from "@fancyapps/ui";
// import { Fancybox, Carousel, Panzoom } from "@fancyapps/ui";

Fancybox.bind('[data-fancybox]', {
  Toolbar: {
    display: [
      "close",
    ],
  },
});

import "./unstable/copyclicker.js";
import "./unstable/snacks.js";

/**
 * Poppa
 */
import "./poppa.js";

/**
 * Lazy Load
 */
import "./libs/lazyload.min.js";
let lazyLoadInstance = new LazyLoad();




// import "./unstable/tabs.js";

/**
 * Smooth anchors
 **/
import "./utils/smooth-anchors.js";

import "./unstable/inputster/formich.js";
/**
 * Smooth anchors
 **/
// import "./unstable/bayan.js";

import intlTelInput from 'intl-tel-input';
const telInputs = document.querySelectorAll('input[type="tel"]');
telInputs.forEach((input) => {
  const iti = intlTelInput(input, {
      initialCountry: "ru",
      // separateDialCode: true,
      nationalMode: false,
      preferredCountries: ['ru', 'by', "kz"],
      utilsScript: "./js/phoneUtils.js"
  });
})


import SliderBar from 'before-after-slider'; // import

function makeBeforeAfterSlider(el, index) {
  const beforeImg = el.dataset.before;
  const afterImg = el.dataset.after;
  const elClass = `js-comparer-${index}`;
  el.classList.add(elClass)
  return new SliderBar({
      el: `.${elClass}`,
      beforeImg,
      afterImg,
  });
}
const beforeAfterSliders = document.querySelectorAll('.before-after-slider');
beforeAfterSliders.forEach((slider, index) => {
  makeBeforeAfterSlider(slider, index);
})

/*
 * Переключает в мобильной версии видимость сайдбара с контактами
 * При клике за пределами сайдара закрывает его
 */
/*
const servicesLeadButton = document.querySelector('.services__sidebar-toggler');
if (servicesLeadButton) {
  servicesLeadButton.addEventListener('click', () => {
    document.querySelector('.services__sidebar').classList.add('services__sidebar--active');
  });
  window.addEventListener('click', (e) => {
    if (!e.target == sideNav || e.target == servicesLeadButton) return;

    document.querySelector('.services__sidebar').classList.remove('services__sidebar--active');
  })
}
*/
import "./components/carousels.js";
import "./utils/ios-input-zoom-fix.js";


// import "./libs/aos.js";
import AOS from "aos";
AOS.init();
window.aos = AOS;

setTimeout(() => {
  AOS.refresh();
}, 5000)
