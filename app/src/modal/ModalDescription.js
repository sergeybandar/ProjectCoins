import React from 'react';
import './Modal.css';
import axios from 'axios';
export default class ModalDescription extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
            coin: props.coin,
            dataCoin: []
        }
        this.getDataCoin = this.getDataCoin.bind(this);
    }

    async getDataCoin() {
        const dataCoin = (await axios.get(`https://api.coingecko.com/api/v3/coins/${this.state.coin.id}?localization=false`)).data;
        this.setState((state) => {
            state.dataCoin = dataCoin;
            state.isOpen = true
            return state;
        })
    }
    render() {

        const coin = this.state.coin;
        const coinData = this.state.dataCoin;
        console.log(coinData);
        return (<React.Fragment>
            <span onClick={() => this.getDataCoin()}>{coin.name} ({coin.symbol})</span>

            {this.state.isOpen === true ?
                <div className="modalArea">
                    <div className="modalDescription">
                        <div className="modal-body">
                            <div className="left">
                                <img src={coinData.image.large} />
                            </div>
                            <div className="right">
                                <button onClick={() => this.setState({ isOpen: false })}>&times;</button>
                                <h2>{coinData.name}</h2>
                                <p>{coinData.description.en}</p>
                                <p>Change in the value of a coin for the last day {coinData.market_data.price_change_percentage_24h_in_currency.usd}</p></div>
                        </div>
                    </div></div>
                : ""}
        </React.Fragment>
        )
    }
}