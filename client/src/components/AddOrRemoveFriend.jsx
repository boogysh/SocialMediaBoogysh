import React from "react";
import { FaUserMinus, FaUserPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { USER_FRIENDS } from "../redux/actions";

const AddOrRemoveFriend = ({ isFriend, friendId, _id }) => {
  const { thm } = useSelector((state) => state.themeReducer);
  const { token } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const patchFriend = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_URL}/users/${_id}/${friendId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    console.log("data", data);
    dispatch(USER_FRIENDS(data));
  };
  return (
    <button
      onClick={() => patchFriend()}
      className={`${thm.bg.neutral.light_hover} p-2 rounded-full ml-auto`}
    >
      {isFriend ? (
        <FaUserMinus className={`w-4 h-4 ${thm.text.neutral.mediumMain} `} />
      ) : (
        <FaUserPlus className={`w-4 h-4 ${thm.text.primary.main}`} />
      )}
    </button>
  );
};

export default AddOrRemoveFriend;
