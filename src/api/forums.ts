import { api } from "./api";

export const getForums = async () => {
  const response = await api.get("/forums");
  return response.data;
};

export const getPosts = async (forumID: string) => {
  const response = await api.get(`/forums/${forumID}/posts?threads_only=true`);
  return response.data;
}


