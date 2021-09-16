import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  percentStyle: {
      color: '#ffff'
  }
});

const ProgressBar = (props) => {
    const classes = useStyles();

    return (
        <>
            <Box display="flex" alignItems="center">
                <Box width="100%" mr={1}>
                    <LinearProgress variant="determinate" value = {props.progress} />
                </Box>
                <Box minWidth={35}>
                    <Typography className={classes.percentStyle} variant="body2" color="textSecondary">{`${Math.round(
                    props.progress,
                    )}%`}</Typography>
                </Box>
            </Box>
        </>
    )
}

export default ProgressBar;