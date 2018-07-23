import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import LoadReady from './LoadReady'

const Product = (product) => {
    return (<div>
            <h1>{product.title}</h1>
            
            {console.log(product)}
        </div>)
}

const ProductsList = ({products}) => products.map( product => <Product product={product} key={product.id} /> )

class Products extends Component {
    componentDidMount() {
        const {match, getProducts} = this.props
        getProducts(match.params.catId)     
    }

    render(){
        const {products} = this.props
        return (<div className='row'>
                {products.length ? <ProductsList products={products} /> : <p>Nenhum produto cadastrado!</p>}
            </div>)
    }
}

export default Products