
const host = 'api.frankfurter.app';
let oneWeekAgo = getWeekAgoDate();
let urlOneWeekAgo = `https://api.frankfurter.app/${oneWeekAgo}?from=USD`;
let lastWeekValue = '';
let currencyList = document.getElementById('currencyList');
let latestFromUSD = 'https://api.frankfurter.app/latest?from=USD';
let selectedReturnCurrency = '';
let quoteH3 = document.getElementById('quote');
let arrayString = [];


//random advice - https://api.adviceslip.com/advice
let adviceUrl = 'https://api.adviceslip.com/advice/search/a';


///
window.onload = function() {
    // createCurrencyElements();
    populateList();
    fetchAdvice();
    //returnedLastWeekValue();
  };

const fetchAdvice = () => {
    fetch(adviceUrl)
    .then(resp => resp.json())
    .then((data) => {
        const stuff = Math.floor(Math.random() * data.slips.length);
        quoteH3.innerHTML = (`${data.slips[stuff].advice}`);
    });
}

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
                let currencyElement = document.createElement('li');
                let valueElement = document.createElement('li');
                let dateElement = document.createElement('li');

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

//top input stuff
const left_input = document.getElementById('leftRow');
const right_output = document.getElementById('rightRow');
const returnSEK = document.getElementById('option1');
const returnGBP = document.getElementById('option2');
const returnNOK = document.getElementById('option3');
const returnJPY = document.getElementById('option4');
const returnAUD = document.getElementById('option5');
const returnEUR = document.getElementById('option6');
const returnINR = document.getElementById('option7');
const returnHKD = document.getElementById('option8');
const fromSEK = document.getElementById('option1from');
const fromGBP = document.getElementById('option2from');
const fromNOK = document.getElementById('option3from');
const fromJPY = document.getElementById('option4from');
const fromAUD = document.getElementById('option5from');
const fromEUR = document.getElementById('option6from');
const fromINR = document.getElementById('option7from');
const fromHKD = document.getElementById('option8from');

left_input.addEventListener("input", () => {
    if (left_input.value != '') {
        if (returnSEK.checked) {
            selectedReturnCurrency = 'SEK';
        }
        if (returnGBP.checked) {
            selectedReturnCurrency = 'GBP';
        }
        if (returnNOK.checked) {
            selectedReturnCurrency = 'NOK';
        }
        if (returnJPY.checked) {
            selectedReturnCurrency = 'JPY';
        }
        if (returnAUD.checked) {
            selectedReturnCurrency = 'AUD';
        }
        if (returnEUR.checked) {
            selectedReturnCurrency = 'EUR';
        }
        if (returnINR.checked) {
            selectedReturnCurrency = 'INR';
        }
        if (returnHKD.checked) {
            selectedReturnCurrency = 'HKD';
        }
        fetchandDisplay2(left_input.value, selectedReturnCurrency);
    } else {
        right_output.value = '';
    }
});
let fromCurrency = 'USD';
const fetchandDisplay2 = (inputValue, selectedReturnCurrency) => {
    fetch(`https://${host}/latest?amount=${inputValue}&from=${fromCurrency}&to=${selectedReturnCurrency}`)
      .then(resp => resp.json())
      .then((data) => {
        switch (selectedReturnCurrency) {
        case 'SEK':
            right_output.value = `${data.rates.SEK} SEK`;
            break;
        case 'GBP':
            right_output.value = `${data.rates.GBP} GBP`;
            break;
        case 'NOK':
            right_output.value = `${data.rates.NOK} NOK`;
            break;
        case 'JPY':
            right_output.value = `${data.rates.JPY} JYP`;
            break;
        case 'AUD':
            right_output.value = `${data.rates.AUD} AUD`;
            break;
        case 'EUR':
            right_output.value = `${data.rates.EUR} EUR`;
            break;
        case 'INR':
            right_output.value = `${data.rates.INR} INR`;
            break;
        case 'HKD':
            right_output.value = `${data.rates.HKD} HKD`;
            break;
        default:
            console.log(`woops`);
        }
      });
}
let topRadioButtons = document.getElementsByName("topRadioButtons");
for(radio in topRadioButtons) {
    topRadioButtons[radio].onclick = () => {
        if (left_input.value != '') {
            if (returnSEK.checked) {
                selectedReturnCurrency = 'SEK';
            }
            if (returnGBP.checked) {
                selectedReturnCurrency = 'GBP';
            }
            if (returnNOK.checked) {
                selectedReturnCurrency = 'NOK';
            }
            if (returnJPY.checked) {
                selectedReturnCurrency = 'JPY';
            }
            if (returnAUD.checked) {
                selectedReturnCurrency = 'AUD';
            }
            if (returnEUR.checked) {
                selectedReturnCurrency = 'EUR';
            }
            if (returnINR.checked) {
                selectedReturnCurrency = 'INR';
            }
            if (returnHKD.checked) {
                selectedReturnCurrency = 'HKD';
            }
            fetchandDisplay2(left_input.value, selectedReturnCurrency);
        } else {
            right_output.value = '';
        }
    }
}