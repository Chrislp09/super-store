const config = {
    env: "dev",
    dev: {
        apiRoot: process.env.REACT_APP_CONNECT_DEV
    },
    local: {
        apiRoot: process.env.REACT_APP_CONNECT_LOCAL
    },
    //LISTADO DE ENDOINTS API
    apiSrvStoreProduct: "/products",
    apiSrvUploadXlsx: "/gestor/uploadXlsx",
    apiSrvGetDataList: "/gestor/dataList",
    apiSrvGetCatalog: "/gestor/catalog",
    apiSrvPostCreateRegiter: "/gestor/guardarRegistro",
    apiSrvPutRegiter: "/gestor/editarRegistro",
    apiSrvDeleteRegiter: "/gestor/eliminarRegistro",
    apiSrvGetRegiter: "/gestor/obtenerRegistro"

};

export default config;