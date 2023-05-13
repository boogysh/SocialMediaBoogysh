import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Visitor = ({ userId, friendId, name, visitedAt, url }) => {
  const { token } = useSelector((state) => state.userReducer);
  const { thm } = useSelector((state) => state.themeReducer);

  // console.log("user-:::::", user);
  //console.log("friends-:::::", friends);

  // VIEWS
  const visitProfile = async () => {
    const response = await fetch(
      // `http://localhost:3001/users/${userId}/${friendId}/views`,
      `${process.env.REACT_APP_URL}/users/${userId}/${friendId}/views`,

      // imprtant to keep friendId even friendId === vistorid,
      // onclick on visitorName, to register currentUser like a visitor onVistor account
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
    <div>
      <div className="w-full flex items-center mb-3">
        <img
          className="w-[40px] xxs:w-[50px] h-[40px] xxs:h-[50px]  object-cover rounded-[50%]"
          src={url}
          alt="user"
        />
        <div className="ps-3 cursor-pointer">
          <div>
            <Link to={`/profile/${friendId}`} onClick={visitProfile}>
              <h1
                className={`text-base sm:text-lg font-medium ${thm.text.neutral.main} hover:text-orange-500`}
              >
                {name}
              </h1>
            </Link>
            <p className={`text-xs  ${thm.text.neutral.medium}`}>{visitedAt}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Visitor;
