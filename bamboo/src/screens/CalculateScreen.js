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


// const technologies = [
//     {
//       value: 'Direct Removal',
//       label: 'Direct Removal',
//     },
//     {
//       value: 'BEECS',
//       label: 'BEECS',
//     },
//   ];

function CalculateScreen({setActiveProfileIndex}) {

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
        amount: 0,
        units: 'mwh',
        state: '',
        country: 'USA'
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
          <h3 style={{color: 'gray'}}>Estimate your Footprint</h3>
        </div>
        </header>
      </div>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', backgroundColor: 'white', width: '100%', justifyContent: 'center' }}>
      <div>
      <FormControl sx={{ m: 1, width: '25ch', marginTop: 2, marginRight: 2, marginLeft: -1 }} variant="outlined">
          <InputLabel>{'State'}</InputLabel>
          <OutlinedInput
          endAdornment={<InputAdornment position="start">State</InputAdornment>}
            id="outlined-adornment-location"
            value={values.state}
            onChange={handleChange('state')}
            label="Location"
          />
      </FormControl>
      <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
          <InputLabel>Company Name</InputLabel>
          <OutlinedInput
          disabled
            id="outlined-adornment-name"
            value="USA"
            onChange={handleChange('country')}
            label="Location"
          />
        </FormControl>
        </div>
        <div>
        <FormControl sx={{ m: 1, width: '25ch', marginTop: 2, marginRight: 2, marginLeft: -1 }} variant="outlined">
          <InputLabel>{'Amount'}</InputLabel>
          <OutlinedInput
          endAdornment={<InputAdornment position="start">Mwh</InputAdornment>}
            id="outlined-adornment-location"
            value={values.amount}
            onChange={handleChange('amount')}
            label="Location"
          />
        </FormControl>
        </div>
    </Box>
    <Button variant="contained"
    color="primary"
    style={{marginTop: 50}}
    onClick={() => {
    const db = getDatabase();
    const hash = uuid()
    values.type = 'Electricity'
    var reference = ref(db, 'users/' + user.uid + '/footprints/' + hash);
    set(reference, values);
    reference = ref(db, '/uncalculated_emissions/' + user.uid);
    set(reference, {uid:hash});
    setValues({
        amount: 0,
        units: 'mwh',
        state: '',
        country: 'USA'
      })
   }}>{'Submit'}</Button>
    </div>}
    </>
    );
  }

  export default CalculateScreen;
























/*
import React from 'react';
import { getDatabase, ref, onValue, set, child, remove} from 'firebase/database';
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

const currencies = [
    {
      value: 'USD',
      label: '$',
    },
    {
      value: 'EUR',
      label: '€',
    },
    {
      value: 'BTC',
      label: '฿',
    },
    {
      value: 'JPY',
      label: '¥',
    },
  ];
  
function CalculateScreen() {
    const [values, setValues] = React.useState({
        amount: '',
        name: '',
        weight: '',
        weightRange: '',
        showPassword: false,
      });

      const [activeIndex, setActiveIndex] = React.useState(0);

      const [currency, setCurrency] = React.useState('EUR');

      const handleChange =
    (prop) => (event) => {
      setValues({ ...values, [prop]: event.target.value });
    };

    const handleCurrencyChange = (event) => {
        setCurrency(event.target.value);
      };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

    return (
        <>
        {activeIndex == 0 &&
    <div style={{backgroundColor: 'white', width: '100%', height: 910}}>
    <div style={{backgroundColor: 'white', width: '100%'}}>
        <header style={{justifyContent: 'flex-start'}}>
        <div>
          <h3 style={{color: 'gray'}}>Tell us about your company</h3>
        </div>
        </header>
      </div>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', backgroundColor: 'white', width: '100%', justifyContent: 'center' }}>
      <div>
      <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
          <InputLabel>Company Name</InputLabel>
          <OutlinedInput
            id="outlined-adornment-name"
            value={values.password}
            onChange={handleChange('name')}
            label="Company Name"
          />
        </FormControl>
        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
          <InputLabel>Location</InputLabel>
          <OutlinedInput
            id="outlined-adornment-location"
            value={values.password}
            onChange={handleChange('name')}
            label="Location"
          />
        </FormControl>
        </div>
        <FormControl sx={{ m: 1, width: '51ch' }} variant="outlined">
          <InputLabel>Description</InputLabel>
          <OutlinedInput
            //style={{ minHeight: 200}}
            minRows={5}
            multiline
            id="outlined-adornment-description"
            value={values.password}
            onChange={handleChange('description')}
            label="Description"
          />
        </FormControl>
      <div>
        <TextField
          label="With normal TextField"
          id="outlined-start-adornment"
          sx={{ m: 1, width: '25ch' }}
          InputProps={{
            startAdornment: <InputAdornment position="start">kg</InputAdornment>,
          }}
        />
        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
          <OutlinedInput
            id="outlined-adornment-weight"
            value={values.weight}
            onChange={handleChange('weight')}
            endAdornment={<InputAdornment position="end">kg</InputAdornment>}
            aria-describedby="outlined-weight-helper-text"
            inputProps={{
              'aria-label': 'weight',
            }}
          />
          <FormHelperText id="outlined-weight-helper-text">Weight</FormHelperText>
        </FormControl>
        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={values.showPassword ? 'text' : 'password'}
            value={values.password}
            onChange={handleChange('password')}
            label="Password"
          />
        </FormControl>
        <FormControl fullWidth sx={{ m: 1 }}>
          <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            value={values.amount}
            onChange={handleChange('amount')}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            label="Amount"
          />
        </FormControl>
        <TextField
          id="outlined-select-currency"
          select
          label="Select"
          value={currency}
          onChange={handleChange}
          helperText="Please select your currency"
        >
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </div>
    </Box>
    <button onClick={() => {
            const db = getDatabase();
        
            const reference = ref(db, 'test/');
            set(reference, {data: 'test'});
        }}>

        </button>
    </div>}
    </>
    );
  }
  
  export default CalculateScreen;
*/
