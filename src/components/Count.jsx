import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import carrinho from '../imgs/carrinho.svg';

export default class Count extends Component {
  render() {
    const { itensCartQT } = this.props;

    return (
      <div className="carrinho">
        <img src={ carrinho } alt="" />
        <Link to="/ShopCart" data-testid="shopping-cart-button">
          <div className="circle-carrinho">
            <span
              data-testid="shopping-cart-size"
              className="number-carrinho"
            >
              { itensCartQT }

            </span>
          </div>
        </Link>
      </div>
    );
  }
}

Count.propTypes = {
  itensCartQT: PropTypes.number.isRequired,
};
