import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import ShopCart from './pages/ShopCart';
import ProductDetails from './pages/ProductDetails';

class App extends React.Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route
              exact
              path="/"
              component={ Home }
            />
            <Route
              path="/ShopCart"
              component={ ShopCart }
            />
            <Route path="/productDetails/:id" component={ ProductDetails } />
          </Switch>
        </BrowserRouter>
      </div>

    );
  }
}
export default App;
