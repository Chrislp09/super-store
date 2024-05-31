'use strict';

import config from './config';
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
        .join('&');

const compiledata = async(data) => {
    if(config.env === 'local') {
        return await data.json();
    } else {
        return  {
            code: data.status,
            data: await data.json(),    
        };
    }
}

class Api {
    async get(apiSrv, params) {
        let uriparams = params ? "?" + urlfy(params) : '';
        console.log(env,params,'ENV GET =======',`${apiRoot}${apiSrv}${uriparams}`, process.env.REACT_APP_TIMEOUT,'METHOD GET ----------------------------------------------------------------')
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
                    setTimeout(() => reject(new Error('Timeout')), process.env.REACT_APP_TIMEOUT)
                )
            ]);

            if (!response.ok) {
                return {message: "No se logró obtener respuesta del servidor", code:response?.status || 500}
            }

            if(response.status === 200) {
                return compiledata(response);
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
        console.log(env,'ENV DELETE =======',`${apiRoot}${apiSrv}${uriparams}`, process.env.REACT_APP_TIMEOUT,'METHOD GET ----------------------------------------------------------------')
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
                    setTimeout(() => reject(new Error('Timeout')), process.env.REACT_APP_TIMEOUT)
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
        console.log(env,'ENV GET PARAMS =======',`${apiRoot}${apiSrv}${uriparams}`, process.env.REACT_APP_TIMEOUT,'METHOD GET ----------------------------------------------------------------')
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
                    setTimeout(() => reject(new Error('Timeout')), process.env.REACT_APP_TIMEOUT)
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

    async post(apiSrv, data) {
        console.log(env, 'ENV POST =======', `${apiRoot}${apiSrv}`, process.env.REACT_APP_TIMEOUT,'METHOD POST ----------------------------------------------------------------');
        try {
            const response = await Promise.race([
                fetch(`${apiRoot}${apiSrv}`, {
                    method: 'POST',
                    mode: 'cors',
                    cache: 'no-cache',
                    credentials: 'same-origin',
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                    },
                    redirect: 'follow',
                    body: JSON.stringify(data)
                }),
                new Promise((_, reject) =>
                    setTimeout(() => reject(new Error('Timeout')), process.env.REACT_APP_TIMEOUT)
                )
            ]);

            if (!response.ok) {
                return { message: "No se logró obtener respuesta del servidor", code: response?.status || 500 }
            }

            if (response.status === 200 || 201) {
                return compiledata(response);
            } else {
                objResponse.code = response?.status || 500;
                objResponse.message = "No se logró obtener respuesta del servidor";
                return objResponse;
            }
        } catch (error) {
            objResponse.code = error?.status || 500;
            objResponse.message = "No se logró obtener respuesta del servidor";
            return objResponse;
        }
    }

    async postUploadXlxs(apiSrv, file) {
        const formData = new FormData();
        formData.append('file', file);
    
        try {
            const response = await Promise.race([
                fetch(`${apiRoot}${apiSrv}`, {
                    method: 'POST',
                    mode: 'cors',
                    cache: 'no-cache',
                    credentials: 'same-origin',
                    headers: {
                        'Access-Control-Allow-Origin': '*', // No necesitas 'Content-Type' para FormData
                    },
                    redirect: 'follow',
                    body: formData
                }),
                new Promise((_, reject) =>
                    setTimeout(() => reject(new Error('Timeout')), process.env.REACT_APP_TIMEOUT)
                )
            ]);
    
            // Aquí puedes manejar la respuesta como lo necesites
            if (!response.ok) {
                return { message: "No se logró obtener respuesta del servidor", code: response?.status || 500 }
            }
    
            if (response.status === 200) {
                return compiledata(response);
            } else {
                objResponse.code = response?.status || 500;
                objResponse.message = "No se logró obtener respuesta del servidor";
                return objResponse;
            }
        } catch (error) {
            objResponse.code = error?.status || 500;
            objResponse.message = "No se logró obtener respuesta del servidor";
            return objResponse;
        }
    };

    async put(apiSrv, data) {
        console.log(env, 'ENV PUT =======', `${apiRoot}${apiSrv}`, process.env.REACT_APP_TIMEOUT,'METHOD PUT ----------------------------------------------------------------');
        try {
            const response = await Promise.race([
                fetch(`${apiRoot}${apiSrv}`, {
                    method: 'PUT',
                    mode: 'cors',
                    cache: 'no-cache',
                    credentials: 'same-origin',
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                    },
                    redirect: 'follow',
                    body: JSON.stringify(data)
                }),
                new Promise((_, reject) =>
                    setTimeout(() => reject(new Error('Timeout')), process.env.REACT_APP_TIMEOUT)
                )
            ]);

            if (!response.ok) {
                return { message: "No se logró obtener respuesta del servidor", code: response?.status || 500 }
            }

            if (response.status === 200) {
                return compiledata(response);
            } else {
                objResponse.code = response?.status || 500;
                objResponse.message = "No se logró obtener respuesta del servidor";
                return objResponse;
            }
        } catch (error) {
            objResponse.code = error?.status || 500;
            objResponse.message = "No se logró obtener respuesta del servidor";
            return objResponse;
        }
    }
}

export default new Api();
