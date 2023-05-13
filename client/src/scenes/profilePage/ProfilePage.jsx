import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import NavBar from "../navbar/NavBar";
import UserWidget from "../widgets/UserWidget";
import FriendListWidget from "../widgets/FriendListWidget";
import MyPostWidget from "../widgets/MyPostWidget";
import PostsWidget from "../widgets/PostsWidget";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  console.log("profile:", user);
  const { userId } = useParams();
  console.log("userId:", userId);
  const { token } = useSelector((state) => state.userReducer);
  const { thm } = useSelector((state) => state.themeReducer);

  useEffect(() => {
    const getUser = async () => {
      const response = await fetch(`http://localhost:3001/users/${userId}`, {
      // const response = await fetch(`https://social-media-boogysh-git-main-boogysh.vercel.app/${userId}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json(); 
      setUser(data);
    };
    getUser();
  }, [token, userId]);

  if (!user) return null;

  return (
    <main>
      <NavBar  userId={userId} /> 
      <div
        className={`w-full ${thm.bg.default} flex flex-col justify-center py-[2rem] px-[3%] md:flex-row`}
      >
        <section className=" h-auto w-[100%] sm:w-[100%]   md:w-[26%]">
          <UserWidget userId={userId} />
          <FriendListWidget userId={userId} />
        </section>

        <section className=" h-auto w-[100%]  md:w-[42%] md:ml-[3%]">
          <MyPostWidget />
          {/* <PostsWidget userId={userId} isProfile /> */}
          <PostsWidget userId={userId}  />
        </section>
      </div>
    </main>
  );
};

export default ProfilePage;
