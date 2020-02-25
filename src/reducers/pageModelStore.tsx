import { getPageDict } from "../utils/requestHandler";

export const SET_PAGE_MODEL = "SET_PAGE_MODEL"

let defaultState = {
    "pageDict": {
        "menus": [
            {
                "title": "RDS To Hive",
                "subMenus": [
                    {
                        "title": "Create Table",
                        "category": "RDS To Hive",
                        "url": "/rds_to_hive/create",
                        "id": "rds_to_hive_create"
                    },
                    {
                        "title": "Select Table",
                        "category": "RDS To Hive",
                        "url": "/rds_to_hive/select",
                        "id": "rds_to_hive_select"
                    }
                ]
            },
            {
                "title": "Wiki",
                "id": "wiki_table",
                "subMenus": [
                    {
                        "title": "Create Table",
                        "category": "Wiki",
                        "url": "/wiki-table",
                        "id": "wiki_create_table"
                    },
                ]
            }
        ]
    },
    "pageMap": {

    }
}

export function setPageModel(pageModel) {
    return {
        type: SET_PAGE_MODEL,
        pageModel,
    }
}

export function handleFetchPageModel() {
    return (dispatch) => {
        return getPageDict()
            .then(result => {
                const { body, flag } = result
                dispatch(setPageModel(body["page_dict"]))
            })
    }
}

const getpageMap = (pageModel) => {
    let stack = [pageModel]

    const pageMap = {

    }

    while (stack.length > 0) {
        const obj = stack.pop()
        if (obj instanceof Array) {
            for (let innerObj of obj) {
                stack.push(innerObj)
            }
        } else if (obj instanceof Object) {
            if (Object.keys(obj).includes("url")) {
                pageMap[obj["url"]] = {
                    "title": obj["title"],
                    "id": obj["id"]
                }
                continue
            }
            for (let key in obj) {
                stack.push(obj[key])
            }
        }
    }
    console.log(pageMap)
    return pageMap
}

export default function pageModelStore(state = defaultState, action) {
    switch (action.type) {
        case SET_PAGE_MODEL: {
            return {
                ...state,
                pageDict: action.pageModel,
                pageMap: getpageMap(action.pageModel),
            }
        }
        default:
            return {
                ...state,
            }
    }

}