import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import NavBar from "../navbar/NavBar";
import UserWidget from "../widgets/UserWidget";
import FriendListWidget from "../widgets/FriendListWidget";
import MyPostWidget from "../widgets/MyPostWidget";
import PostsWidget from "../widgets/PostsWidget";
import ProfileFriendsList from "../widgets/ProfileFriendsList";

const ProfilePage = () => {
  const { userId } = useParams();
  const loggedUserId = useSelector((state) => state.userReducer.user._id);
  const { thm } = useSelector((state) => state.themeReducer);

  const profile_Egal_User = userId === loggedUserId;

  return (
    <main>
      <NavBar userId={userId} />
      <div
        className={`flex flex-col items-center w-full ${thm.bg.default}  mx-auto`}
      >
        <div
          className={`w-full max-w-[1400px] flex flex-col justify-center py-[2rem] px-[2%] md:flex-row`}
        >
          <section className=" h-auto w-[100%] sm:w-[100%]   md:w-[37%]">
            <UserWidget userId={userId} />
            <div className="mt-5">
              {profile_Egal_User && <FriendListWidget />}
              {!profile_Egal_User && <ProfileFriendsList />}
            </div>
          </section>

          {/* <section className=" h-auto w-[100%]  md:w-[42%] md:ml-[3%]"> */}
          <section className=" h-auto w-[100%]  md:w-[57%] md:ml-[2%]">
            <MyPostWidget />
            <PostsWidget userId={userId} />
          </section>
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;
