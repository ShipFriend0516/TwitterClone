import React from "react";
import { authService } from "../fbase";
import { useHistory } from "react-router-dom";

const Profile = () => {
  const history = useHistory();
  const onLogOutClick = () => {
    authService.signOut().then(() => {
    history.push("/");})
  }

  return (
    <div>
      <button onClick={onLogOutClick}>Log out</button>
    </div>  
  )
};

export default Profile;
