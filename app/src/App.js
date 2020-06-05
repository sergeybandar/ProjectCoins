import React from 'react';
import ExchangeRates from './components/ExchangeRates';
import Exchanges from './components/Exchanges';
import CoinsList from './components/CoinsList';
import CoinsConverter from './components/CoinsConverter';


export default class App extends React.Component {

  constructor() {
    super();
    this.state = {
      activeTab: "ExchangeRates",
    }
    this.onClickTab = this.onClickTab.bind(this);
  }
  onClickTab(tab) {
    this.setState({
      activeTab: tab
    })
  }
  // async componentDidMount() {
  //   const dataExchangeRates = (await axios.get('https://api.coingecko.com/api/v3/exchange_rates')).data;
  //   const dataExchangesList = (await axios.get('https://api.coingecko.com/api/v3/exchanges')).data;
  //   const dataCoinsList = (await axios.get('https://api.coingecko.com/api/v3/coins/list')).data;
  //   const dataCoinsListDescription
  //   console.log()
  //   this.setState((state) => {
  //     state.data = data;
  //     return state;
  //   })
  // }

  render() {
    let bodyContent;
    if (this.state.activeTab === "ExchangeRates") {
      bodyContent = <ExchangeRates />;
    } else if (this.state.activeTab === "ExchangesList") {
      bodyContent = <Exchanges />;
    } else if (this.state.activeTab === "CoinsList") {
      bodyContent = <CoinsList />
    } else if (this.state.activeTab === "CoinsConverter") {
      bodyContent = <CoinsConverter />
    }
    return (
      <div className="App">
        <div className="content">
          <div className="headContent">
            <div className={this.state.activeTab === "ExchangeRates" ? "activeTab" : "tab"} onClick={() => this.onClickTab("ExchangeRates")}><h3>Exchange rates</h3></div>
            <div className={this.state.activeTab === "ExchangesList" ? "activeTab" : "tab"} onClick={() => this.onClickTab("ExchangesList")}><h3>Exchanges list</h3></div>
            <div className={this.state.activeTab === "CoinsList" ? "activeTab" : "tab"} onClick={() => this.onClickTab("CoinsList")}><h3>Coins list</h3></div>
            <div className={this.state.activeTab === "CoinsConverter" ? "activeTab" : "tab"} onClick={() => this.onClickTab("CoinsConverter")}><h3>Coins converter</h3></div>
          </div>
          <div className="bodyContent">

            {bodyContent}
          </div>
        </div>


        {/* <CoinsConverter /> */}
      </div>
    )
  }
}