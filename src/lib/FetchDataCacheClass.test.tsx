import {FetchDataCache} from "./FetchDataCacheClass";

it('fetchDataCache will be updated and not empty', () => {
    const fetchDataCacheTest = new FetchDataCache({});
    fetchDataCacheTest.setNewData("prop", {status: 404, message: "test"})
    expect(fetchDataCacheTest.getDataCache).toStrictEqual({"prop": {"message": "test", "status": 404}});
});

it('getDataIfAlreadyExist return undefined, if prop missing in fetchDataCache', () => {
    const fetchDataCacheTest = new FetchDataCache({});
    expect(fetchDataCacheTest.getDataIfAlreadyExist("prop")).toBeUndefined();
});
