import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AddOrRemoveFriend from "./AddOrRemoveFriend";

const Friend = ({
  
  userIdEgalPostUserId,
  friendId,
  name,
  subtitle,
  createdAt,
  hideButton = false,
  url,
}) => {
  const { _id } = useSelector((state) => state.userReducer.user);
  const { token } = useSelector((state) => state.userReducer);
  const { thm } = useSelector((state) => state.themeReducer);

  const homePage = window.location.href.includes("/home");
  const profilePage = window.location.href.includes("/profile");

  const loggedUserOnProfilePage = _id !== friendId;

  const { userFriends } = useSelector((state) => state.userReducer);
  const isFriend = userFriends?.find((friend) => friend._id === friendId);
  useEffect(() => {}, [isFriend, userFriends?.length]);

  // VIEWS
  const visitProfile = async () => {
    const response = await fetch(
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
      <>
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
        </div>
      </>

      {/* HOMEPAGE & POST  --ADD OR REMOVE BUTTON-- */}
      <>
        {!userIdEgalPostUserId && homePage && (
          <AddOrRemoveFriend
            friendId={friendId}
            _id={_id}
            isFriend={isFriend}
          />
        )}
      </>
      {/* PROFILE PAGE */}
      {!hideButton &&
        profilePage &&
        loggedUserOnProfilePage &&
        !userIdEgalPostUserId && (
          <>
            <AddOrRemoveFriend
              friendId={friendId}
              _id={_id}
              isFriend={isFriend}
            />
          </>
        )}
    </div>
  );
};

export default Friend;
