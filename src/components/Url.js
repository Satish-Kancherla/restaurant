import axios from "axios";
import toast from "react-hot-toast";

export function getUrl() {
    // return import.meta.env.VITE_URL || "";
    return 'http://localhost:5000'
}
const url = getUrl();

const instance = axios.create({
    baseURL: url,
});

instance.interceptors.request.use((config) => {
    const token = localStorage.getItem("accessToken");
    console.log("accessToken", token);
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});
instance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            const refreshToken = localStorage.getItem("refreshToken");
            if (!refreshToken) {
                return Promise.reject(error);
            }

            try {
                const response = await axios.post(url + "/api/v1/refresh-token", { refreshToken });
                const { accessToken } = response.data;

                toast.success("You session was expired, logging back in!");
                localStorage.setItem("accessToken", accessToken);
                api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
                originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;

                return api(originalRequest);
            } catch (refreshError) {
                // Handle refresh token failure, e.g., redirect to login
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export { instance };
