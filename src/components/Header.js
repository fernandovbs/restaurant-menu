import React from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ArrowBackIos from '@material-ui/icons/ArrowBackIos';
import BaseMenu from './Menu'
import { withRouter } from 'react-router-dom'
import IconButton from '@material-ui/core/IconButton';

const styles = {
    root: {
      flexGrow: 1,
    },
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginLeft: -12,
      marginRight: 20,
      fontSize: 18,
    },
    appBar: {
      marginBottom: 10,
    },
    arrowButton: {
      marginLeft: -12,
      marginRight: 20,
      fontSize: 18,      
    },
  };


const Header = (props) => {
    const { classes, categories, location, history } = props;
    return (
        <AppBar position="static" className={classes.appBar}>
        <Toolbar>
        {(location.pathname && location.pathname !== '/') && (<div>
            <IconButton color="inherit" aria-label="Voltar"  className={classes.arrowButton} 
            aria-haspopup="false" onClick={() => {history.goBack()}}>
              <ArrowBackIos />
            </IconButton>
          </div>
        )}
        <Typography variant="h5" color="inherit" className={classes.grow}>
            Vianna's Sandubaria
          </Typography>
          <BaseMenu categories={categories} location={location} />  
        </Toolbar>
      </AppBar>        
    )
}

Header.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withRouter(withStyles(styles)(Header))