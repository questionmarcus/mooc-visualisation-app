import axios from "axios";

const getAPIData = (urlSuffix) => {
    const currentURL = window.location.href;
    const baseURL = currentURL.includes("localhost") ? "http://localhost:5000/" : "https://questionmarcus.pythonanywhere.com/";
    let url = window.encodeURI(baseURL+urlSuffix);
    return axios.get(url).then( response => response.data );
};

export default getAPIData;
