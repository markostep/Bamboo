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
import uuid from 'react-uuid';
import { auth, logInWithEmailAndPassword, signInWithGoogle, db, logout, registerWithEmailAndPassword, sendPasswordReset  } from "../components/utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";


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
  
function PurchaseScreen({setActiveProfileIndex}) {

    const [userData, setUserData] = React.useState({})

    const [user, loading, error] = useAuthState(auth);

    const dbRef = ref(getDatabase());
    console.log(user?.uid)
    get(child(dbRef, `users/${user?.uid}`)).then((snapshot) => {
    if (snapshot.exists()) {
        console.log(snapshot.val());
        //setName(snapshot.val().name)
        setUserData(snapshot.val())
        //setValues({ ...values, ['company_id']: snapshot.val().companyData.companyId });
    } else {
        console.log("No data available");
    }
    }).catch((error) => {
    console.error(error);
    });

    

    const [values, setValues] = React.useState({
        tech: 'Direct Removal',
        tons: 0,
        price: 0,
        type: 'market',
        order: 'buy',
        monthly: false,
        company_id: ''
      });

      const [activeIndex, setActiveIndex] = React.useState(0);

      const handleChange =
    (prop) => (event) => {
      setValues({ ...values, [prop]: event.target.value });
    };

    React.useEffect(() => {
        if (loading) return;
        //fetchUserName();
        
      }, [user, loading]);

    return (
        <>
        {activeIndex == 0 &&
    <div style={{backgroundColor: 'white', width: '100%', height: 910}}>
    <div style={{backgroundColor: 'white', width: '100%'}}>
        <header style={{justifyContent: 'flex-start'}}>
        <div style={{display: 'flex', flexDirection: 'row', alignSelf: 'center', justifyContent: 'center'}}>
          <h3 style={{color: 'gray', width: '100%'}}>Place your purchase here</h3>
        </div>
        </header>
      </div>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', backgroundColor: 'white', width: '100%', justifyContent: 'center' }}>
        <div>
        <TextField
            style={{width: '51ch', marginTop: 16, alignSelf: 'center', marginLeft: 3}}
          id="outlined-select-currency"
          select
          label="Technology"
          value={values.buyerOrSeller}
          onChange={handleChange('tech')}
        >
            <MenuItem key={"Direct Removal"} value={'Direct Removal'}>
              {"Direct Removal"}
            </MenuItem>
            <MenuItem key={"BEECS"} value={"BEECS"}>
              {"BEECS"}
            </MenuItem>
            <MenuItem key={"any"} value={"any"}>
              {"Any"}
            </MenuItem>
        </TextField>
        <div><FormControl sx={{ m: 1, width: '25ch', marginTop: 2, marginRight: 2, marginLeft: -1 }} variant="outlined">
          <InputLabel>{'Amount'}</InputLabel>
          <OutlinedInput
          endAdornment={<InputAdornment position="start">tons</InputAdornment>}
            id="outlined-adornment-location"
            value={values.tons}
            onChange={handleChange('tons')}
            label="Location"
          />
        </FormControl>
        <TextField
            style={{width: '25ch', marginTop: 16, alignSelf: 'center', marginLeft: 3}}
          id="outlined-select-currency"
          select
          label="Monthly or One-time"
          value={values.buyerOrSeller}
          onChange={handleChange('monthly')}
        >
            <MenuItem key={"Monthly"} value={true}>
              {"Monthly"}
            </MenuItem>
            <MenuItem key={"Seller"} value={false}>
              {"One-time"}
            </MenuItem>
        </TextField>
        </div>
        </div>
        <div>
        <TextField
            style={{width: values.type=='limit' ? '25ch' : '51ch', marginTop: 16, alignSelf: 'center'}}
          id="outlined-select-currency"
          select
          label="Market or limit order"
          value={values.buyerOrSeller}
          onChange={handleChange('type')}
        >
            <MenuItem key={"market"} value={'market'}>
              {"Market"}
            </MenuItem>
            <MenuItem key={"limit"} value={'limit'}>
              {"Limit"}
            </MenuItem>
        </TextField>
        {values.type == 'limit' && <FormControl sx={{ m: 1, width: '25ch', marginTop: 2, alignSelf: 'center', marginLeft: 3}} variant="outlined">
          <InputLabel>{'Price (only for limit order)'}</InputLabel>
          <OutlinedInput
          endAdornment={<InputAdornment position="start">USD/ton</InputAdornment>}
            id="outlined-adornment-location"
            value={values.price}
            onChange={handleChange('price')}
            label="Price (only for limit order)"
          />
        </FormControl>}
        </div>
    </Box>
    <Button variant="contained"
    color="primary"
    style={{marginTop: 50}}
    onClick={() => {
            /*const db = getDatabase();
        
            const reference = ref(db, 'test/');
            set(reference, {data: 'test2'});
    */
   
    const db = getDatabase();
    const hash = uuid()
    values.company_id = userData.companyData.companyId
    var reference = ref(db, 'new_listings/' + hash);
    set(reference, values);
    reference = ref(db, 'users/' + user.uid + '/listings/' + hash);
    set(reference, values);
    setValues({
        tech: 'Direct Removal',
        tons: 0,
        price: 0,
        type: 'market',
        order: 'buy',
        monthly: false,
        company_id: ''
      })
   }}>{'Submit'}</Button>
    </div>}
    </>
    );
  }
  
  export default PurchaseScreen;