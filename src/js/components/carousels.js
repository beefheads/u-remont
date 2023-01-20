"use strict"

import Swiper, { Navigation, Autoplay, Pagination, Thumbs, EffectFade } from "swiper";
import {debounce} from "../utils/helpers.js";


const quizes = document.querySelectorAll('.quiz-carousel');
function togglePrevVisibility(context) {
  if (context.activeIndex == 0) {
    context.el.querySelector('.quiz-button-prev').style.display = 'none';
  } else {
    context.el.querySelector('.quiz-button-prev').style.display = '';
  }
}
function hideButtonsOnFinalQuestion(context) {
  if (context.activeIndex == context.slides.length - 1) {
    context.el.querySelector('.quiz-buttons').style.display = 'none';
  }
}
quizes.forEach((quiz, index) => {
  const SWIPER_NAME = 'quiz';
  const CURRENT_SWIPER_NAME = `${SWIPER_NAME}-${index}`;

  if (quiz.id == '') {
    quiz.id+= `${CURRENT_SWIPER_NAME}`;
  } else {
    quiz.id+= ` ${CURRENT_SWIPER_NAME}`;
  }

  let carousel = new Swiper(`#${CURRENT_SWIPER_NAME}`, {
    modules: [Navigation, Pagination, EffectFade],
    autoHeight: true,
    spaceBetween: 10,
    pagination: {
      el: `#${CURRENT_SWIPER_NAME} .${SWIPER_NAME}-pagination`,
      // clickable: true,
      type: "progressbar",
    },
    effect: 'fade',
      fadeEffect: {
      crossFade: true
    },
    navigation: {
      nextEl: `#${CURRENT_SWIPER_NAME} .${SWIPER_NAME}-button-next`,
      prevEl: `#${CURRENT_SWIPER_NAME} .${SWIPER_NAME}-button-prev`,
    },
    on: {
      init: function() {
        togglePrevVisibility(this);
      },
      slideChange: function() {
        const CURRENT_SLIDE = this.slides[this.activeIndex];

        const sliderStatusStepEl = quiz.parentElement.querySelector('.quiz-status__step');
        if (sliderStatusStepEl) {
          const TOTAL_STEPS = this.slides.length;
          const CURRENT_STEP = this.activeIndex + 1;
          sliderStatusStepEl.innerText = `${CURRENT_STEP}/${TOTAL_STEPS}`;
        }

        const stepNameEl = quiz.parentElement.querySelector('.quiz-status__name')
        if (stepNameEl) {
          stepNameEl.innerText = CURRENT_SLIDE.dataset.stepName;
        }

        togglePrevVisibility(this);
        hideButtonsOnFinalQuestion(this);
      }
    }
  });
})





// -----
if (document.querySelector('.product-hero-gallery') && document.querySelector('.product-hero-thumbs')) {
  let swiper = new Swiper(".product-hero-thumbs", {
    direction: 'vertical',
    centeredSlides: true,
    centeredSlidesBounds: true,
    centerInsufficientSlides: true,
    spaceBetween: 10,
    slidesPerView: 'auto',
  });
  let heroGallery = new Swiper(".product-hero-gallery", {
    modules: [Navigation, Pagination, EffectFade],
    spaceBetween: 10,
    pagination: {
      el: ".product-hero-gallery-pagination",
      clickable: true,
    },
    effect: 'fade',
      fadeEffect: {
      crossFade: true
    },
    navigation: {
      nextEl: ".product-hero-gallery-next",
      prevEl: ".product-hero-gallery-prev",
    },
    thumbs: {
      swiper: swiper,
    },
    on: {
      slideChange: function() {
        swiper.slideTo(this.activeIndex);
      },
    }
  });
  swiper.on('slideChange', () => {
    heroGallery.slideTo(swiper.activeIndex);
  })
  swiper.slides.forEach((slide, index) => {
    slide.addEventListener('click', () => {
      heroGallery.slideTo(index);
    })
  })
}


