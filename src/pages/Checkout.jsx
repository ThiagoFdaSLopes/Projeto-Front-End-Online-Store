import React, { Component } from 'react';
import { Redirect } from 'react-router-dom/cjs/react-router-dom';
import { setLocalItems } from '../services/api';
import logo from '../imgs/logo.svg';

export default class Checkout extends Component {
  state = {
    carrinho: [],
    fullname: '',
    email: '',
    phone: '',
    cpf: '',
    cep: '',
    endereco: '',
    formPgto: '',
    redirect: false,
    isInvalid: false,
  };

  componentDidMount() {
    this.getLocalStorage();
  }

  getLocalStorage = () => {
    const local = JSON.parse(localStorage.getItem('cartItems')) || [];
    this.setState({
      carrinho: local,
    });
  };

  handleChange = ({ target }) => {
    const { value, name } = target;

    this.setState({
      [name]: value,
    });
  };

  handleButton = () => {
    const { fullname, email, phone, cpf, cep, endereco, formPgto } = this.state;
    if (
      fullname
      && email
      && phone
      && cpf
      && cep
      && endereco
      && formPgto
    ) {
      this.setState({
        redirect: true,
      }, () => {
        setLocalItems([]);
        this.setState({
          fullname: '',
          email: '',
          phone: '',
          cpf: '',
          cep: '',
          endereco: '',
          formPgto: '',
        });
      });
    } else {
      this.setState({
        isInvalid: true,
      });
    }
  };

  render() {
    const { carrinho,
      fullname, email, phone, cpf, cep, redirect, isInvalid, endereco } = this.state;

    return (
      <>
        <header className="header-checkout">
          <div className="textos-checkout">
            <img src={ logo } alt="logo front end" />
          </div>
        </header>
        <div>
          {
            carrinho.length === 0
              ? <h1>A lista de produtos está vazia</h1>
              : (
                carrinho.map((e) => (
                  <div key={ e.id }>
                    <div>
                      <img src={ e.thumbnail } alt={ e.title } />
                      <p>{e.title}</p>
                      <p>{`Valor: ${e.price}`}</p>
                    </div>
                  </div>
                )))
          }
        </div>
        <div>
          <form>
            <label htmlFor="fullname">
              Nome completo:
              <input
                type="text"
                data-testid="checkout-fullname"
                name="fullname"
                value={ fullname }
                onChange={ this.handleChange }
              />
            </label>
            <label htmlFor="email">
              Email:
              <input
                type="text"
                data-testid="checkout-email"
                name="email"
                value={ email }
                onChange={ this.handleChange }
              />
            </label>
            <label htmlFor="cpf">
              CPF:
              <input
                type="text"
                data-testid="checkout-cpf"
                name="cpf"
                value={ cpf }
                onChange={ this.handleChange }
              />
            </label>
            <label htmlFor="phone">
              Telefone:
              <input
                type="text"
                data-testid="checkout-phone"
                name="phone"
                value={ phone }
                onChange={ this.handleChange }
              />
            </label>
            <label htmlFor="cep">
              Cep:
              <input
                type="text"
                data-testid="checkout-cep"
                name="cep"
                value={ cep }
                onChange={ this.handleChange }
              />
            </label>
            <label htmlFor="endereco">
              Endereço
              <input
                type="text"
                data-testid="checkout-address"
                name="endereco"
                value={ endereco }
                onChange={ this.handleChange }
              />
            </label>
            <label htmlFor="1">
              Boleto
              <input
                data-testid="ticket-payment"
                type="radio"
                name="formPgto"
                value="Boleto"
                id="1"
                onChange={ this.handleChange }
              />
            </label>
            <label htmlFor="2">
              Visa
              <input
                data-testid="visa-payment"
                type="radio"
                name="formPgto"
                value="Visa"
                id="2"
                onChange={ this.handleChange }
              />
            </label>
            <label htmlFor="3">
              Master Card
              <input
                data-testid="master-payment"
                type="radio"
                name="formPgto"
                value="Master-card"
                id="3"
                onChange={ this.handleChange }
              />
            </label>
            <label htmlFor="4">
              Elo
              <input
                data-testid="elo-payment"
                type="radio"
                name="formPgto"
                value="Elo"
                id="4"
                onChange={ this.handleChange }
              />
            </label>
            <button
              type="button"
              data-testid="checkout-btn"
              onClick={ this.handleButton }
            >
              Enviar
            </button>
          </form>
          {
            redirect && <Redirect to="/" />
          }
          {
            isInvalid && <p data-testid="error-msg">Campos inválidos</p>
          }
        </div>
      </>
    );
  }
}
