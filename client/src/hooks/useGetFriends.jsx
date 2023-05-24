import { useState, useEffect } from "react";
import { USER_FRIENDS } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";

export function useGetFriends(friendsUrl, token) {
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [friendsList, setFriendsList] = useState(null);

  const { userFriends } = useSelector((state) => state.userReducer);
  const loggedUserId = useSelector((state) => state.userReducer.user._id);

  const dispatch = useDispatch();
  useEffect(() => {
    if (!friendsUrl) return;
    setLoading(true);
    const getFriends = async () => {
      try {
        const response = await fetch(
          friendsUrl,
          //   `${process.env.REACT_APP_URL}/users/${loggedUserId}/friends`,
          {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = await response.json();
        console.log(data);
        dispatch(USER_FRIENDS(data));
        setFriendsList(data);
      } catch (err) {
        console.log(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    getFriends();
  }, [dispatch, friendsUrl, token, loggedUserId, userFriends?.length]);
  return { friendsList, isLoading, error };
}
