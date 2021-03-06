import React from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import BaseMenu from './Menu'

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
      top: 'auto',
      bottom: 0,
    }
  };

const Header = (props) => {
    const { classes} = props;
    
    return (
        <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <BaseMenu/>  
          <Typography variant="h5" color="inherit" className={classes.grow}>
            Vianna's Sandubaria
          </Typography>
        </Toolbar>
      </AppBar>        
    )
}

Header.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Header)