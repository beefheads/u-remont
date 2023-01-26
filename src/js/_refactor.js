// /**
//  * Липкая «купить» на странице товара в десктопе
//  */

// window.addEventListener('DOMContentLoaded', (event) => {
//   const productSticky = document.querySelector('.product-sticky');

//   if (!productSticky) return;

//   function getProductStickyOffset() {
//     let productStickyOffset = productSticky.previousElementSibling.offsetTop + 100
    
//     return productStickyOffset;
//   }

//   let productStickyOffset = getProductStickyOffset();
//   window.addEventListener('resize', () => {
//     productStickyOffset = getProductStickyOffset()
//   });

//   header.addEventListener('header-show', (e) => {
//     productSticky.style.top = header.getBoundingClientRect().height + 'px';
//   });
//   header.addEventListener('header-hide', (e) => {
//     productSticky.style.top = '';
//   });

//   window.addEventListener("scroll", (e) => {
//     const offset = productSticky.getBoundingClientRect()

//     console.log(window.scrollY, productStickyOffset)

//     if (window.scrollY <= productStickyOffset) {
//       productSticky.classList.remove('product-sticky--visible');
//       header.classList.remove('header--no-shadow');
//     } else {
//       productSticky.classList.add('product-sticky--visible');
//       header.classList.add('header--no-shadow');
//     }
//   });
// });
