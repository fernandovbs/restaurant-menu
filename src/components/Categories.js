import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import LoadReady from './LoadReady'
import Products from './Products'

const CategoriesList = ({categories}) => 
    <div className='row'>
        {categories.map(category => 
          <div className='col-6' key={category.id}>
            <Category category={category} />
          </div>  
        )}
    </div>

const Category = ({match, category}) => {

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
        const { data } = this.props
        return (
            <div className='content'>
                <Route path='/' exact render={ props => <CategoriesList {...props} categories={data} /> } />
                <Route path='/categorias/:catId' render={ props => 
                    <Products {...props} getProducts={this.props.getProducts} products={this.props.products} /> }
                />
            </div>)
    }
}

export default LoadReady(Categories)