import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Friend from "../../components/Friend";
import { USER_FRIENDS } from "../../redux/actions";
import { v4 as uuidv4 } from "uuid";

const FriendListWidget = () => {
  const { userFriends } = useSelector((state) => state.userReducer);
  const { profileFriends } = useSelector((state) => state.userReducer);
  console.log("userFriends", userFriends);
  console.log(" profileFriends", profileFriends);
  //-
  const dispatch = useDispatch();
  const { thm } = useSelector((state) => state.themeReducer);
  const { token } = useSelector((state) => state.userReducer);
  const loggedUserId = useSelector((state) => state.userReducer.user._id);
  const { user } = useSelector((state) => state.userReducer);

  useEffect(() => {
    const getFriends = async () => {
      const response = await fetch(
        // `${process.env.REACT_APP_URL}/users/${userId}/friends`,
        `${process.env.REACT_APP_URL}/users/${loggedUserId}/friends`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await response.json();
      console.log(data);
      dispatch(USER_FRIENDS(data));
    };
    getFriends();
  }, [dispatch, token, loggedUserId, userFriends?.length]);
  // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={`w-auto h-auto ${thm.bg.alt} rounded-[10px] p-5 mb-5`}>
      <h3 className={`font-medium text-base ${thm.text.neutral.dark} mb-3`}>
        {` ${user.firstName}'s friends:`}
      </h3>
      {
        // homePage &&
        userFriends &&
          userFriends?.map((friend) => (
            <Friend
              userFriends={userFriends}
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
