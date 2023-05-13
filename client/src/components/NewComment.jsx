import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { AiOutlineSend } from "react-icons/ai";
import { POST } from "../redux/actions";

const NewComment = ({ userUrl, postId, postsUpdate, setPostsUpdate }) => {
  const [comment, setComment] = useState("");
  const { thm } = useSelector((state) => state.themeReducer);
  const { token } = useSelector((state) => state.userReducer);
  const posts = useSelector((state) => state.userReducer.posts);

  const { firstName, lastName, url } = useSelector(
    (state) => state.userReducer.user
  );
  const dispatch = useDispatch();

  // NOT NECESSARY
  // const nextRow = (e) => {
  //   if (e.keyCode === 13) {
  //     e.preventDefault();
  //     setComment({ ...(comment + "\n") });
  //     // setComment({ ...(comment + "<br>") });
  //   }
  // };

  const matchComment = (e) => {
    const val = e.target.value;
    const whitespace = val.slice(-1) === "\n";
    console.log("whitespace", whitespace);
    if (whitespace) {
      setComment(val.slice(0, val.lastIndexOf()));
    } else {
      setComment(val);
    }
  };
  console.log("matchedComment", comment);

  const newComment = {
    postId: `${postId}`,
    description: `${comment}`,
    name: `${firstName} ${lastName}`,
    url: `${url}`,
  };
  console.log("newComment", newComment);

  const patchComment = async () => {
    const response = await fetch(
      // `http://localhost:3001/posts/${postId}/comment`,
      `${process.env.REACT_APP_URL}/posts/${postId}/comment`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newComment),
      }
    );
    const updatedPost = await response.json();
    console.log("updatedPost---", updatedPost);
    setPostsUpdate(postsUpdate + 1);
    dispatch(POST({ post: updatedPost }));
    setComment("");
    //
    const commentTextarea = document.querySelectorAll("textarea");
    commentTextarea.forEach((input) => (input.value = ""));
  };

  console.log("posts", posts);

  return (
    <div className=" flex flex-col pb-5 px-5">
      {/* <hr className={`w-full h-px mb-4 bt-3 ${thm.devidier}`} /> */}
      <div className="flex">
        <img
          src={userUrl}
          alt="user"
          className="w-[36px] h-[36px] object-cover rounded-[50%] mr-1"
        />
        <div
          className={`${thm.bg.neutral.light} ${thm.text.neutral.main} flex items-center w-full h-auto  rounded-[10px] px-5 py-2 `}
        >
          <textarea
            onChange={matchComment}
            // onKeyUp={nextRow}
            type="text"
            id="newComment"
            placeholder="Leave a comment..."
            className={`flex flex-wrap w-full min-h-[50px]  h-auto resize-none  ${thm.bg.neutral.light} ${thm.text.neutral.main} p-2 text-[0.92rem]`}
          />
          <button
            disabled={!comment}
            onClick={patchComment}
            className="flex items-center justify-center hover:bg-gray-300 h-9 w-9 ml-4 rounded-full"
          >
            <AiOutlineSend
              className={` ${thm.text.neutral.main} ml-[2px] w-[20px] h-[20px]`}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewComment;
