(function(){

  let app = {
    interestRate: document.getElementById('interest-rate'),
    yearsOfMortgage: document.getElementById('years-of-mortgage'),
    loanAmount: document.getElementById('loan-amount'),
    annualTax: document.getElementById('annual-tax'),
    annualInsurance: document.getElementById('annual-insurance'),
    submitBtn: document.getElementById('submit-btn'),
    appForm: document.getElementById('calculator-form'),
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
      resultSection: document.querySelector('.result-section')
    }
  };

  app.validate = ()=>{
    let valid = true;
    let required = ["loanAmount", "annualTax", "annualInsurance"];
    required.forEach(r => {
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

  app.calculate = ()=>{

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

  app.printResult = ()=>{
    app.template.principleAndInterest.innerHTML = "$" + app.result.principleAndInterest.toFixed(2);
    app.template.tax.innerHTML = "$" + app.result.tax.toFixed(2);
    app.template.insurance.innerHTML = "$" + app.result.insurance.toFixed(2);
    app.template.monthlyPayment.innerHTML = "$" + app.result.monthlyPayment.toFixed(2);

    app.template.resultSection.classList.add("show");
    setTimeout(()=>{
      location.href = "#result-section";
    },1000);
  };

  app.clearResult = (hideResultSection)=>{
    app.template.principleAndInterest.innerHTML = "";
    app.template.tax.innerHTML = "";
    app.template.insurance.innerHTML = "";
    app.template.monthlyPayment.innerHTML = "";

    if(hideResultSection){
        app.template.resultSection.classList.remove("show");
    }
  }


  // event liseners
  app.yearsOfMortgage.addEventListener('change', ()=>{
    let val = app.yearsOfMortgage.value;
    app.template.yearsOfMortgageValue.innerHTML = val;
    app.yearsOfMortgage.style['background-image'] =
                  '-webkit-gradient(linear, left top, right top, '
                  + 'color-stop(' + 100/40*val/100 + ', #1091cc), '
                  + 'color-stop(' + 100/40*val/100 + ', #C5C5C5)'
                  + ')';
  });

  app.interestRate.addEventListener('change', ()=>{
    let val = app.interestRate.value;
    app.template.interestRateValue.innerHTML = parseFloat(val).toFixed(1);
    app.interestRate.style['background-image'] =
                    '-webkit-gradient(linear, left top, right top, '
                    + 'color-stop(' + 100/10*val/100 + ', #1091cc), '
                    + 'color-stop(' + 100/10*val/100 + ', #C5C5C5)'
                    + ')';
  });

  // submit event for Calculator
  app.appForm.addEventListener('submit', ()=>{
    if(app.calculate()){
      app.submitBtn.innerHTML = 'recaulculate';
      app.printResult();
    }
  });

  app.init = ()=>{
    app.interestRate.dispatchEvent(new Event('change'));
    app.yearsOfMortgage.dispatchEvent(new Event('change'));
  }
  app.init();

})();
