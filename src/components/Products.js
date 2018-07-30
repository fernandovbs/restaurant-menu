import React, { Component } from 'react'
import { Link } from 'react-router-dom'

const Product = ({product, productKey}) => {
    return (<div className='col-md-6 col-sm-12'>
            <Link to={`/produtos/${productKey}`}>
                <div className='Product-item '>        
                    <h4 className='text-center'>{product.title}</h4>
                    <div className='row'>
                        <div className='col-md-8 col-sm-12'>
                            <p className='ingredients'>{product.ingredients}</p>
                        </div>
                        <div className='col-md-4 col-sm-12'>
                            {product.price && <p className="price">R$ {product.price}</p>}
                        </div>
                    </div>
                </div>
            </Link>
        </div>)
}

const ProductsList = ({products}) => Object.keys(products).map( productKey => 
    <Product product={products[productKey]} productKey={productKey} key={products[productKey].id} /> 
)

class Products extends Component {

    componentDidMount() {
        const {match, getProducts} = this.props
        getProducts(match.params.catId)
    }

    render(){
        return (<div className='row'>
                {Object.keys(this.props.products).length ? <ProductsList products={this.props.products} /> : 
                <div className='notFound'><h5>Nenhum produto cadastrado!</h5></div>}
            </div>)
    }
}

export default Products