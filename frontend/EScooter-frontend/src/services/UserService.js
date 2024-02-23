import axios from "axios"

const REST_API_BASE_URL = 'http://localhost:8080/api/user';
const REST_API_GET_USERS = 'http://localhost:8080/api/user/get_all';

export const listUsers = () => axios.get(REST_API_GET_USERS);
