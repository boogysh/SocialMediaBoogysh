import Friend from "../../components/Friend";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { BiComment } from "react-icons/bi";
import { BsShare, BsThreeDots } from "react-icons/bs";
import { POST } from "../../redux/actions";
import Video from "../../components/Video";

import AllComments from "../../components/AllComments";
import { MdDelete } from "react-icons/md";
import ShareList from "../../components/ShareList";

const PostWidget = ({
  postId,
  postUserId,
  name,
  description,
  location,
  userPicturePath,
  likes,
  comments,
  postImgUrl,
  userUrl,
  payloadType,
  postsUpdate,
  setPostsUpdate,
  createdAt,
}) => {
  const [isSameUser, setIsSameUser] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [showDotsMenu, setShowDotsMenu] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  // const [authorizationMessage, setAuthorizationMessage] = useState(null);

  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.userReducer);
  const loggedInUserId = useSelector((state) => state.userReducer.user._id);
  const { thm } = useSelector((state) => state.themeReducer);

  const sameUser = postUserId === loggedInUserId;
  // console.log("sameUser", sameUser);

  //----------
  useEffect(() => {
    sameUser && setIsSameUser(true);
  }, [sameUser]);

  //------------
  const isLiked = Boolean(likes[loggedInUserId]);
  // console.log("isLiked", isLiked);
  const likeCount = Object.keys(likes).length;
  // const commentsCount = Object.keys(comments).length;

  // PATCH LIKE
  const patchLike = async () => {
    // const response = await fetch(`http://localhost:3001/posts/${postId}/like`, {
    const response = await fetch(`https://sm-boogysh-server-git-main-boogysh.vercel.app/posts/${postId}/like`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: loggedInUserId }),
    });
    const updatedPost = await response.json();
    dispatch(POST({ post: updatedPost }));
    setPostsUpdate(postsUpdate + 1); // forcing to update the page after liking
  };
  useEffect(() => {}, [isLiked]);
  //------------------------------------------

  const deletePost = async () => {
    // const response = await fetch(`http://localhost:3001/posts/${postId}`, {
    const response = await fetch(`https://sm-boogysh-server-git-main-boogysh.vercel.app/posts/${postId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: loggedInUserId }),
    });
    const notAuthorized = await response.json();
    console.log("notAuthorized", notAuthorized.message);
    // setAuthorizationMessage(`${message}`);
    // setAuthorizationMessage(notAuthorized.message);

    setPostsUpdate(postsUpdate + 1); // forcing to update the page after liking
  };

  return (
    <div className={`w-auto h-auto ${thm.bg.alt}  rounded-[10px] p-5 mb-5`}>
      <div className="flex justify-between">
        <Friend
          friendId={postUserId}
          name={name}
          subtitle={location}
          userPicturePath={userPicturePath}
          isSameUser={isSameUser}
          url={userUrl}
          createdAt={createdAt}
        />
        {sameUser && (
          <div
            className={`flex  border-[1px] ${thm.border.neutral.medium} h-fit rounded-full`}
          >
            {showDotsMenu && (
              <button
                onClick={deletePost}
                className={`w-7 h-7 flex ml-px mr-4 justify-center items-center rounded-full ${thm.bg.neutral.light_hover}`}
              >
                <MdDelete className={`w-5 h-5 ${thm.text.neutral.main}`} />
              </button>
            )}
            <button
              onClick={() => setShowDotsMenu(!showDotsMenu)}
              className={`w-7 h-7 flex  justify-center items-center rounded-full ${thm.bg.neutral.light_hover}`}
            >
              <BsThreeDots className={`w-4 h-4 ${thm.text.neutral.main}`} />
            </button>
          </div>
        )}
      </div>

      <p className={`text-sm xs:text-base  mb-5 ${thm.text.neutral.main}`}>
        {description}
      </p>

      {/* IMAGE */}
      {payloadType === "image" && (
        <img
          alt="post"
          className="width-full h-auto rounded-[0.75rem] mb-5"
          src={postImgUrl}
        />
      )}
      {/* VIDEO */}
      {payloadType === "video" && (
        <Video postImgUrl={postImgUrl} onReady="true" />
      )}

      {/* FILE */}
      {payloadType === "file" && (
        <div className={`${thm.bg.neutral.light}  rounded-[10px] p-5 mb-5`}>
          <h4 className={`${thm.text.neutral.main} font-medium`}>
            File:{" "}
            <a
              className={`underline font-normal `}
              target="blank"
              href={postImgUrl}
            >
              {postImgUrl}
            </a>
          </h4>
        </div>
      )}
      <div className="flex">
        <button
          onClick={patchLike}
          className={`w-8 h-8 flex justify-center items-center rounded-full ${thm.bg.neutral.light_hover}`}
        >
          {isLiked ? (
            <AiFillHeart className={`w-5 h-5 ${thm.text.primary.main}`} />
          ) : (
            <AiOutlineHeart className={`w-5 h-5 ${thm.text.neutral.main}`} />
          )}
        </button>
        <span className={`text-base  me-3 pt-[3px] ${thm.text.neutral.main} `}>
          {likeCount}
        </span>
        <button
          onClick={() => setShowComments(!showComments)}
          className={`w-8 h-8 ml-2 flex justify-center items-center rounded-full ${thm.bg.neutral.light_hover}`}
        >
          <BiComment className={`w-5 h-5 ${thm.text.neutral.main}`} />
        </button>
        <span className={`text-base  me-3 pt-[3px] ${thm.text.neutral.main} `}>
          {comments.length}
        </span>
        <div></div>

        {/* ---SHARE MENU------- */}
        <div
          className={`flex  border-[1px] ${thm.border.neutral.medium} h-fit rounded-full ml-auto`}
        >
          {showShareMenu && (
            <>
             
              <ShareList 
                //  title={title}
                //  id={id}
                url={`${window.location.href}#${postId}`}
                //  show_shareList={showShareList}
                //  closeShareList={closeShareList}
              />
            </>
          )}
          <button
            onClick={() => setShowShareMenu(!showShareMenu)}
            className={`w-7 h-7 flex  justify-center items-center rounded-full ${thm.bg.neutral.light_hover}`}
          >
            <BsShare className={`w-4 h-4 ${thm.text.neutral.main}`} />
          </button>
        </div>
      </div>

      {/*------------------- COMMENTS ----------------------------*/}
      <div className="flex flex-col">
        {showComments && (
          <AllComments
            userUrl={userUrl}
            postId={postId}
            showComments={showComments}
            setShowComments={setShowComments}
            postsUpdate={postsUpdate}
            setPostsUpdate={setPostsUpdate}
            comments={comments}
            name={name}
          />
        )}
      </div>
    </div>
  );
};

