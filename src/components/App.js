import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import withRoot from '../withRoot';
import Paper from '@material-ui/core/Grid'

//import './../App.css';
import { BrowserRouter as Router } from "react-router-dom"
//import { database } from './../firebase'

import Categories from './Categories'

import Prismic from 'prismic-javascript'


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
    this.clearProducts = this.clearProducts.bind(this)    
    this.clearProduct = this.clearProduct.bind(this)        
    this.getProduct = this.getProduct.bind(this)
    
    this.apiEndpoint = 'https://vianna-sandubaria.prismic.io/api/v2';
    
    this.state = {
      'categories': {},
      'categorie': {},
      'products': [],
      'product': {},
    }
  }
/*
  linkResolver(doc) {
    if (doc.type === 'categorias') {
      return '/categorias/' + doc.uid;
    } else if (doc.type === 'produtos') {
      return '/produtos/' + doc.uid
    }

    return '/'
  }
*/
	
  componentDidMount() {
	    
    Prismic.api(this.apiEndpoint).then(api => {
    
      api.query(Prismic.Predicates.at('document.type', 'categorias'), { pageSize : 600 }).then(response => {
    
        if (response) {
          this.setState({ categories: response.results });
    
        }
    
      });
    
    });
  }  
/*
  componentDidMount(){
    const rootRef = database().ref().child('categorias')
    rootRef.on('value', snap => {
      this.setState({
        categories: snap.val()
      })
    })
  }
*/
  clearProducts(){
    this.setState({
          products: [],
        })   
  }

  clearProduct(){
    this.setState({
          product: {},
        })
  }

  getProducts(catId){
    const [categoria] = this.state.categories.filter(categorie => categorie.uid === catId)
    
    Prismic.api(this.apiEndpoint).then(api => {    
      api.query([Prismic.Predicates.at('document.type', 'produtos'),Prismic.Predicates.at('my.produtos.categoria', categoria.id)], 
        { pageSize : 600 }).then(response => {
      
        if (response) {
           let products = response.results.filter( produto => produto.data.categoria.uid === catId )

           if (products.length === 0) {
            this.setState({
              products: [{id: 'none'}]
            })            
          } else {
            this.setState({
              products: products
            })
          }
        }
      })
    })   
  }

  getProduct(prodKey){
    Prismic.api(this.apiEndpoint).then(api => {    
      api.getByUID('produtos', prodKey).then(response => {      
        if (response) {
          this.setState({
            'product': response
          })        
        }    
      })
    })
  }
  
  render() {
    const { classes } = this.props;

    return (
      <Router>
        <Paper  className={classes.root}>
          <Categories data={this.state.categories} 
            getProducts={this.getProducts}
            clearProducts={this.clearProducts}
            clearProduct={this.clearProduct}
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
