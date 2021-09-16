import React from "react";
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      //maxWidth: 40,
      //maxHeight: 50
    },
    paper: { 
      '&:hover': {
            background: '#33A8FF !important',
            //filter: 'blur(4px)' 
      },
      background: '#373535',
      //height: 140,
      //width: 100,
      borderRadius: 10,
      padding: theme.spacing(2),
      textAlign: 'center',
      spacing: 0,
    },
    paperSelected:{
      background: '#33A8FF !important',
      borderRadius: 10,
      padding: theme.spacing(2),
      textAlign: 'center',
      spacing: 0,
    },
    name: {
        color: '#ffff',         
        overflow: 'hidden',
        height: 40,
        width: 80
    },
    nameList:{
      color: '#ffff',
      overflow: 'hidden',
      fontWeight: 'bold',
      textAlign: 'left',
      justifyContent: 'left',
      fontSize: 10
    },
    blurHover:{
      '&:hover':{
        backdropFilter: 'blur(4px)'
      }
    }
}));

const LightTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[1],
    fontSize: 20,
  },
}))(Tooltip);

const useItemStyles = () => {
    const classes = useStyles();
    return [classes, LightTooltip];
}

export default useItemStyles;