export default PostWidget;

// import Friend from "../../components/Friend";
// import { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
// import { BiComment } from "react-icons/bi";
// import { BsShare } from "react-icons/bs";
// import { POST } from "../../redux/actions";
// import Video from "./Video";
// import NewComment from "../../components/NewComment";
// import { FaArrowDown } from "react-icons/fa";
// import AllComments from "../../components/AllComments";
// import TwoComments from "../../components/TwoComments";

// const PostWidget = ({
//   postId,
//   postUserId,
//   name,
//   description,
//   location,
//   userPicturePath,
//   likes,
//   comments,
//   postImgUrl,
//   userUrl,
//   payloadType,
//   postsUpdate,
//   setPostsUpdate,
//   createdAt,
// }) => {
//   const [isSameUser, setIsSameUser] = useState(false);
//   const [showComments, setShowComments] = useState(false);
//   const [showTwoComments, setShowTwoComments] = useState(true);
//   const [showAllComments, setShowAllComments] = useState(false);

//   const dispatch = useDispatch();
//   const { token } = useSelector((state) => state.userReducer);
//   const loggedInUserId = useSelector((state) => state.userReducer.user._id);
//   const { thm } = useSelector((state) => state.themeReducer);

//   const sameUser = postUserId === loggedInUserId;
//   // console.log("sameUser", sameUser);

//   //----------
//   useEffect(() => {
//     sameUser && setIsSameUser(true);
//   }, [sameUser]);

//   //------------
//   const isLiked = Boolean(likes[loggedInUserId]);
//   const likeCount = Object.keys(likes).length;
//   // const commentsCount = Object.keys(comments).length;

//   // PATCH LIKE
//   const patchLike = async () => {
//     const response = await fetch(`http://localhost:3001/posts/${postId}/like`, {
//       method: "PATCH",
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ userId: loggedInUserId }),
//     });
//     const updatedPost = await response.json();
//     dispatch(POST({ post: updatedPost }));
//   };
//   // useEffect(() => {}, [isLiked]);
//   //------------------------------------------

