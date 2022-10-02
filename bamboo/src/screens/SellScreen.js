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
  
function SellScreen({setActiveProfileIndex}) {

    const [user, loading, error] = useAuthState(auth);

    const [values, setValues] = React.useState({
        companyName: '',
        location: '',
        description: '',
        reserves: 0,
        technology: '',
        type: 'Company',
        buyerOrSeller: 'Buyer',
        companyId: ''
      });

      const [activeIndex, setActiveIndex] = React.useState(0);

      const handleChange =
    (prop) => (event) => {
      setValues({ ...values, [prop]: event.target.value });
    };

    return (
        <>
        {activeIndex == 0 &&
    <div style={{backgroundColor: 'white', width: '100%', height: 910}}>
    <div style={{backgroundColor: 'white', width: '100%'}}>
        <header style={{justifyContent: 'flex-start'}}>
        <div style={{display: 'flex', flexDirection: 'row', alignSelf: 'center', justifyContent: 'center'}}>
          <h3 style={{color: 'gray'}}>Tell us about your </h3>
          <h3 style={{color: '#02cf73', marginLeft: 7}}> company</h3>
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
            onChange={handleChange('companyName')}
            label="Company Name"
          />
        </FormControl>
        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
          <InputLabel>Location</InputLabel>
          <OutlinedInput
            id="outlined-adornment-location"
            value={values.password}
            onChange={handleChange('location')}
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
        <TextField
            style={{width: '51ch', marginTop: 10}}
          id="outlined-select-currency"
          select
          label="Buyer or Seller"
          value={values.buyerOrSeller}
          onChange={handleChange('buyerOrSeller')}
        >
            <MenuItem key={"Buyer"} value={"Buyer"}>
              {"Buyer"}
            </MenuItem>
            <MenuItem key={"Seller"} value={"Seller"}>
              {"Seller"}
            </MenuItem>
        </TextField>
    </Box>
    <Button variant="contained"
    color="primary"
    style={{marginTop: 50}}
    onClick={() => {
            /*const db = getDatabase();
        
            const reference = ref(db, 'test/');
            set(reference, {data: 'test2'});
    */
   if (values.buyerOrSeller == 'Seller') {
    setActiveIndex(1)
   } else {
    const db = getDatabase();
    const companyId = uuid()
    values.companyId = companyId
    var reference = ref(db, 'companies/' + values.buyerOrSeller + '/' + companyId);
    set(reference, values);
    reference = ref(db, 'users/' + user.uid + '/companyData');
    set(reference, values);
    //setActiveIndex(2)
    setActiveProfileIndex(3)
   }
   }}>{values.buyerOrSeller == 'Seller' ? 'Next' : 'Submit'}</Button>
    </div>}


    {activeIndex == 1 &&
    <div style={{backgroundColor: 'white', width: '100%', height: 910}}>
    <div style={{backgroundColor: 'white', width: '100%'}}>
        <header style={{justifyContent: 'flex-start'}}>
        <div style={{display: 'flex', flexDirection: 'row', alignSelf: 'center', justifyContent: 'center'}}>
            <h3 style={{color: 'gray'}}>Tell us about your </h3>
          <h3 style={{color: '#02cf73', marginLeft: 7}}> product</h3>
        </div>
        </header>
      </div>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', backgroundColor: 'white', width: '100%', justifyContent: 'center' }}>
      {values.buyerOrSeller == 'Seller' && <FormControl sx={{ m: 1, width: '51ch', marginBottom: 2 }} variant="outlined">
          <InputLabel>Reserves</InputLabel>
          <OutlinedInput
            id="outlined-adornment-reserves"
            value={values.password}
            onChange={handleChange('reserves')}
            label="Reserves"
            endAdornment={<InputAdornment position="start">tons/yr</InputAdornment>}
          />
        </FormControl>}
      {values.buyerOrSeller == 'Seller' && <TextField
            style={{width: '51ch'}}
          id="outlined-select-currency"
          select
          label="Technology"
          value={values.technology}
          onChange={handleChange('technology')}
        >
          {technologies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>}
    </Box>
    <div style={{marginTop: 50}}>
    <Button style={{marginRight: 20}} onClick={() => {
            /*const db = getDatabase();
        
            const reference = ref(db, 'test/');
            set(reference, {data: 'test2'});
            */
            setActiveIndex(0)
        }}>Back</Button>
    <Button variant="contained" onClick={() => {
            const db = getDatabase();
            const companyId = uuid()
            values.companyId = companyId
            var reference = ref(db, 'companies/' + values.buyerOrSeller + '/' + companyId);
            set(reference, values);
            reference = ref(db, 'users/' + user.uid + '/companyData');
            set(reference, values);
            //setActiveIndex(2)
            setActiveProfileIndex(3)
        }}>Submit</Button>
    </div>

    </div>}


    {activeIndex == 2 &&
    <div style={{backgroundColor: 'white', width: '100%', height: 910}}>
        <header style={{justifyContent: 'flex-start'}}>
        <div style={{display: 'flex', flexDirection: 'row', alignSelf: 'center', justifyContent: 'center'}}>
            <h3 style={{color: 'gray'}}>Your information has been received </h3>
          <h3 style={{color: '#02cf73', marginLeft: 0}}> !</h3>
        </div>
        </header>
    </div>}
    </>
    );
  }
  
  export default SellScreen;