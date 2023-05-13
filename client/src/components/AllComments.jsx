import React from "react";
import { MdClose } from "react-icons/md";
import { useSelector } from "react-redux";
import NewComment from "./NewComment";
import Comments from "./Comments";

const AllComments = ({
  showComments,
  setShowComments,
  userUrl,
  postId,
  postsUpdate,
  setPostsUpdate,
  comments,
  name,
}) => {
  const { thm } = useSelector((state) => state.themeReducer);

  return (
    <div
      className={`bg-gray-700/50 fixed z-10  bottom-0 left-0 top-0 right-0 w-[100%] h-[100%]  bg-cover flex justify-center items-center `}
    >
      <div
        className={`${thm.bg.alt} w-[95%] xxs:w-[90%] xs:w-[85%] md:w-[70%] lg:w-[55%] xl:w-[36%]  h-auto max-h-[600px]  rounded-[20px]`}
      >
        {/* HEADER */}
        <div
          className={`${thm.bg.alt} rounded-t-[20px] w-full h-auto flex items-center py-1 px-3 `}
        >
          <h2
            className={`${thm.text.neutral.main} w-full text-lg font-medium py-3 text-center`}
          >
            Posted by {name}
          </h2>
          <button
            onClick={() => setShowComments(false)}
            className={`w-8 h-8 ml-auto flex justify-center items-center rounded-full ${thm.bg.neutral.light_hover}`}
          >
            <MdClose className={` ${thm.text.neutral.main} w-5 h-5`} />
          </button>
        </div>
        {/* CONTENT */}
        <div className={`p-5 w-full h-auto max-h-[400px] overflow-y-scroll  border-y-[1px] ${thm.bg.neutral.light_border} `}>
          {comments.length > 0 ? (
            <Comments comments={comments} />
          ) : (
            <p
              className={`${thm.text.neutral.main} text-sm sm:text-base font-sans`}
            >
              The list is empty
            </p>
          )}
        </div>
        {/* FOOTER */}
        <div className={`${thm.bg.alt} sticky bottom-0 z-10 rounded-b-[20px] mt-5`}>
          {/* <hr className={`w-full h-px mb-4 bt-3 ${thm.devidier}`} /> */}

          <NewComment
            userUrl={userUrl}
            postId={postId}
            showComments={showComments}
            setShowComments={setShowComments}
            postsUpdate={postsUpdate}
            setPostsUpdate={setPostsUpdate}
          />
        </div>
      </div>
    </div>
  );
};

export default AllComments;
