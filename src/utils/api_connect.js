import axios from "axios";

const getAPIData = (urlSuffix) => {
    let url = window.encodeURI("https://questionmarcus.pythonanywhere.com/"+urlSuffix);
    return axios.get(url).then( response => response.data );
};

export default getAPIData;
