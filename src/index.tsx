/* istanbul ignore file */
import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from "react-redux";
import './normalize.css';
import './index.css';
import App from './App';
import { setupStore } from './app/store';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot((window as any).document.getElementById('root'));
root.render(
  <React.StrictMode>
      <Provider store={setupStore()}>
          <App />
      </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
