$(".confirmOrder").click(function () {
  $(this).toggleClass("btn-danger btn-success");
  if ($(this).hasClass("btn-success")) {
    $(this).html("Success <i class='fa fa-check-circle-o'></i>");
  } else {
    $(this).html("Pending <i class='fa fa-times-circle-o'></i>");
  }
});
