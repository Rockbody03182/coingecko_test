import axios, { AxiosRequestConfig } from 'axios';
import qs from 'qs';

const METHOD_GET = 'get';
const METHOD_POST = 'post';
const METHOD_PUT = 'put';
const METHOD_DELETE = 'delete';

function requestAPI(
  method: string,
  url: string,
  _headers: Record<string, string> = {},
  _dataBody?: unknown,
  isJSON = false,
) {
  const headers = { ..._headers };
  let dataBody = _dataBody;

  if (isJSON) {
    headers['Content-Type'] = 'application/json';
  }

  if (isJSON && (method === METHOD_POST || method === METHOD_PUT)) {
    headers['Content-Type'] = 'multipart/form-data';
    // dataBody = dataBody;
  } else if (method === METHOD_POST || method === METHOD_PUT) {
    headers['Content-Type'] = 'application/x-www-form-urlencoded';
    dataBody = qs.stringify(dataBody);
  }

  const config: AxiosRequestConfig = {
    url,
    headers,
    method,
    validateStatus: () => true,
    withCredentials: true,
  };

  if (method === METHOD_GET) {
    config.params = dataBody;
  } else {
    config.data = dataBody;
  }

  return axios(config);
}

const ApiCaller = {
  get(url: string, dataBody?: unknown, isJSON = false, headers: Record<string, string> = {}, baseUrl?: string) {
    return requestAPI(METHOD_GET, url, headers, dataBody, isJSON);
  },

  post(url: string, dataBody?: unknown, isJSON = false, headers: Record<string, string> = {}, baseUrl?: string) {
    return requestAPI(METHOD_POST, url, headers, dataBody, isJSON);
  },

  put(url: string, dataBody?: unknown, isJSON = false, headers: Record<string, string> = {}, baseUrl?: string) {
    return requestAPI(METHOD_PUT, url, headers, dataBody, isJSON);
  },

  delete(url: string, dataBody?: unknown, isJSON = false, headers: Record<string, string> = {}, baseUrl?: string) {
    return requestAPI(METHOD_DELETE, url, headers, dataBody, isJSON);
  },
};

export { ApiCaller };
