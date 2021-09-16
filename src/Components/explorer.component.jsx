import React, {useEffect, useContext, useState, useRef} from 'react';
import {
  BrowserRouter as Router,
  useParams, useHistory
} from "react-router-dom";
import axios from 'axios';
import { makeStyles, withStyles, alpha } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grow from '@material-ui/core/Grow';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GetAppIcon from '@material-ui/icons/GetApp';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import Collapse from '@material-ui/core/Collapse';
import FolderIcon from '@material-ui/icons/Folder';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';

import FileContext from '../context/File/FileContext';
import FolderItem from './itemExplorer/folder';
import ImageItem from './itemExplorer/imageFile';
import MusicItem from './itemExplorer/musicFile';
import DocumentItem from './itemExplorer/documentFile';
import BarComponent from './BarComponent';
import ModalLayout from './modal/modal';
import ModalFile from './modal/modalFile';
import FolderItemList from './itemExplorer/itemFolderList';
import DocumentItemList from './itemExplorer/itemDocumenFile';
import ImageItemList from './itemExplorer/itemImageFile';
import MusicItemList from './itemExplorer/itemMusicFile';
import ProgressBar from './common/progressBar';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  label: {
      color: '#ffff'
  },
  colorIcon: {
      color: '#ebb734'
  },
  paper: {
    //height: 140,
    //width: 100,
    padding: theme.spacing(1/2),
    textAlign: 'center',
    spacing: 4,
    background: '#161616'
  },
  filesConainer: {
      padding: theme.spacing(2),
      //display: 'flex',
      overflow: 'auto',
      //maxHeight: '70%',
      height: 435,
      background: '#161616'
  },
  folderList: {
    padding: theme.spacing(2),
    background: '#161616',
    overflow: 'auto',
    height: 435
    //width: "20%",
    //height: "70%"
  },
  control: {
    padding: theme.spacing(2),
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
      background: '#010101',
      overflow:'hidden'
  },
  modalContent: {
    backgroundColor: '#161616',
    padding: theme.spacing(1)
  },
  modalTitle: {
      color: '#ffff',
      fontWeight: 'bold' 
  },
  boxFileName:{
    background: '#fff',
    fontWeight: 'bold' ,
    borderRadius: 5
  },
  commonButtonColor: {
      color: '#2C98F8',
      fontWeight: 100,
      border: '2px solid',
      '&:hover': {
        border: '2px solid',
        color: '#0687F3',
      }
  },
  confirmDeleteStyle:{

      color: '#FF0000',
      fontWeight: 100,
      border: '2px solid',
      '&:hover': {
        border: '2px solid',
        color: '#FF0000',
      }
  },
  itemGridModal: {
      alignItems: 'center',
      textAlign: 'center'
  },
  inputField:{

color: '#ffff',
    '&:hover': {
        color: '#F2AA10 !important',
    },
    '&:before': {
        borderBottomColor: '#F2AA10 !important',
    },
    '&:hover:before': {
        borderBottomColor: '#F2AA10',
    },
    '&:after': {
        borderBottomColor: '#F2AA10',
    },
},
    inputFiledLabel: {
        color: '#F2AA10',
        '&.Mui-focused': {
            color: '#F2AA10 !important',
        },
    },
    errorTextStyles:{
        color:'#FF0101',
        fontWeight: 'bold'
    }
}));


const StyledTreeItem = withStyles((theme) => ({
  iconContainer: {
    '& .close': {
      opacity: 0.3,
    },
  },
  group: {
    marginLeft: 7,
    paddingLeft: 18,
    borderLeft: `1px dashed ${alpha(theme.palette.text.primary, 0.4)}`,
    color: '#ffff'
  },
}))((props) => <TreeItem {...props}/>);

