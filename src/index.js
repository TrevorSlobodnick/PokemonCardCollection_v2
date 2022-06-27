import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ToastContainer, Slide } from 'react-toastify';

ReactDOM.render(
  <React.StrictMode>
    <App />
    <ToastContainer
        position="bottom-center"
        autoClose={2000}
        hideProgressBar={true}
        closeOnClick={true}
        pauseOnHover={true}
        draggable={false}
        pauseOnFocusLoss={false}
        transition={Slide}
        theme='colored'
        icon={true}
     />
  </React.StrictMode>,
  document.getElementById('root')
);
