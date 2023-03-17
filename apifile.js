
const host = 'api.frankfurter.app';
let oneWeekAgo = getWeekAgoDate();
let urlOneWeekAgo = `https://api.frankfurter.app/${oneWeekAgo}?from=USD`;
let lastWeekValue = '';
let currencyList = document.getElementById('currencyList');





// https://api.frankfurter.app/latest?from=USD
let latestFromUSD = 'https://api.frankfurter.app/latest?from=USD';

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
///
window.onload = function() {
    // createCurrencyElements();
    populateList();
    //returnedLastWeekValue();
  };

const createCurrencyElements = () => {
    fetch(`https://${host}/latest?amount=1&from=USD&to=GBP`)
        .then(resp => resp.json())
        .then((data) => { 
            const currencyElement = document.createElement('h3');
            currencyElement.className = 'currencyElement';
            currencyElement.innerHTML = (`USD-GBP ${data.rates.GBP}`);
        
            const currencyList = document.getElementById('currencyList');
        
            currencyList.appendChild(currencyElement);
        });

    return currencyElement;
} 
const populateList = () => {


    fetch(latestFromUSD)
    .then(resp => resp.json())
    .then((data) => { 
            for (const key in data.rates) {
                let currencyElement = document.createElement('h4');
                let valueElement = document.createElement('h4');
                let dateElement = document.createElement('h4');

                currencyElement.className = 'currencyElement';
                valueElement.className = 'valueElement';

                currencyElement.innerHTML = (`USD-${key}`);
                valueElement.innerHTML = (`${data.rates[key]}`);
                dateElement.innerHTML = (data.date);

                currencyList.appendChild(currencyElement);
                currencyList.appendChild(valueElement);
                currencyList.appendChild(dateElement); 

                //currencyList.appendChild(returnedLastWeekValue()); 
            }
    });

}
function getWeekAgoDate() {
    const t = new Date();
    const date = ('0' + (t.getDate() - 7 )).slice(-2);
    const month = ('0' + (t.getMonth() + 1)).slice(-2);
    const year = t.getFullYear();
    let oneWeekAgo = `${year}-${month}-${date}`;
    return oneWeekAgo;
  }

  const returnedLastWeekValue = () => {
    fetch(urlOneWeekAgo)
    .then(resp => resp.json())
    .then((data) => {
    for (const key in data.rates) {
            let weekChange = document.createElement('h4');
            weekChange.innerHTML = (`${data.rates[key]}`);
            currencyList.appendChild(weekChange);
            console.log(weekChange);
            return weekChange;

        }
    });
  }