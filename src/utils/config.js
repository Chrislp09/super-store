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
};

export default config;