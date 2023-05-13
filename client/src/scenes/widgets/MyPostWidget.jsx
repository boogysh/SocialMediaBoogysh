import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BiImageAdd } from "react-icons/bi";
import { FiEdit2 } from "react-icons/fi";
import { AiOutlineSend } from "react-icons/ai";
import { MdClose, MdAttachFile, MdVideoLibrary } from "react-icons/md";
import { BsTrash } from "react-icons/bs";
import { POSTS } from "../../redux/actions";
import axios from "axios";

const MyPostWidget = () => {
  const dispatch = useDispatch();

  const [content, setContent] = useState({
    isImage: false,
    isVideo: false,
    isFile: false,
  });

  // const [image, setImage] = useState(null);
  const [payload, setPayload] = useState(null);
  const [post, setPost] = useState("");
  const [postBorder, setPostBorder] = useState("");

  const { _id, url } = useSelector((state) => state.userReducer.user);
  const { token } = useSelector((state) => state.userReducer);
  const { thm } = useSelector((state) => state.themeReducer);

  let contentType;
  content.isImage && (contentType = "image");
  content.isVideo && (contentType = "video");
  content.isFile && (contentType = "file");

  let formatFile;
  content.isImage && (formatFile = ".jpg, .jpeg, .png");
  content.isVideo && (formatFile = ".mp4, .mov");
  content.isFile && (formatFile = "*");

  const resetValues = () => {
    setPayload(false);
    setPost("");
  };

  const postBorderNormalFunc = () => {
    setPostBorder("");
  };

  const postBorderRedFunc = () => {
    setPostBorder("border-2 border-red-500");
  };

  const handlePost = async () => {
    const formData = new FormData();
    if (post) {
      formData.append("userId", _id);
      formData.append("userUrl", url);
      formData.append("description", post);
      payload && formData.append("payload", payload);
      payload && formData.append("payloadType", contentType);

      const response = await axios.post(
        // `http://localhost:3001/posts`,
        `https://sm-boogysh-server-git-main-boogysh.vercel.app`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // fetch don't work ->  problem: boundary
      // const response = await fetch(`http://localhost:3001/posts`, {
      //   method: "POST",
      //   headers: { Authorization: `Bearer ${token}` },
      //   body: formData,
      // });

      // const posts = await response.json();
      // dispatch(POSTS(posts));
      dispatch(POSTS(response));
      resetValues();
      setPostBorder("");
      setContent({ isImage: false, isVideo: false, isFile: false });
    } else {
      postBorderRedFunc();
    }
  };

  return (
    <div className={`w-auto h-auto ${thm.bg.alt} rounded-[10px] p-5 mb-5`}>
      <div className="flex">
        <img
          className="w-[50px] h-[50px] object-cover rounded-[50%] mr-3"
          src={url}
          alt="user"
        />
        <input
          className={`w-full py-[1rem] px-[2rem] ${thm.bg.neutral.light}  ${thm.text.neutral.main} rounded-[2rem] ${postBorder}`}
          type="text"
          placeholder="What's on your mind..."
          onChange={(e) => setPost(e.target.value)}
          onInput={postBorderNormalFunc}
          value={post}
        />
      </div>
      {(content.isImage || content.isVideo || content.isFile) && (
        <div>
          <hr className={`w-full h-px mt-[1.25rem] ${thm.devidier}`} />
          {/* CLOSE INPUT FILE */}
          {(content.isImage || content.isVideo || content.isFile) && (
            <button
              onClick={() =>
                setContent({ isImage: false, isVideo: false, isFile: false })
              }
              className={`flex  p-[6px] my-1 h-fit ml-auto  rounded-full ${thm.bg.neutral.light_hover}`}
            >
              <MdClose className={` ${thm.text.neutral.main} w-5 h-5`} />
            </button>
          )}

          <div className=" flex items-center border border-gray-400 rounded-[5px] w-full h-auto p-5 mb-3 ">
            <div className="relative border-[3px] border-dashed border-blue-200 w-full h-full px-5 cursor-pointer">
              <input
                className="opacity-0 w-full h-full absolute"
                type="file"
                onChange={(e) => setPayload(e.target.files[0])}
                accept={formatFile}
                value={(e) => e.target.files[0]}
              />
              <div className="flex items-center">
                {!payload ? (
                  <p
                    className={`py-5 ${thm.text.neutral.main}`}
                  >{`Add ${contentType} here`}</p>
                ) : (
                  <p className={`py-5 ${thm.text.neutral.main}`}>
                    {payload.name}
                  </p>
                )}
                <FiEdit2
                  className={`w-5 h-5 ml-auto ${thm.text.neutral.main}`}
                />
              </div>
            </div>
            {payload ? (
              <button
                onClick={() => setPayload(null)}
                className={`p-2  ml-3 rounded-full ${thm.bg.neutral.light_hover}`}
              >
                <BsTrash className={`w-5 h-5 ${thm.text.neutral.main} `} />
              </button>
            ) : null}
          </div>
        </div>
      )}
      <hr className={`w-full h-px my-[1.25rem] ${thm.devidier}`} />
      <div className="flex items-center">
        {/* ADD IMAGE */}
        <button
          className={`p-1 rounded-full ${thm.bg.neutral.light_hover}`}
          onClick={() => setContent({ isImage: true })}
        >
          <BiImageAdd className="w-6 h-6 text-gray-500" />
        </button>
        <span className="hidden xs:inline text-sm text-gray-500 ml-1 mr-3">
          Image
        </span>

        {/*   ADD VIDEO */}
        <button
          className={`p-[6px] rounded-full ${thm.bg.neutral.light_hover} ml-2 xs:ml-0`}
          onClick={() => setContent({ isVideo: true })}
        >
          <MdVideoLibrary className="w-5 h-5 text-gray-500" />
        </button>
        <span className="hidden xs:inline text-sm text-gray-500 ml-1  mr-3">
          Video
        </span>

        {/* ADD FILE */}
        <button
          className={`p-1 rounded-full ${thm.bg.neutral.light_hover} ml-2 xs:ml-0`}
          onClick={() => setContent({ isFile: true })}
        >
          <MdAttachFile className="w-5 h-5 text-gray-500" />
        </button>
        <span className="hidden xs:inline text-sm text-gray-500 ml-1 mr-3">
          Attachment
        </span>

        <button
          // disabled={!comment}
          onClick={handlePost}
          className={`p-2 ${thm.bg.neutral.light_hover}  rounded-full ml-auto`}
        >
          <AiOutlineSend
            className={` ${thm.text.neutral.main} ml-[2px] w-[20px] h-[20px]`}
          />
        </button>
      </div>
    </div>
  );
};

export default MyPostWidget;
