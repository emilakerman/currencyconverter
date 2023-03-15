
const host = 'api.frankfurter.app';

let selectedReturnCurrency = '';
let amountInputValue = 0;

let amountInput = document.getElementById('amountInput');
const convertButton = document.getElementById('convertButton');
const clearButton = document.getElementById('clearButton');
const selectedSEK = document.getElementById('SEK');
const selectedGBP = document.getElementById('GBP');
const selectedNOK = document.getElementById('NOK');

convertButton.addEventListener('click', () => {
    if (amountInput.value != '') {
        if (selectedSEK.checked) {
            selectedReturnCurrency = 'SEK';
        }
        if (selectedGBP.checked) {
            selectedReturnCurrency = 'GBP';
        }
        if (selectedNOK.checked) {
            selectedReturnCurrency = 'NOK';
        }
        fetchandDisplay(selectedReturnCurrency, amountInputValue = amountInput.value);
    } else {
        console.log('the input field is empty');
    }
});
clearButton.addEventListener('click', () => {
    clearInput();
});

function clearInput() {
    if (amountInput.value != '') {
        amountInput.value = '';
        document.querySelector('input[name="radioButtons"]:checked').checked = false;
    }
}
const fetchandDisplay = (selectedReturnCurrency, amountInputValue) => {
    fetch(`https://${host}/latest?amount=${amountInputValue}&from=USD&to=${selectedReturnCurrency}`)
      .then(resp => resp.json())
      .then((data) => {
        if (selectedReturnCurrency == 'SEK') {
            alert(`${amountInputValue} USD = ${data.rates.SEK} ${selectedReturnCurrency}`);
        }
        if (selectedReturnCurrency == 'GBP') {
            alert(`${amountInputValue} USD = ${data.rates.GBP} ${selectedReturnCurrency}`);
        }
        if (selectedReturnCurrency == 'NOK') {
            alert(`${amountInputValue} USD = ${data.rates.NOK} ${selectedReturnCurrency}`);
        }
      });
}
