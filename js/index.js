$(document).ready(function() {
  $('body').flowtype({
    minFont: 12,
    maxFont: 20
  });
  var testNumLength = function(number) {
    if (number.length > 13) {
      totaldiv.text(number.substr(number.length - 13, 13));
      if (number.length > 15) {
        number = "";
        totaldiv.text("Err");
      }
    }
  };
  var number = "";
  var newnumber = [];
  var operator = [];
  var screendiv = $("#screen");
  screendiv.text("0");
  $(".number").on("click", (function() {
    number += $(this).text();
    screendiv.text(number);
    testNumLength(number);
  }))
  $(".operator").on("click", function() {
    if ($(this).hasClass("divide")) {
      operator.push("/");
    }
    if ($(this).hasClass("multiply")) {
      operator.push("*");
    }
    if ($(this).hasClass("minus")) {
      operator.push("-");
    }
    if ($(this).hasClass("plus")) {
      operator.push("+");
    }
    newnumber.push(number);
    number = "";
  });
  $(".clear,.clearall").on("click", function() {
    number = "";
    screendiv.text("0");
    if ($(this).attr("class") === "clearall") {
      newnumber = [];
    }
  });
  $(".equals").on("click", function() {
    var answer = 0;
    for (var o = 0; o < operator.length; o++) {
      if (operator[o] === "+") {
        number = (parseInt(number, 10) + parseInt(newnumber, 10)).toString(10);
      } else if (operator[o] === "-") {
        number = (parseInt(newnumber, 10) - parseInt(number, 10)).toString(10);
      } else if (operator[o] === "/") {
        number = (parseInt(newnumber, 10) / parseInt(number, 10)).toString(10);
      } else if (operator[o] === "*") {
        number = (parseInt(newnumber, 10) * parseInt(number, 10)).toString(10);
      }
    }
    screendiv.text(number);
    testNumLength(number);
    number = "";
    newnumber = [];
  });
})