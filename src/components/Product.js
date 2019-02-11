import React, { Component, Fragment } from 'react'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import DoneIcon from '@material-ui/icons/Done';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Divider from '@material-ui/core/Divider';
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
    grid: {
        paddingTop: theme.spacing.unit * 2,
    },
    media: {
        height: 140,
    },
    chip: {
      margin: theme.spacing.unit,
    },
    divider: {
        margin: `${theme.spacing.unit * 2}px 0px`,
    }
})

const ProductDetails = withStyles(styles)(({product, classes}) => 
    <Card color="secondary" elevation={5} className={classes.card}>
        <CardContent> 
            <Typography variant="h4" className='productTitle'>{product.title}</Typography>
            <Typography variant="subtitle1" className='product-description'>{product && product.description}</Typography>        

            <Divider variant="middle" className={classes.divider}/>

            {product.ingredients && 
                <ProductIngredients ingredients={product.ingredients.split(',')}/>}

            <Divider variant="middle" className={classes.divider}/>    

            {product.variations && <ProductVariations variations={product.variations} />}
        </CardContent>
    </Card>)

const ProductIngredients = withStyles(styles)(({ingredients, classes}) => 
<Fragment> 
    <Typography variant="h5">Ingredientes</Typography>
    {ingredients.map((ingredient, key) => 
        <Chip key={key}
            avatar={<Avatar>VS</Avatar>}
            label={ingredient}
            clickable
            className={classes.chip}
            color="primary"
            onDelete={()=> true}
            deleteIcon={<DoneIcon />}
        />
    )}
</Fragment>)


const ProductVariations = withStyles(styles)(({variations, classes}) => 
    <Fragment> 
        <Typography variant="h5">Opções</Typography>
        <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Tamanho</TableCell>
            <TableCell>Preço</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            {variations.map((variation, key) => 
                <TableRow key={key}>
                    <TableCell component="th" scope="row">
                        {variation.title}
                    </TableCell>
                    <TableCell component="th" scope="row">
                    R${variation.price}
                    </TableCell>
                </TableRow>
            )}
        </TableBody>
        </Table>
        <ul>
        </ul>
    </Fragment>)

class Product extends Component{

    componentDidMount(){
        const {match} = this.props
        this.props.getProduct(match.params.prodId)
    }

    render(){
        const {product} = this.props

        return (
            <Grid item xs={12}>
                {product && <ProductDetails product={product} />} 
            </Grid>
        )
    }
}

export default Product