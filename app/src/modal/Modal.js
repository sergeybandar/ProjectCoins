import React from 'react';
import './Modal.css';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import axios from 'axios';
export default class Modal extends React.Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            isOpen: false,
            dataCoin: []
        }
        this.getDataCoin = this.getDataCoin.bind(this);
    }

    async getDataCoin() {
        const dataCoin = (await axios.get(`https://api.coingecko.com/api/v3/coins/${this.props.idModal}/market_chart?vs_currency=usd&days=1000`)).data;
        console.log(dataCoin);
        this.setState((state) => {
            state.dataCoin = dataCoin.prices;
            state.isOpen = true
            return state;
        })
    }
    render() {
        const data = this.state.dataCoin;
        console.log(data);
        const options = {
            title: {
                text: 'Coin graph in compare with USD'
            },
            series: [{
                data: data,
                pointStart: 1,
                color: "#e60000"
            }]
        };


        return (<React.Fragment>
            <img onClick={() => this.getDataCoin()} src="data:image/png;base64,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" />
            {this.state.isOpen === true ?
                <div className="modalArea">
                    <div className="modalChart">
                        <div className="modal-body">
                            <button onClick={() => this.setState({ isOpen: false })}>&times;</button>
                            <div className="chart"><HighchartsReact highcharts={Highcharts} options={options} /></div>
                        </div>
                    </div></div>
                : ""}

        </React.Fragment>
        )
    }
}
