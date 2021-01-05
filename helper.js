// Event handler for form submission
const calculateResults = function(evt) {
  evt.preventDefault();
  
  //Get user inputs
  const loanAmount = evt.target.querySelector('#amount').value;
  const interest = evt.target.querySelector('#interest').value;
  const years = evt.target.querySelector('#years').value;

  //Make Sure all the fields have positive values, interest is smaller than 100
  if (loanAmount <= 0 || interest <= 0 || years <= 0) {
    showError('All inputs must be greater than zero!');
    return;
  }
  if (interest > 100) {
    showError('Interest rate must be smaller than 100.');
    return;
  }

  //Calculate the results
  const principal = Number(loanAmount);
  const interestRate = Number(interest) / 100;
  const numberOfYears = Number(years);
  const {
    monthlyPayment,
    totalPayment, 
    totalInterest} = 
  calculateLoanParameters(principal, interestRate, numberOfYears);

  //Dispaly loading image first, then replace it with the loan results
  showResults(monthlyPayment, totalPayment, totalInterest);
};



// Returns loan results based on the amount of money lent(principal), yearly interest rate and number of years you want to make payments
const calculateLoanParameters = function(principal, interestRate, numberOfYears) {
  const x = Math.pow(1 + interestRate, numberOfYears);
  const totalPayment = principal * x;
  const totalInterest = totalPayment - principal;
  const monthlyPayment = totalPayment / 12;
  return {totalPayment, totalInterest, monthlyPayment};
};



// Dispalys the loading image first, then replaces it with the loan results
const showResults = function(monthlyPayment, totalPayment, totalInterest) {
  //Display the image
  const loadingImg = document.querySelector('#loading');
  loadingImg.classList.remove('d-none');
  //After 3 seconds display the results
  setTimeout(() => {
    loadingImg.classList.add('d-none');
    showLoanResults(monthlyPayment, totalPayment, totalInterest);
  }, 3000); 
};



const showLoanResults = function(monthlyPayment, totalPayment, totalInterest) {
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



// Creates a div element to show the error message and remove it after 2 seconds
const showError = function(msg) {
  //Create a div
  const errorEl = document.createElement('div');
  errorEl.className = "alert alert-danger text-center";

  //Create the text node and append it to the div
  errorEl.appendChild(document.createTextNode(msg));

  //Insert the errorEl below the heading
  const heading = document.querySelector('.card-title');
  heading.insertAdjacentElement('afterend', errorEl);

  clearError();
};



//Removes the error element after 2 seconds
const clearError = function() {
  setTimeout(() => {
    document.querySelector('.alert').remove();
  }, 2000);
};