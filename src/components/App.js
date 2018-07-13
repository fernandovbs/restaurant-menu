import React, { Component } from 'react';
import logo from './../images/logo.svg';
import './../App.css';
import Header from './Header'

class App extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <Header logo={logo} />
        </div>
      </div>
    );
  }
}

export default App;
