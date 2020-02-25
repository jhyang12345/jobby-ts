import { getWikiTable } from "../utils/requestHandler"
import { BasicResponse } from 'models/requestModels'

let defaultState = {
    fromText: "",
    toText: "",
    pending: false,
    succeeded: false, // only matters if translationComplete is true
    updating: true,
}

const UPDATE_FROM_TEXT_WIKI_TABLE = "UPDATE_FROM_TEXT_WIKI_TABLE"

export function setFromText(text: string) {
    return {
        type: UPDATE_FROM_TEXT_WIKI_TABLE,
        text,
    }
}

export function handleSetFromText(text: string) {
    return (dispatch: Function) => {
        dispatch(setUpdating(true))
        dispatch(setFromText(text))
    }
}

const UPDATE_TO_TEXT_WIKI_TABLE = "UPDATE_TO_TEXT_WIKI_TABLE"

export function setToText(text: string) {
    return {
        type: UPDATE_TO_TEXT_WIKI_TABLE,
        text,
    }
}

export function handleSetToText(text: string) {
    return (dispatch: Function) => {
        dispatch(setUpdating(true))
        dispatch(setToText(text))
    }
}

const SET_PENDING_WIKI_TABLE = "SET_PENDING_WIKI_TABLE"

export function setPending(pending: boolean) {
    return {
        type: SET_PENDING_WIKI_TABLE,
        pending
    }
}

const SET_SUCCEEDED_WIKI_TABLE = "SET_SUCCEEDED_WIKI_TABLE"

export function setSucceeded(succeeded: boolean) {
    return {
        type: SET_SUCCEEDED_WIKI_TABLE,
        succeeded,
    }
}

const SET_UPDATING_WIKI_TABLE = "SET_UPDATING_WIKI_TABLE"

export function setUpdating(updating: boolean) {
    return {
        type: SET_UPDATING_WIKI_TABLE,
        updating
    }
}

export function handlePrestoWikiTable(text: string) {
    return (dispatch: Function) => {
        dispatch(setPending(true))

        return getWikiTable(text)
            .then((result: BasicResponse) => {
                console.log("Response: ", result)
                const { body, flag } = result
                dispatch(setToText(body))
                dispatch(setPending(false))
                dispatch(setUpdating(false))
                dispatch(setSucceeded(flag))
            })
    }
}

export default function transformCreateToWiki(state=defaultState, action: any) {
    switch (action.type) {
        case UPDATE_FROM_TEXT_WIKI_TABLE: {
            return {
                ...state,
                fromText: action.text
            }
        }
        case UPDATE_TO_TEXT_WIKI_TABLE: {
            return {
                ...state,
                toText: action.text
            }
        }
        case SET_PENDING_WIKI_TABLE: {
            return {
                ...state,
                pending: action.pending
            }
        }
        case SET_SUCCEEDED_WIKI_TABLE: {
            return {
                ...state,
                succeeded: action.succeeded
            }
        }
        case SET_UPDATING_WIKI_TABLE: {
            return {
                ...state,
                updating: action.updating,
            }
        }
        default:
            return state
    }
}