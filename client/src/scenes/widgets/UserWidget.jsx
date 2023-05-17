import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { MdDelete, MdOutlineManageAccounts } from "react-icons/md";
import { GoLocation } from "react-icons/go";
import { BsBriefcase, BsThreeDots } from "react-icons/bs";
import Visitors from "../../components/Visitors";
import SocialProfiles from "../../components/SocialProfiles";
import { GUESTS, PROFILE } from "../../redux/actions";
import AddOrRemoveFriend from "../../components/AddOrRemoveFriend";
import ConfirmDeleteAccount from "../../components/ConfirmDeleteAccount";

const UserWidget = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [showDotsMenu, setShowDotsMenu] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const { profile } = useSelector((state) => state.userReducer);
  console.log("profile", profile);
  const [recievedLikes, setRecievedLikes] = useState(0);
  const [recievedComments, setRecievedComments] = useState(0);
  const [showVisitors, setShowVisitors] = useState(false);
  const [updateUser, setUpdateUser] = useState(0);
  const { token } = useSelector((state) => state.userReducer);
  const { posts } = useSelector((state) => state.userReducer);
  const loggedUserId = useSelector((state) => state.userReducer.user._id);
  const { thm } = useSelector((state) => state.themeReducer);
  const { userFriends } = useSelector((state) => state.userReducer);
  const isFriend = userFriends?.find((friend) => friend._id === userId);
  useEffect(() => {}, [isFriend, userFriends?.length]);

  // console.log("userId", userId);
  // console.log("loggedUserId", loggedUserId);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const homePage = window.location.href.includes("/home");
  const profilePage = window.location.href.includes("/profile");

  //
  useEffect(() => {
    const getUser = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_URL}/users/${userId}`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await response.json();
      console.log("data-ser:::", data);
      setUser(data);
      dispatch(GUESTS(data.viewedProfile));
      dispatch(PROFILE(data));
    };
    getUser();
  }, [
    user?.twitterUrl?.length,
    user?.viewedProfile?.length,
    user?.friends?.length,
    updateUser,
    token,
    userId,
    dispatch,
  ]);

  //GET DIFFERNTS IMPRESSIONS
  useEffect(() => {
    const userPosts = posts?.filter((post) => post.userId === userId);
    console.log("userPosts", userPosts);
    const likesLengthArray = [];
    const commentsLengthArray = [];
    //-
    userPosts?.forEach((post) =>
      likesLengthArray.push(Object.keys(post.likes).length)
    );
    userPosts?.forEach((post) =>
      commentsLengthArray.push(post.comments.length)
    );
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

  if (!user) {
    return null;
  }
  const {
    firstName,
    lastName,
    location,
    occupation,
    friends,
    twitterUrl,
    linkedinUrl,
    url,
    // } = user;
  } = user;

  return (
    <div
      className={`w-full h-auto ${thm.bg.alt} rounded-[10px] p-5 overflow-hidden`}
    >
      <div className="w-full flex items-center">
        <img
          className="w-[50px] h-[50px]  lg:w-[60px] lg:h-[60px] object-cover rounded-[50%]"
          src={url}
          alt="user"
        />
        <div className="ps-3 py-4 md:pl-2">
          <h1 className={`${thm.text.neutral.dark} text-lg font-medium`}>
            {firstName} {lastName}
          </h1>
          <h2 className={`${thm.text.neutral.dark} text-sm`}>
            {friends?.length} friends
          </h2>
        </div>
        <div className="flex ml-auto">
          {homePage && (
            //  MANAGE PROFILE
            <button
              className={`flex justify-center items-center rounded-full w-10 h-10 ${thm.bg.neutral.light_hover}`}
            >
              <MdOutlineManageAccounts
                onClick={() => navigate(`/profile/${userId}`)}
                className={`w-6 h-6 ${thm.text.neutral.main}`}
              />
            </button>
          )}
          {/* DOTS MENU  */}
          {profilePage && userId === loggedUserId && (
            <div
              className={`flex  border-[1px] ${thm.border.neutral.medium} h-fit rounded-full`}
            >
              {showDotsMenu && (
                <button
                  // onClick={deleteUser}
                  onClick={() => setShowDeleteConfirm(!showDeleteConfirm)}
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
          {/* SHOW DELETE CONFIRMATION ACCOUNT MODAL */}
          {showDeleteConfirm && (
            <ConfirmDeleteAccount
              user={user}
              setShowDeleteConfirm={setShowDeleteConfirm}
            />
          )}
        </div>

        {profilePage && userId !== loggedUserId && (
          <AddOrRemoveFriend
            friendId={userId} //useParams
            _id={loggedUserId}
            isFriend={isFriend}
          />
        )}
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
