import axios from "axios";

// 'https://cmpsrv00.grupoavanza.com',
const $http = axios.create({
  // baseURL: 'https://cmp.grupoavanza.com', //URL_AXIOS <- buscar ese comentario para cambiar todos
  timeout: 12000,
  headers: {
    Accept: "application/json",
    "Content-Type": "multipart/form-data",
  },
});

export default $http;
