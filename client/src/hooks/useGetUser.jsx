import { useState, useEffect } from "react";
import { GUESTS, PROFILE } from "../redux/actions";
import { useDispatch } from "react-redux";

export function useGetUser(userUrl, token, updateUser) {
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [user, setUser] = useState(null);

  //   const { userFriends } = useSelector((state) => state.userReducer);
  //   const loggedUserId = useSelector((state) => state.userReducer.user._id);

  const dispatch = useDispatch();
  useEffect(() => {
    if (!userUrl) return;
    setLoading(true);
    const getUser = async () => {
      try {
        const response = await fetch(
          userUrl,
          {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = await response.json();
        console.log("data-ser:::", data);
        setUser(data);
        dispatch(GUESTS(data.viewedProfile));
        dispatch(PROFILE(data));
      } catch (err) {
        console.log(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    getUser();
  }, [
    userUrl,
    user?.twitterUrl?.length,
    user?.viewedProfile?.length,
    user?.friends?.length,
    token,
    updateUser,
    dispatch,
  ]);
  return { user, isLoading, error };
}
