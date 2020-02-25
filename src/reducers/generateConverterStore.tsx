import { getRdsToHiveCreate } from "../utils/requestHandler"

let defaultState = {
    fromText: "",
    toText: "",
    pending: false,
    succeeded: false, // only matters if translationComplete is true
    updating: true,
}

const UPDATE_FROM_TEXT = "UPDATE_FROM_TEXT"

export function setFromText(text, suffix) {
    return {
        type: addFormattedSuffix(UPDATE_FROM_TEXT, suffix),
        text,
    }
}

export function handleSetFromText(text, suffix) {
    return (dispatch) => {
        dispatch(setUpdating(true, suffix))
        dispatch(setFromText(text, suffix))
    }
}

const UPDATE_TO_TEXT = "UPDATE_TO_TEXT"

export function setToText(text, suffix) {
    return {
        type: addFormattedSuffix(UPDATE_TO_TEXT, suffix),
        text,
    }
}

export function handleSetToText(text, suffix) {
    return (dispatch) => {
        dispatch(setUpdating(true, suffix))
        dispatch(setToText(text, suffix))
    }
}

const SET_PENDING = "SET_PENDING"

export function setPending(pending, suffix) {
    return {
        type: addFormattedSuffix(SET_PENDING, suffix),
        pending
    }
}

const SET_SUCCEEDED = "SET_SUCCEEDED"

export function setSucceeded(succeeded, suffix) {
    return {
        type: addFormattedSuffix(SET_SUCCEEDED, suffix),
        succeeded,
    }
}

const SET_UPDATING = "SET_UPDATING"

export function setUpdating(updating, suffix) {
    return {
        type: addFormattedSuffix(SET_UPDATING, suffix),
        updating
    }
}

export function handleFetchFunction(text, requestFunction, suffix) {
    return (dispatch) => {
        dispatch(setPending(true, suffix))

        return requestFunction(text)
            .then(result => {
                console.log("Response: ", result)
                const { body, flag } = result
                dispatch(setToText(body, suffix))
                dispatch(setPending(false, suffix))
                dispatch(setUpdating(false, suffix))
                dispatch(setSucceeded(flag, suffix))
            })
    }
}

function addFormattedSuffix(action, suffix) {
    return `${action}@${suffix}`
}

export default function generateConverterStore(state=defaultState, actionSuffix) {
    return (state=defaultState, action) => {
        switch (action.type) {
            case addFormattedSuffix(UPDATE_FROM_TEXT, actionSuffix): {
                return {
                    ...state,
                    fromText: action.text
                }
            }
            case addFormattedSuffix(UPDATE_TO_TEXT, actionSuffix): {
                return {
                    ...state,
                    toText: action.text
                }
            }
            case addFormattedSuffix(SET_PENDING, actionSuffix): {
                return {
                    ...state,
                    pending: action.pending
                }
            }
            case addFormattedSuffix(SET_SUCCEEDED, actionSuffix): {
                return {
                    ...state,
                    succeeded: action.succeeded
                }
            }
            case addFormattedSuffix(SET_UPDATING, actionSuffix): {
                return {
                    ...state,
                    updating: action.updating,
                }
            }
            default:
                return state
        }
    }

}