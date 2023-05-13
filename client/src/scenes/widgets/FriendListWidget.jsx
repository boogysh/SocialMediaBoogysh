import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Friend from "../../components/Friend";
import { FRIENDS } from "../../redux/actions";

const FriendListWidget = ({ userId }) => {
  const dispatch = useDispatch();
  const { thm } = useSelector((state) => state.themeReducer);
  const { token } = useSelector((state) => state.userReducer);
  const { friends } = useSelector((state) => state.userReducer);

  const getFriends = async () => {
    const response = await fetch(
      `http://localhost:3001/users/${userId}/friends`,
      // `https://social-media-boogysh-git-main-boogysh.vercel.app/users/${userId}/friends`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();

    dispatch(FRIENDS(data)); 
  };

  useEffect(() => {
    getFriends();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={`w-auto h-auto ${thm.bg.alt} rounded-[10px] p-5 mb-5`}>
      <h3 className={`font-medium text-base ${thm.text.neutral.dark} mb-3`}>
          My Friends:
        </h3>
      {friends
        ? friends.map((friend) => (
            <Friend
              key={friend._id + friend.firstName}
              friendId={friend._id}
              name={`${friend.firstName} ${friend.lastName}`}
              subtitle={friend.occupation}
              userPicturePath={friend.picturePath}
              url={friend.url}
              createdAt={""} // don't need for friendList
            />
          ))
        : null}
    </div>
  );
};

export default FriendListWidget;
