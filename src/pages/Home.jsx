import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Home extends Component {
  render() {
    const { listaProdutos } = this.props;
    return (
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
    );
  }
}

Home.propTypes = {
  listaProdutos: PropTypes.shape(),
}.isRequired;
