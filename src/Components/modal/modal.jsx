import React from "react";
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import { makeStyles } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';


const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
        backgroundColor: '#161616',
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    borderRadius: 10
  },
  back: {
      filter: 'blur(4px)'
  }
}));

const ModalLayout = (props) => {
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
                        {props.children}
                    </div>
                </Fade>
            </Modal>
        </>
    )
}

export default ModalLayout;