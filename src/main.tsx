import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { CounterProvider } from './contexts/CounterContext';
import { initialState } from './contexts/CounterContext';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <CounterProvider count={initialState.count} text={initialState.text}>
      <App />
    </CounterProvider>
  </React.StrictMode>
);
