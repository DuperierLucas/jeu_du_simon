import api from './api';
import { BASE_URL } from "../env";
const axios = require('axios');

export async function getUsers () {
    return axios.post(BASE_URL+'/login', {email, password})
}
