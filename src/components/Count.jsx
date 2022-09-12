import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Count extends Component {
  render() {
    const { itensCartQT } = this.props;

    return (
      <div>
        <h1>Quatidade de itens</h1>
        <span data-testid="shopping-cart-size">{ itensCartQT }</span>
      </div>
    );
  }
}

Count.propTypes = {
  itensCartQT: PropTypes.number.isRequired,
};
