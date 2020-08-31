import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route
} from "react-router-dom";
import Menu from '../Menu/Menu'
import { Container, Box } from '@material-ui/core';
import Home from '../../Views/Home/Home'
import Product from '../../Views/Product/Product'
import Bag from '../../Views/Bag/Bag'

const Router: React.FC = function({children}) {
  return (
    <BrowserRouter>
      <Menu />
      <Container>
        <Switch>
          <Route path="/bag">
            <Bag />
          </Route>
          <Route path="/products/:productId">
            <Product />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Container>

    </BrowserRouter>
  );
}

export default Router;
