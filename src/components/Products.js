import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import LoadReady from './LoadReady'

const Product = ({product}) => {
    return (<div className='Product-item col-md-4 col-sm-12'>        
                <h4 className='text-center'>{product.title}</h4>
                <div className='row'>
                    <div className='col-md-8 col-sm-12'>
                        <p className='ingredients'>{product.ingredients}</p>
                    </div>
                    <div className='col-md-4 col-sm-12'>
                        {product.price && <p className="price">R$ {product.price}</p>}
                    </div>
                </div>
        </div>)
}

const ProductsList = ({products}) => products.map( product => <Product product={product} key={product.id} /> )

class Products extends Component {
    constructor(props){
        super(props)
        this.state = {
            'produtos': []
        }
    }

    componentDidMount() {
        const {match} = this.props
        
        //getProducts(match.params.catId)     
    }

    render(){
        const products = []
        return (<div className='row'>
                {products.length ? <ProductsList products={products} /> : <p>Nenhum produto cadastrado!</p>}
            </div>)
    }
}

export default Products