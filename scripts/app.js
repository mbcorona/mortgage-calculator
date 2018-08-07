(function(){
  var app = {
    interestRate: document.getElementById('interest-rate'),
    yearsOfMortgage: document.getElementById('years-of-mortgage'),
    loanAmount: document.getElementById('loan-amount'),
    annualTax: document.getElementById('annual-tax'),
    annualInsurance: document.getElementById('annual-insurance'),
    result: {
      principleAndInterest: 0,
      tax: 0,
      insurance: 0,
      monthlyPayment: 0
    },
    template: {
      yearsOfMortgageValue: document.getElementById('years-of-mortgage-value'),
      interestRateValue: document.getElementById('interest-rate-value'),
      principleAndInterest: document.getElementById('result-principle-interest'),
      tax: document.getElementById('result-tax'),
      insurance: document.getElementById('result-insurance'),
      monthlyPayment: document.getElementById('result-monthly-payment'),
      resultSection: document.querySelector(".result-section")
    }
  };

  app.validate = function(){
    var valid = true;
    var required = ["loanAmount", "annualTax", "annualInsurance"];
    required.forEach(function(r){
      if(!app[r].value){
        valid = false;
        app[r].classList.add("error");
      }
      else{
        app[r].classList.remove("error");
      }
    });
    return valid;
  };

  app.calculate = function(){

    if(!app.validate())return false;

    try {
      //principleAndInterest
      app.result.principleAndInterest =
      ((app.interestRate.value / 100) / 12)
      * app.loanAmount.value / ( 1 - Math.pow(( 1 + ((app.interestRate.value / 100) / 12 )) , -app.yearsOfMortgage.value * 12));

      // Tax
      app.result.tax = app.annualTax.value / 12;

      // Insurance
      app.result.insurance = app.annualInsurance.value / 12;

      // monthly Payment
      app.result.monthlyPayment = app.result.principleAndInterest + app.result.tax + app.result.insurance;
      return true;
    } catch (e) {
      console.error(e.message);
      return false;
    } finally {

    }
  };

  app.printResult = function(){
    app.template.principleAndInterest.innerHTML = "$" + app.result.principleAndInterest.toFixed(2);
    app.template.tax.innerHTML = "$" + app.result.tax.toFixed(2);
    app.template.insurance.innerHTML = "$" + app.result.insurance.toFixed(2);
    app.template.monthlyPayment.innerHTML = "$" + app.result.monthlyPayment.toFixed(2);

    app.template.resultSection.classList.add("show");
    setTimeout(function(){
      location.href = "#result-section";
    },1000);
  };

  app.clearResult = function(hideResultSection){
    app.template.principleAndInterest.innerHTML = "";
    app.template.tax.innerHTML = "";
    app.template.insurance.innerHTML = "";
    app.template.monthlyPayment.innerHTML = "";

    if(hideResultSection){
        app.template.resultSection.classList.remove("show");
    }
  }

  app.yearsOfMortgage.addEventListener('change', function(){
    app.template.yearsOfMortgageValue.innerHTML =
      app.yearsOfMortgage.value;
  });

  app.interestRate.addEventListener('change', function(){
    app.template.interestRateValue.innerHTML =
      app.interestRate.value;
  });

  // submit event for Calculator
  document.getElementById('calculator-form')
  .addEventListener('submit', function(e){
    e.preventDefault();
    if(app.calculate()){
      app.printResult();
    }
    else{
      app.clearResult(true);
    }
  });

})();
