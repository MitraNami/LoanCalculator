// Event handler for form submission
const calculateResults = function(evt) {
  evt.preventDefault();
  
  //Get user inputs
  const loanAmount = evt.target.querySelector('#amount').value;
  const interest = evt.target.querySelector('#interest').value;
  const years = evt.target.querySelector('#years').value;

  //Make Sure all the fields have positive values



  //Calculate the results
  const principal = Number(loanAmount);
  const interestRate = Number(interest) / 100;
  const numberOfYears = Number(years);
  const {
    monthlyPayment,
    totalPayment, 
    totalInterest} = 
  calculateLoanResults(principal, interestRate, numberOfYears);

  //Dispaly the results

  //Get the elements into which you want to place the calculated values
  const monthlyPaymentEl = document.querySelector('#monthly-payment');
  const totalPaymentEl = document.querySelector('#total-payment');
  const totalInterestEl = document.querySelector('#total-interest');

  const resultsEl = document.querySelector('#results');
  //Reomve this element's d-none class
  resultsEl.classList.remove('d-none');

  //Put the calculated values into the input fields
  monthlyPaymentEl.value = monthlyPayment.toFixed(2);
  totalPaymentEl.value = totalPayment.toFixed(2);
  totalInterestEl.value = totalInterest.toFixed(2);
};



// Returns loan results based on the amount of money lent(principal), yearly interest rate and number of years you want to make payments
const calculateLoanResults = function(principal, interestRate, numberOfYears) {
  const x = Math.pow(1 + interestRate, numberOfYears);
  const totalPayment = principal * x;
  const totalInterest = totalPayment - principal;
  const monthlyPayment = totalPayment / 12;
  return {totalPayment, totalInterest, monthlyPayment};
};