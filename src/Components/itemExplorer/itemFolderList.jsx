import React, {useContext} from 'react'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';

import folder from "../assets/img/folder.png";
import {Typography} from '@material-ui/core';
import useItemStyles from '../hooks/useItemStyles';
import FileContext from '../../context/File/FileContext';


const FolderItemList = (props) => {
    const fileContext = useContext(FileContext);
    const [classes, LightTooltip ] = useItemStyles();
    return(
        <Grid justifyContent="center" className = {classes.root} container alignContent = "flex-start" alignItems = "strech">
            <div onClick = {(e) => props.handleClick(props.name)}>
                <LightTooltip title = {props.name}>
                    <Grid alignItems="stretch" item xs = {12} container>
                        <Paper style={{width: '155vh'}} className = {fileContext.selectedItem && fileContext.selectedItem.name === props.name ? classes.paperSelected: classes.paper}>
                            <div className={classes.blurHover}/>
                            <Grid container spacing={4} direction="row" justifyContent="flex-start" alignItems="center">
                                <Grid item xs={3}>
                                    <img src={folder} width = "80" />
                                </Grid>
                                <Grid className = {classes.nameList} alignItems = "left" justifyContent="left" item xs={9}>
                                    <Typography variant = "h6">{props.name}</Typography>
                                </Grid>                    
                            </Grid>
                        </Paper>
                    </Grid>
                </LightTooltip>
            </div>
        </Grid>
    )
}

export default FolderItemList;