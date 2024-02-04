import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";
const API_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YjUzYmNmZjM3YWZmZDM4MzE3NzljMjZmNTAxMmEzNyIsInN1YiI6IjY1ODY3NmQzNGRhM2Q0NjNhMTQxNjk1YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Xn1hcmahzgYPomtdBeQbnYP02Nj6xw48YWpObLUY67s";

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
