const apiKey = '8ba07d54cbb5c9d1941fc957'; // Replace with your ExchangeRate-API key
const apiURL = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;

document.addEventListener('DOMContentLoaded', () => {
    fetch(apiURL)
        .then(response => response.json())
        .then(data => {
            const currencies = Object.keys(data.conversion_rates);
            const fromCurrency = document.getElementById('fromCurrency');
            const toCurrency = document.getElementById('toCurrency');

            currencies.forEach(currency => {
                const option1 = document.createElement('option');
                option1.value = currency;
                option1.textContent = currency;
                fromCurrency.appendChild(option1);

                const option2 = document.createElement('option');
                option2.value = currency;
                option2.textContent = currency;
                toCurrency.appendChild(option2);
            });

            document.getElementById('convertButton').addEventListener('click', () => {
                const fromCurrencyValue = fromCurrency.value;
                const toCurrencyValue = toCurrency.value;
                const amount = document.getElementById('amount').value;

                if (amount === '') {
                    alert('Please enter an amount');
                    return;
                }

                const resultDiv = document.getElementById('result');
                const conversionRate = data.conversion_rates[toCurrencyValue] / data.conversion_rates[fromCurrencyValue];
                const result = amount * conversionRate;

                resultDiv.textContent = `${amount} ${fromCurrencyValue} = ${result.toFixed(2)} ${toCurrencyValue}`;
            });
        })
        .catch(error => console.error('Error fetching data:', error));
});
