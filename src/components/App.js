import React, { Component } from 'react';
import logo from './../images/logo.png';
import './../App.css';
import { BrowserRouter as Router } from "react-router-dom"
import * as firebase from 'firebase'

import Header from './Header'
import Categories from './Categories'

class App extends Component {
  constructor(props){
    super(props) 
       
    this.getProducts = this.getProducts.bind(this)
    this.getProduct = this.getProduct.bind(this)

    this.state = {
      'categories': {},
      'categorie': {},
      'products': [],
      'product': {}
    }
  }

  componentDidMount(){
    const rootRef = firebase.database().ref().child('categorias')
    rootRef.on('value', snap => {
      this.setState({
        categories: snap.val()
      })
    })
  }

  getProducts(catId){
    const rootRef = firebase.database().ref().child('produtos')
    rootRef.on('value', snap => {
        const produtos = snap.val()
        this.setState({
            products: Object.keys(produtos).reduce((produtosCategoria, produtoId) => 
                {
                    if (produtos[produtoId].category === Number(this.state.categories[catId].id)) produtosCategoria[produtoId] = produtos[produtoId]
                    return produtosCategoria
                }, 
            [])
      })
    })
  }  

  getProduct(prodKey){
    this.setState({'product': this.state.products[prodKey]})
  }

  render() {
    return (
      <Router>
        <div className='container fixed-width app'>
          <Header logo={logo} />
            <Categories data={this.state.categories} 
              getProducts={this.getProducts}
              getProduct={this.getProduct} 
              products={this.state.products} 
              product={this.state.product} />
        </div>
      </Router>
    )
  }
}

export default App;
