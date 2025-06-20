import axios from "axios";

const serverURL = "https://foundo-backend.vercel.app"
// const serverURL = "https://api.leegal.co"

const axiosRequest = axios.create({
    baseURL: serverURL,
});

axiosRequest.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("authToken");
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosRequest;