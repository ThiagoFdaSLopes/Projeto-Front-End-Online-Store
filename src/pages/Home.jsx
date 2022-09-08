import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

export default class Home extends Component {
  render() {
    const { listaProdutos } = this.props;
    return (
      <main>
        <div>
          {
            listaProdutos.length === 0 && (
              <h1
                data-testid="home-initial-message"
              >
                Digite algum termo de pesquisa ou escolha uma categoria.

              </h1>)
          }
        </div>
        <div>
          <p>
            <Link to="/ShopCart" data-testid="shopping-cart-button">
              Carrinho de compras
            </Link>
          </p>
        </div>
      </main>
    );
  }
}

Home.propTypes = {
  listaProdutos: PropTypes.shape(),
}.isRequired;
