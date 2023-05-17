import React from "react";
import { MdClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { LOGOUT } from "../redux/actions";
import { useNavigate } from "react-router-dom";
// import { GUESTS } from "../redux/actions";

const ConfirmDeleteAccount = ({ user,setShowDeleteConfirm }) => {
//   const [visitors, setVisitors] = useState("");
  const { thm } = useSelector((state) => state.themeReducer);
  const { token } = useSelector((state) => state.userReducer);
  const loggedUserId = useSelector((state) => state.userReducer.user._id);

  const dispatch = useDispatch();
  const navigate = useNavigate();


const deleteUserAccount = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_URL}/auth/${user._id}/delete`, //!!!!!
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: loggedUserId }),
      }
    );
    await response.json();
    dispatch(LOGOUT({ user: null, token: null }));
    navigate("/");
  };

  

  

  return (
    <div
      className={`bg-gray-700/50 fixed z-10  bottom-0 left-0 top-0 right-0 w-[100%] h-[100%]  bg-cover flex justify-center items-center `}
    >
      <div
        className={`${thm.bg.default} w-[95%] xxs:w-[80%] xs:w-[75%] md:w-[48%] lg:w-[36%]  2xl:w-[30%]  h-auto max-h-[600px]  rounded-[20px]`}
      >
        {/* HEADER */}
        <div
          className={`${thm.bg.default} rounded-t-[20px] w-full h-auto flex items-center py-1 px-3 `}
        >
          <h2
            className={`${thm.text.neutral.main} w-full text:normal sm:text-lg font-medium py-3 text-center`}
          >
            Do you want to delete your account?
          </h2>
          <button
            onClick={() => setShowDeleteConfirm(false)}
            className={`w-8 h-8 ml-auto flex justify-center items-center rounded-full ${thm.bg.neutral.light_hover}`}
          >
            <MdClose className={` ${thm.text.neutral.main} w-5 h-5`} />
          </button>
        </div>
        {/* CONTENT */}
        
        <div
          className={`p-5 text-sm md:text-base w-full h-auto max-h-[400px] overflow-y-scroll border-y-[1px] ${thm.bg.neutral.light_border}  ${thm.text.neutral.main} `}
        >
            This action is definitely and irreversible. All your data will be deleted. Please confirm.
        </div>
        <button
          onClick={deleteUserAccount}
          className={`flex text-sm md:text-base  py-2 px-4 ${thm.bg.alt} border border-gray-500 ${thm.text.neutral.main} rounded-full  m-2 mb-5  mx-auto`}
        >
          I confirm. I want to delete my account.
        </button>
      </div>
    </div>
  );
};

export default ConfirmDeleteAccount;
