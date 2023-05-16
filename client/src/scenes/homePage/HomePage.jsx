import { useSelector } from "react-redux";
import NavBar from "../navbar/NavBar";
import UserWidget from "../widgets/UserWidget";
import PublicityWidget from "../widgets/PublicityWidget";
import FriendListWidget from "../widgets/FriendListWidget";
import MyPostWidget from "../widgets/MyPostWidget";
import PostsWidget from "../widgets/PostsWidget";
import SearchWidget from "../widgets/SearchWidget";
import { useState } from "react";

const HomePage = () => {
  const [showSearchWidget, setShowSearchWidget] = useState(false);

  const { _id } = useSelector((state) => state.userReducer.user);
  const { user } = useSelector((state) => state.userReducer);
  const { thm } = useSelector((state) => state.themeReducer);
  console.log("userFromHome¨Page", user);

  return (
    <main>
      <NavBar
        userId={_id}
        showSearchWidget={showSearchWidget}
        setShowSearchWidget={setShowSearchWidget}
      />
      <div
        className={`${thm.bg.default} w-full flex flex-col  py-[2rem] px-[3%] md:px-[1%]  md:flex-row md:justify-center`}
      >
        {/* EVEN CLASSES LIKE THE PARENT_DIV WITH MAX-W-FULL-[2200px] */}
        <div
          className={`${thm.bg.default} w-full max-w-[2200px] flex flex-col  py-[2rem] px-[3%] md:px-[1%]  md:flex-row md:justify-center`}
        >
          {/* <section className=" h-auto w-[100%] sm:w-[100%] md:w-[37%] lg:w-[26%]"> */}
          <section className=" h-auto w-[100%] sm:w-[100%] md:w-[37%] 2xl:w-[26%]">
            {/* <Test/> */}
            <UserWidget userId={_id} />
            <div className="hidden md:block">
              <PublicityWidget />
            </div>
            <div className="hidden md:block 2xl:hidden mt-5">
              <FriendListWidget />
            </div>
          </section>

          {/* <section className=" mt-5 h-auto w-[100%] md:w-[57%] md:ml-[3%] md:mt-0 lg:ml-0 lg:w-[42%] "> */}
          <section className=" mt-5 h-auto w-[100%] md:w-[57%] md:ml-[2%] md:mt-0 2xl:ml-[1.5%] 2xl:w-[42%] ">
            <MyPostWidget />
            <PostsWidget userId={_id} />
          </section>

          {/* <section className="h-auto w-[100%] md:hidden lg:block lg:w-[26%]"> */}
          <section className="h-auto w-[100%] md:hidden 2xl:block 2xl:w-[26%] 2xl:ml-[1.5%]">
            {showSearchWidget && (
              <SearchWidget
                showSearchWidget={showSearchWidget}
                setShowSearchWidget={setShowSearchWidget}
                userId={_id}
              />
            )}
            <FriendListWidget userId={_id} />
          </section>
        </div>
      </div>
    </main>
  );
};

export default HomePage;
