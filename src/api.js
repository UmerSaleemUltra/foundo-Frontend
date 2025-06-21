import axiosRequest from "./axios-request"

const serverURL = "https://foundo-backend.vercel.app/"

const post_data = async (url, body) => {
    try {
        var response = await axiosRequest.post(`/api/${url}`, body);
        var data = response.data;
        return data;
    } catch (e) {
        return e;
    }
};

const get_data = async (url) => {
    try {
        var response = await axiosRequest.get(`/api/${url}`);
        var data = response.data;
        return data;
    } catch (e) {
        return e;
    }
};

export {
    serverURL,
    post_data,
    get_data,
};