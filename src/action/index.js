import api from "../utils/api";
import Config from "../utils/config";

export const getAll = async(params) => {
    let res = await api.get(Config.apiStoreAll, params);
    return res;
}

export const deleteProduct = async(params) => {
    let res = await api.delete(`${Config.apiStoreAll}/${params}`);
    return res;
}