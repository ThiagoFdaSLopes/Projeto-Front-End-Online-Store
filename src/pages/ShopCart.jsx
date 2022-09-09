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
    const filter = carrinho.filter((e, i) => carrinho.indexOf(e) === i);
    console.log(filter);

    return (
      <div>
        <h1>Carrinho de compras</h1>
        {
          carrinho.length === 0
            ? <h1 data-testid="shopping-cart-empty-message">Seu carrinho está vazio</h1>
            : (
              carrinho.map((e) => (
                <>
                  <div data-testid="product" key={ e.id }>
                    <img src={ e.thumbnail } alt={ e.title } />
                    <p>{e.title}</p>
                    <p>{`Valor: ${e.price}`}</p>
                  </div>

                  <p>
                    {
                      carrinho.reduce((acc, elem) => {
                        if (elem.id === e.id) {
                          acc += 1;
                        }
                        return acc;
                      }, 0)
                    }
                  </p>
                </>
              ))
            )
        }
      </div>
    );
  }
}
