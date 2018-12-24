import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.js';
import { unregister } from './registerServiceWorker';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { rootReducer } from './store/reducers/root';

const store = createStore(rootReducer);

ReactDOM.render(<Provider store = {store}><App /></Provider>, document.getElementById('root'));
// registerServiceWorker();

unregister();
