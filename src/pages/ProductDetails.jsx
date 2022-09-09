import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getProduct, setLocalItems } from '../services/api';

export default class ProductDetails extends Component {
  state = {
    productId: [],
    productObj: {},
    carrinho: [],
  };

  componentDidMount() {
    const inicio = async () => {
      await this.getProduct();
    };
    inicio();
    const produtos = JSON.parse(localStorage.getItem('cartItems')) || [];
    this.setState({
      carrinho: produtos,
    });
  }

  getProduct = async () => {
    const { match: { params: { id } } } = this.props;
    const product = await getProduct(id);
    this.setState({
      productId: [product],
      productObj: product,
    });
  };

  sendCart = () => {
    const { productObj, carrinho } = this.state;
    carrinho.push(productObj);
    setLocalItems(carrinho);
  };

  render() {
    const { productId } = this.state;
    return (
      <div>
        <div>
          <p>
            <Link to="/ShopCart" data-testid="shopping-cart-button">
              Carrinho de compras
            </Link>
          </p>
        </div>
        <div>
          {productId.length > 0 && (productId.map((e) => (
            <div key={ e.id }>
              <div>
                <img
                  data-testid="product-detail-image"
                  src={ e.thumbnail }
                  alt={ e.title }
                />
              </div>
              <div>
                <p data-testid="product-detail-name">{e.title}</p>
                <p data-testid="product-detail-price">{`Price: ${e.price}`}</p>
              </div>
              <button
                type="button"
                onClick={ this.sendCart }
                data-testid="product-detail-add-to-cart"
              >
                add carrinho
              </button>
            </div>
          )))}
        </div>

      </div>
    );
  }
}

ProductDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
}.isRequired;
