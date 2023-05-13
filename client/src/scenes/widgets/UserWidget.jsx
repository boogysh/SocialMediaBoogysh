import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineManageAccounts } from "react-icons/md";
import { GoLocation } from "react-icons/go";
import { BsBriefcase } from "react-icons/bs";
import { useGetPosts } from "../../hooks/useGetPosts/UseGetPosts";
import Visitors from "../../components/Visitors";
import SocialProfiles from "../../components/SocialProfiles";
import { GUESTS } from "../../redux/actions";

const UserWidget = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [recievedLikes, setRecievedLikes] = useState(0);
  const [recievedComments, setRecievedComments] = useState(0);
  const [showVisitors, setShowVisitors] = useState(false);
  const [updateUser, setUpdateUser] = useState(0);
  const { token } = useSelector((state) => state.userReducer);
  const { thm } = useSelector((state) => state.themeReducer);
  const { friends } = useSelector((state) => state.userReducer);
  const isProfile = window.location.href.includes(userId);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const getUser = async () => {
      // const response = await fetch(`http://localhost:3001/users/${userId}`, {
      const response = await fetch(`${process.env.REACT_APP_URL}/users/${userId}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      console.log("data-ser:::", data);
      setUser(data);
      dispatch(GUESTS(data.viewedProfile));
    };
    getUser();
  }, [
    user?.twitterUrl?.length,
    user?.viewedProfile?.length,
    updateUser,
    token,
    userId,
    dispatch,
  ]);
  // eslint-disable-line react-hooks/exhaustive-deps

  // //--------GET POSTS-----------------------------
  // const postsUrl = "http://localhost:3001/posts";
  const postsUrl =`${process.env.REACT_APP_URL}/posts`;
  const { posts } = useGetPosts(postsUrl, token, isProfile);
  //!!! postsUpdate force posts to update, onClick on send-comment-btn
  //----------------------------
  //GET DIFFERNTS IMPRESSIONS
  useEffect(() => {
    const userPosts = posts.filter((post) => post.userId === userId);
    console.log("userPosts", userPosts);
    const likesLengthArray = [];
    const commentsLengthArray = [];
    //-
    // userPosts.forEach((post) => likesLengthArray.push(post.likes.length));
    userPosts.forEach((post) =>
      likesLengthArray.push(Object.keys(post.likes).length)
    );
    userPosts.forEach((post) => commentsLengthArray.push(post.comments.length));
    //-
    const likesCount = likesLengthArray.reduce((acc, curr) => acc + curr, 0);
    console.log(" likesCount", likesCount);
    setRecievedLikes(likesCount);
    //-
    const commentsCount = commentsLengthArray.reduce(
      (acc, curr) => acc + curr,
      0
    );
    console.log(" commentsCount", commentsCount);
    setRecievedComments(commentsCount);
  }, [posts, userId]);
  //eslint-disable-line react-hooks/exhaustive-deps
  if (!user) {
    return null;
  }
  const {
    firstName,
    lastName,
    location,
    occupation,
    // viewedProfile,
    twitterUrl,
    linkedinUrl,
    url,
  } = user;
  // console.log("user", user);
  return (
    <div
      className={`w-full h-auto ${thm.bg.alt} rounded-[10px] p-5 overflow-hidden`}
    >
      <div className="w-full flex items-center">
        <img
          className="w-[60px] h-[60px] object-cover rounded-[50%]"
          src={url}
          alt="user"
        />
        <div className="ps-3 py-4">
          <h1 className={`${thm.text.neutral.dark} text-lg font-medium`}>
            {firstName} {lastName}
          </h1>
          <h2 className={`${thm.text.neutral.dark} text-sm`}>
            {friends?.length} friends
          </h2>
        </div>
        <button
          className={`flex justify-center items-center rounded-full w-10 h-10 ${thm.bg.neutral.light_hover} ml-auto`}
        >
          <MdOutlineManageAccounts
            onClick={() => navigate(`/profile/${userId}`)}
            className={`w-6 h-6 ${thm.text.neutral.main}`}
          />
        </button>
      </div>

      <hr className={`w-full h-px my-3 ${thm.devidier}`} />

      <div className="flex items-center mb-1 py-2">
        <GoLocation className={`w-6 h-6 ${thm.text.neutral.main}`} />
        <span
          className={`ms-4 text-[0.9rem] ${thm.text.neutral.medium} font-medium`}
        >
          {location}
        </span>
      </div>
      <div className="flex items-center pb-3 ">
        <BsBriefcase className={`w-6 h-6 ${thm.text.neutral.main}`} />
        <span
          className={`ms-4 text-[0.9rem] ${thm.text.neutral.medium} font-medium`}
        >
          {occupation}
        </span>
      </div>

      <hr className={`w-full h-px my-3 ${thm.devidier}`} />
      {/* Who's viewed your profile */}

      {/* <div className="relative flex justify-between mt-2 mb-1">
        <div
          onClick={() => setShowVisitors(true)}
          className={`text-sm cursor-pointer ${thm.text.neutral.medium} ${thm.text.primary.main_hover}`}
        >
          Who's viewed your profile
        </div>

        <span className={`${thm.text.neutral.main} text-sm`}>
          {viewedProfile.length}
        </span>
      </div> */}

      {showVisitors && (
        <Visitors setShowVisitors={setShowVisitors} userId={userId} />
      )}

      {/* Likes of your posts */}
      <div className="flex justify-between mb-1">
        <span className={`text-sm ${thm.text.neutral.medium}`}>
          Likes of your posts
        </span>
        <span className={`${thm.text.neutral.main} text-sm`}>
          {recievedLikes}
        </span>
      </div>
      {/* Comments of your posts */}
      <div className="flex justify-between">
        <span className={`text-sm ${thm.text.neutral.medium}`}>
          Comments of your posts
        </span>
        <span className={`${thm.text.neutral.main} text-sm`}>
          {recievedComments}
        </span>
      </div>

      <hr className={`w-full h-px my-3 ${thm.devidier}`} />
      {/* SOCIAL PROFILES */}
      <SocialProfiles
        userId={userId}
        twitterUrl={twitterUrl}
        linkedinUrl={linkedinUrl}
        updateUser={updateUser}
        setUpdateUser={setUpdateUser}
      />
    </div>
  );
};

export default UserWidget;
