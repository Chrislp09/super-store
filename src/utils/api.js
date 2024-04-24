'use strict';

import Config from './config';

const env = Config.env || 'local';
const apiRoot = Config[env].apiRoot || undefined;
const objResponse = {
    message: "",
    code: 0,
    data: null
}

const urlfy = (obj) => 
    Object.keys(obj)
        .map((v) => encodeURIComponent(v) + '=' + encodeURIComponent(obj[v]))
        .join('&')

class Api {
    async get(apiSrv, params) {
        let uriparams = params ? "?" + urlfy(params) : '';
        console.log(env,'ENV =======',`${apiRoot}${apiSrv}${uriparams}`, 'METHOD GET ----------------------------------------------------------------')
        try {
            const response = await Promise.race([
                fetch(`${apiRoot}${apiSrv}${uriparams}`, {
                    method: 'GET',
                    mode: 'cors',
                    cache: 'no-cache',
                    credentials: 'same-origin',
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                    },
                    redirect: 'follow'
                }),
                new Promise((_, reject) =>
                    setTimeout(() => reject(new Error('Timeout')), 10000)
                )
            ]);

            if (!response.ok) {
                return {message: "No se logró obtener respuesta del servidor", code:response?.status || 500}
            }
            const data = {
                code: response.status,
                data: await response.json(),    
            };
            if(response.status === 200) {
                return data;
            } else {
                objResponse.code = response?.status || 500;
                objResponse.message =  "No se logró obtener respuesta del servidor";
                return objResponse;
            }
        } catch (error) {
            objResponse.code = error?.status || 500;
            objResponse.message =  "No se logró obtener respuesta del servidor";
            return objResponse;
        }
    }

    async delete(apiSrv, params) {
        let uriparams = params ? params : '';
        try {
            const response = await Promise.race([
                fetch(`${apiRoot}${apiSrv}${uriparams}`, {
                    method: 'DELETE',
                    mode: 'cors',
                    cache: 'no-cache',
                    credentials: 'same-origin',
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                    },
                    redirect: 'follow'
                }),
                new Promise((_, reject) =>
                    setTimeout(() => reject(new Error('Timeout')), 10000)
                )
            ]);
            
            if (!response.ok) {
                return {message: "No se logró obtener respuesta del servidor", code:response?.status || 500}
            }
            const data = {
                code: response.status,
                data: await response.json(),    
            };
            if(response.status === 200) {
                return data;
            } else {
                objResponse.code = response?.status || 500;
                objResponse.message =  "No se logró obtener respuesta del servidor";
                return objResponse;
            }
            
        } catch (error) {
            objResponse.code = error?.status || 500;
            objResponse.message =  "No se logró obtener respuesta del servidor";
            return objResponse;
        }
    }

    async getParams(apiSrv, params) {
        let uriparams = params ? params : '';
        try {
            const response = await Promise.race([
                fetch(`${apiRoot}${apiSrv}${uriparams}`, {
                    method: 'GET',
                    mode: 'cors',
                    cache: 'no-cache',
                    credentials: 'same-origin',
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                    },
                    redirect: 'follow'
                }),
                new Promise((_, reject) =>
                    setTimeout(() => reject(new Error('Timeout')), 10000)
                )
            ]);
            
            if (!response.ok) {
                return {message: "No se logró obtener respuesta del servidor", code:response?.status || 500}
            }
            const data = {
                code: response.status,
                data: await response.json(),    
            };
            if(response.status === 200) {
                return data;
            } else {
                objResponse.code = response?.status || 500;
                objResponse.message =  "No se logró obtener respuesta del servidor";
                return objResponse;
            }
            
        } catch (error) {
            objResponse.code = error?.status || 500;
            objResponse.message =  "No se logró obtener respuesta del servidor";
            return objResponse;
        }
    }
}

export default new Api();
