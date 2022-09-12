import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { setLocalItems } from '../services/api';

export default class ShopCart extends Component {
  state = {
    carrinho: [],
  };

  componentDidMount() {
    this.getLocalStorage();
  }

  getLocalStorage = () => {
    const local = JSON.parse(localStorage.getItem('cartItems')) || [];
    this.setState({
      carrinho: local,
    });
  };

  sum = (objP) => {
    const { carrinho } = this.state;
    const existe = carrinho.some((e) => e.id === objP.id);
    if (existe) {
      objP.quantidade += 1;
      const existente = carrinho.findIndex((e) => e.id === objP.id);
      carrinho.splice(existente, 1);
      carrinho.push(objP);
      setLocalItems(carrinho);
    }
    this.getLocalStorage();
  };

  sub = (objP) => {
    const { carrinho } = this.state;
    const existe = carrinho.some((e) => e.id === objP.id);
    if (existe) {
      objP.quantidade -= 1;
      const existente = carrinho.findIndex((e) => e.id === objP.id);
      carrinho.splice(existente, 1);
      carrinho.push(objP);
      setLocalItems(carrinho);
    }
    if (objP.quantidade <= 0) {
      this.remove(objP);
    }
    this.getLocalStorage();
  };

  remove = (objP) => {
    const { carrinho } = this.state;
    const existente = carrinho.findIndex((e) => e.id === objP.id);
    carrinho.splice(existente, 1);
    setLocalItems(carrinho);
    this.getLocalStorage();
  };

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
                  <div>
                    <button
                      type="button"
                      data-testid="product-increase-quantity"
                      onClick={ () => this.sum(e) }
                    >
                      +
                    </button>
                    <p data-testid="shopping-cart-product-quantity">
                      {e.quantidade}
                    </p>
                    <button
                      type="button"
                      data-testid="product-decrease-quantity"
                      onClick={ () => this.sub(e) }
                    >
                      -
                    </button>
                    <button
                      type="button"
                      data-testid="remove-product"
                      onClick={ () => this.remove(e) }
                    >
                      remova item
                    </button>
                  </div>
                </div>
              ))
            )
        }
        <Link
          data-testid="checkout-products"
          to="/checkout"
        >
          Finalizar compra
        </Link>
      </div>
    );
  }
}
