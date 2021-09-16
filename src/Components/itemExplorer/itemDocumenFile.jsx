
import React, {useContext} from 'react'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import {Typography} from '@material-ui/core';
import useItemStyles from '../hooks/useItemStyles';
import FileContext from '../../context/File/FileContext';
import file from "../assets/img/singlefile.png";

const DocumentItemList = (props) => {
    const fileContext = useContext(FileContext);
    const [classes, LightTooltip ] = useItemStyles();
    return(
        <Grid justifyContent="center" className = {classes.root} container alignContent = "flex-start" alignItems = "strech">
            <div >
                <LightTooltip title = {props.name}>
                    <Grid alignItems="stretch" item xs = {12} container>
                        <Paper style={{width: '155vh'}} className = {fileContext.selectedItem && fileContext.selectedItem.name === props.name ? classes.paperSelected: classes.paper}>
                            <div className={classes.blurHover}/>
                            <Grid container spacing={4} direction="row" justifyContent="flex-start" alignItems="center">
                                <Grid item xs={3}>
                                    <img src={file} width = "80" />
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

export default DocumentItemList;
