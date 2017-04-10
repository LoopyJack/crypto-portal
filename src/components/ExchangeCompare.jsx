var React = require('react');
var SmoothieComponent = require('react-smoothie');

import ExchangeCompareRow from './ExchangeCompareRow';


class ExchangeCompare extends React.Component {
  constructor(props) {
    super(props);

    this.exchanges = Object.keys(this.props.data).map( (e) => e);
    this.ts = {}
    Object.keys(this.props.data).map( (e) => this.ts[e] = {})
  }

  render() {
    const data = Object.keys(this.props.data).map( (exchange) =>
      <ExchangeCompareRow
        key={exchange}
        exchange={exchange}
        sigfigs={7}
        data={this.props.data[exchange]}>
      </ExchangeCompareRow>
    );

    let style = {
      fontFamily: 'Open Sans, Sans Serif',
      fontSize: 10
    }

    return (
      <div>
        <div>
          <table className="exchangecompare" style={style}>
            <thead>
                <tr>
                    <th>{this.props.name}</th>
                    <th>Bid</th>
                    <th>Ask</th>
                    <th>Spread</th>
                    <th>midpoint</th>
                </tr>
            </thead>
            <tbody>
                {data}
            </tbody>
          </table>
        </div>
        <div>
          <SmoothieComponent
            ref="chart"
            width="400"
            height="70"
            millisPerPixel="1000"
            grid={{millisPerLine:60000*1}}
            yRangeFunction={yRangeFunc}>
          </ SmoothieComponent>
        </div>
        <br></br>
      </div>
    )
  }

  componentDidMount() {
    var ts = {};
    var ts1 = this.refs.chart.addTimeSeries({},{ strokeStyle: 'rgba(0, 255, 0, 1)', lineWidth: 2 });
    var ts2 = this.refs.chart.addTimeSeries({},{ strokeStyle: 'rgba(255, 0, 0, 1)', lineWidth: 2 });

    this.dataGenerator = setInterval(() => {
      var time = new Date().getTime();
      ts1.append(time, this.props.data.poloniex.midpoint);
      ts2.append(time, this.props.data.bitfinex.midpoint);
    }, 100);

  }


}

var yRangeFunc = function(range) {
  const bound = .005;
  let n = 0, x = range.max;
  range.min == 0 ? n = range.max : n = range.min;

  let min = n * (1.0 - bound);
  let max = x * (1.0 + bound);
  return {min: min, max: max};
}

module.exports = ExchangeCompare;