if (document.querySelector('.promo-carousel')) {
  function normalizePaginationOffset(swiper) {
    // if (window.innerWidth > 769) return

    const currentSlideCard = swiper.slides[swiper.activeIndex].querySelector('.promo-carousel-card')
    setTimeout(() => {
      const paginationBottomOffset = +currentSlideCard.getBoundingClientRect().height;
      let initialPaginationBottomOffset = 38;
      if (window.innerWidth > 601 && window.innerWidth <= 768) {
        initialPaginationBottomOffset = 98;
      }
      if (window.innerWidth < 769){
        const singularCard = document.querySelector('.promo-carousel-card--singular');
        const singularCardHeight = singularCard.getBoundingClientRect().height
        initialPaginationBottomOffset += singularCardHeight;
      }

      const newPaginationOffset = Math.round(initialPaginationBottomOffset) + Math.round(paginationBottomOffset);
      swiper.pagination.el.style.bottom =  newPaginationOffset + 'px';
    }, 200)
  }
  let promoSlider = new Swiper(".promo-carousel", {
    modules: [Navigation, Autoplay, Pagination, EffectFade],
    effect: 'fade',
      fadeEffect: {
      crossFade: true
    },
    spaceBetween: 10,
    autoHeight: true,
    autoplay: {
      delay: 3000,
    },
    breakpoints: {
      769: {
        spaceBetween: 100,
      }
    },
    pagination: {
      el: ".promo-carousel__pagination",
      clickable: true,
    },
    on: {
      init: function () {
        normalizePaginationOffset(this)
      },
      slideChange: function () {
        normalizePaginationOffset(this)
      },
    }
  });
  window.addEventListener("resize", (e) => {
    debounce(normalizePaginationOffset(promoSlider), 200);
  });
}


const CHANGES_CASE_CARD_CAROUSEL = 'changes-case-card-carousel'
if (document.querySelector(`.${CHANGES_CASE_CARD_CAROUSEL}`)) {
  const carousels = document.querySelectorAll(`.${CHANGES_CASE_CARD_CAROUSEL}`);

  carousels.forEach((carousel, index) => {
    carousel.setAttribute('id', `${CHANGES_CASE_CARD_CAROUSEL}-${index}`);
  })
  carousels.forEach((carousel, index) => {
    new Swiper(`#${CHANGES_CASE_CARD_CAROUSEL}-${index}`, {
      modules: [Navigation, Autoplay, Pagination],
      autoplay: {
        delay: 3000,
      },
      navigation: {
        nextEl: `#${CHANGES_CASE_CARD_CAROUSEL}-${index} .swiper-button-next`,
        prevEl: `#${CHANGES_CASE_CARD_CAROUSEL}-${index} .swiper-button-prev`,
      },
    });
  })
}

if (document.querySelector('.grabber-carousel')) {
let promoSlider = new Swiper(".grabber-carousel", {
  grabCursor: true,
  slidesPerView: 1.25,
  spaceBetween: 8,
  breakpoints: {
    769: {
      slidesPerView: 2.5,
    }
  }
  // cssMode: true,
  // freeMode: true,
  // centeredSlides: true,
  // effect: 'creative',
  // creativeEffect: {
  // prev: {
  //   shadow: false,
  //   translate: [0, 0, -400],
  // },
  // next: {
  //   translate: ['100%', 0, 0],
  // },
  // },
});
}

if (document.querySelector('.product-cases-carousel')) {
  const carousels = document.querySelectorAll('.product-cases-carousel');
  const CAROUSEL_ID = 'product-cases-carousel';
  setTimeout(() => {
    carousels.forEach((carousel, index) => {
      carousel.id = `${CAROUSEL_ID}-${index}`

      let productCaseSlider = new Swiper(`#${carousel.id}`, {
        grabCursor: true,
        autoHeight: true,
        slidesPerView: 1,
        spaceBetween: 150,
        modules: [Navigation, Autoplay, Pagination],
        navigation: {
          nextEl: `#${carousel.id} .swiper-button-next`,
          prevEl: `#${carousel.id} .swiper-button-prev`,
        },
      });
      carousel.querySelectorAll('.product-cases-carousel-slide').forEach(slide => {
        slide.querySelector('.gallery-accordion__button-more').addEventListener('click', () => {
          console.log(productCaseSlider)
          setTimeout(() => {
            productCaseSlider.update();
          }, 200)
        })
      })
    })
  }, 1000)
}
