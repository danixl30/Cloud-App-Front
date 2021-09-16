import { GET_FILES, SET_CLIPBOARD, SET_FILE, SET_VIEWTYPE, UNSET_CLIPBOARD, UNSET_File } from "../acctions";

// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
    const { payload, type } = action;

    switch (type) {
        case GET_FILES:
        return {
            ...state,
            folders: payload.folders,
            files: payload.files
        };
        case SET_FILE:
        return {
            ...state,
            selectedItem: {
                name: payload.name,
                path: payload.path
            },
        };
        case UNSET_File:
            return {
                ...state,
                selectedItem: null
            }
        case SET_CLIPBOARD:
            return {
                ...state,
                clipBoard: {
                    acction: payload.acction,
                    name: payload.name,
                    path: payload.path
                }
            }
        case UNSET_CLIPBOARD:
            return {
                ...state,
                clipBoard: null
            }
        case SET_VIEWTYPE:
            return {
                ...state,
                typeView: payload.view
            }
        default:
        return state;
    }
};