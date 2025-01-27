import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ProductList from './ProductList';
import ProductDetails from './ProductDetails';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/products" component={ProductList} />
        <Route path="/products/:id" component={ProductDetails} />
      </Switch>
    </Router>
  );
};

export default App;
