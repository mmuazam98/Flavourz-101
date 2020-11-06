$(document).ready(function () {
  setTimeout(function () {
    $("#discountModal").modal("show");
  }, 3000);
});

//COPY COUPON CODE
const copy = document.getElementById("copyButton");
const selection = window.getSelection();
const range = document.createRange();
const textToCopy = document.getElementById("couponCode");

copy.addEventListener("click", function (e) {
  setTimeout(function () {
    $("#discountModal").modal("hide");
  }, 1000);
  range.selectNodeContents(textToCopy);
  selection.removeAllRanges();
  selection.addRange(range);
  const successful = document.execCommand("copy");
  if (successful) {
    copy.innerHTML = "Copied! <i class='far fa-check-circle'></i>";
  }
  window.getSelection().removeAllRanges();
});

//food carousel
jQuery("#carousel").owlCarousel({
  autoplay: true,
  lazyLoad: true,
  loop: true,
  margin: 20,
  /*
    animateOut: 'fadeOut',
    animateIn: 'fadeIn',
    */
  responsiveClass: true,
  autoHeight: true,
  autoplayTimeout: 4000,
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

$(window).load(function () {
  if ($(window).width() < 768) {
    $(".owl-slider").toggleClass("container container-fluid");
  }
});
$(window).resize(function () {
  let width = $(window).width();
  if (width < 768 && width > 600) {
    $(".owl-slider").toggleClass("container container-fluid");
  }
  if (width < 600) {
    $(".owl-slider").removeClass("container-fluid").addClass("container");
  }
});

// shops section

//==============

("use strict");

function isIOSSafari() {
  var userAgent;
  userAgent = window.navigator.userAgent;
  return userAgent.match(/iPad/i) || userAgent.match(/iPhone/i);
}

function isTouch() {
  var isIETouch;
  isIETouch = navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
  return [].indexOf.call(window, "ontouchstart") >= 0 || isIETouch;
}

var isIOS = isIOSSafari(),
  clickHandler = isIOS || isTouch() ? "touchstart" : "click";

function extend(a, b) {
  for (var key in b) {
    if (b.hasOwnProperty(key)) {
      a[key] = b[key];
    }
  }
  return a;
}

function Anima(el, options) {
  this.el = el;
  this.options = extend({}, this.options);
  extend(this.options, options);

  this.checked = false;

  this.timeline = new mojs.Timeline();

  for (var i = 0, len = this.options.tweens.length; i < len; ++i) {
    this.timeline.add(this.options.tweens[i]);
  }

  var self = this;
  this.el.addEventListener(clickHandler, function () {
    if (self.checked) {
      self.options.onUnCheck();
    } else {
      self.options.onCheck();
      self.timeline.start();
    }
    self.checked = !self.checked;
  });
}

Anima.prototype.options = {
  tweens: [
    new mojs.Burst({
      shape: "circle",
      isRunLess: true,
    }),
  ],
  onCheck: function () {
    return false;
  },
  onUnCheck: function () {
    return false;
  },
};

function createHeartIc(el) {
  var el = el,
    span = el.querySelector("span"),
    svg = span.querySelector("svg"),
    opacityCurve = mojs.easing.path("M0,0 C0,87 27,100 40,100 L40,0 L100,0"),
    scaleCurve = mojs.easing.path(
      "M0,0c0,80,39.2,100,39.2,100L40-100c0,0-0.7,106,60,106"
    ),
    burst = new mojs.Burst({
      parent: el,
      duration: 1200,
      delay: 200,
      shape: "circle",
      fill: "#E87171",
      x: "50%",
      y: "50%",
      opacity: { 1: 0 },
      childOptions: {
        radius: { 6: 0 },
        type: "line",
        stroke: "#E87171",
        strokeWidth: 2,
      },
      radius: { 0: 32 },
      count: 7,
      //isSwirl: true,
      isRunLess: true,
      easing: mojs.easing.bezier(0.1, 1, 0.3, 1),
    }),
    heart = new Anima(el, {
      tweens: [
        // icon scale animation

        burst,

        new mojs.Tween({
          duration: 800,
          easing: mojs.easing.ease.out,
          onUpdate: function (progress) {
            var opacityProgress = opacityCurve(progress);
            span.style.opacity = opacityProgress;

            var scaleProgress = scaleCurve(progress);
            span.style.WebkitTransform = span.style.transform =
              "scale3d(" + scaleProgress + "," + scaleProgress + ",1)";

            var colorProgress = opacityCurve(progress);
            svg.style.fill = colorProgress >= 1 ? "#E87171" : "none";
            svg.style.stroke = colorProgress >= 1 ? "#E87171" : "#a1a8ad";
          },
        }),
      ],
      onUnCheck: function () {
        svg.style.fill = "none";
        svg.style.stroke = "#a1a8ad";
      },
    });

  return heart;
}

function createCartIc(el) {
  var el = el,
    span = el.querySelector("span"),
    svg = span.querySelector("svg"),
    body = svg.getElementsByTagName("path")[0],
    opacityCurve = mojs.easing.path("M0,0 C0,87 27,100 40,100 L40,0 L100,0"),
    scaleCurve = mojs.easing.path(
      "M0,0c0,80,39.2,100,39.2,100L40-100c0,0-0.7,106,60,106"
    ),
    burst = new mojs.Burst({
      parent: el,
      duration: 1200,
      delay: 200,
      shape: "circle",
      fill: "#111111",
      x: "50%",
      y: "50%",
      opacity: { 1: 0 },
      childOptions: {
        radius: { 6: 2 },
        type: "line",
        stroke: "#111111",
        strokeWidth: 2,
      },
      radius: { 0: 36 },
      angle: 45,
      count: 4,
      //isSwirl: true,
      isRunLess: true,
      easing: mojs.easing.bezier(0.1, 1, 0.3, 1),
    }),
    heart = new Anima(el, {
      tweens: [
        // icon scale animation

        burst,

        new mojs.Tween({
          duration: 800,
          easing: mojs.easing.ease.out,
          onUpdate: function (progress) {
            var opacityProgress = opacityCurve(progress);
            span.style.opacity = opacityProgress;

            var scaleProgress = scaleCurve(progress);
            span.style.WebkitTransform = span.style.transform =
              "scale3d(" + scaleProgress + "," + scaleProgress + ",1)";

            var colorProgress = opacityCurve(progress);
            body.style.fill = colorProgress >= 1 ? "#111111" : "none";
            svg.style.stroke = colorProgress >= 1 ? "#111111" : "#a1a8ad";
          },
        }),
      ],
      onUnCheck: function () {
        body.style.fill = "none";
        svg.style.stroke = "#a1a8ad";
      },
    });

  return heart;
}

var hearts = document.getElementsByClassName("pnl-favorites"),
  carts = document.getElementsByClassName("pnl-tocart");

for (var i = 0; i < hearts.length; i++) {
  createHeartIc(hearts[i].querySelector("div"));
  createCartIc(carts[i].querySelector("div"));
}

//view product

$(".item").click(function () {
  let price = $(this).children(".details").children(".price").text();
  let name = $(this).children(".details").children(".name").text();
  let shop = $(this).children(".details").children(".shopName").text();

  // console.log(price + name + shop);
});
