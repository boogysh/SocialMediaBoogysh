import { useState, useEffect } from "react";
import { POSTS } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export function useGetPosts(postsUrl, token, isProfile, postsUpdate) {
  const storedPosts =  useSelector((state) => state.userReducer.posts);
  const [posts, setPosts] = useState([]);
  const { userId } = useParams();

  const dispatch = useDispatch();
  useEffect(() => {
    if (!postsUrl) return;
    const getPosts = async () => {
      // const response = await fetch("http://localhost:3001/posts", {
      const response = await fetch(postsUrl, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      const userPosts = data.filter((post) => post.userId === userId);

      if (isProfile) {
        dispatch(POSTS({ posts: userPosts }));
        setPosts(userPosts);
      } else {
        dispatch(POSTS({ posts: data }));
        setPosts(data);
      }
    };
    getPosts();
  }, [storedPosts?.length, token, postsUrl, postsUpdate, dispatch, isProfile, userId]);
  return { posts };
}
