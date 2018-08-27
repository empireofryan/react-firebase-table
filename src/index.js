import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import PhoneList from './PhoneList'
// import App from './App';
// import TableExample from './TableExample';
import registerServiceWorker from './registerServiceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();
// ReactDOM.render(<TableExample />, document.getElementById('root'));
// registerServiceWorker();
ReactDOM.render(<PhoneList />, document.getElementById('root'));
registerServiceWorker();