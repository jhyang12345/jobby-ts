import generateConverterStore from './generateConverterStore'

export const actionSuffix =  "RDS_TO_HIVE_CREATE"

let defaultState = {
    fromText: "",
    toText: "",
    pending: false,
    succeeded: false, // only matters if translationComplete is true
    updating: true,
}

export default generateConverterStore(defaultState, actionSuffix)