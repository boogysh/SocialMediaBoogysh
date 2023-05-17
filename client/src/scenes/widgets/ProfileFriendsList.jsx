import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Friend from "../../components/Friend";
import { v4 as uuidv4 } from "uuid";

const ProfileFriendsList = () => {
  const [profileFriends, setProfileFriends] = useState([]);
  const { thm } = useSelector((state) => state.themeReducer);
  const { profile } = useSelector((state) => state.userReducer);
  const { token } = useSelector((state) => state.userReducer);


  useEffect(() => {
    const getFriends = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_URL}/users/${profile._id}/friends`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await response.json();
      console.log(data);
      setProfileFriends(data);
    };

    getFriends();
  }, [token, profile._id, profile?.friends?.length]);

  return (
    <div className={`w-auto h-auto ${thm.bg.alt} rounded-[10px] p-5 mb-5`}>
      <h3 className={`font-medium text-base ${thm.text.neutral.dark} mb-3`}>
        {`${profile.firstName}'s friends:`}
      </h3>
      {profileFriends &&
        profileFriends?.map((friend) => (
          <Friend
            key={uuidv4()}
            friendId={friend._id}
            name={`${friend.firstName} ${friend.lastName}`}
            subtitle={friend.occupation}
            url={friend.url}
            createdAt={""} // don't need for friendList
            hideButton
          />
        ))}
    </div>
  );
};

export default ProfileFriendsList;
