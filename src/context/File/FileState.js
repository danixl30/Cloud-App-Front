import { useReducer } from "react";
import axios from "axios";
import FileContext from "./FileContext"
import FileReducer from "./FileReducer"
import { GET_FILES, SET_CLIPBOARD, SET_FILE, SET_VIEWTYPE, UNSET_CLIPBOARD, UNSET_File } from "../acctions";

const FileState = (props) => {
    const initialState = {
        files: [],
        folders: [],
        selectedItem: null,
        clipBoard: null,
        typeView: 1
    }

    const [state, dispatch] = useReducer(FileReducer, initialState);

    const getFiles = async (path) => {
        const res = await axios.get(`http://localhost:4000/getdir/${path}`);
        console.log(res.data.state);
        if (res.data.state === false) return false;
        dispatch({
            type: GET_FILES,
            payload: {
                files: res.data.files,
                folders: res.data.folders
            }
        })
    }

    const setItem = (name, path) => {
        dispatch({
            type: SET_FILE,
            payload: {
                name, path
            }
        })
    }

    const unSetItem = () => {
        dispatch({
            type: UNSET_File
        })
    }

    const deleteItem = async (name, path) => {
        let route = path.slice(5,path.lenght);
        if (route === ''){
            route = name;
        }else{
            route += '|' + name;
        }
        console.log(route);
        if (name.indexOf('.') === -1){
            const res = await axios.delete( `http://localhost:4000/deletedir/${route}`);
            if (res.data.state){
                return true;
            }else {
                return false;
            }
        }else {
            const res = await axios.delete( `http://localhost:4000/deletefile/${route}`);
            if (res.data.state){
                return true;
            }else {
                return false;
            }
        }
    }

    const renameItem = async (name, newName, path) => {
        let route = path.slice(5,path.lenght);
        let newRoute;
        if (route === ''){
            route = name;
            newRoute = newName
        }else{
            newRoute = route + '|' + newName;
            route += '|' + name;
        }
        console.log(route);
        console.log(newRoute);
        const res = await axios.put(`http://localhost:4000/movefile/${route}`, {
            newpath: newRoute
        });
        if (res.data.state){
            return true;
        }else{
            return false;
        }
    }

    const createFolder = async (name, path) => {
        if (path !== '')
            path += '|'+name;
        else
            path = name
        const res = await axios.post(`http://localhost:4000/createdir/${path}`);
        if (res.data.state){
            return 'Folder created successfully';
        }else {
            return 'Error while creating a folder';
        }
    }

    const copyItem = async (name, path, newPath) => {
        let route = path.slice(5,path.lenght);
        let newRoute = newPath.slice(5,path.lenght);
        if (route === ''){
            route = name;
        }else{
            route += '|' + name;
        }
        if (newRoute === '') {
            newRoute = name;
        }else{
            newRoute += '|' + name;
        }
        console.log(route);
        console.log(newRoute);
        const res = await axios.post(`http://localhost:4000/copyfile/${route}`, {
            newPath: newRoute
        });
        if (res.data.state){
            return true;
        }else {
            return false;
        }
    }

    const moveItem = async (name, path, newPath) => {
        let route = path.slice(5,path.lenght);
        let newRoute = newPath.slice(5,path.lenght);
        if (route === ''){
            route = name;
        }else{
            route += '|' + name;
        }
        if (newRoute === '') {
            newRoute = name;
        }else{
            newRoute += '|' + name;
        }
        console.log(route);
        console.log(newRoute);
        const res = await axios.put(`http://localhost:4000/movefile/${route}`, {
            newpath: newRoute
        });
        if (res.data.state){
            return true;
        }else {
            return false;
        }
    }

    const setClipBoard = (name, path, acction) => {
        console.log('here');
        dispatch({
            type: SET_CLIPBOARD,
            payload: {
                acction: acction,
                name: name, 
                path: path
            }
        })
    }

    const unSetClipboard = () => {
        dispatch({
            type: UNSET_CLIPBOARD
        })
    }
    
    const setViewType = (type) => {
        dispatch({
            type: SET_VIEWTYPE,
            payload: {
                view: type
            }
        })
    }

    return(
        <FileContext.Provider value = {{
            files: state.files,
            folders: state.folders,
            typeView: state.typeView,
            selectedItem: state.selectedItem,
            clipBoard: state.clipBoard,
            getFiles,
            setItem,
            createFolder,
            unSetItem,
            deleteItem,
            renameItem,
            setClipBoard,
            unSetClipboard,
            copyItem, 
            moveItem,
            setViewType
        }}>
            {props.children}
        </FileContext.Provider>
    )
}

export default FileState;