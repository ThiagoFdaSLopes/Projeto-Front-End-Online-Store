import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class FormProductDetail extends Component {
  render() {
    const { emails, comentarios, isInvalid, handleChange, submitReview } = this.props;
    return (
      <div>
        <form>
          <input
            data-testid="product-detail-email"
            type="email"
            name="emails"
            id="email"
            value={ emails }
            onChange={ handleChange }
          />

          <label htmlFor="1">
            <input
              type="radio"
              name="stars"
              id="1"
              value="1"
              data-testid="1-rating"
              onChange={ handleChange }
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
              onChange={ handleChange }
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
              onChange={ handleChange }
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
              onChange={ handleChange }
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
              onChange={ handleChange }
            />
            5 ⭐⭐⭐⭐⭐
          </label>

          <textarea
            name="comentarios"
            id="comentario"
            rows="20"
            cols="60"
            value={ comentarios }
            data-testid="product-detail-evaluation"
            onChange={ handleChange }
          />

          <button
            type="button"
            data-testid="submit-review-btn"
            onClick={ submitReview }
          >
            Avaliar
          </button>
        </form>

        { isInvalid && <p data-testid="error-msg">Campos inválidos</p> }
      </div>
    );
  }
}

FormProductDetail.propTypes = {
  emails: PropTypes.string,
  comentarios: PropTypes.string,
  stars: PropTypes.string,
  handleChange: PropTypes.func,
  submitReview: PropTypes.func,
  isInvalid: PropTypes.bool,
}.isRequired;
