import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import withRoot from '../withRoot';
import Paper from '@material-ui/core/Grid'

import logo from './../images/logo.png';
//import './../App.css';
import { BrowserRouter as Router } from "react-router-dom"
import { database } from './../firebase'

import Header from './Header'
import Categories from './Categories'


const styles = theme => ({
  root: {
    textAlign: 'center',
    paddingBottom: 50,
    },
});


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
    const rootRef = database().ref().child('categorias')
    rootRef.on('value', snap => {
      this.setState({
        categories: snap.val()
      })
    })
  }

  getProducts(catId){
    const rootRef = database().ref().child('produtos')
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
    const { classes } = this.props;

    return (
      <Router>
        <Paper  className={classes.root}>
          <Header logo={logo} />
          <Categories data={this.state.categories} 
            getProducts={this.getProducts}
            getProduct={this.getProduct} 
            products={this.state.products} 
            product={this.state.product} />
        </Paper>  
  </Router>
    )
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(App));
