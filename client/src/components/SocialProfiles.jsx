import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SocialProfile from "./SocialProfile";

const SocialProfiles = ({
  userId,
  twitterUrl,
  linkedinUrl,
  updateUser,
  setUpdateUser,
}) => {
  const [twitterValue, setTwitterValue] = useState(twitterUrl);
  const [linkedinValue, setLinkedinValue] = useState(linkedinUrl);
  const [showTwitterInput, setShowTwitterInput] = useState(false);
  const [showLinkedinInput, setShowLinkedinInput] = useState(false);
  const { thm } = useSelector((state) => state.themeReducer);
  const { token } = useSelector((state) => state.userReducer);

  const [activeTwitterStatus, setActiveTwitterStatus] = useState(``);
  const [activeLinkedinStatus, setActiveLinkedinStatus] = useState(``);

  const validURL = (str) => {
    var regex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w.-]*)*\/?$/;
    if (!regex.test(str)) {
      return false;
    } else {
      return true;
    }
  };
  // SET STATUS OF SOCIAL MEDIA ICON ON LOADING PAGE, PRIMARY OR NEUTRAL COLOR
  useEffect(() => {
    validURL(twitterUrl) && setActiveTwitterStatus(`${thm.text.primary.main}`);
    validURL(linkedinUrl) &&
      setActiveLinkedinStatus(`${thm.text.primary.main}`);
  }, [twitterUrl, linkedinUrl, thm.text.primary.main]);

  // UPDATE user?.twiterUrl
  const handleTwitterAccount = async () => {
    if (validURL(twitterValue)) {
      const response = await fetch(
        // `http://localhost:3001/users/${userId}/accounts/twitter`,
        `https://social-media-boogysh-git-main-boogysh.vercel.app/users/${userId}/accounts/twitter`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ twitterUrl: twitterValue }),
        }
      );
      const updatedUser = await response.json();
      setUpdateUser(updateUser + 1);
      setActiveTwitterStatus(`${thm.text.primary.main}`);
      console.log("twitterUrl:", updatedUser.twitterUrl);
    }
  };
  // UPDATE user?.linkedinrUrl
  const handleLinkedinAccount = async () => {
    if (validURL(linkedinValue)) {
      const response = await fetch(
        `http://localhost:3001/users/${userId}/accounts/linkedin`,
        // `https://social-media-boogysh-git-main-boogysh.vercel.app/users/${userId}/accounts/linkedin`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ linkedinUrl: linkedinValue }),
        }
      );
      const updatedUser = await response.json();
      setUpdateUser(updateUser + 1);
      setActiveLinkedinStatus(`${thm.text.primary.main}`);
      console.log("twitterUrl:", updatedUser.linkedinUrl);
    } else {
      console.log("invalid URL !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    }
  };

  return (
    <>
      <h3 className={`text-[1rem] ${thm.text.neutral.main} font-medium py-3`}>
        Social Profiles
      </h3>

      {/*----------------- TWITTER -------------------*/}
      <SocialProfile
        SM_Name="Twitter"
        SM_Url={twitterUrl}
        SMValue={twitterValue}
        setSMValue={setTwitterValue}
        showSMInput={showTwitterInput}
        setShowSMInput={setShowTwitterInput}
        setActiveSMStatus
        updateUser
        setUpdateUser
        handleSMAccount={handleTwitterAccount}
        activeSMStatus={activeTwitterStatus}
      />

      {/*------------- LINKEDIN--------------------- */}
      <SocialProfile
        SM_Name={"Linkedin"}
        SM_Url={linkedinUrl}
        SMValue={linkedinValue}
        setSMValue={setLinkedinValue}
        showSMInput={showLinkedinInput}
        setShowSMInput={setShowLinkedinInput}
        setActiveSMStatus
        updateUser
        setUpdateUser
        handleSMAccount={handleLinkedinAccount}
        activeSMStatus={activeLinkedinStatus}
      />
    </>
  );
};

export default SocialProfiles;
