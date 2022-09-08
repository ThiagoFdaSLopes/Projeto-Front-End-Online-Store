import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';

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
              path="/"
              render={
                (props) => <Home { ...props } listaProdutos={ listaProdutos } />
              }
            />
          </Switch>
        </BrowserRouter>
      </div>

    );
  }
}
export default App;
