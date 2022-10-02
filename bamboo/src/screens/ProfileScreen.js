import React from 'react';
import { getDatabase, ref, onValue, set, child, remove, get} from 'firebase/database';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button'
import { useEffect, useState } from "react";
import { auth, logInWithEmailAndPassword, signInWithGoogle, db, logout, registerWithEmailAndPassword, sendPasswordReset  } from "../components/utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./Login.css";
import "./Dashboard.css";
import { query, collection, getDocs, where } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";
import "./Reset.css";
import SellScreen from './SellScreen';
import { useAuthentication } from '../components/utils/userData';
import HistoryScreen from './HistoryScreen';
import { Switch } from '@mui/material';
//import { useUserData } from '../components/utils/userData';

const technologies = [
    {
      value: 'Direct Removal',
      label: 'Direct Removal',
    },
    {
      value: 'BEECS',
      label: 'BEECS',
    },
  ];
  
function ProfileScreen() {
    const [values, setValues] = useState({
        name: '',
        location: '',
        description: '',
        reserves: 0,
        technology: '',
      });

      const [profileType, setProfileType] = useState('none');

      const [activeIndex, setActiveIndex] = useState(1);

      const handleChange =
    (prop) => (event) => {
      setValues({ ...values, [prop]: event.target.value });
    };

    return (
        <>
        {activeIndex == 0 &&
            <div style={{backgroundColor: 'white', width: '100%', height: 910, justifyContent: 'center'}}>
                <header style={{justifyContent: 'flex-start'}}>
                <div style={{display: 'flex', flexDirection: 'row', alignSelf: 'center', justifyContent: 'center'}}>
                    <h3 style={{color: 'gray'}}>Welcome to your profile </h3>
                    <h3 style={{color: '#02cf73', marginLeft: 0}}> !</h3>
                </div>
                </header>
                <div style={{width: '100%', justifyContent: 'center', display: 'flex'}}>
                <div style={{width: '25ch', justifyContent: 'flex-start'}}>
                <p style={{color: 'gray', fontSize: 30, marginTop: 0}}>Here's what we know about you:</p>
                <p style={{color: 'gray', fontSize: 30, marginTop: 0}}>Profile Type:</p>
                <p style={{color: 'gray', fontSize: 30, marginTop: 0}}>Company name:</p>
                <p style={{color: 'gray', fontSize: 30, marginTop: 0}}>Location:</p>
                <p style={{color: 'gray', fontSize: 30, marginTop: 0}}>Description:</p>
                <p style={{color: 'gray', fontSize: 30, marginTop: 0}}>Reserves:</p>
                <p style={{color: 'gray', fontSize: 30, marginTop: 0}}>Technology:</p>
                </div>
                </div>
                
            </div>
        }  
        {activeIndex == 1 &&
        <Login setActiveIndex={setActiveIndex}>
        </Login>}
        {activeIndex == 2 &&
        <Dashboard setActiveIndex={setActiveIndex}>
        </Dashboard>}
        {activeIndex == 3 &&
        <Register setActiveIndex={setActiveIndex}>
        </Register>}
        {activeIndex == 4 &&
        <Reset setActiveIndex={setActiveIndex}>
        </Reset>}
        {activeIndex == 5 &&
        <SellScreen setActiveProfileIndex={setActiveIndex}>
        </SellScreen>}
        {activeIndex == 6 &&
        <ChooseType setActiveIndex={setActiveIndex}>
        </ChooseType>}
        {activeIndex == 7 &&
        <SellScreen setActiveIndex={setActiveIndex}>
        </SellScreen>}
            </>
    );
  }
  
  export default ProfileScreen;