const Explorer = () => {

    const fileContext = useContext(FileContext);
    const classes = useStyles();

    const [openFolder, setOpenFolder] = useState(false);
    const [openUpload, setOpenUpload] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [openRename, setOpenRename] = useState(false);
    const [openDownload, setOpenDownload] = useState(false);
    const [imageBuffer, setImageBuffer] = useState(null);
    const [errorText, setErrorText] = useState(null);
    const [itemName, setItemName] = useState('');
    const [fileSelected, setFileSelected] = useState(null);
    const [percentUpload, setPercentUpload] = useState(null);
    const [props, setProps] = useState(null);
    const [tree, setTree] = useState(null);

    let fileInput = useRef(null);

    let history = useHistory();

    let {path} = useParams();

    const setPath = async () => {
        let route = path.toString().replace('|', '/');
        if (route.indexOf('root') !== -1){
            route = route.slice(5,route.lenght);
            if (route === '') route = '*';
            const res = await fileContext.getFiles(route);
            if (res === false){
                toast.error('Inavlid path');
                history.push('root')
            }
        }
    }

    const onClickFolder = async (name) => {
        //console.log(fileContext.selectedItem);
        if (fileContext.selectedItem){
            if (fileContext.selectedItem.name === name){
                let newRoute = path + '|'+name;
                if (!fileContext.clipBoard) fileContext.unSetItem();
                history.push(newRoute);
            }else{
                fileContext.setItem(name, path);
            }
        }else{
            fileContext.setItem(name, path);
        }
    }

    const onClickFile = async (name) => {
        if (fileContext.selectedItem){
            if (fileContext.selectedItem.name === name){
                let route = path + '|' + fileContext.selectedItem.name;
                route = route.slice(5, route.length);
                const res = await axios.get(`http://localhost:4000/props/${route}`);
                console.log(res.data.stats.atime);
                console.log(res.data.stats.size);
                let size = res.data.stats.size;
                if (size >= 1000000000){
                    size /= 1000000000;                    
                    size = `${size.toString().slice(0,5)} GB`;
                }else if (size >= 1000000){
                    size /= 1000000;
                    size = `${size.toString().slice(0,5)} MB`;
                }else if (size >= 1000){
                    size /= 1000;
                    size = `${size.toString().slice(0,5)} KB`;
                }else {
                    size = `${size.toString()} bytes`;
                }
                const propsObject = {
                    date: res.data.stats.atime.slice(0,10).replace('-', '/').replace('-', '/'),
                    size: size
                }
                setProps(propsObject);
                setOpenDownload(true);
            }else{
                fileContext.setItem(name, path);
            }
        }else{
            fileContext.setItem(name, path);
        }
    }

    const handleFileChange = (e) => {
        setImageBuffer(null);
        setFileSelected(null);
        const file = e.target.files[0];
        setFileSelected(file);
        //console.log(fileSelected.name);
        if (file && file.type.indexOf('image') !== -1){
            const reader = new FileReader();
            reader.onloadend = () => {
                //console.log(reader.result);
                setImageBuffer(reader.result);
            }
            reader.readAsDataURL(file);
        }
    }

    const onUpload = async () => {
        if (fileContext.files.indexOf(fileSelected.name) === -1){
            //console.log('here');
            const formData = new FormData();
            formData.append(
                "file",
                fileSelected
            )
            let route = path;
            route = route.slice(5,route.lenght);
            if (route === '') route = '*';
            const config = {
            onUploadProgress: progressEvent => {
                    let { loaded, total } = progressEvent;
                    let percent = Math.floor((loaded * 100)/total);
                    setPercentUpload(percent);
                }
            }
            const res = await axios.post(`http://localhost:4000/upload/${route}`, formData, config);
            setPercentUpload(null);
            if (res.data.state){
                toast.success('File uploaded successfully');
                setPath()
                onCloseModal();
            }
            
        }else{
            toast.error('This file already exist');
        }
    }

    const onRename = async () => {
        if (!errorText){
            if (fileContext.files.indexOf(itemName) === -1){
                const res = await fileContext.renameItem(fileContext.selectedItem.name, itemName, path);
                if (res){
                    toast.success('Changed element name successfully');
                    onCloseModal();
                    fileContext.unSetItem();
                    setPath();    
                }else{
                    toast.error('Error while changing the name');
                }
            }else{
                toast.error('This file already exist');
            }
        }else{
            toast.error('You have an incorrect name');
        }
    }

    const onPaste = async () => {
        if (fileContext.clipBoard.acction === 'copy'){
            if (fileContext.files.indexOf(fileContext.clipBoard.name) === -1 && fileContext.folders.indexOf(fileContext.clipBoard.name) === -1){
                const res = await fileContext.copyItem(fileContext.clipBoard.name, fileContext.clipBoard.path, path);
                if (res){
                    toast.success('Element copied successfully');
                    fileContext.unSetClipboard();
                    fileContext.unSetItem();
                    setPath();
                }
            }else{
                toast.error('This file already exist in this path');
            }
        }else if (fileContext.clipBoard.acction === 'move'){
            if (fileContext.files.indexOf(fileContext.clipBoard.name) === -1 && fileContext.folders.indexOf(fileContext.clipBoard.name) === -1){
                const res = await fileContext.moveItem(fileContext.clipBoard.name, fileContext.clipBoard.path, path);
                if (res){
                    toast.success('Element moved successfully');
                    fileContext.unSetClipboard();
                    fileContext.unSetItem();
                    setPath();
                }
            }else{
                toast.error('This file already exist in this path');
            }
        }
    }

    const onDownload = async () => {
        let route = path + '|' + fileContext.selectedItem.name;
        route = route.slice(5, route.length);
        console.log(route);
        const config = {
            onDownloadProgress: progressEvent => {
                let { loaded, total } = progressEvent;
                let percent = Math.floor((loaded * 100)/total);
                console.log(percent);
                setPercentUpload(percent);
            }
        }
        const res = await axios.get(`http://localhost:4000/file/${route}`, {
            responseType: 'blob',
            ...config
        });
        console.log(res.data);
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', fileContext.selectedItem.name);
        document.body.appendChild(link);
        link.click();
        setPercentUpload(null);
    }
    
    const handleNewFileTextChange = (e) => {
        let content = e.target.value;
        console.log(content);
        if (content.indexOf('.') !== -1) setErrorText('The folder not must to content .');
        else if (content.indexOf('/') !== -1) setErrorText('The folder not must to content /');
        else if (content.indexOf('|') !== -1) setErrorText('The folder not must to content |');
        else if (content.indexOf('\\') !== -1) setErrorText('The folder not must to content \\');
        else if (!openRename && fileContext.folders.indexOf(content) !== -1) setErrorText('This name already exist');
        else if (openRename && content !== fileContext.selectedItem.name && fileContext.folders.indexOf(content) !== -1) setErrorText('This name already exist');
        else setErrorText(null);
        setItemName(content);
    }

    const onChangeRename = (e) => {
        if (fileContext.selectedItem.name.indexOf('.') !== -1){
            let content = e.target.value;
            console.log(content);
            if (content.indexOf('/') !== -1) setErrorText('The folder not must to content /');
            else if (content.indexOf('|') !== -1) setErrorText('The folder not must to content |');
            else if (content.indexOf('\\') !== -1) setErrorText('The folder not must to content \\');
            else if (content !== fileContext.selectedItem.name && fileContext.files.indexOf(content) !== -1) setErrorText('This name already exist');
            else setErrorText(null);
            setItemName(content);
        }else{
            handleNewFileTextChange(e);
        }
    }

    const onClickNewFolder = () => {
        setOpenFolder(true);
    }

    const onClickRename = () => {
        setItemName(fileContext.selectedItem.name);
        setOpenRename(true);
    }

    const clickNewFolder = async () => {
        //console.log(errorText);
        if (!errorText){
            if (itemName.trim() !== ''){
                let route = path;
                route = route.slice(5,route.lenght);
                //if (route === '') route = '*';
                //console.log(route);
                //console.log(itemName);
                const res = await fileContext.createFolder(itemName, route);
                if (res === 'Folder created successfully'){
                    toast.success('Folder created successfully');
                    getTree();
                    setItemName(null);
                    setOpenFolder(false);
                    setPath();
                } 
            }else{
                toast.error('The name not must to be empty');
            }
        }else{
            toast.error('You have an incorrect name');
        }
    }

    const clickGoUp = () => {
        const routes = path.split('|');
        //console.log(routes);
        if (routes.length > 1){
            let newRoute = ''
            for (let i = 0; i < routes.length-1; i++){
                newRoute += routes[i];
                if (i < routes.length-2) newRoute += '|';
            }
            history.push(newRoute);
        }
    }

    const onClickUpload = () => {
        setImageBuffer(null);
        setFileSelected(null);
        setOpenUpload(true);
    }

    const onClickDelete = () => {
        console.log('click')
        setOpenDelete(true);
    }

    const onConfirmDelete = async () => {
        const res = await fileContext.deleteItem(fileContext.selectedItem.name, path);
        if (res){
            toast.success(`Element deleted successfully`);
            onCloseModal();
            fileContext.unSetItem();  
            setPath();
                      
        }
    }

    const onCloseModal = () => {
        if (!percentUpload){
            setOpenFolder(false);
            setOpenUpload(false);
            setOpenDelete(false);
            setOpenRename(false);
            setOpenDownload(false);
        }
    }

    const setTypeFile = (name) => {
        name = name.toLowerCase();        
       if (name.toLowerCase().indexOf('.png') !== -1 || name.indexOf('.jpg') !== -1 || name.indexOf('.gift') !== -1) return 'image'; 
       if (name.toLowerCase().indexOf('.mp3') !== -1 || name.indexOf('.wav') !== -1 || name.indexOf('.ma4') !== -1) return 'music'; 
       if (name.toLowerCase().indexOf('.txt') !== -1 || name.indexOf('.docx') !== -1 || name.indexOf('.doc') !== -1) return 'document';   
       return 'singlefile';
    }

    useEffect(() => {
        if (!fileContext.clipBoard) fileContext.unSetItem();
        setPath();
    }, [path])

    useEffect(() => {
        //console.log(fileContext.files);
    }, [fileContext.files, fileContext.folders])

    const getTree = async () => {
        const res = await axios.get('http://localhost:4000/gettree');
        setTree(res.data.matrix);
        console.log(res.data.matrix);
    }

    const getItems = (parent, level) => {
        //console.log('here');
        let array = []
        let tempArray = tree[level];
        if (!tempArray){
            return []
        }
        for (let i = 0; i < tempArray.length; i++){
            if (tempArray[i].parent === parent)
                array.push(tempArray[i]);
        }
        //console.log(array);
        return array;
    }

    const RenderTree = (props) => {
        return(
            <>
                {getItems(props.parent, props.level).map((item, index) => 
                    <StyledTreeItem onClick={(e) => history.push('root|'+item.path.replaceAll('/', '|') + '|' + item.name)} nodeId={item.path+'/'+item.name} label={item.name}>
                        <RenderTree parent={item.name} level={props.level+1}/>
                    </StyledTreeItem>
                )}
            </>    
        )
    };

    useEffect(() => {
        getTree();
    }, [])

    return(
        <div className = {classes.container}>
            {openFolder && 
                <ModalLayout onClose = {onCloseModal}>
                    <Grid container justifyContent = "center" className = {classes.modalContent} spacing={2}>
                        <Grid className={classes.itemGridModal} alignItems="center" xs = {8} item>
                            <Typography className={classes.modalTitle} variant="h4" gutterBottom>
                            Create a new Folder 
                            </Typography>
                        </Grid>
                        <Grid className={classes.itemGridModal}alignItems="center" xs={8} item>
                            <TextField InputLabelProps={{className:classes.inputFiledLabel,}} InputProps={{className: classes.inputField,}} value = {itemName} onChange = {handleNewFileTextChange} id="filled-basic" label="New folder name" variant="filled" />
                        </Grid>
                        {errorText &&
                            <Grid className={classes.itemGridModal} xs={8} item>
                                <Typography className={classes.errorTextStyles} variant="body2">
                                    {errorText}
                                </Typography>
                            </Grid>
                        }
                        <Grid className={classes.itemGridModal}alignItems="center" xs={8} item>
                            <Button className={classes.commonButtonColor} onClick = {clickNewFolder} variant="outlined" color="primary">
                                Create
                            </Button>
                        </Grid>
                    </Grid>
                </ModalLayout>
            }
            {openUpload && 
                <ModalFile fileName={fileSelected} onChange = {handleFileChange} onClose = {onCloseModal} reff = {fileInput} imageBuffer = {imageBuffer} percent = {percentUpload} upload = {onUpload} />
            }
            {openDelete && 
                <ModalLayout onClose = {onCloseModal}>
                    <Grid container justifyContent = "center" className = {classes.modalContent} spacing={2}>
                        <Grid className={classes.itemGridModal} alignItems="center" xs = {9} item>
                            <Typography className={classes.modalTitle} variant = "h4" gutterBottom>
                                Are you sure that you want to delete this file?
                            </Typography>
                        </Grid>
                        <Grid className={classes.itemGridModal} alignItems="center" xs = {9} item>
                            <Typography className={classes.boxFileName} variant = "h6" gutterBottom>
                                {fileContext.selectedItem.name}
                            </Typography>
                        </Grid>
                        <Grid className={classes.itemGridModal} alignItems="center" xs = {4} item>
                            <Button className={classes.confirmDeleteStyle} onClick = {onConfirmDelete} variant="outlined" color="primary">
                                Yes    
                            </Button>
                        </Grid>
                        <Grid className={classes.itemGridModal} alignItems="center" xs = {4} item>
                            <Button className={classes.commonButtonColor}onClick = {onCloseModal} variant="outlined" color="primary">
                                No
                            </Button>
                        </Grid>
                    </Grid>
                </ModalLayout>
            }
            {openRename && 
                <ModalLayout onClose = {onCloseModal}>
                    <Grid container justifyContent = "center" className = {classes.modalContent} spacing={2}>
                        <Grid className={classes.itemGridModal} alignItems="center" xs = {9} item>
                            <Typography className={classes.modalTitle} variant = "h4" gutterBottom>
                                Rename a {fileContext.selectedItem.name.indexOf('.') === -1 ? 'folder' : 'file'}
                            </Typography>
                        </Grid>
                        <Grid className={classes.itemGridModal} alignItems="center" xs = {9} item>
                            <TextField InputLabelProps={{className:classes.inputFiledLabel,}} InputProps={{className: classes.inputField,}} defaultValue = {fileContext.selectedItem.name} label = "New name" variant = "filled" onChange = {onChangeRename}/>
                        </Grid>
                        {errorText &&
                            <Grid className={classes.itemGridModal} xs={8} item>
                                <Typography className={classes.errorTextStyles} variant="body2">
                                    {errorText}
                                </Typography>
                            </Grid>
                        }
                        <Grid className={classes.itemGridModal} alignItems="center" xs = {9} item>
                        <Button className={classes.commonButtonColor} onClick = {onRename} variant="outlined" color="primary">
                            Rename 
                            </Button>
                        </Grid>              
                    </Grid>
                </ModalLayout>
            }
            {openDownload && 
                <ModalLayout onClose={onCloseModal}>
                    <Grid container justifyContent = "center" className = {classes.modalContent} spacing={2}>
                        <Grid className={classes.itemGridModal} alignItems="center" xs = {9} item>
                            <Typography className={classes.modalTitle} variant = "h4" gutterBottom>
                                Download a file
                            </Typography>
                        </Grid>
                        <Grid className={classes.itemGridModal}alignItems="center" xs={8} item>
                            <Typography className={classes.boxFileName} variant = "body1" gutterBottom>
                                {fileContext.selectedItem.name}
                            </Typography>
                        </Grid> 
                        <Grid className={classes.itemGridModal}alignItems="center" xs={8} item>
                            <Button className={classes.commonButtonColor} variant="outlined" onClick={onDownload} color="primary" startIcon={<GetAppIcon />}>
                                Download 
                            </Button>
                        </Grid>
                        <Grid className={classes.itemGridModal}alignItems="center" xs={8} item>
                            {percentUpload && <ProgressBar progress = {percentUpload}/>}
                        </Grid>                       
                        <Grid className={classes.itemGridModal} alignItems="center" xs = {5} item>
                            <Typography className={classes.modalTitle} variant="body2">
                                Created: {props.date}
                            </Typography>
                        </Grid>
                        <Grid className={classes.itemGridModal} alignItems="center" xs = {4} item>
                            <Typography className={classes.modalTitle} variant="body2">
                                Size: {props.size}
                            </Typography>
                        </Grid>
                </Grid>
                </ModalLayout>
            }
            <Grid container className={classes.root} spacing={1}>
                <Grid item xs={12}>
                    <Box m = {1/2}>
                        <Paper m={2} className={classes.paper}><BarComponent clickFolder = {onClickNewFolder} clickUpload = {onClickUpload} refreshClick = {setPath} goUpClick = {clickGoUp} unSetItem = {fileContext.unSetItem} delete = {onClickDelete} rename = {onClickRename} copy = {(e) => fileContext.setClipBoard(fileContext.selectedItem.name, path, 'copy')} move = {(e) => fileContext.setClipBoard(fileContext.selectedItem.name, path, 'move')} cancel = {(e) => {fileContext.unSetClipboard();fileContext.unSetItem()}} paste = {onPaste}/></Paper>
                    </Box>
                </Grid>
                <Grid item xs>
                    <Box m = {1/2}>
                        <Paper className = {classes.folderList}>
                            <TreeView defaultCollapseIcon={<FolderOpenIcon className={classes.colorIcon} />} defaultExpandIcon={<FolderIcon className={classes.colorIcon} />}>
                                {tree && tree[0].map((item, index) =>
                                    <StyledTreeItem onClick={(e) => history.push('root|' + item.name)} className={classes.label} nodeId = {index.toString()} label={item.name}>
                                        <RenderTree parent={item.name} level={1}/>
                                    </StyledTreeItem>
                                )}
                            </TreeView>
                        </Paper>
                    </Box>
                </Grid>
                <Grid item xs = {10}>
                    <Box m = {1/2}> 
                        <Paper onClick={fileContext.unSetItem} className = {classes.filesConainer}>
                            {fileContext.files.length <= 0 && fileContext.folders.length <= 0 && 
                                <Grid container justifyContent="center">
                                    <Typography className={classes.modalTitle} variant="h6">
                                        This directory is empty
                                    </Typography>
                                </Grid>
                            }
                            {fileContext.typeView === 1 ? 
                                <Grid  item xs={12}>
                                    <Grid container justifyContent="left" spacing={2}>
                                        {fileContext.folders.map((folder) => 
                                            <Grow key = {folder} in = {folder}>
                                                <Grid onClick={(e) => e.stopPropagation()} item>
                                                    <FolderItem handleClick = {onClickFolder} name = {folder}/>
                                                </Grid>
                                            </Grow>
                                        )}
                                        {fileContext.files.map((file) => 
                                            <Grow in = {file !== null}>
                                                <Grid key = {file} onClick = {(e) => {e.stopPropagation(); onClickFile(file)}} item>
                                                    {setTypeFile(file) === 'image' && <ImageItem name = {file}/>}
                                                    {setTypeFile(file) === 'music' && <MusicItem name = {file}/>}
                                                    {setTypeFile(file) === 'document' && <DocumentItem name = {file}/>}
                                                    {setTypeFile(file) === 'singlefile' && <DocumentItem name = {file}/>}
                                                </Grid>
                                            </Grow>
                                        )}
                                    </Grid>
                                </Grid>
                                :
                                <Grid item xs={12}>
                                    <Grid container direcction="colum" alignItems="stretch" justifyContent="flex-start" spacing={2}>
                                        {fileContext.folders.map((folder) => 
                                            <Grow key = {folder} in = {folder}>
                                                <Grid onClick={(e) => e.stopPropagation()} item xs = {12}>
                                                    <FolderItemList handleClick = {onClickFolder} name = {folder}/>
                                                </Grid>
                                            </Grow>
                                        )}
                                        {fileContext.files.map((file) => 
                                            <Grow in = {file !== null}>
                                                <Grid key = {file} onClick = {(e) => {e.stopPropagation();onClickFile(file)}} xs = {12} item>
                                                    {setTypeFile(file) === 'image' && <ImageItemList name = {file}/>}
                                                    {setTypeFile(file) === 'music' && <MusicItemList name = {file}/>}
                                                    {setTypeFile(file) === 'document' && <DocumentItemList name = {file}/>}
                                                    {setTypeFile(file) === 'singlefile' && <DocumentItemList name = {file}/>}
                                                </Grid>
                                            </Grow>
                                        )}
                                    </Grid>
                                </Grid>
                                } 
                        </Paper>
                    </Box>
                </Grid>
            </Grid>
            
        </div>
    )
}

export default Explorer;