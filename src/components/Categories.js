import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import LoadReady from './LoadReady'
import Products from './Products'
import Product from './Product'

const CategoriesList = ({categories}) => 
    <div className='row'>
        {Object.keys(categories).map(categoryId => 
          <div className='col-md-6 col-sm-12' key={categories[categoryId].id}>
            <Category category={categories[categoryId]} />
          </div>  
        )}
    </div>

const Category = ({category}) => {

    return (<Link to={`categorias/${category.id}`}>
                <div className='Category-item'>
                    {category.image && <img src={category.image} alt={category.title} />}
                    <div className='Category-title'>
                        <h1>{category.title}</h1>
                    </div>
                </div>
            </Link>)
}

class Categories extends Component {

    render(){
        const { data, getProducts, getProduct, products, product } = this.props
        return (
            <div className='content'>
                <Route path='/' exact render={ props => 
                    <CategoriesList {...props} categories={data} /> } />

                <Route path='/categorias/:catId' render={ props =>
                    <Products {...props} products={products} getProducts={getProducts} /> } />

                <Route path='/produtos/:prodId' render={ props => 
                    <Product {...props} product={product} getProduct={getProduct} /> } />
            </div>)
    }
}

export default LoadReady(Categories)