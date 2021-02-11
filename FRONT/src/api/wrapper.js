import api from './api';
import { BASE_URL } from "../env";
const axios = require('axios');

export async function getScores () {
    return axios.get(BASE_URL+'/scores')
}

export async function postScore (data) {
    return axios.post(BASE_URL+'/scores', data)
}
