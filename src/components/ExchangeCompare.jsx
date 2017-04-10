var React = require('react');
import ExchangeCompareRow from './ExchangeCompareRow';

// import Griddle from 'griddle-react';

class ExchangeCompare extends React.Component {
  constructor(props) {
    super(props);
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
      fontFamily: 'Open Sans, Sans Serif'
    }

    return (
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
      <br></br>
      </div>
    )
  }


}

module.exports = ExchangeCompare;
