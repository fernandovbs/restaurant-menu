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
    
      api.query(Prismic.Predicates.at('document.type', 'categorias')).then(response => {
    
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
  getProducts(catId){
    Prismic.api(this.apiEndpoint).then(api => {    
      api.query(Prismic.Predicates.at('document.type', 'produtos')).then(response => {
      
        response && this.setState({
          products: response.results.filter( produto => produto.data.categoria.uid === catId )
        })
      
      })
    })   
  }

  getProduct(prodKey){
      this.setState({
        'product': this.state.products.filter( produto => produto.uid === prodKey )[0]
    })
  }

  render() {
    const { classes } = this.props;

    return (
      <Router>
        <Paper  className={classes.root}>
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
