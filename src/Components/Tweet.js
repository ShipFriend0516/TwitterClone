import React, { useState } from 'react';
import { dbService} from '../fbase';
import { doc, deleteDoc, updateDoc } from 'firebase/firestore';


const Tweet = ({tweetObj , isOwner}) => {
  const [editing, setEditing] = useState(false);
  const [newTweet, setNewTweet] = useState(tweetObj.text);

  const onDeleteClick = async () => {
    const ok = window.confirm('Are you sure you want to delete?');
    if(ok) {
      const TweetTextRef = doc(dbService, 'tweets',`${tweetObj.id}`);
      await deleteDoc(TweetTextRef);
    }
  }

  const toggleEditing = () => {
    setEditing((prev)=> !prev);
  }

  const onChange = (e) => {
    const {
      target: {value},
    } = e;
    setNewTweet(value)
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    const TweetTextRef = doc(dbService, 'tweets',`${tweetObj.id}`);
    await updateDoc(TweetTextRef, {
      text: newTweet,
    })
    setEditing(false)
  }

  return (
    <div>
      {
        editing ?
        <> 
        <form onSubmit={onSubmit}>
          <input type='text' 
                value={newTweet} 
                placeholder='Edit tweet...'
                required
                onChange={onChange}></input>
 
          <input type='submit' value='Update Tweet'/>
        </form>
        <button onClick={toggleEditing}>Cancel</button>
        </>
        :
        <><h4>{tweetObj.text}</h4>
          {
            isOwner && <>
            <button onClick={onDeleteClick}>Delete</button>
            <button onClick={toggleEditing}>Edit</button>
            </>
          }
        </>
      }
      
    </div>
  )
}

export default Tweet;