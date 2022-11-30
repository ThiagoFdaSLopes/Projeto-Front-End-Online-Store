import React, { Component } from 'react';
import { Redirect } from 'react-router-dom/cjs/react-router-dom';
import { setLocalItems } from '../services/api';
import logo from '../imgs/logo.svg';
import boleto from '../imgs/boleto.svg';
import visa from '../imgs/visa.svg';
import mastercard from '../imgs/mastercard.svg';
import elo from '../imgs/elo.svg';

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
          <div>
            <img src={ logo } alt="logo front end" />
          </div>
        </header>
        <section className="page-details">
          <div className="thumbnail-details">
            <div className="produt-img">
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
          </div>
          <div className='checkout-form'>
            <form className='form-checkout'>
              <p className='p-formpagamento'>Informações do comprador</p>
              <label htmlFor="fullname">
                <input
                  type="text"
                  data-testid="checkout-fullname"
                  name="fullname"
                  value={ fullname }
                  className="input-text"
                  placeholder="Nome completo"
                  onChange={ this.handleChange }
                />
              </label>
              <label htmlFor="email">
                <input
                  type="text"
                  data-testid="checkout-email"
                  name="email"
                  value={ email }
                  className="input-text"
                  placeholder="Email"
                  onChange={ this.handleChange }
                />
              </label>
              <label htmlFor="cpf">
                <input
                  type="text"
                  data-testid="checkout-cpf"
                  name="cpf"
                  value={ cpf }
                  className="input-text"
                  placeholder="CPF"
                  onChange={ this.handleChange }
                />
              </label>
              <label htmlFor="phone">
                <input
                  type="text"
                  data-testid="checkout-phone"
                  name="phone"
                  value={ phone }
                  className="input-text"
                  placeholder="Telefone"
                  onChange={ this.handleChange }
                />
              </label>
              <label htmlFor="cep">
                <input
                  type="text"
                  data-testid="checkout-cep"
                  name="cep"
                  value={ cep }
                  className="input-text"
                  placeholder="Cep"
                  onChange={ this.handleChange }
                />
              </label>
              <label htmlFor="endereco">
                <input
                  type="text"
                  data-testid="checkout-address"
                  name="endereco"
                  className="input-text"
                  value={ endereco }
                  placeholder="Endereço"
                  onChange={ this.handleChange }
                />
              </label>
              <p className='p-formpagamento'>Forma de pagamento</p>
              <div className='form-pag'>
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
                <img src={ boleto } alt="forma de pagamento boleto" />
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
                <img src={ visa } alt="forma de pagamento visa" />
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
                <img src={ mastercard } alt="forma de pagamento mastercard" />
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
                <img src={ elo } alt="forma de pagamento elo" />
              </label>
              </div>
              <button
                type="button"
                data-testid="checkout-btn"
                onClick={ this.handleButton }
                className="button-checkout"
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
        </section>
      </>
    );
  }
}
