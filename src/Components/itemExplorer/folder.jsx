import React, {useContext} from 'react'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';

import folder from "../assets/img/folder.png";
import {Typography} from '@material-ui/core';
import useItemStyles from '../hooks/useItemStyles';
import FileContext from '../../context/File/FileContext';


const FolderItem = (props) => {
    const fileContext = useContext(FileContext);
    const [classes, LightTooltip ] = useItemStyles();
    return(
        <Grid className = {classes.root} container alignContent = "center" alignItems = "center">
            <Box m = {1/4} onClick = {(e) => props.handleClick(props.name)}>
                <LightTooltip title = {props.name}>
                    <Paper  className = {fileContext.selectedItem && fileContext.selectedItem.name === props.name ? classes.paperSelected: classes.paper}>
                        <div className={classes.blurHover}/>
                        <div>
                            <Grid item>
                                <img src={folder} width = "80" />
                            </Grid>
                            <Grid className = {classes.name} alignItems = "center" item>
                                <Typography variant = "h6">{props.name}</Typography>
                            </Grid>                    
                        </div>
                    </Paper>
                </LightTooltip>
            </Box>
        </Grid>
    )
}

export default FolderItem;