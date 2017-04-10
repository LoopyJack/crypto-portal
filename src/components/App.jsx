
var React = require('react');

const PoloManager = require('poloniex-orderbook');
const poloman = new PoloManager().connect();

const bitfinexApiNode = require('bitfinex-api-node');
const bitfinws = new bitfinexApiNode().ws;

import symbols from '../../data/symbols';
import ExchangeCompare from './ExchangeCompare';


poloman.on('error', err => console.log(err));
// poloman.market('USDT_BTC');

bitfinws.on('open', () => {
  Object.keys(symbols).map( (pair) => {
    bitfinws.subscribeTicker(symbols[pair].bitfinex);
    poloman.market(symbols[pair].poloniex);
  });
});

var polomap = {}

Object.keys(symbols).forEach( (s) => {
  polomap[symbols[s].poloniex] = s;
});


class App extends React.Component {
  constructor(props) {
    super(props);

    const exchanges = ['bitfinex', 'poloniex'];
    const insts = Object.keys(symbols);

    let pairs = {}
    Object.keys(symbols).map( (pair) => {
      pairs[pair] = {};
      Object.keys(symbols[pair]).map( (e) => {
        pairs[pair][e] = {
          bid: 0,
          ask: 0,
          spread: 0,
          midpoint: 0
        };
      });
    });

    this.state = {
      pairs: pairs
    }
    console.log(this.state.pairs);

    poloman.on('change', info => {
      const inst = this.state.pairs[polomap[info.channel]].poloniex;
      inst.ask      = poloman.market(info.channel).ask;
      inst.bid      = poloman.market(info.channel).bid;
      inst.spread   = poloman.market(info.channel).spread;
      inst.midpoint = poloman.market(info.channel).midpoint;

      const pairs = this.state.pairs;
      pairs[polomap[info.channel]].poloniex = inst

      this.setState({
        pairs: pairs
      });
    });

    bitfinws.on('ticker', (pair, update) => {
      const inst = this.state.pairs[pair].bitfinex;
      inst.ask      = update.ask;
      inst.bid      = update.bid;
      inst.spread   = update.spread;
      inst.midpoint = update.midpoint;

      const pairs = this.state.pairs;
      pairs[pair].bitfinex = inst

      this.setState({
        pairs: pairs
      });
    });

  }

  render() {
    const compares = Object.keys(this.state.pairs).map( (p) =>
      <ExchangeCompare
        key ={p}
        name={p}
        data={this.state.pairs[p]}>
      </ExchangeCompare>
    );

    return (
      <div>
        {compares}
      </div>
    );

    //   <div style={{fontFamily:'"Lucida Console", Monaco, monospace'}}>
    //     Poloniex:{this.state.poloniex}<br></br>
    //     Bitfinex:{this.state.bitfinex}
    //   </div>
    // );
  }
}

module.exports = App;
