import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles';
import { RichText } from 'prismic-reactjs'
import { ProductVariations } from './Product'

const styles = theme => ({
    grid: {
        paddingTop: theme.spacing.unit * 2,
    },
    media: {
        height: 140,
    },
})


class ProductComponent extends Component {
    constructor(props){
        super(props)

        this.handleRedirect = this.handleRedirect.bind(this)

        this.history = this.props.history
        this.link = `/produtos/${this.props.productKey}`
    }

    handleRedirect(){
        this.history.push(this.link)
    }

    render(){
        const {product, classes} = this.props

        return (
            <Grid item xs={12} sm={6}>
                <Card color="secondary" elevation={5} className={classes.card}>
                    <CardActionArea onClick={this.handleRedirect}>        
                        <CardContent> 
                            <Typography variant="h5">{RichText.asText(product.data.titulo)}</Typography>
                            <Grid container spacing={16} className={classes.grid}>
                                <Grid item xs={12} sm={12}>
                                    <Typography variant="subtitle1" className='ingredients'>{
                                        product.data.ingredientes.map(
                                            ingrediente => ingrediente.ingrediente
                                        ).join(', ')
                                    }</Typography>
                                    <ProductVariations variations={product.data.variacoes} />
                                </Grid>
                            </Grid>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Grid>
        )
    }
}


const Product = withRouter(withStyles(styles)(ProductComponent))

const ProductsList = ({products}) => products.map( product => 
    <Product product={product} productKey={product.uid} key={product.uid} /> 
)

class Products extends Component {
    constructor(props){
        super(props)
        this.state = {location: this.props.location.pathname}
    }

    componentDidMount(){
        const {match, getProducts} = this.props
        getProducts(match.params.catId)
    }
    
    componentDidUpdate(){
        if (this.state.location !== this.props.location.pathname) {
            const {match, getProducts} = this.props
            this.setState({location: this.props.location.pathname})
            getProducts(match.params.catId)            
        }
    }

    render(){
        const classes = this.props.classes

        if (this.props.products.length) {
            if (this.props.products[0].id !== 'none') {
                return (<Fragment>
                    <ProductsList products={this.props.products} />
                </Fragment>)    
            } else {
                return <Grid item xs={12}>
                    <Card color="secondary" elevation={5} className={classes.card}>
                     <CardContent>
                            <Typography variant="h5">Nenhum produto disponível nesta categoria</Typography>
                        </CardContent>
                    </Card>        
                </Grid>
            }
        } else {
            return <Grid item xs={12}>
                <Card color="secondary" elevation={5} className={classes.card}>
                    <CardContent>
                        <Typography variant="h5">Carregando...</Typography>
                    </CardContent>
                </Card>        
            </Grid>
        }
    }
}

export default withRouter(withStyles(styles)(Products))