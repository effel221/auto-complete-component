import {CountriesNamesDataTypes} from "./types-interfaces";
import {Dispatch, SetStateAction} from "react";

export interface FetchDataCacheInterface {
    [key: string]: CountriesNamesDataTypes
}

export const FetchDataCache = class {
    dataCache: FetchDataCacheInterface;

    constructor(updatedData:FetchDataCacheInterface) {
        this.dataCache = updatedData;
    }
    get getDataCache() {
        return this.dataCache;
    }
    getDataIfAlreadyExist(prop:string) {
      return this.dataCache[prop];
    }
    setNewData(prop: string, newData:CountriesNamesDataTypes) {
        this.dataCache[prop] = newData;
    }
}


export const fetchDataCache = new FetchDataCache({})

export const updateCacheData = (prop: string, callback: ()=>void,
    setCountriesNamesData: Dispatch<SetStateAction<CountriesNamesDataTypes>>) => {
    const currenData = fetchDataCache.getDataIfAlreadyExist(prop)
    return currenData ? setCountriesNamesData(currenData) : callback()
}
