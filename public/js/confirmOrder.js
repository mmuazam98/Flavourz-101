//generate order ID

$(window).load(function () {
  let val = Math.floor(1000 + Math.random() * 9000);
  $("#orderID").text(val);
  //     let choice = $(".summary-delivery-selection option:selected").text();

  //   if (choice == "Collection") {
  //     let totalCost = $("#basket-total").text();
  //     $("#orderID").text(val);
  //     $("#totalCost").text("₹" + totalCost);
  //   } else {
  //     alert("Please select collection or delivery.");
  //   }
});
