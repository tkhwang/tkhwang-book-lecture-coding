import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

const usePosts = (userId: number | undefined) => {
  const fetchPosts = () => {
    return axios
      .get("https://jsonplaceholder.typicode.com/posts", {
        params: {
          userId,
        },
      })
      .then((res) => res.data);
  };

  return useQuery<Post[], Error>({
    // /users/1/posts
    queryKey: userId ? ["users", userId, "posts"] : ["posts"],
    queryFn: fetchPosts,
    staleTime: 1 * 60 * 1000, // 1m
  });
};

export default usePosts;
