import React from "react";
import { useSelector } from "react-redux";
import Friend from "../../components/Friend";
import { v4 as uuidv4 } from "uuid";
import { useGetFriends } from "../../hooks/useGetFriends";
import Error500 from "../Errors/Error500";
import Loader from "../../components/Loader/Loader";

const FriendListWidget = () => {
  // const { profileFriends } = useSelector((state) => state.userReducer);
  // console.log(" profileFriends", profileFriends);
  //-
  const { thm } = useSelector((state) => state.themeReducer);
  const { user, token } = useSelector((state) => state.userReducer);

  ////--------GET FRIENDS----custom hook--------------------------

  const friendsUrl = `${process.env.REACT_APP_URL}/users/${user._id}/friends`;
  const { friendsList, isLoading, error } = useGetFriends(friendsUrl, token);

  if (error) return <Error500 />;

  return isLoading ? (
    <Loader />
  ) : (
    <div className={`w-auto h-auto ${thm.bg.alt} rounded-[10px] p-5 mb-5`}>
      <h3 className={`font-medium text-base ${thm.text.neutral.dark} mb-3`}>
        {` ${user.firstName}'s friends:`}
      </h3>
      {
        friendsList &&
          friendsList?.map((friend) => (
            <Friend
              key={uuidv4()}
              friendId={friend._id}
              name={`${friend.firstName} ${friend.lastName}`}
              subtitle={friend.occupation}
              url={friend.url}
              createdAt={""} // don't need for friendList
            />
          ))
      }
    </div>
  );
};

export default FriendListWidget;
