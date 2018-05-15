import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  getPrice,
  executeTrade,
  getQuote
} from '../../modules/account';

class Home extends React.Component {

  componentDidMount() {
    this.props.getPrice();
  }

  constructor(props) {
    super(props);
    this.tradeSubmit = this.tradeSubmit.bind(this);
    this.getQuote = this.getQuote.bind(this);
  }

  tradeSubmit(event) {
    event.preventDefault();
    const amount = this.refs.amount.value;
    if (amount < this.props.account.balanceUSD) {
      this.props.executeTrade(amount);
    }
  }

  getQuote(event) {
    event.preventDefault();
    const amount = this.refs.amount.value;
    if (amount < this.props.account.balanceUSD) {
      this.props.getQuote(amount);
    }
  }

  render() {
    if (this.props.account.fetching) {
      return (
        <h1>Loading...</h1>
      )
    }

    return (
      <form onSubmit={this.tradeSubmit}>
        <label>Account Balance</label>
        <div className="holdings">
          <div>USD {this.props.account.balanceUSD}</div>
          <div>BTC {this.props.account.balanceBTC}</div>
        </div>

        <label>Trade</label>
        <div className="row currency">
          USD
        </div>
        <div className="row">
          <input type="number" step="0.01" ref="amount" defaultValue={0.0} onBlur={this.getQuote}/>
        </div>

        <label>For</label>
        <div className="row currency">
          BTC
        </div>

        <div className="row currency quoteBox">
          {this.props.account.quote > 0 ? this.props.account.quote + ' BTC' : ''}
        </div>

        <div>
          <input type="submit" onClick={this.tradeSubmit} disabled={this.props.fetching} value="Trade"/>
        </div>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  account: state.account
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getPrice,
      executeTrade,
      getQuote
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Home);
