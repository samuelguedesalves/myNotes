import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api-carrot.herokuapp.com/',
});

export default api;