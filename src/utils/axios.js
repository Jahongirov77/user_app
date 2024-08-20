import axios from "axios";

let mainURL = "https://json-api.uz/api/project/cars";
export const axiosClient = axios.create({
  baseURL: mainURL,
});

axiosClient.interceptors.request.use((config) => {
  const token = window.localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    try {
      if (error.response.status == 403 && !originalRequest._retry) {
        originalRequest = true;

        const refresh_token = window.localStorage.getItem("refresh_token");

        const { data } = await axios.post(mainURL + "/auth/refresh-token", {
          refresh_token,
        });

        window.localStorage.setItem("access_token", data.access_token);

        return axiosClient(originalRequest);
      }
    } catch (error) {
      console.log(error.message);
      window.localStorage.removeItem("access_token");
      window.localStorage.removeItem("refresh_token");
    }

    return new Promise.reject(error);
  }
);

export default axiosClient;
