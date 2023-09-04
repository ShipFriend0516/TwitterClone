import React, { useState, useEffect } from "react";
import { dbService } from '../fbase';
import {collection, addDoc, getDocs, query, orderBy, onSnapshot} from 'firebase/firestore';
import Tweet from 'Components/Tweet';

const Home = ({ userObj }) => {

  const [tweet, setTweet] = useState("");
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    getTweets()

    const q = query(collection(dbService, "tweets"));
    onSnapshot(q,(snap) => {
      console.log('Some things changed!');
      const tweetArray = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTweets(tweetArray); 
    })
  },[]);

  const getTweets = async () => {
    const q = query(collection(dbService, "tweets"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const tweetObj = {
        ...doc.data(),
        id: doc.id,
      }
      setTweets((prev)=> [tweetObj, ...prev]);
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const docRef = await addDoc(collection(dbService, "tweets"), {
        text: tweet,
        createdAt: Date.now(),
        createrId: userObj.uid,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      console.log(error);
    }
    
    setTweet("");
  }

  const onChange = (e) => {
    const {target: {value}} = e;
    setTweet(value);
  }

  const onFileChange = (e) => {
    const {
      target: {files},
    } = e;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishEvent) => {
      console.log(finishEvent);
    }
    reader.readAsDataURL(theFile)
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input type="text" placeholder="What's on your mind?" maxLength={120} 
          value={tweet}
          onChange={onChange}/>
        <input type='file' accept='image/*' onChange={onFileChange}/>
        <input type="submit" value="Tweet"
          onSubmit={onSubmit}/>
      </form>
      <div>
        {tweets.map((tweet) => (
          <Tweet key={tweet.id} tweetObj={tweet} isOwner={tweet.createrId === userObj.uid}/>
        ))}
      </div>
    </div>
  );
};

export default Home;
