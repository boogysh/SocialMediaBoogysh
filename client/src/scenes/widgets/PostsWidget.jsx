import { useState } from "react";
import PostWidget from "./PostWidget";
import { useGetPosts } from "../../hooks/useGetPosts/UseGetPosts";
import { useSelector } from "react-redux";
import Error500 from "../Errors/Error500";
// import Loader from "../../components/Loader/Loader";

const PostsWidget = ({ userId }) => {
  const [postsUpdate, setPostsUpdate] = useState(0);
  const { token } = useSelector((state) => state.userReducer);
  const isProfile = window.location.href.includes(userId);

  // //--------GET POSTS-----------------------------

  const postsUrl = `${process.env.REACT_APP_URL}/posts`;
  // const { posts, isLoading, error } = useGetPosts(
  const { posts,  error } = useGetPosts(
    postsUrl,
    token,
    isProfile,
    postsUpdate
  );
  //!!! postsUpdate force posts to update, onClick on send-comment-btn

  if (error) return <Error500 />;
  // return isLoading ? (
    // <Loader />
  //) :
  return (
    <section>
      {posts?.length > 0 &&
        posts.map(
          ({
            _id,
            userId,
            firstName,
            lastName,
            description,
            location,
            picturePath,
            userPicturePath,
            likes,
            comments,
            postImgUrl,
            userUrl,
            payloadType,
            createdAt,
          }) => (
            <PostWidget
              key={_id}
              postId={_id}
              postUserId={userId}
              name={`${firstName} ${lastName}`}
              description={description}
              location={location}
              picturePath={picturePath}
              userPicturePath={userPicturePath}
              likes={likes}
              comments={comments}
              postImgUrl={postImgUrl}
              userUrl={userUrl}
              payloadType={payloadType}
              postsUpdate={postsUpdate}
              setPostsUpdate={setPostsUpdate}
              createdAt={createdAt}
            />
          )
        )}
    </section>
  );
};

export default PostsWidget;

// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { POSTS } from "../../redux/actions";
// import PostWidget from "./PostWidget";

// const PostsWidget = ({ userId, isProfile = false }) => {
//   const dispatch = useDispatch();
//   const posts = useSelector((state) => state.userReducer.posts);
//   const { token } = useSelector((state) => state.userReducer);

//   const getPosts = async () => {
//     const response = await fetch("http://localhost:3001/posts", {
//       method: "GET",
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     const data = await response.json();
//     dispatch(POSTS({ posts: data }));
//   };

//   const getUserPosts = async () => {
//     const response = await fetch(
//       `http://localhost:3001/posts/${userId}/posts`,
//       {
//         method: "GET",
//         headers: { Authorization: `Bearer ${token}` },
//       }
//     );
//     const data = await response.json();
//     dispatch(POSTS({ posts: data }));
//   };

//   useEffect(() => {
//     if (isProfile) {
//       getUserPosts();
//     } else {
//       getPosts();
//     }
//   }, []); // eslint-disable-line react-hooks/exhaustive-deps

//   return (
//     <>
//       {posts.map(
//         ({
//           _id,
//           userId,
//           firstName,
//           lastName,
//           description,
//           location,
//           picturePath,
//           userPicturePath,
//           likes,
//           comments,
//         }) => (
//           <PostWidget
//             key={_id}
//             postId={_id}
//             postUserId={userId}
//             name={`${firstName} ${lastName}`}
//             description={description}
//             location={location}
//             picturePath={picturePath}
//             userPicturePath={userPicturePath}
//             likes={likes}
//             comments={comments}
//           />
//         )
//       )}
//     </>
//   );
// };

// export default PostsWidget;
