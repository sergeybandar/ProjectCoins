import React from 'react';
import axios from 'axios'
export default class ExchangeRates extends React.Component {

    constructor() {
        super();
        this.state = {
            dataExchangeRates: [],
        }
    }
    async componentDidMount() {
        const dataExchangeRates = (await axios.get('https://api.coingecko.com/api/v3/exchange_rates')).data.rates;
        console.log(dataExchangeRates);
        const dataExchangeRatesArr = [];
        for (let i in dataExchangeRates) {
            dataExchangeRatesArr.push(dataExchangeRates[i]);
        }
        console.log(dataExchangeRatesArr);
        this.setState((state) => {
            state.dataExchangeRates = dataExchangeRatesArr;
            return state;
        })
    }
    render() {
        let tbodyContent;
        if (this.state.dataExchangeRates.length > 0) {
            tbodyContent = this.state.dataExchangeRates.map((coin, index) => (
                <tr key={index}><td>{coin.name}</td><td>{coin.value}</td></tr>
            ))
        }

        return (
            <div className="ExchangeRates">
                <table>
                    <thead>
                        <tr><th>Name</th><th>Number of coins needed to buy 1 BTC</th></tr>
                    </thead>

                    <tbody>
                        {tbodyContent}
                    </tbody>
                </table>
            </div>
        )
    }
}