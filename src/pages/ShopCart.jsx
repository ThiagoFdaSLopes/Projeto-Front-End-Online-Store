import React, { Component } from 'react';

export default class ShopCart extends Component {
  state = {
    carrinho: [],
  };

  render() {
    const { carrinho } = this.state;
    return (
      <div>
        <h1>Carrinho de compras</h1>
        {
          carrinho.length === 0
          && <h1 data-testid="shopping-cart-empty-message">Seu carrinho está vazio</h1>
        }
      </div>
    );
  }
}
