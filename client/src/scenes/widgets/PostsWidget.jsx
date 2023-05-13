import { useState } from "react";
import PostWidget from "./PostWidget";
import { useGetPosts } from "../../hooks/useGetPosts/UseGetPosts";
import { useSelector } from "react-redux";
// import { RECIEVIED_COMMENTS } from "../../redux/actions";

const PostsWidget = ({ userId }) => {
  const [postsUpdate, setPostsUpdate] = useState(0);
  // const [recieviedComments, setRecieviedComments] = useState(0);

  const { token } = useSelector((state) => state.userReducer);
  const isProfile = window.location.href.includes(userId);

  // //--------GET POSTS-----------------------------

  const postsUrl = "http://localhost:3001/posts";
  // const postsUrl = "https://social-media-boogysh-git-main-boogysh.vercel.app/posts";
  const { posts } = useGetPosts(postsUrl, token, isProfile, postsUpdate);
  //!!! postsUpdate force posts to update, onClick on send-comment-btn
  //----------------------------

  //  //GET DIFFERNTS IMPRESSIONS
  //  useEffect(() => {
  //    const userPosts = posts.filter((post) => post.userId === _id);
  //    console.log("userPosts", userPosts);

  //    const commentsLengthArray = [];
  //    userPosts.forEach((post) => commentsLengthArray.push(post.comments.length));
  //    const result = commentsLengthArray.reduce((acc, curr) => acc + curr, 0);
  //    console.log(" commentsCount", result);
  //    // setRecievedCommentsCount(result);
  //  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
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
    </>
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
