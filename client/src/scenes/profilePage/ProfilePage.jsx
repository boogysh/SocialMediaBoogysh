import {  useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import NavBar from "../navbar/NavBar";
import UserWidget from "../widgets/UserWidget";
import FriendListWidget from "../widgets/FriendListWidget";
import MyPostWidget from "../widgets/MyPostWidget";
import PostsWidget from "../widgets/PostsWidget";
// import { PROFILE } from "../../redux/actions";
import ProfileFriendsList from "../widgets/ProfileFriendsList";

const ProfilePage = () => {
  // const [user, setUser] = useState(null);
  // console.log("profile:", user);
  const { userId } = useParams();
  // console.log("userId:", userId);
  // const { token } = useSelector((state) => state.userReducer);
  const loggedUserId = useSelector((state) => state.userReducer.user._id);
  const { thm } = useSelector((state) => state.themeReducer);

  // const dispatch = useDispatch();

  //GET USER-PROFILE
  // useEffect(() => {
  //   const getUser = async () => {
  //     const response = await fetch(
  //       `${process.env.REACT_APP_URL}/users/${userId}`,
  //       {
  //         method: "GET",
  //         headers: { Authorization: `Bearer ${token}` },
  //       }
  //     );
  //     const data = await response.json();
  //     setUser(data);
  //     dispatch(PROFILE(data));
  //   };
  //   getUser();
  // }, [token, userId, dispatch]);

  const profile_Egal_User = userId === loggedUserId;

  // if (!user) return null;

  return (
    <main>
      <NavBar userId={userId} />
      <div
        className={`w-full ${thm.bg.default} flex flex-col justify-center py-[2rem] px-[3%] md:flex-row`}
      >
        <section className=" h-auto w-[100%] sm:w-[100%]   md:w-[26%]">
          <UserWidget userId={userId} />
          <div className="mt-5">
            {profile_Egal_User && <FriendListWidget />}
            {!profile_Egal_User && <ProfileFriendsList />}
          </div>
        </section>

        <section className=" h-auto w-[100%]  md:w-[42%] md:ml-[3%]">
          <MyPostWidget />
          <PostsWidget userId={userId} />
        </section>
      </div>
    </main>
  );
};

export default ProfilePage;
