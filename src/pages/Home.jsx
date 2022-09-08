import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { getCategories } from '../services/api';

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      categoriesList: [],
    };
  }

  componentDidMount() {
    this.fetchCategories();
  }

  fetchCategories = async () => {
    const { categoriesList } = this.state;
    const data = await getCategories();
    this.setState({ categoriesList: data });
    console.log(categoriesList);
  };

  render() {
    const { listaProdutos } = this.props;
    const { categoriesList } = this.state;
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

        <ul>
          {
            categoriesList.map((elem) => (
              <div key={ elem.id }>
                <button
                  data-testid="category"
                  type="button"
                  name={ elem.id }
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

Home.propTypes = {
  listaProdutos: PropTypes.shape(),
}.isRequired;
