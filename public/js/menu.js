jQuery(".owl-carousel").owlCarousel({
  autoplay: true,
  lazyLoad: true,
  loop: true,
  margin: 20,
  animateOut: "fadeOut",
  animateIn: "fadeIn",
  /*
        animateOut: 'fadeOut',
        animateIn: 'fadeIn',
        */
  responsiveClass: true,
  autoHeight: true,
  autoplayTimeout: 5000,
  smartSpeed: 800,
  nav: true,
  responsive: {
    0: {
      items: 1,
    },
    475: {
      items: 2,
    },
    600: {
      items: 3,
    },

    1024: {
      items: 4,
    },

    1366: {
      items: 5,
    },
  },
});

$(".addToOrders").click(function () {
  $(this).children("i").toggleClass("fa-shopping-bag  fa-clipboard-check");
});
