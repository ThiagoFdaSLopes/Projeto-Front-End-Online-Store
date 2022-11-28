import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Count from '../components/Count';
import { setLocalItems } from '../services/api';
import logo from '../imgs/logo.svg';

export default class ShopCart extends Component {
  state = {
    carrinho: [],
    itensCartQT: 0,
  };

  componentDidMount() {
    this.getLocalStorage();
  }

  getLocalStorage = () => {
    const local = JSON.parse(localStorage.getItem('cartItems')) || [];
    const QTLocal = local.reduce((acc, curr) => {
      acc += curr.quantidade;
      return acc;
    }, 0);
    this.setState({
      carrinho: local,
      itensCartQT: QTLocal,
    });
  };

  sum = (objP) => {
    const { carrinho } = this.state;
    const existe = carrinho.some((e) => e.id === objP.id);
    if (existe) {
      const quantidadeEstoque = objP.available_quantity - 1;
      objP.available_quantity = quantidadeEstoque;
      if (quantidadeEstoque > 0) {
        console.log(objP.available_quantity);
        objP.quantidade += 1;
        const existente = carrinho.findIndex((e) => e.id === objP.id);
        carrinho.splice(existente, 1);
        carrinho.push(objP);
        setLocalItems(carrinho);
      }
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
    const { carrinho, itensCartQT } = this.state;
    return (
      <>
        <header className="header-details">
          <div className="textos-details">
            <img src={ logo } alt="logo front end" />
          </div>
          <Count itensCartQT={ itensCartQT } />
        </header>
        <section className="page-details">
          <div className="thumbnail-details">
            <div className="produt-img">
              {
                carrinho.length === 0
                  ? (
                    <h1
                      data-testid="shopping-cart-empty-message"
                    >
                      Seu carrinho está vazio
                    </h1>

                  ) : (
                    carrinho.map((e) => (
                      <div
                        key={ e.id }
                        className="produtos-carrinho"
                      >
                        <button
                          type="button"
                          data-testid="remove-product"
                          onClick={ () => this.remove(e) }
                        >
                          remova item
                        </button>
                        <img src={ e.thumbnail } alt={ e.title } />
                        <p data-testid="shopping-cart-product-name">{e.title}</p>
                        <p>{`Valor: ${e.price}`}</p>
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
                        </div>
                      </div>
                    ))
                  )
              }
            </div>
          </div>
        </section>
        <Link
          data-testid="checkout-products"
          to="/checkout"
        >
          Finalizar compra
        </Link>
      </>
    );
  }
}
