import React, {useContext, useEffect, useState} from "react";
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Tooltip from '@material-ui/core/Tooltip';
import Fade from '@material-ui/core/Fade';
import { useHistory, useParams } from "react-router-dom";
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import ListIcon from '@material-ui/icons/List';
import ViewComfyIcon from '@material-ui/icons/ViewComfy';

import goup from "./assets/img/goup.png";
import refresh from "./assets/img/refresh.png";
import viewtype from "./assets/img/viewtype.png";
import newfolder from "./assets/img/newfolder.png";
import upload from "./assets/img/upload.png";
import cancel from "./assets/img/cancel.png";
import paste from "./assets/img/paste.png";
import copy from "./assets/img/copy.png";
import cut from "./assets/img/cut.png";
import rename from "./assets/img/rename.png";
import unselect from "./assets/img/unselect.png";
import deleteIcon from "./assets/img/delete.png";

import FileContext from "../context/File/FileContext";

const LightTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[1],
    fontSize: 15,
  },
}))(Tooltip);

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  colorLastRoute: {
      fontSize: 20,
      color: '#2C98F8'
  },
  buttonRoutes: {
      color: '#F37D06 !important',
      borderRadius: 7,
      fontSize: 15,
      background: 'rgba(243, 125, 6, 0.3)',
      '&:hover':{
        background: 'rgba(243, 125, 6, 0.2)',
      }
  },
  colorSeparator: {
      color: '#C9C9C9'
  }
}));

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

