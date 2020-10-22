import axios from "axios";
import * as apiConfig from "settings/apiConfig";

const apiCaller = (endpoint, method = "GET", body = null) => {
  return axios({
    url: `${apiConfig.BASE_URL}/${endpoint}`,
    method: method,
    data: body,
  });
};

export default apiCaller;