//   return (
//     <div className={`w-auto h-auto ${thm.bg.alt}  rounded-[10px] p-5 mb-5`}>
//       <Friend
//         friendId={postUserId}
//         name={name}
//         subtitle={location}
//         userPicturePath={userPicturePath}
//         isSameUser={isSameUser}
//         url={userUrl}
//         createdAt={createdAt}
//       />
//       <p className={`text-base mb-5 ${thm.text.neutral.main}`}>{description}</p>

//       {/* IMAGE */}
//       {payloadType === "image" && (
//         <img
//           alt="post"
//           className="width-full h-auto rounded-[0.75rem] mb-5"
//           src={postImgUrl}
//         />
//       )}
//       {/* VIDEO */}
//       {payloadType === "video" && (
//         <Video postImgUrl={postImgUrl} onReady="true" />
//       )}

//       {/* FILE */}
//       {payloadType === "file" && (
//         <div className={`${thm.bg.neutral.light}  rounded-[10px] p-5 mb-5`}>
//           <h4 className={`${thm.text.neutral.main} font-medium`}>
//             File:{" "}
//             <a
//               className={`underline font-normal `}
//               target="blank"
//               href={postImgUrl}
//             >
//               {postImgUrl}
//             </a>
//           </h4>
//         </div>
//       )}
//       <div className="flex">
//         <button
//           onClick={patchLike}
//           className={`w-8 h-8 flex justify-center items-center rounded-full ${thm.bg.neutral.light_hover}`}
//         >
//           {isLiked ? (
//             <AiFillHeart className={`w-5 h-5 ${thm.text.primary.main}`} />
//           ) : (
//             <AiOutlineHeart className={`w-5 h-5 ${thm.text.neutral.main}`} />
//           )}
//         </button>
//         <span className={`text-base  me-3 pt-[3px] ${thm.text.neutral.main} `}>
//           {likeCount}
//         </span>
//         <button
//           onClick={() => setShowComments(!showComments)}
//           className={`w-8 h-8 ml-2 flex justify-center items-center rounded-full ${thm.bg.neutral.light_hover}`}
//         >
//           <BiComment className={`w-5 h-5 ${thm.text.neutral.main}`} />
//         </button>
//         <span className={`text-base  me-3 pt-[3px] ${thm.text.neutral.main} `}>
//           {comments.length}
//         </span>
//         <button
//           className={`w-8 h-8 ms-auto flex justify-center items-center rounded-full ${thm.bg.neutral.light_hover}`}
//         >
//           <BsShare className={`w-5 h-5 ${thm.text.neutral.main}`} />
//         </button>
//       </div>

//       {/*------------------- COMMENTS ----------------------------*/}
//       <div className="flex flex-col">
//         {showComments && (
//           <>
//             {/* ----Show two comments */}
//             <TwoComments
//               comments={comments}
//               showTwoComments={showTwoComments}
//             />
//             {/* ----Show all comments button */}
//             {showTwoComments && comments.length > 2 && (
//               <div className="flex justify-center items-center mb-2">
//                 <h3 className={`${thm.text.neutral.main}`}>
//                   Show all comments
//                 </h3>
//                 <button
//                   onClick={() => setShowAllComments(true)}
//                   className={`w-8 h-8 ml-2 flex justify-center items-center rounded-full ${thm.bg.neutral.light_hover}`}
//                 >
//                   <FaArrowDown className={`w-5 h-5 ${thm.text.neutral.main}`} />
//                 </button>
//               </div>
//             )}
//             <NewComment
//               userUrl={userUrl}
//               postId={postId}
//               showComments={showComments}
//               setShowComments={setShowComments}
//               postsUpdate={postsUpdate}
//               setPostsUpdate={setPostsUpdate}
//             />

//             <AllComments
//               showAllComments={showAllComments}
//               setShowAllComments={setShowAllComments}
//               setShowComments={setShowComments}
//             />

//             <button
//               onClick={() =>
//                 setShowComments(!showComments) ||
//                 setShowTwoComments(true) ||
//                 setShowAllComments(false)
//               }
//               className={`py-2 px-3 mt-1 ml-auto  ${thm.bg.neutral.light_hover} ${thm.text.neutral.main}  rounded-[3rem] text-sm`}
//             >
//               CLOSE
//             </button>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PostWidget;
