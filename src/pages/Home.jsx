import React, { Component } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Count from '../components/Count';
import {
  getCategories,
  getProductsFromCategoryAndQuery,
  setLocalItems,
} from '../services/api';
import logo from '../imgs/logo.svg';
import searchButton from '../imgs/searchButton.svg';

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      categoriesList: [],
      textBusca: '',
      listProdutos: [],
      pesquisou: false,
      localState: [],
      itensCartQT: 0,
    };
  }

  componentDidMount() {
    this.fetchCategories();
    const local = JSON.parse(localStorage.getItem('cartItems')) || [];
    this.setState({
      localState: local,
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

  fetchCategories = async () => {
    const data = await getCategories();
    this.setState({ categoriesList: data });
  };

  handleChange = ({ target }) => {
    const { value, name } = target;

    this.setState({
      [name]: value,
    });
  };

  handleClick = async () => {
    const { textBusca } = this.state;
    const produtos = await getProductsFromCategoryAndQuery(null, textBusca);

    this.setState({
      listProdutos: produtos.results,
      pesquisou: true,
    });
  };

  categoryClick = async (event) => {
    const produtos = await getProductsFromCategoryAndQuery(
      event.target.name,
      null,
    );
    this.setState({
      listProdutos: produtos.results,
      pesquisou: true,
    });
  };

  handleCart = async (id) => {
    const { listProdutos, localState } = this.state;
    const produto = listProdutos.find((elem) => elem.id === id);
    const existe = localState.some((e) => e.id === produto.id);
    if (existe) {
      produto.quantidade += 1;
      const existente = localState.findIndex((e) => e.id === produto.id);
      localState.splice(existente, 1);
      localState.push(produto);
      setLocalItems(localState);
    } else {
      produto.quantidade = Number(1);
      localState.push(produto);
      setLocalItems(localState);
    }
    this.getLocalStorage();
  };

  render() {
    const {
      categoriesList, textBusca, listProdutos, pesquisou, itensCartQT } = this.state;
    return (
      <>
        <header className="header-home">
          <div className="search">
            <input
              type="text"
              name="textBusca"
              className="input-search"
              value={ textBusca }
              placeholder="Digite o que você busca"
              onChange={ this.handleChange }
              data-testid="query-input"
            />
            <button
              className="button-search"
              type="button"
              data-testid="query-button"
              onClick={ this.handleClick }
            >
              <img src={ searchButton } alt="search button" />
            </button>
          </div>
          <div className="textos-header">
            <img src={ logo } alt="logo front end" />
          </div>
          <Count itensCartQT={ itensCartQT } />
        </header>
        <section>
          <div className="div-list-categoria">
            <p>Categorias</p>
            {categoriesList.map((elem) => (
              <div
                key={ elem.id }
              >
                <button
                  data-testid="category"
                  type="button"
                  name={ elem.id }
                  className="button-category"
                  onClick={ this.categoryClick }
                >
                  {elem.name}
                </button>
              </div>
            ))}
          </div>
          <div className="div-produtos">
            {listProdutos.length === 0 && (
              <div className="texts-no">
                <p className="no-search">você ainda não realizou uma busca</p>
                <p
                  data-testid="home-initial-message"
                  className="no-products"
                >
                  Digite algum termo de pesquisa ou escolha uma categoria.
                </p>
              </div>
            )}
            <div>
              {pesquisou && listProdutos.length === 0 ? (
                <p>Nenhum produto foi encontrado</p>
              ) : (
                listProdutos.map((e) => (
                  <div data-testid="product" key={ e.id }>
                    <div>
                      {e.shipping.free_shipping && (
                        <p data-testid="free-shipping">Frete grátis</p>
                      )}
                      <img src={ e.thumbnail } alt={ e.title } />
                      <p>{e.title}</p>
                      <p>{`Valor: ${e.price}`}</p>
                      <Link
                        data-testid="product-detail-link"
                        to={ `/productdetails/${e.id}` }
                      >
                        Detalhes
                      </Link>
                    </div>

                    <div>
                      <button
                        name={ e.id }
                        type="button"
                        data-testid="product-add-to-cart"
                        onClick={ () => this.handleCart(e.id) }
                      >
                        Adicionar ao Carrinho!
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>
      </>
    );
  }
}
