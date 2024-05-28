import api from "../utils/api";
import Config from "../utils/config";

export const getAll = async(params) => {
    let res = await api.get(Config.apiSrvStoreProduct, params);
    return res;
}

export const deleteProduct = async(params) => {
    let res = await api.delete(`${Config.apiSrvStoreProduct}/${params}`);
    return res;
}

export const getUniqueProduct = async(params) => {
    let res = await api.get(`${Config.apiSrvStoreProduct}/${params}`);
    return res;
}

export const createProduct = async(params) => {
    let res = await api.post(`${Config.apiSrvStoreProduct}`, params);
    return res;
}

export const updateProduct = async(id, params) => {
    let res = await api.put(`${Config.apiSrvStoreProduct}/${id}`, params);
    return res;
}

export const postUploadXlxs = async(params) => {
    let res = await api.post(`${Config.apiSrvUploadXlsx}`, params);
    return res;
}