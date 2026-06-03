import { API_URL } from "@/config";
import axios from "axios";

// import { resetToken } from ".";
axios.defaults.baseURL = API_URL;
axios.defaults.withCredentials = true;

export function get(url, config) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, { ...config })
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
}

export function post(url, data, config) {
  return new Promise((resolve, reject) => {
    axios
      .post(url, data, { ...config })
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        reject(err.response.data);
      });
  });
}

export function put(url, data, config) {
  return new Promise((resolve, reject) => {
    axios
      .put(url, data, { ...config })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error.response.data);
      });
  });
}
export function del(url) {
  return new Promise((resolve, reject) => {
    axios
      .delete(url, {})
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        reject(err.response.data);
      });
  });
}

export function delQuery(url, id = "") {
  return new Promise((resolve, reject) => {
    axios
      .delete(`${url} ${id ? "=" + id : ""}`, {})
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        reject(err.response.data);
      });
  });
}
