import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ScreenHome from './ScreenHome';
import ScreenArticlesBySource from './ScreenArticlesBySource';
import ScreenMyArticles from './ScreenMyArticles';
import ScreenSource from './ScreenSource';
import articleWishlist from './reducers/article';
import sessionUser from './reducers/users';


import { Provider } from 'react-redux';

import { createStore, combineReducers } from 'redux';

const store = createStore(combineReducers({articleWishlist, sessionUser}));

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/" exact component={ScreenHome} />
          <Route path="/ScreenMyArticlesBySources/:id" component={ScreenArticlesBySource} />
          <Route path="/ScreenMyArticles" component={ScreenMyArticles} />
          <Route path="/ScreenSource" component={ScreenSource} />
        </Switch>
      </Router>
    </Provider>);
}

export default App;
