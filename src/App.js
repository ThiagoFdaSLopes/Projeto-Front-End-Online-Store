import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import ShopCart from './pages/ShopCart';

class App extends React.Component {
  state = {
    listaProdutos: [],
  };

  render() {
    const { listaProdutos } = this.state;
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route
              exact
              path="/"
              render={
                (props) => <Home { ...props } listaProdutos={ listaProdutos } />
              }
            />
            <Route
              path="/ShopCart"
              component={ ShopCart }
            />
          </Switch>
        </BrowserRouter>
      </div>

    );
  }
}
export default App;
