import React from 'react';
import axios from 'axios'
import Modal from '../modal/Modal'
import ModalDescription from '../modal/ModalDescription'
export default class CoinsList extends React.Component {

    constructor() {
        super();
        this.state = {
            dataCoinsList: [],
            dataCoinsListDescription: [],
            stateModal: false
        }
    }
    async componentDidMount() {
        const dataCoinsList = (await axios.get('https://api.coingecko.com/api/v3/coins/list')).data.slice(0, 100);
        console.log(dataCoinsList);
        this.setState((state) => {
            state.dataCoinsList = dataCoinsList;
            return state;
        })
    }

    render() {
        let tbodyContent;
        if (this.state.dataCoinsList.length > 0) {
            tbodyContent = this.state.dataCoinsList.map((coin, index) => (
                <tr key={index}>
                    <td>{index + 1}</td>
                    <td className="tdModalDescription"><ModalDescription coin={coin} /></td>
                    <td> <Modal idModal={coin.id} /></td></tr>
            ))
        }

        return (
            <div className="CoinsList">
                <table>
                    <thead>
                        <tr><th>№</th><th className="thModalDescription"><span>Coin name</span></th><th>Graph</th></tr>
                    </thead>
                    <tbody>
                        {tbodyContent}
                    </tbody>
                </table>
            </div>
        )
    }
}