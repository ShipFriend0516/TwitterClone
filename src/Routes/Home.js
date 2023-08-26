import React, { useState, useEffect } from "react";
import { dbService } from '../fbase';
import {collection, addDoc, getDocs, query} from 'firebase/firestore';

const Home = () => {

  const [tweet, setTweet] = useState("");
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    getTweets()
    console.log(tweets);
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


  return (
    <div>
      <form onSubmit={onSubmit}>
        <input type="text" placeholder="What's on your mind?" maxLength={120} 
          value={tweet}
          onChange={onChange}/>
        <input type="submit" value="Tweet"
          onSubmit={onSubmit}/>
      </form>
      <div>
        {tweets.map((tweet) => (
          <div key={tweet.id}>
            <h4>{tweet.tweet}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
