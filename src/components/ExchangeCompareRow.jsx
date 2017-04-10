var React = require('react');

class ExchangeCompareRow extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let style = {
      paddingLeft:  5,
      paddingRight: 5,
      textAlign: 'right',
      minWidth: 70
    };

    return(
      <tr>
        <td style={style}>{this.props.exchange}</td>
        <td style={style}>{this.props.data.bid.toFixed(this.props.sigfigs)}</td>
        <td style={style}>{this.props.data.ask.toFixed(this.props.sigfigs)}</td>
        <td style={style}>{this.props.data.spread.toFixed(this.props.sigfigs)}</td>
        <td style={style}>{this.props.data.midpoint.toFixed(this.props.sigfigs)}</td>
      </tr>
    )
  }


}

module.exports = ExchangeCompareRow;
