// Event handler for form submission
const calculateResults = function(evt) {
  evt.preventDefault();
  
  //Get user inputs
  const loanAmount = evt.target.querySelector('#amount').value;
  const interest = evt.target.querySelector('#interest').value;
  const years = evt.target.querySelector('#years').value;

  //Make Sure all the fields have positive values
  
  

  //Get the elements into which you want to place the calculated values
  const monthlyPaymentEl = document.querySelector('#monthly-payment');
  const totalPaymentEl = document.querySelector('#total-payment');
  const totalInterestEl = document.querySelector('#total-interest');

  //Calculate the results
  const principal = Number(loanAmount);
  const interestRate = Number(interest) / 100;
  const numberOfyears = Number(years);

  const x = Math.pow(1 + interestRate, numberOfyears);
  const totalPayment = principal * x;
  const totalInterest = totalPayment - principal;
  const monthlyPayment = totalPayment / 12;

  //Dispaly the results
  const resultsEl = document.querySelector('#results');
  //Reomve this element's d-none class
  resultsEl.classList.remove('d-none');
  //Put the calculated values into the input fields
  monthlyPaymentEl.value = monthlyPayment;
  totalPaymentEl.value = totalPayment;
  totalInterestEl.value = totalInterest;
};