//import { Link, useNavigate } from "react-router-dom";


  function Login({setActiveIndex}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, loading, error] = useAuthState(auth);
    //const navigate = useNavigate();
    useEffect(() => {
      if (loading) {
        // maybe trigger a loading screen
        return;
      }
      //if (user) navigate("/dashboard");
      if (user) setActiveIndex(2)
    }, [user, loading]);
    return (
      <div className="login">
        <div className="login__container" style={{display: 'flex', borderRadius: 10}}>
            <h2 style={{color: 'gray', height: 50, marginTop: 0}}>Login</h2>
          {/*<input
            type="text"
            className="login__textBox"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail Address"
    />*/}
          <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
          <InputLabel>E-mail address</InputLabel>
          <OutlinedInput
          style={{height: 46}}
            id="outlined-adornment-name"
            className="login__textBox"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label="E-mail address"
          />
          </FormControl>
          {/*<input
            type="password"
            className="login__textBox"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
/>*/}
          <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
          <InputLabel>Password</InputLabel>
          <OutlinedInput
          type="password"
          style={{height: 46}}
            id="outlined-adornment-name"
            className="login__textBox"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label="Password"
          />
          </FormControl>
          <Button className="login__btn" variant="contained" onClick={() => logInWithEmailAndPassword(email, password)}>Login</Button>
          {/*<button
            className="login__btn"
            onClick={() => logInWithEmailAndPassword(email, password)}
          >
            Login
          </button>
          <Button className="login__btn login__google" variant="contained" onClick={signInWithGoogle}>Login with Google</Button>
          <button className="login__btn login__google" onClick={signInWithGoogle}>
            Login with Google
</button>*/}
          <div>
            {/*<Link to="/reset">Forgot Password</Link>*/}
          </div>
          
          <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
            <p style={{color: 'gray', fontSize: 20, alignSelf: 'center'}}>Don't have an account?</p>
            <Button style={{paddingTop: 5}} className="login__btn" onClick={() => setActiveIndex(3)}>Click here</Button>
          </div>
        </div>
      </div>
    );
  }

  //var userData = {}
  function Dashboard({setActiveIndex}) {

    const [userData, setUserData] = React.useState({})
    //const { userDataHook } = useAuthentication();
    //var {userData} = useUserData()
    // console.log('from profile')
    //console.log(userData)
    const [user, loading, error] = useAuthState(auth);
    const [name, setName] = useState("");
    /*const fetchUserName = async () => {
        const dbRef = ref(db);
        get(dbRef, `users/${user.uid}`).then((snapshot) => {
        if (snapshot.exists()) {
            console.log(snapshot.val());
        } else {
            console.log("No data available");
        }
        }).catch((error) => {
        console.error(error);
        });
    };*/
    /*let ref = db.ref("/users/" + user?.uid);
    ref.on("value", snapshot => {
    const data = snapshot.val()
    console.log(data)
    })*/

    const dbRef = ref(getDatabase());
    // console.log(user?.uid)
    get(child(dbRef, `users/${user?.uid}`)).then((snapshot) => {
    if (snapshot.exists()) {
        // console.log(snapshot.val());
        //setName(snapshot.val().name)
        setUserData(snapshot.val())
    } else {
        console.log("No data available");
    }
    }).catch((error) => {
    console.error(error);
    });



    useEffect(() => {
      if (loading) return;
      if (!user) setActiveIndex(1);
      //fetchUserName();
      
    }, [user, loading]);

    const [filledSelected, setFilledSelected] = useState(false)

    //const [userData, setUserData] = React.useState({});

    /*get(ref(db,'users/' + user.uid).then((snapshot) => {
            setUserData(snapshot?.val()) 
    }));*/

    //alert(userData)

    return (
      <div className="dashboard" style={{flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'left'}}>
         
          Logged in as
          <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
           <div style={{marginLeft: 50}}>
          {!userData?.companyData && <div style={{color: 'gray', display: 'flex'}}>
            <h1>{userData?.name}</h1>
            </div>}
           {userData?.companyData && <div style={{color: 'gray', marginBottom: 0, height: 80, marginTop: -20}}>
            <h1>{userData?.companyData.companyName}</h1>
               </div>}
            {userData?.companyData && <div style={{color: 'gray', marginTop: 0}}>{userData?.companyData.location}</div>}
            {userData?.companyData && <div style={{color: 'gray'}}>{userData?.companyData.buyerOrSeller}</div>}
           {userData?.companyData && userData?.companyData.buyerOrSeller == "Seller" && <div style={{color: 'gray'}}>{userData?.companyData.technology}</div>}
           {userData?.companyData && userData?.companyData.buyerOrSeller == "Seller" && <div style={{color: 'gray'}}>{userData?.companyData.reserves + ' tons/yr'}</div>}
           {userData?.companyData && <div style={{color: 'gray'}}>{userData?.companyData.description}</div>}
           </div>

           <div style={{marginRight: 150}}>
           {userData?.companyData && <div style={{color: 'gray', display: 'flex', marginTop: 70}}>
            {userData?.name}
            </div>}
           <div style={{color: 'gray', marginBottom: 50}}>{user?.email}</div>
           <button className="dashboard__btn" onClick={async() => {
               logout()
                setActiveIndex(1)
               }}>
            Logout
           </button>
           </div>
           </div>
           {filledSelected && <p1 style={{color: 'gray', fontSize: 20}}>Filled Orders</p1>}
           {!filledSelected && <p1 style={{color: 'gray', fontSize: 20}}>Open Orders</p1>}
           <Switch {...'Filled Orders'} value={filledSelected} onChange={() => {setFilledSelected(!filledSelected)}} />
           <div style={{width: '100%', height: 1, backgroundColor: 'lightgray'}}></div>
            <HistoryScreen filledSelected={filledSelected} style={{height: '50%', width:'100%'}}>

            </HistoryScreen>
       </div>
    );
  }



  function Register({setActiveIndex}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [user, loading, error] = useAuthState(auth);
    //const navigate = useNavigate();
    const register = () => {
      if (!name) alert("Please enter name");
      registerWithEmailAndPassword(name, email, password);
      setActiveIndex(6)
    };
    useEffect(() => {
      if (loading) return;
      //if (user) navigate("/dashboard");
      if (user) setActiveIndex(2)
    }, [user, loading]);
    return (
      <div className="register">
        <div className="register__container" style={{display: 'flex', borderRadius: 10, borderColor: 'lightgray', borderWidth: 2}}>
          {/*<input
            type="text"
            className="register__textBox"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full Name"
    />*/}
          <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
          <InputLabel>Full Name</InputLabel>
          <OutlinedInput
          style={{height: 46}}
            type="text"
            id="outlined-adornment-name"
            className="register__textBox"
            value={name}
            onChange={(e) => setName(e.target.value)}
            label="Full Name"
          />
          </FormControl>
          {/*<input
            type="text"
            className="register__textBox"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail Address"
/>*/}
          <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
          <InputLabel>E-mail address</InputLabel>
          <OutlinedInput
          style={{height: 46}}
          id="outlined-adornment-name"
          type="text"
          className="register__textBox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
            label="E-mail address"
          />
          </FormControl>
          {/*<input
            type="password"
            className="register__textBox"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
/>*/}
          <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
          <InputLabel>Password</InputLabel>
          <OutlinedInput
          style={{height: 46}}
            id="outlined-adornment-name"
            type="password"
            className="register__textBox"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label="Password"
          />
          </FormControl>
          {/*<button className="register__btn" onClick={register}>
            Register
</button>*/}
          <Button className="register__btn" variant="contained" onClick={register}>Register</Button>
          {/*<button
            className="register__btn register__google"
            onClick={signInWithGoogle}
          >
            Register with Google
</button>*/}
          <div>
            {/*Already have an account? <Link to="/">Login</Link> now.*/}
          </div>
          <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
            <p style={{color: 'gray', fontSize: 20, alignSelf: 'center'}}>Already have an account?</p>
            <Button style={{paddingTop: 5}} className="login__btn" onClick={() => setActiveIndex(1)}>Click here</Button>
          </div>
        </div>
      </div>
    );
  }



  function Reset({setActiveIndex}) {
    const [email, setEmail] = useState("");
    const [user, loading, error] = useAuthState(auth);
    //const navigate = useNavigate();
    useEffect(() => {
      if (loading) return;
      //if (user) navigate("/dashboard");
      if (user) setActiveIndex(2)
    }, [user, loading]);
    return (
      <div className="reset">
        <div className="reset__container">
          <input
            type="text"
            className="reset__textBox"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail Address"
          />
          <button
            className="reset__btn"
            onClick={() => sendPasswordReset(email)}
          >
            Send password reset email
          </button>
          <div>
            Don't have an account? {/*<Link to="/register">Register</Link> now.*/}
          </div>
        </div>
      </div>
    );
  }

  function ChooseType({setActiveIndex}) {
    const [user, loading, error] = useAuthState(auth);
    //const navigate = useNavigate();
    useEffect(() => {
      if (loading) return;
      //if (user) navigate("/dashboard");
    }, [user, loading]);
    return (
      <div style={{backgroundColor: 'white', width: '100%', height: 925}}>
        <div style={{justifyContent: 'center', alignSelf: 'center', display: 'flex', flexDirection: 'column', marginTop: '17%'}}>
          <h1 style={{color: 'gray', alignSelf: 'center'}}>I am a</h1>
          <div style={{display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'center'}}>
          <Button style={{alignSelf: 'center', marginRight: 50}} variant='contained' onClick={() => setActiveIndex(5)}>Company</Button>
          <Button style={{alignSelf: 'center'}} variant='contained' onClick={() => setActiveIndex(1)}>Individual</Button>
          </div>
        </div>
      </div>
    );
  }

