const showCurrencyConvButtons = document.getElementsByClassName('showCurrencyConv');

const host = 'api.frankfurter.app';

let selectedReturnCurrency = '';

for(const button of showCurrencyConvButtons) {
    button.addEventListener('click', () => {
        buttonListener(button);
    })
}
const buttonListener = (button) => {
    if (button.innerText == 'GBP') {
        selectedReturnCurrency = 'GBP';
        fetchandDisplay(selectedReturnCurrency);
    } 
    if (button.innerText == 'SEK') {
        selectedReturnCurrency = 'SEK';
        fetchandDisplay(selectedReturnCurrency);
    } else {
        console.log('what happened?');
    }
}
const fetchandDisplay = (selectedReturnCurrency) => {
    fetch(`https://${host}/latest?amount=10&from=USD&to=${selectedReturnCurrency}`)
      .then(resp => resp.json())
      .then((data) => {
        if (selectedReturnCurrency == 'GBP') {
            alert(`10 USD = ${data.rates.GBP} ${selectedReturnCurrency}`);
        }
        if (selectedReturnCurrency == 'SEK') {
            alert(`10 USD = ${data.rates.SEK} ${selectedReturnCurrency}`);
        }
      });
}
