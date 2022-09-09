import React, { Component } from 'react';

export default class ShopCart extends Component {
  state = {
    carrinho: [],
  };

  componentDidMount() {
    const local = JSON.parse(localStorage.getItem('cartItems')) || [];
    this.setState({
      carrinho: local,
    });
  }

  render() {
    const { carrinho } = this.state;
    return (
      <div>
        <h1>Carrinho de compras</h1>
        {
          carrinho.length === 0
            ? <h1 data-testid="shopping-cart-empty-message">Seu carrinho está vazio</h1>
            : (
              carrinho.map((e) => (
                <div data-testid="product" key={ e.id }>
                  <div>
                    <img src={ e.thumbnail } alt={ e.title } />
                    <p data-testid="shopping-cart-product-name">{e.title}</p>
                    <p>{`Valor: ${e.price}`}</p>
                  </div>

                  <p data-testid="shopping-cart-product-quantity">
                    {e.quantidade}
                  </p>
                </div>
              ))
            )
        }
      </div>
    );
  }
}
