import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { unregister } from './registerServiceWorker';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { rootReducer } from './store/reducers/root';
import { StoreState } from './types';

// for redux devtools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore<StoreState, any, any, any>(rootReducer, composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(<Provider store = {store}><App /></Provider>, document.getElementById('root'));
// registerServiceWorker();

unregister();
