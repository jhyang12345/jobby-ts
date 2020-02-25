import { combineReducers} from "redux"
import pageModelStore from "./pageModelStore";
import rdsToHiveCreate from "./RdsToHiveCreate";
import rdsToHiveSelect from "./RDSToHiveSelect"
import transformCreateToWiki from "./WikiTable";

export default combineReducers({
    pageModelStore,
    transformRDSToHiveSelect: rdsToHiveSelect,
    transformRDSToHiveCreate: rdsToHiveCreate,
    transformCreateToWiki,
})