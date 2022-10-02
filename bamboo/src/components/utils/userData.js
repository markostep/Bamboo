/*import React, {useState, useEffect} from 'react';
import { auth, db } from "./firebase";
import { getDatabase, ref, onValue, set, child, onChildChanged, get } from 'firebase/database';

const reference = ref(db, 'users/' + auth.currentUser?.uid);

var tempData = {}
export function useUserData() {
  const [userData, setUserData] = useState(tempData);

  useEffect(() => {
    console.log(reference)
    console.log("changed global marker array")
    const markersChanged = onValue(reference, (snapshot) => {
        console.log(snapshot.val())
        setUserData(snapshot.val())
    });
    //return markersChanged
  }, []);

  console.log(userData)
  return userData;
};*/