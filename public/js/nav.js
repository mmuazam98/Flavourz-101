function resizeWindow() {
  let widthsidebar = $(window).width();

  if (widthsidebar >= 768) {
    $(".sidebar__navbar").addClass("active");
  } else {
    $(".sidebar__navbar").removeClass("active");
  }
}
function checkActive() {
  if ($(window).width() > 768) {
    if ($(".sidebar__navbar").hasClass("active")) {
      $(
        "section#shops, section#confirm, section#menu, section#footer,section#orders, section#confirmOrder"
      ).addClass("shift");
      $(".navabar__menu i").removeClass("fa fa-bars").addClass("fas fa-stream");
    } else {
      $(".navabar__menu i").addClass("fa fa-bars").removeClass("fas fa-stream");
      $(
        "section#shops, section#confirm, section#menu, section#footer,section#orders, section#confirmOrder"
      ).removeClass("shift");
    }
  } else {
    $(
      "section#shops, section#confirm, section#menu, section#footer,section#orders, section#confirmOrder"
    ).removeClass("shift");
  }
}
$(window).load(function () {
  checkActive();
});
$(window).resize(function () {
  resizeWindow();
  checkActive();
});
// $(document).click(function (event) {
//   var click = $(event.target);
//   if (!click.hasClass("sidebar__navbar active")) {
//     $(".navabar__menu").click();
//   }
// });
$(".go_top").click(function () {
  window.location.href = "#";
});

$(window).mousemove(function () {
  checkActive();
});

$(".navabar__menu,.nav-hide").click(function () {
  $(".sidebar__navbar").toggleClass("active");
  checkActive();
});

$(".sidebar__navbar.active span").click(function () {
  $(".sidebar__navbar").toggleClass("active");
  checkActive();
});