const BarComponent = (props) => {

    const [anchorEl, setAnchorEl] = useState(null);

    const classes = useStyles();
    const history = useHistory();
    const {path} = useParams();

    const fileContext = useContext(FileContext);

    const handleClickView = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseView = () => {
        setAnchorEl(null);
    };

    const handleClickItemView = (type) => {
        console.log(type);
        fileContext.setViewType(type);
    }

    const handleClickRootBar = (index) => {
        let elements = path.split('|');
        let newPath = '';
        for (let i = 0; i <= index; i++){
            newPath += elements[i];
            if (i < index) newPath += '|';
        }
        history.push(newPath);
    }

    useEffect(() => {
        console.log(path.split('|'));
    })

    return(
        <>
            {!fileContext.selectedItem ?
                <Fade in = {!fileContext.selectedItem}>
                    <Grid container justifyContent="center">
                        <Box m= {1}>
                            <LightTooltip title = "Go Up" >
                                <Button onClick = {props.goUpClick} variant="outlined" color="primary">
                                    <img src = {goup} width = "30"/>
                                </Button>
                            </LightTooltip>
                        </Box>
                        <Box m = {1}>
                            <LightTooltip title = "Refresh" >
                                <Button onClick = {props.refreshClick} variant="outlined" color="primary">
                                    <img src = {refresh} width = "30"></img>
                                </Button>
                            </LightTooltip>
                        </Box>
                        <Box m = {1}>
                            <LightTooltip title = "View type" >
                                <Button variant="outlined" color="primary" onClick={handleClickView}>
                                    <img src = {viewtype} width = "40"></img>
                                </Button>
                            </LightTooltip>
                                <StyledMenu
                                    id="customized-menu"
                                    anchorEl={anchorEl}
                                    
                                    open={Boolean(anchorEl)}
                                    onClose={handleCloseView}
                                >
                                    <StyledMenuItem onClick = {(e) => {handleClickItemView(1)}}>
                                        <ListItemIcon>
                                            {/* <img src = {mosaic} width = "30"></img> */}
                                            <ViewComfyIcon fontSize="medium"/>
                                        </ListItemIcon>
                                        <ListItemText primary="Mosaic View" />
                                    </StyledMenuItem>
                                    <StyledMenuItem onClick = {(e) => {handleClickItemView(2)}}>
                                        <ListItemIcon>
                                            {/* <img src = {list} width = "30"></img> */}
                                            <ListIcon fontSize="medium"/>
                                        </ListItemIcon>
                                        <ListItemText primary="List View" />
                                    </StyledMenuItem>
                                </StyledMenu>
                        </Box>
                        <Box m = {1}>
                            <LightTooltip title = "New Folder" >
                                <Button onClick = {props.clickFolder} variant="outlined" color="primary">
                                    <img src = {newfolder} width = "40"></img>
                                </Button>
                            </LightTooltip>
                        </Box>
                        <Box m = {1}>
                            <LightTooltip title = "Upload" >
                                <Button variant="outlined" color="primary" onClick = {props.clickUpload}>
                                    <img src = {upload} width = "40"></img>
                                </Button>
                            </LightTooltip>
                        </Box>
                    </Grid>
                </Fade>
            :
                <div>
                    {!fileContext.clipBoard ? 
                    <Fade in = {!fileContext.clipBoard}>
                        <Grid container justifyContent="center">
                            <Box m = {1}>
                                <LightTooltip title = "Copy" >
                                    <Button onClick = {props.copy} variant="outlined" color="primary" >
                                        <img src = {copy} width = "30"></img>
                                    </Button>
                                </LightTooltip>
                            </Box>
                            <Box m = {1}>
                                <LightTooltip title = "Move" >
                                    <Button onClick = {props.move} variant="outlined" color="primary" >
                                        <img src = {cut} width = "30"></img>
                                    </Button>
                                </LightTooltip>
                            </Box>
                            <Box m = {1}>
                                <LightTooltip title = "Rename" >
                                    <Button onClick = {props.rename} variant="outlined" color="primary" >
                                        <img src = {rename} width = "30"></img>
                                    </Button>
                                </LightTooltip>
                            </Box>
                            <Box m = {1}>
                                <LightTooltip title = "Delete" >
                                    <Button onClick = {props.delete} variant="outlined" color="primary" >
                                        <img src = {deleteIcon} width = "30"></img>
                                    </Button>
                                </LightTooltip>
                            </Box>
                            <Box m = {1}>
                                <LightTooltip title = "Unselect" >
                                    <Button variant="outlined" color="primary" onClick = {props.unSetItem}>
                                        <img src = {unselect} width = "30"></img>
                                    </Button>
                                </LightTooltip>
                            </Box>
                        </Grid>
                    </Fade>
                :
                        <Fade in = {fileContext.clipBoard}>
                            <Grid container justifyContent="center">
                                <Box m = {1}>
                                    <LightTooltip title = "Cancel" >
                                        <Button onClick = {props.cancel} variant="outlined" color="primary" >
                                            <img src = {cancel} width = "30"></img>
                                        </Button>
                                    </LightTooltip>
                                </Box>
                                <Box m = {1}>
                                    <LightTooltip title = "Paste" >
                                        <Button onClick = {props.paste} variant="outlined" color="primary" >
                                            <img src = {paste} width = "30"></img>
                                        </Button>
                                    </LightTooltip>
                                </Box>
                            </Grid>
                        </Fade>
                }
                </div>                
            }
            <Grid container justifyContent = "center" alignContent = "center" alignItems = "center">
                <Grid item>
                    <Breadcrumbs separator={<NavigateNextIcon className = {classes.colorSeparator} fontSize="small" />} aria-label="breadcrumb">
                        {path.split('|').map((element, index) =>
                            <div key = {index}>
                                {index !== path.split('|').length-1 ? 
                                    <Button onClick = {(e) => handleClickRootBar(index)} className = {classes.buttonRoutes} color = "primary">
                                        {element}
                                    </Button>
                                : 
                                <Typography variant = "button" className = {classes.colorLastRoute} color="textPrimary">{element}</Typography>}
                            </div> 
                        )}
                    </Breadcrumbs>
                </Grid>
            </Grid>
        </>
    )
}

export default BarComponent;