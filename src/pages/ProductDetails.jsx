import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getProduct } from '../services/api';

export default class ProductDetails extends Component {
  state = {
    productId: [],
  };

  componentDidMount() {
    const inicio = async () => {
      await this.getProduct();
    };
    inicio();
  }

  getProduct = async () => {
    const { match: { params: { id } } } = this.props;
    const product = await getProduct(id);
    this.setState({
      productId: [product],
    });
  };

  render() {
    const { productId } = this.state;
    console.log(productId);
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
          { productId.length > 0 && (productId.map((e) => (
            <div key={ e.id }>
              <div>
                <img
                  data-testid="product-detail-image"
                  src={ e.thumbnail }
                  alt={ e.title }
                />
              </div>
              <div>
                <p data-testid="product-detail-name">{ e.title }</p>
                <p data-testid="product-detail-price">{`Price: ${e.price}`}</p>
              </div>
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
