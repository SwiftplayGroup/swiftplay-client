import { api } from "./api";

export const getForums = async () => {
    const response = await api.get("/forums");
    return response.data;
};