$(document).ready(function() {
  $('body').flowtype({
    minFont: 12,
    maxFont: 20
  });
  var number = "";
  var newnumber = [];
  var operator = [];
  var screendiv = $("#screen-number");
  var clear = false;
  var operatorClicked = true;
  screendiv.text("0");
  $(".number").on("click", function() {
    if (number.length < 10) {
      if (clear === true) {
        clear = false;
      }
      operatorClicked = false;
      number += $(this).text();
      screendiv.fadeOut(10, function() {
        $(this).text(number)
      }).fadeIn(200);
    }
  });
  $(".decimal").on("click", function() {
    if (number.length < 9) {
      if (number.indexOf(".") === -1) {
        if (clear === true) {
          clear = false;
        }
        operatorClicked = false;
        number += $(this).text();
        screendiv.fadeOut(10, function() {
          $(this).text(number)
        }).fadeIn(200);
      }
    }
  });
  $(".operator").on("click", function() {
    if (operatorClicked !== true) {
      if (clear === true) {
        var clearOperator = operator;
        operator = clearOperator.slice(0, -1);
        clear = false;
      }
      if ($(this).hasClass("divide")) {
        operator.push("/");
        operatorClicked = true;
      }
      if ($(this).hasClass("multiply")) {
        operator.push("*");
        operatorClicked = true;
      }
      if ($(this).hasClass("minus")) {
        operator.push("-");
        operatorClicked = true;
      }
      if ($(this).hasClass("plus")) {
        operator.push("+");
        operatorClicked = true;
      }
      if (number !== "") {
        newnumber.push(number);
      }
      number = "";
    }
  });
  $(".clear,.clearall").on("click", function() {
    number = "";
    screendiv.text("0");
    operatorClicked = true;
    if ($(this).attr("class") === "clear") {
      clear = true;
    }
    if ($(this).attr("class") === "clearall") {
      newnumber = [];
      operator = [];
    }
  });
  $(".equals").on("click", function() {
    if (operator.length === newnumber.length + number.length) {
      var clearOperator = operator;
      operator = clearOperator.slice(0, -1);
    }
    if (operator.length > 0) {
      var answer = "";
      while (operator.length !== 0) {
        var tempOperator = operator.shift();
        if (newnumber.length === 1) {
          if (tempOperator === "+") {
            answer = (parseFloat(number, 10) + parseFloat(newnumber[0], 10)).toString(10);
          } else if (tempOperator === "-") {
            answer = (parseFloat(newnumber[0], 10) - parseFloat(number, 10)).toString(10);
          } else if (tempOperator === "/") {
            answer = (parseFloat(newnumber[0], 10) / parseFloat(number, 10)).toString(10);
          } else if (tempOperator === "*") {
            answer = (parseFloat(newnumber[0], 10) * parseFloat(number, 10)).toString(10);
          }
        } else {
          if (tempOperator === "+") {
            answer = (parseFloat(newnumber.shift(), 10) + parseFloat(newnumber.shift(), 10)).toString(10);
          } else if (tempOperator === "-") {
            answer = (parseFloat(newnumber.shift(), 10) - parseFloat(newnumber.shift(), 10)).toString(10);
          } else if (tempOperator === "/") {
            answer = (parseFloat(newnumber.shift(), 10) / parseFloat(newnumber.shift(), 10)).toString(10);
          } else if (tempOperator === "*") {
            answer = (parseFloat(newnumber.shift(), 10) * parseFloat(newnumber.shift(), 10)).toString(10);
          }
          newnumber.unshift(answer);
        }
      }

      screendiv.fadeOut(10, function() {
        if (answer.length > 10) {
          $(this).text("..." + answer.slice(answer.length - 10, -1));
        } else {
          $(this).text(answer);
        }
      }).fadeIn(200);
      number = "";
      newnumber = [];
    }
  });
})