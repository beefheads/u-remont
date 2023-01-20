"use strict";

// import { removeAllClasses, bodyLock } from "./utils/functions.js";
// import DismalModules, { acc } from "./utils/modules.js";


// import "./components/header.js"
// import "./components/controls.js"
// import { Fancybox, Carousel, Panzoom } from "@fancyapps/ui";

// Fancybox.bind('[data-fancybox]', {
//   Toolbar: {
//     display: [
//       "close",
//     ],
//   },
// });


/**
 * Poppa
 */
// import "./poppa.js";

/**
 * Lazy Load
 */
import "./libs/lazyload.min.js";
let lazyLoadInstance = new LazyLoad();




import "./unstable/tabs.js";

/**
 * Smooth anchors
 **/
import "./utils/smooth-anchors.js";

/**
 * Smooth anchors
 **/
import "./unstable/bayan.js";


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
