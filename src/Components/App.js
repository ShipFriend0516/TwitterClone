import React from "react";
import AppRouter from "./Router";
import { useState, useEffect } from "react";
import { authService } from "../fbase";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);


  useEffect(() => {
    authService.onAuthStateChanged(user => {
      console.log(user);
      if(user) {
        setIsLoggedIn(true);
        setUserObj(user);
      } else {
        setIsLoggedIn(false);
        setUserObj(null);
      }
      setInit(true);
    })
  }, [])
  return (
    <div>
      {init ? <AppRouter isLoggedIn={isLoggedIn} userObj={userObj} /> : "Initializing..."}
    </div>
  );
}

export default App;
