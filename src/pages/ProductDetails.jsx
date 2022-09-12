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
    reviews: [],
    emails: '',
    comentarios: '',
    stars: '',
    // itemsAvaliacoes: [],
    isInvalid: false,
  };

  componentDidMount() {
    const inicio = async () => {
      await this.getProducts();
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
  getProducts = async () => {
    const { match: { params: { id } } } = this.props;
    const product = await getProduct(id);
    product.quantidade = Number(1);
    product.avaliacao = [];
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

  handleChange = ({ target }) => {
    const { value, name } = target;

    this.setState({
      [name]: value,
    });
  };

  submitReview = (objAvaliar) => {
    const { emails, comentarios, stars } = this.state;

    if (emails && comentarios && stars) {
      this.setState((state) => ({
        reviews: [...state.reviews, objAvaliar],
        isInvalid: false,
        emails: '',
        comentarios: '',
        stars: '',
      }), this.saveAvaliation());
    } else {
      this.setState({ isInvalid: true });
    }
  };

  saveAvaliation = () => {
    const { reviews } = this.state;

    const item = productId[0];

    localStorage.setItem(`${item.id}`, JSON.stringify(reviews));
  };

  render() {
    const { isInvalid, productId, emails, comentarios, stars, reviews, itensCartQT } = this.state;
    console.log(reviews);
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

              <div>
                <form>
                  <input
                    data-testid="product-detail-email"
                    type="email"
                    name="emails"
                    id="email"
                    value={ emails }
                    placeholder="Adicione um e-mail válido!"
                    onChange={ this.handleChange }
                  />

                  <label htmlFor="1">
                    <input
                      type="radio"
                      name="stars"
                      id="1"
                      value="1"
                      data-testid="1-rating"
                      onChange={ this.handleChange }
                    />
                    1 ⭐
                  </label>

                  <label htmlFor="2">
                    <input
                      type="radio"
                      name="stars"
                      id="2"
                      value="2"
                      data-testid="2-rating"
                      onChange={ this.handleChange }
                    />
                    2 ⭐⭐
                  </label>

                  <label htmlFor="3">
                    <input
                      type="radio"
                      name="stars"
                      id="3"
                      value="3"
                      data-testid="3-rating"
                      onChange={ this.handleChange }
                    />
                    3 ⭐⭐⭐
                  </label>

                  <label htmlFor="4">
                    <input
                      type="radio"
                      name="stars"
                      id="4"
                      value="4"
                      data-testid="4-rating"
                      onChange={ this.handleChange }
                    />
                    4 ⭐⭐⭐⭐
                  </label>

                  <label htmlFor="5">
                    <input
                      type="radio"
                      name="stars"
                      id="5"
                      value="5"
                      data-testid="5-rating"
                      onChange={ this.handleChange }
                    />
                    5 ⭐⭐⭐⭐⭐
                  </label>

                  <textarea
                    name="comentarios"
                    id="comentario"
                    placeholder="Adicione aqui o seu comentário!"
                    rows="20"
                    cols="60"
                    value={ comentarios }
                    data-testid="product-detail-evaluation"
                    onChange={ this.handleChange }
                  />

                  <button
                    type="button"
                    data-testid="submit-review-btn"
                    onClick={ () => this.submitReview({ emails, comentarios, stars }) }
                  >
                    Enviar Avaliação!
                  </button>
                </form>

                { isInvalid && <p data-testid="error-msg">Campos inválidos</p> }
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
