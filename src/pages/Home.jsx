import React, { Component } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { getCategories, getProductsFromCategoryAndQuery,
  setLocalItems } from '../services/api';

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      categoriesList: [],
      textBusca: '',
      listProdutos: [],
      pesquisou: false,
      localState: [],
    };
  }

  componentDidMount() {
    this.fetchCategories();
    const local = JSON.parse(localStorage.getItem('cartItems')) || [];
    this.setState({
      localState: local,
    });
  }

  fetchCategories = async () => {
    const { categoriesList } = this.state;
    const data = await getCategories();
    this.setState({ categoriesList: data });
    console.log(categoriesList);
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
    const produtos = await getProductsFromCategoryAndQuery(event.target.name, null);
    this.setState({
      listProdutos: produtos.results,
      pesquisou: true,
    });
  };

  handleCart = async (id) => {
    /* const { cart, listProdutos } = this.state;
    const addToCart = listProdutos.find((elem) => elem.id === event.target.name);
    cart.push(addToCart);
    const setItem = await setLocalItems(cart);
    return setItem; */

    const { listProdutos, localState } = this.state;
    const produto = listProdutos.find((elem) => elem.id === id);

    // const arrayProdutos = [];
    // const getStorage = getLocalItems();
    localState.push(produto);
    setLocalItems(localState);
  };

  render() {
    const { categoriesList, textBusca, listProdutos, pesquisou } = this.state;
    return (
      <main>
        <div className="campoDeBusca">
          <input
            type="text"
            name="textBusca"
            value={ textBusca }
            onChange={ this.handleChange }
            data-testid="query-input"
          />
          <button
            type="button"
            data-testid="query-button"
            onClick={ this.handleClick }
          >
            Pesquisar

          </button>
        </div>
        <div>
          {
            listProdutos.length === 0 && (
              <h1
                data-testid="home-initial-message"
              >
                Digite algum termo de pesquisa ou escolha uma categoria.

              </h1>)
          }
        </div>
        <div>
          {
            pesquisou && listProdutos.length === 0
              ? <p>Nenhum produto foi encontrado</p>
              : (
                listProdutos.map((e) => (
                  <>
                    <div data-testid="product" key={ e.id }>
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
                  </>
                ))
              )
          }
        </div>
        <div>
          <p>
            <Link to="/ShopCart" data-testid="shopping-cart-button">
              Carrinho de compras
            </Link>
          </p>
        </div>

        <ul>
          {
            categoriesList.map((elem) => (
              <div key={ elem.id }>
                <button
                  data-testid="category"
                  type="button"
                  name={ elem.id }
                  onClick={ this.categoryClick }
                >
                  { elem.name }
                </button>
              </div>
            ))
          }
        </ul>
      </main>
    );
  }
}
