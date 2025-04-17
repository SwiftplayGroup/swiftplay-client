import { api } from "./api";
import { Thread } from "@/types/threads";
import { Post } from "@/types/posts";

export const getReplies = async (threadID: string): Promise<Post[]> => {
  const { data } = await api.get(`/threads/${threadID}/posts`);
  return data;
};

export const getThread = async (threadID: string): Promise<Thread> => {
  const { data } = await api.get(`/threads/${threadID}`);
  return data;
};
