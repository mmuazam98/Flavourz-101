/* Set values + misc */
var promoCode;
var promoPrice;
var fadeTime = 300;

var numItems = $(".basket-product").length;

/* Assign actions */
$(".quantity").click(function () {
  alert("Currently Unavailable :(");
});
$(".quantity input").change(function () {
  updateQuantity(this);
});

$(".remove button").click(function () {
  removeItem(this);
});

$(document).ready(function () {
  updateSumItems();
});

$(".promo-code-cta").click(function () {
  promoCode = $("#promo-code").val();
  var price = 0;

  /* Sum up row totals */
  $(".basket-product").each(function () {
    price += parseFloat($(this).children(".subtotal").text());
  });

  if (promoCode.toUpperCase() == "FLAVOURZ101") {
    if (!promoPrice) {
      promoPrice = 0.1 * price;
      $(".promo-code-cta").html("Applied <i class='fa fa-check-circle'></i>");
    } else if (promoCode) {
      promoPrice = promoPrice * 1;
    }
  } else if (promoCode != "") {
    // alert("Invalid Promo Code");
    $(".promo-code-cta").html("Invalid <i class='fa fa-times'></i>");
    $("#promo-code").keydown(function () {
      $(".promo-code-cta").html("Apply");
    });
    promoPrice = 0;
  }
  if (promoPrice) {
    $(".summary-promo").removeClass("hide");
    $(".promo-value").text(promoPrice.toFixed(2));
    recalculateCart(true);
  }
});

/* Recalculate cart */
function recalculateCart(onlyTotal) {
  var subtotal = 0;

  /* Sum up row totals */
  $(".basket-product").each(function () {
    subtotal += parseFloat($(this).children(".subtotal").text());
  });

  /* Calculate totals */
  var total = subtotal;

  //If there is a valid promoCode, and subtotal < 10 subtract from total
  var promoPrice = parseFloat($(".promo-value").text());
  if (numItems != 0) {
    if (promoPrice) {
      if (subtotal >= 60) {
        total -= promoPrice;
      } else {
        alert("Order must be more than ₹60 for Promo code to apply.");
        $(".summary-promo").addClass("hide");
      }
    }
  } else {
    alert("Cart is empty.");
  }

  /*If switch for update only total, update only total display*/
  if (onlyTotal) {
    /* Update total display */
    $(".total-value").fadeOut(fadeTime, function () {
      $("#basket-total").html(total.toFixed(2));
      $(".total-value").fadeIn(fadeTime);
    });
  } else {
    /* Update summary display. */
    $(".final-value").fadeOut(fadeTime, function () {
      $("#basket-subtotal").html(subtotal.toFixed(2));
      $("#basket-total").html(total.toFixed(2));
      if (total == 0) {
        $(".checkout-cta").fadeOut(fadeTime);
      } else {
        $(".checkout-cta").fadeIn(fadeTime);
      }
      $(".final-value").fadeIn(fadeTime);
    });
  }
}

/* Update quantity */
function updateQuantity(quantityInput) {
  /* Calculate line price */
  var productRow = $(quantityInput).parent().parent();
  var price = parseFloat(productRow.children(".price").text());
  var quantity = $(quantityInput).val();
  var linePrice = price * quantity;

  /* Update line price display and recalc cart totals */
  productRow.children(".subtotal").each(function () {
    $(this).fadeOut(fadeTime, function () {
      $(this).text(linePrice.toFixed(2));
      recalculateCart();
      $(this).fadeIn(fadeTime);
    });
  });

  productRow.find(".item-quantity").text(quantity);
  updateSumItems();
}

function updateSumItems() {
  var sumItems = 0;
  $(".quantity input").each(function () {
    sumItems += parseInt($(this).val());
  });
  $(".total-items").text(sumItems);
}

/* Remove item from cart */
function removeItem(removeButton) {
  /* Remove row from DOM and recalc cart total */
  var productRow = $(removeButton).parent().parent();
  productRow.slideUp(fadeTime, function () {
    productRow.remove();
    recalculateCart();
    updateSumItems();
  });
}

//generate order ID
$(".summary-checkout button").click(function () {
  let val = Math.floor(1000 + Math.random() * 9000);
  let choice = $(".summary-delivery-selection option:selected").text();

  if (choice == "Collection") {
    $("#myModal").modal("show");
    let totalCost = $("#basket-total").text();
    $("#orderID").text(val);
    $("#totalCost").text("₹" + totalCost);
  } else {
    alert("Please select collection or delivery.");
  }
});
