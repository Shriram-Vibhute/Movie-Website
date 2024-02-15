import axios from "axios";

const BASE_URL = // Your Base Url
const API_TOKEN = // Your Api Token

const headers = {
    Authorization: `Bearer ${API_TOKEN}`,
    accept: "application/json"
};

export const fetchDataFromUrl = async (url, params) => {
    try {
        const { data } = await axios.get(BASE_URL + url, { headers, params });
        return data;
    } catch (error) {
        console.log(error);
        return error;
    }
};
