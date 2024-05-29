import api from "../utils/api";
import Config from "../utils/config";

export const getAll = async(params) => {
    let res = await api.get(Config.apiSrvStoreProduct, params);
    return res;
}

export const getCatalog = async(params) => {
    let res = await api.get(Config.apiSrvGetCatalog, params);
    return res;
}

export const getAllDatos = async(params) => {
    let res = await api.get(Config.apiSrvGetDataList, params);
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

export const updateProduct = async(id, params) => {
    let res = await api.put(`${Config.apiSrvStoreProduct}/${id}`, params);
    return res;
}

export const createProduct = async(params) => {
    let res = await api.post(`${Config.apiSrvStoreProduct}`, params);
    return res;
}

/*REGISTER ================================================================*/
export const createRegister = async(params) => {
    let res = await api.post(`${Config.apiSrvPostCreateRegiter}`, params);
    return res;
}

export const deleteRegister = async(params) => {
    let res = await api.delete(`${Config.apiSrvDeleteRegiter}/${params}`);
    return res;
}

export const getUniqueRegister = async(params) => {
    let res = await api.get(`${Config.apiSrvGetRegiter}/${params}`);
    return res;
}

export const updateRegister = async(id, params) => {
    let res = await api.put(`${Config.apiSrvPutRegiter}/${id}`, params);
    return res;
}

export const postUploadXlxs = async(params) => {
    let res = await api.postUploadXlxs(`${Config.apiSrvUploadXlsx}`, params);
    return res;
}
