import axios from "axios";

export const http = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

http.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(import.meta.env.VITE_TOKEN_NAME);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

http.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401 && window.location.pathname !== "/login") {
            localStorage.removeItem(import.meta.env.VITE_TOKEN_NAME);
            window.location.href = "/login";
        }
        if (error.response && error.response.status === 403) {
            window.location.href = "/access-denied-403";
        }
        return Promise.reject(error);
    }
);