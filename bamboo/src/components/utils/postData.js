import React, {useState, useEffect} from 'react';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { getDatabase, ref, onValue, set, child, onChildChanged, get } from 'firebase/database';
import { auth, db } from "./firebase";


//const db = getDatabase()
//const auth = getAuth();
const reference = ref(db, 'books/' + auth.currentUser?.uid);


var tempData = []
export function usePostData() {
  const [postData, setPostData] = useState(tempData);

  useEffect(() => {
    console.log("changed global marker array")
    const markersChanged = onValue(reference, (snapshot) => {
      var incidents = []
      snapshot.forEach((childSnapshot) => {
        console.log(childSnapshot.val())
        incidents.push(childSnapshot.val())
      })
      setPostData(incidents)
    });
    return markersChanged
  }, []);

  return postData;
};