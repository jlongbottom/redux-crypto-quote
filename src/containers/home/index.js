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
        <div>Loading...</div>
      )
    }

    return (
      <form onSubmit={this.tradeSubmit}>
        <h2>Account Balance</h2>
        <div>USD {this.props.account.balanceUSD}</div>
        <div>BTC {this.props.account.balanceBTC}</div>

        <h2>Trade</h2>
        <div>
          <input type="text" value="USD" disabled />
        </div>
        <div>
          <input type="number" step="0.01" ref="amount" onBlur={this.getQuote}/>
        </div>

        <h2>For</h2>
        <div>
          <input type="text" value="BTC" disabled />
        </div>

        <div>
          {this.props.account.quote > 0 ? this.props.account.quote + 'BTC' : ''}
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
