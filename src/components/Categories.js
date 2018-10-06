import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import LoadReady from './LoadReady'
import Products from './Products'
import Product from './Product'

const CategoriesList = ({categories}) => 
    <div className='row'>
        {Object.keys(categories).map(categoryId => 
            categories[categoryId].father === 0 &&
            <div className='col-md-6 col-sm-12' key={categories[categoryId].id}>
                <Category category={categories[categoryId]} catId={categoryId} />
            </div>  
        )}
    </div>

const ChildCategories = ({categories, match}) => {
    const childCategories = categories[match.params.catId].child

    return (
    <div className='row'>
        {Object.keys(childCategories).map(categoryId =>
          <div className='col-md-6 col-sm-12' key={childCategories[categoryId].id}>
            <Category category={childCategories[categoryId]}  catId={categoryId}/>
          </div>  
        )}
    </div> )
}

const Category = ({category, catId}) => {
    if (typeof category.child !== 'undefined') {
        return (<Link to={`/categorias/${catId}/sub`}>
            <div className='Category-item'>
                {category.image && <img src={'/'+category.image} alt={category.title} />}
                <div className='Category-title'>
                    <h1>{category.title}</h1>
                </div>
            </div>
        </Link>)
    } else {
        return (<Link to={`/categorias/${catId}`}>
            <div className='Category-item'>
                {category.image && <img src={'/'+category.image} alt={category.title} />}
                <div className='Category-title'>
                    <h1>{category.title}</h1>
                </div>
            </div>
        </Link>)
    }
}

class Categories extends Component {

    render(){
        const { data, 
                getProducts,
                getProduct, 
                products, 
                product } = this.props

        return (
            <div className='content'>
                <Route path='/' exact render={ props => 
                    <CategoriesList {...props} categories={data} /> } />

                <Route path='/categorias/:catId' exact render={ props =>
                    <Products {...props} products={products} getProducts={getProducts} />
                } />

                <Route path='/categorias/:catId/sub' render={ props =>
                    <ChildCategories {...props} categories={data} />
                } />                

                <Route path='/produtos/:prodId' render={ props => 
                    <Product {...props} product={product} getProduct={getProduct} /> } />
            </div>)
    }
}

export default LoadReady(Categories)