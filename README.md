# Prueba Test - Frontend

## Configuración

El archivo de configuración se encuentra en `config/config.js`, donde se especifican las diferentes configuraciones según el entorno segun el ambiente.

```javascript
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
```
En este archivo, se especifica que el entorno de "dev" utiliza la base de datos en la nube MongoDB con la data del archivo CSV proporcionado.

## Ejecución del Proyecto
Para correr el proyecto, sigue los siguientes pasos:

Ejecuta npm install para instalar las dependencias del proyecto.
Luego, ejecuta el proyecto con el comando npm start.

Versiones Utilizadas

Node.js: v20.5.1

npm: v9.8.0
