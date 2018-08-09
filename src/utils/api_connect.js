import axios from "axios";

const getAPIData = (urlSuffix) => {
    let url = window.encodeURI("http://localhost:5000/"+urlSuffix);
    return axios.get(url).then( response => response.data );
};

export default getAPIData;
