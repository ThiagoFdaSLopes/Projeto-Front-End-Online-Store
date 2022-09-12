import React, { Component } from 'react';

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
