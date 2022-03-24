import React, { useEffect } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom'
import { Home } from './containers/Home';
import { SignIn } from './containers/signin';
import { SignUP } from './containers/signup';
import PrivateRoute from '../src/components/HOC/privateRoute'
import {  isUserLogin, getAllCategory, getInitialData} from '../src/actions'
import { useDispatch, useSelector } from 'react-redux';
import { Products } from './containers/products';
import { Orders } from './containers/orders';
import { Category } from './containers/Category';

function App(){
  const dispatch = useDispatch();
  const auth = useSelector(state=>state);

  useEffect(() => {
    if (!auth.authReducer.authenticate) {
      dispatch(isUserLogin());
    }
    dispatch(getInitialData())

  }, [])

  return (
    <div className="App">
      <Switch>
        <PrivateRoute path="/" exact component={Home} />
        <PrivateRoute path="/products" component={Products} />
        <PrivateRoute path="/orders" component={Orders} />
        <PrivateRoute path="/categories" component={Category} />

        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUP} />
      </Switch>
    </div>
  );
}

export default App;
