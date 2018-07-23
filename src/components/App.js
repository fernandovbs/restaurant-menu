import React, { Component } from 'react';
import logo from './../images/logo.png';
import './../App.css';
import { BrowserRouter as Router } from "react-router-dom"

import Header from './Header'
import apis from './../Apis'
import Categories from './Categories'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      'categorias': [],
      'produtos': []
    }
  }

  componentDidMount(){
    this.getCategories()
  }

  getCategories = () => {
    apis.getCategorias()
    .then(resp => {
      this.setState({categorias: resp.data})
    })
  }

  getProducts = (catId) => {
    apis.getProdutos(catId)
    .then(resp => {
      this.setState({produtos: resp.data})
    })
  }  

  render() {
    return (
      <Router>
        <div className='container fixed-width'>
          <Header logo={logo} />
            <Categories data={this.state.categorias} getProducts={this.getProducts} products={this.state.produtos}/>
        </div>
      </Router>
    )
  }
}

export default App;
