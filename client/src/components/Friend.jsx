import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaUserMinus } from "react-icons/fa";
import { FaUserPlus } from "react-icons/fa";
// import { VIEWS,FRIENDS } from "../redux/actions";
import { FRIENDS } from "../redux/actions";

const Friend = ({ isSameUser, friendId, name, subtitle, createdAt, url }) => {
  const dispatch = useDispatch();
  const { _id } = useSelector((state) => state.userReducer.user);
  // const { user } = useSelector((state) => state.userReducer);
  const { token } = useSelector((state) => state.userReducer);
  const { friends } = useSelector((state) => state.userReducer);
  const { thm } = useSelector((state) => state.themeReducer);

  // console.log("user-:::::", user);
  //console.log("friends-:::::", friends);

  const isFriend = friends?.find((friend) => friend._id === friendId);

  const patchFriend = async () => {
    const response = await fetch(
      // `http://localhost:3001/users/${_id}/${friendId}`,
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
    dispatch(FRIENDS(data)); //{ friends: data }
  };

  // VIEWS
  const visitProfile = async () => {
    const response = await fetch(
      // `http://localhost:3001/users/${_id}/${friendId}/views`,
      `${process.env.REACT_APP_URL}/users/${_id}/${friendId}/views`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    console.log(data);
  };

  return (
    <div className="w-full flex items-center  mb-3">
      <img
        className="w-[40px] xxs:w-[50px] h-[40px] xxs:h-[50px]  object-cover rounded-[50%]"
        src={url}
        alt="user"
      />
      <div className="ps-3 cursor-pointer">
        <div className="flex items-center">
          <Link to={`/profile/${friendId}`} onClick={visitProfile}>
            <h1
              className={`text-base sm:text-lg font-medium ${thm.text.neutral.main} hover:text-orange-500`}
            >
              {name}
            </h1>
          </Link>
        </div>
        {/* ONLY POST PART */}
        {createdAt ? (
          <p
            className={`w-fit text-xs xxs:text-sm  font-sans ${thm.text.neutral.medium}`}
          >
            {`${createdAt?.slice(8, 10)}`}
            {`/${createdAt?.slice(5, 7)}/${createdAt?.slice(0, 4)}`}{" "}
            <span className="ml-[8px] text">{`${createdAt?.slice(
              11,
              19
            )}`}</span>
          </p>
        ) : (
          <h2 className={`${thm.text.neutral.medium} text-sm`}>{subtitle}</h2>
        )}
        {/* <h2 className={`${thm.text.neutral.medium} text-sm`}>{subtitle}</h2> */}
      </div>
      {isSameUser ? null : (
        <button
          onClick={() => patchFriend()}
          className={`${thm.bg.neutral.light_hover} p-2 rounded-full ml-auto`}
        >
          {isFriend ? (
            <FaUserMinus
              className={`w-4 h-4 ${thm.text.neutral.mediumMain} `}
            />
          ) : (
            <FaUserPlus className={`w-4 h-4 ${thm.text.primary.main}`} />
          )}
        </button>
      )}
    </div>
  );
};

export default Friend;
