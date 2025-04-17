import { api } from "./api";

export const getForums = async () => {
  const response = await api.get("/forums");
  return response.data;
};

export const getThreads= async (forumID: string) => {
  const response = await api.get(`/forums/${forumID}/threads`);
  return response.data;
}


