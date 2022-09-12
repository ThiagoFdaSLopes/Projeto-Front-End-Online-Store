import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Count from '../components/Count';
import { getProduct, setLocalItems } from '../services/api';

export default class ProductDetails extends Component {
  state = {
    productId: [],
    // productObj: {},
    carrinho: [],
    itensCartQT: 0,
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
    this.getLocalStorage();
  }

  getLocalStorage = () => {
    const local = JSON.parse(localStorage.getItem('cartItems')) || [];
    const QTLocal = local.reduce((acc, curr) => {
      acc += curr.quantidade;
      return acc;
    }, 0);
    this.setState({
      itensCartQT: QTLocal,
    });
  };

  getProduct = async () => {
    const { match: { params: { id } } } = this.props;
    const product = await getProduct(id);
    product.quantidade = Number(1);
    this.setState({
      productId: [product],
      // productObj: product,
    });
  };

  sendCart = (objP) => {
    const { carrinho } = this.state;
    const existe = carrinho.some((e) => e.id === objP.id);
    if (existe) {
      objP.quantidade += 1;
      const existente = carrinho.findIndex((e) => e.id === objP.id);
      carrinho.splice(existente, 1);
      carrinho.push(objP);
      setLocalItems(carrinho);
    } else {
      objP.quantidade = Number(1);
      carrinho.push(objP);
      setLocalItems(carrinho);
    }
    this.getLocalStorage();
  };

  render() {
    const { productId, itensCartQT } = this.state;
    return (
      <div>
        <div>
          <p>
            <Link to="/ShopCart" data-testid="shopping-cart-button">
              Carrinho de compras
            </Link>
          </p>
          <Count itensCartQT={ itensCartQT } />
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
                onClick={ () => this.sendCart(e) }
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
