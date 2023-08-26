import { authService } from '../fbase';
import React from 'react';
import { useState } from'react';
import { firebaseInstance } from '../fbase';


const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");

  const onChange = (e) => {
    const { target: {name, value} } = e;
    if(name === "email") {
      setEmail(value);
    } else if(name === 'password') {
      setPassword(value);
    }
  }
  const onSubmit = async(e) => { 
    e.preventDefault();
    try {
      let data;
      if(newAccount) {
        // create a new account
        const data =  await authService.createUserWithEmailAndPassword(email, password)
      } else {
        // login
        const data =  await authService.signInWithEmailAndPassword(email, password)
      }
      console.log(data)
    } catch (error) {
      console.log(error)
      setError(error.message);
    }
    
  }

  const toggleAccount = () => {setNewAccount(!newAccount); }
  const onSocialClick = async(e) => {
    const { target: {name} } = e;
    let provider;
    if(name === "google") {
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    } else if(name === "github") {
      provider = new firebaseInstance.auth.GithubAuthProvider();
    }
    const data = await authService.signInWithPopup(provider);
    console.log(data);
  }


  return (
    <div>
      <form onSubmit={onSubmit}>
        <input 
          name='email'
          type="email" 
          placeholder="Email"  
          required 
          value={email} 
          onChange={onChange} 
        />
        <input 
          name='password'
          type="password" 
          placeholder="Password" 
          required 
          value={password} 
          onChange={onChange}
        />
        <input type='submit' value={newAccount ? "Create a new account" :"Sign in"}/>
        {error && <p>{error}</p>}
      </form> 
      <span onClick={toggleAccount}>{newAccount ? "Sign In" : "Create Account"}</span>
        <button name="google" onClick={onSocialClick}>Continue with Google</button>
        <button name="github" onClick={onSocialClick}>Continue with GitHub</button>
    </div>
  );
}

export default Auth;