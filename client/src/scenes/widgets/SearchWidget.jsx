import React, { useState } from "react";
import { useSelector } from "react-redux";
import Friend from "../../components/Friend";
import { GoSearch } from "react-icons/go";
import { MdClose } from "react-icons/md";

const SearchWidget = ({ userId, showSearchWidget, setShowSearchWidget }) => {
  const { thm } = useSelector((state) => state.themeReducer);
  const [result, setResult] = useState("");
  const { token } = useSelector((state) => state.userReducer);

  const getUsers = async (e) => {
    const searchValue = e.target.value;

    // find if the serach string have a space between  !!!
    const space = searchValue.includes(" ");
    console.log("space", space);

    const splittedSearchValue = searchValue.toLowerCase().split(" ");
    const searchValue_firstName = splittedSearchValue[0];
    const searchValue_lastName = splittedSearchValue[1];
    console.log("searchValue_firstName", searchValue_firstName);

    console.log("searchValue", searchValue);

    const response = await fetch(`${process.env.REACT_APP_URL}/users`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    console.log("dataUsers:", data);

    let searchResult;
    // then space in the serch string:
    if (space) {
      searchResult = data.filter(
        (user) =>
          (user.firstName.toLowerCase() === searchValue_firstName &&
            user.lastName.toLowerCase() === searchValue_lastName) ||
          (user.firstName.toLowerCase() === searchValue_lastName &&
            user.lastName.toLowerCase() === searchValue_firstName)
      );
      console.log("searchResult:", searchResult);
      setResult(searchResult);
    } 
    // without space in search string
    else {
      searchResult = data.filter(
        (user) =>
          user.firstName.toLowerCase() === searchValue.toLowerCase() ||
          user.lastName.toLowerCase() === searchValue.toLowerCase()
      );
      console.log("searchResult:", searchResult);
      setResult(searchResult);
    }
  };

  return (
    <div className={` w-auto h-auto ${thm.bg.alt} rounded-[10px] p-5 mb-5`}>
      <div className=" w-full h-auto flex flex-col">
        <div className="flex items-center">
          <div
            className={`w-full h-10 flex items-center ${thm.bg.neutral.light}  rounded-[10px] px-3`}
          >
            <input
              onChange={getUsers}
              className={`w-full h-[2rem] ${thm.bg.neutral.light} ${thm.text.neutral.main} outline-none`}
              type="text"
              placeholder="Search..."
            />
            <button
              onClick={(e) => getUsers(e)}
              className={`flex justify-center items-center w-12 h-9 ml-2 rounded-full ${thm.bg.neutral.medium_hover}`}
            >
              <GoSearch className={`w-4 h-4 ${thm.text.neutral.main}`} />
            </button>
          </div>
          {/* BTN CLOSE */}
          <button
            onClick={() => setShowSearchWidget(!showSearchWidget)}
            className={` flex justify-center items-center rounded-full w-9 h-9 ${thm.bg.neutral.light_hover} ml-3`}
          >
            <MdClose className={`w-6 h-6 ${thm.text.neutral.main}`} />
          </button>
        </div>

        <h3 className={`font-medium text-base ${thm.text.neutral.dark} mt-3`}>
          Search result:
        </h3>

        {result
          ? result.map(
              (friend) =>
                userId !== friend._id && (
                  <Friend
                    key={friend._id + friend.firstName}
                    friendId={friend._id}
                    name={`${friend.firstName} ${friend.lastName}`}
                    subtitle={friend.occupation}
                    userPicturePath={friend.picturePath}
                    url={friend.url}
                    createdAt={""} // don't need for friendList
                  />
                )
            )
          : null}
      </div>
    </div>
  );
};

export default SearchWidget;
