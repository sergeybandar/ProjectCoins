import React from 'react';
import axios from 'axios'
export default class CoinsConverter extends React.Component {

    constructor() {
        super();
        this.state = {
            dataCoins: [],
            data: [],
            input1: 0,
            input2: 0,
            select1: '',
            select2: '',
            coefficient: 1
        }
        this.onChangeInput1 = this.onChangeInput1.bind(this);
        this.onChangeInput2 = this.onChangeInput2.bind(this);
        this.onChangeSelect1 = this.onChangeSelect1.bind(this);
        this.onChangeSelect2 = this.onChangeSelect2.bind(this);

    }
    onChangeInput1(event) {
        console.log(event.target.value);
        const inp1 = event.target.value;
        this.setState({
            input1: inp1,
            input2: (inp1 * this.state.coefficient)
        })
    }
    onChangeInput2(event) {
        console.log(event.target.value);
        const inp2 = event.target.value;
        this.setState({
            input2: inp2,
            input1: (inp2 / this.state.coefficient)
        })
    }
    async onChangeSelect1(event) {
        console.log(event.target.value);

        await this.setState({
            select1: event.target.value
        })
        const coeff = (await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${this.state.select1}&vs_currencies=${this.state.select2}`)).data;
        console.log(coeff);
        this.setState({
            coefficient: coeff[`${this.state.select1}`][`${this.state.select2}`]
        })
        //  this.getCoefficient();
    }
    async onChangeSelect2(event) {
        console.log(event.target.value);
        await this.setState({
            select2: event.target.value
        })
        const coeff = (await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${this.state.select1}&vs_currencies=${this.state.select2}`)).data;
        console.log(coeff);
        this.setState({
            coefficient: coeff[`${this.state.select1}`][`${this.state.select2}`]
        })
        //  this.getCoefficient();
    }
    async componentDidMount() {
        const dataCoins = (await axios.get('https://api.coingecko.com/api/v3/simple/supported_vs_currencies')).data;
        const dataName = (await axios.get('https://api.coingecko.com/api/v3/coins/list')).data;
        const data = [];
        for (let i = 0; i < dataCoins.length; i++) {
            for (let j = 0; j < dataName.length; j++) {
                if (dataCoins[i] === dataName[j].symbol) {
                    data.push({
                        name: dataCoins[i],
                        id: dataName[j].id
                    })
                }
            }
        }
        console.log(data);
        console.log(dataCoins);
        const coeff = (await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${dataName[0].id}&vs_currencies=${dataCoins[0]}`)).data;
        console.log('start', coeff);
        this.setState((state) => {
            state.dataCoins = dataName;
            state.data = dataCoins;
            state.select2 = dataCoins[0];
            state.select1 = dataName[0].id;
            state.coefficient = coeff[`${dataName[0].id}`][`${dataCoins[0]}`];
            return state;
        })
    }
    render() {
        console.log(this.state.coefficient);
        let options1;
        let options2;
        if (this.state.dataCoins.length > 0) {
            options1 = this.state.dataCoins.map((coin) => (
                <option key={coin.id} value={coin.id}>{coin.name}</option>
            ))
        }
        if (this.state.data.length > 0) {
            options2 = this.state.data.map((coin) => (
                <option key={coin} value={coin}>{coin}</option>
            ))
        }
        return (
            <div className="CoinsConverter">
                <div className="selects">
                    <select onChange={this.onChangeSelect1}>{options1}</select>
                    <select onChange={this.onChangeSelect2}>{options2}</select>
                </div>
                <span><h3 className="rate">Rate: {this.state.coefficient}</h3></span>
                <div className="inputs">
                    <input type="number" onChange={this.onChangeInput1} value={this.state.input1} />
                    <input type="number" onChange={this.onChangeInput2} value={this.state.input2} />
                </div>
            </div>
        )
    }
}