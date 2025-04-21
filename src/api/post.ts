import { api } from "./api";
import { Post } from "@/types/posts";
import { CreatePostPayload } from "@/types/posts";

export const createPost = async (post: CreatePostPayload): Promise<Post> => {
  const { data } = await api.post("/posts", post);
  return data;
};
