import React from 'react';
import axios from 'axios'
export default class Exchanges extends React.Component {

    constructor() {
        super();
        this.state = {
            dataExchangesList: [],
        }
    }
    async componentDidMount() {
        const dataExchangesList = (await axios.get('https://api.coingecko.com/api/v3/exchanges')).data;
        console.log(dataExchangesList);
        const dataExchangesListArr = [];
        for (let i in dataExchangesList) {
            dataExchangesListArr.push(dataExchangesList[i]);
        }
        console.log(dataExchangesListArr);
        this.setState((state) => {
            state.dataExchangesList = dataExchangesListArr;
            return state;
        })
    }
    render() {
        let tbodyContent;
        if (this.state.dataExchangesList.length > 0) {
            tbodyContent = this.state.dataExchangesList.map((coin, index) => (
                <tr key={index}>
                    <td>{index + 1}</td>
                    <td id="Name"><a href={coin.url}><img src={coin.image} /> {coin.name}</a></td>
                    <td id="Year">{coin.year_established}</td><td id="Country">{coin.country}</td>
                    <td id="Volume">{Number(coin.trade_volume_24h_btc_normalized).toFixed(2)}</td></tr>
            ))
        }

        return (
            <div className="Exchanges">
                <table>
                    <thead>
                        <tr>
                            <th>№</th>
                            <th id="Name">Name</th>
                            <th id="Year">Year</th>
                            <th id="Country">Country</th>
                            <th id="Volume">Volume</th></tr>
                    </thead>

                    <tbody>
                        {tbodyContent}
                    </tbody>
                </table>
            </div>
        )
    }
}