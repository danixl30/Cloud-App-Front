import React from "react";
import Backdrop from '@material-ui/core/Backdrop';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Grid from '@material-ui/core/Grid';
import SaveIcon from '@material-ui/icons/Save';
import ProgressBar from "../common/progressBar";



const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  paper: {
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    borderRadius: 10,
    backgroundColor: '#161616',
  },
  previewTitle: {
      color: '#ffff'
  },
  modalContent: {
    backgroundColor: '#161616',
    padding: theme.spacing(1)
  },
  modalTitle: {
    color: '#ffff',
    fontWeight: 'bold' 
  },
  itemGridModal: {
    alignItems: 'center',
    textAlign: 'center'
  },
  btnCommon:{
      fontWeight: 'bold',
      boder: '3px solid'
  }
}));

const ModalFile = (props) => {
    const classes = useStyles();

    return(
        <>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={true}
                onClose={props.onClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                timeout: 500,
                }}
            >
                <Fade in={true}>
                    <div className = {classes.paper}>
                        <Grid container justifyContent = "center" className = {classes.modalContent} spacing={2}>
                            <Grid className={classes.itemGridModal} alignItems="center" xs = {8} item>
                                <Typography className={classes.modalTitle} variant="h4" gutterBottom>
                                    Upload a file 
                                </Typography>                                
                            </Grid>
                            <Grid className={classes.itemGridModal} alignItems="center" xs={8} item>
                                <input style={{display: 'none'}} multiple type = "file" id="contained-button-file" onChange = {props.onChange} /> 
                                <label htmlFor="contained-button-file">
                                    <Button variant="contained" color="primary" component="span" startIcon={<SaveIcon />}>
                                        Choose a file
                                    </Button>
                                </label>                                
                            </Grid>            
                            {props.fileName && 
                                <Grid className={classes.itemGridModal}alignItems="center" xs={8} item>
                                    <Typography className={classes.previewTitle} variant = "body1" gutterBottom>
                                        {props.fileName.name}
                                    </Typography>
                                </Grid>
                            }
                            <Grid className={classes.itemGridModal}alignItems="center" xs={8} item>
                                <Button className={classes.btnCommon} onClick = {props.upload} variant="outlined" color="primary" startIcon={<CloudUploadIcon />}>
                                    Upload 
                                </Button>
                            </Grid>                            
                            <Grid className={classes.itemGridModal}alignItems="center" xs={8} item>
                                {props.percent && <ProgressBar progress = {props.percent}/>}
                            </Grid>
                            
                            {props.imageBuffer &&
                            <>
                                <Grid className={classes.itemGridModal}alignItems="center" xs={8} item>
                                    <Typography className={classes.previewTitle} variant = "h5" gutterBottom>
                                        Image Preview
                                    </Typography>
                                </Grid>
                                <Grid className={classes.itemGridModal}alignItems="center" xs={8} item>
                                    <img src = {props.imageBuffer} width = "300"/>
                                </Grid>     
                            </>                        }
                        
                        </Grid>
                        
                               
                    </div>
                </Fade>
            </Modal>
        </>
    )
}

export default ModalFile;