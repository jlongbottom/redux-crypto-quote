import fetch from 'isomorphic-fetch';
import store from '../store';
require('es6-promise').polyfill();

const initialState = {
  last_price_BTC: 0.0,
  fetching: false,
  balanceUSD: 156.12,
  balanceBTC: 0.0,
  quote: 0.0
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'FETCHING':
      return {
        ...state,
        fetching: true
      };

    case 'SAVE_BTC_PRICE':
      return {
        ...state,
        last_price_BTC: action.quote,
        fetching: !state.fetching
      };

    case 'SET_QUOTE':
      return {
        ...state,
        quote: state.balanceBTC + (action.amount/state.last_price_BTC)
      }

    case 'BUY_BTC':
      return {
        ...state,
        balanceUSD: state.balanceUSD - action.amount,
        balanceBTC: state.balanceBTC + (action.amount/state.last_price_BTC),
        quote: 0.0
      }

    default:
      return state;
  }
};

export function getPrice() {
  return dispatch => {
    dispatch({
      type: 'FETCHING'
    });

    //const state = store.getState();
    // Bypass CORS ;)
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const targetUrl = 'https://api.bitfinex.com/v1/pubticker/btcusd';
    fetch(proxyUrl + targetUrl)
      .then(blob => blob.json())
      .then(quote => {
        dispatch({
          type: 'SAVE_BTC_PRICE',
          quote: quote.last_price
        });
      });
  };
};

export function getQuote(amount) {
  return dispatch => {
    dispatch({
      type: 'SET_QUOTE',
      amount
    });
  };
};

export function executeTrade(amount) {
  return dispatch => {
    dispatch({
      type: 'BUY_BTC',
      amount
    });
  };
};