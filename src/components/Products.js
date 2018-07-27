import React, { Component } from 'react'
import * as firebase from 'firebase'

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
        const rootRef = firebase.database().ref().child('produtos')
        rootRef.on('value', snap => {
            const produtos = snap.val()
            this.setState({
                produtos: Object.keys(produtos).reduce((produtosCategoria, produtoId) => 
                    {
                        produtos[produtoId].category == match.params.catId && produtosCategoria.push(produtos[produtoId])
                        return produtosCategoria
                    }, 
                [])
          })
          console.log(this.state.produtos)
        })

        //getProducts(match.params.catId)     
    }

    render(){
        return (<div className='row'>
                {this.state.produtos.length ? <ProductsList products={this.state.produtos} /> : <p>Nenhum produto cadastrado!</p>}
            </div>)
    }
}

export default Products