import { http } from "../config/axios.config";

export const loginService = async (credentials) => {
    const response = await http.post("/login", credentials);
    return response.data;
}

export const infoService = async () => {
    const response = await http.get("/info");
    return response.data;
}

export const registerService = async (userData) => {
    const response = await http.post("/register", userData);
    return response.data;
}