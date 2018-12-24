import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.js';
import { unregister } from './registerServiceWorker';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { rootReducer } from './store/reducers/root';

const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(<Provider store = {store}><App /></Provider>, document.getElementById('root'));
// registerServiceWorker();

unregister();
