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





// Fuel Combustion
function CalculateScreen({setActiveProfileIndex}) {
    const [userData, setUserData] = React.useState({})

    const [user, loading, error] = useAuthState(auth);

    const dbRef = ref(getDatabase());
    console.log(user?.uid)
    get(child(dbRef, `users/${user?.uid}`)).then((snapshot) => {
    if (snapshot.exists()) {
        // console.log(snapshot.val());
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
      <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
          <InputLabel>Amount</InputLabel>
          <OutlinedInput
          endAdornment={<InputAdornment position="amount">Gallons of Propane</InputAdornment>}
            id="outlined-adornment-name"
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
    values.type = 'Fuel Combustion'
    var reference = ref(db, 'users/' + user.uid + '/footprints/' + hash);
    set(reference, values);
    reference = ref(db, '/uncalculated_emissions/' + user.uid);
    set(reference, {'0':hash});
    setValues({
        amount: 0
      })
   }}>{'Submit'}</Button>
    </div>}
    </>
    );
  }

  export default CalculateScreen;






/*
// Driving
function CalculateScreen({setActiveProfileIndex}) {
    const [userData, setUserData] = React.useState({})

    const [user, loading, error] = useAuthState(auth);

    const dbRef = ref(getDatabase());
    console.log(user?.uid)
    get(child(dbRef, `users/${user?.uid}`)).then((snapshot) => {
    if (snapshot.exists()) {
        // console.log(snapshot.val());
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
        distance: 0,
        make: '',
        model: '',
        year: ''
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
      <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
          <InputLabel>Make</InputLabel>
          <OutlinedInput
          endAdornment={<InputAdornment position="make"></InputAdornment>}
            id="outlined-adornment-name"
            value={values.make}
            onChange={handleChange('make')}
            label="Location"
          />
        </FormControl>
        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
          <InputLabel>Model</InputLabel>
          <OutlinedInput
          endAdornment={<InputAdornment position="model"></InputAdornment>}
            id="outlined-adornment-name"
            value={values.model}
            onChange={handleChange('model')}
            label="Location"
          />
        </FormControl>
        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
          <InputLabel>Year</InputLabel>
          <OutlinedInput
          endAdornment={<InputAdornment position="year"></InputAdornment>}
            id="outlined-adornment-name"
            value={values.year}
            onChange={handleChange('year')}
            label="Location"
          />
        </FormControl>
      </div>
      <div>
      <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
          <InputLabel>Distance</InputLabel>
          <OutlinedInput
          endAdornment={<InputAdornment position="distance">miles</InputAdornment>}
            id="outlined-adornment-name"
            value={values.distance}
            onChange={handleChange('distance')}
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
    values.type = 'Driving'
    var reference = ref(db, 'users/' + user.uid + '/footprints/' + hash);
    set(reference, values);
    reference = ref(db, '/uncalculated_emissions/' + user.uid);
    set(reference, {'0':hash});
    setValues({
        distance: 0,
        make: '',
        model: '',
        year: ''
      })
   }}>{'Submit'}</Button>
    </div>}
    </>
    );
  }

  export default CalculateScreen;
*/






/*
// Shipping
function CalculateScreen({setActiveProfileIndex}) {
    const [userData, setUserData] = React.useState({})

    const [user, loading, error] = useAuthState(auth);

    const dbRef = ref(getDatabase());
    console.log(user?.uid)
    get(child(dbRef, `users/${user?.uid}`)).then((snapshot) => {
    if (snapshot.exists()) {
        // console.log(snapshot.val());
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
        weight: 0,
        distance: 0,
        transport_method: 'Truck'
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
          <InputLabel>{'Weight'}</InputLabel>
          <OutlinedInput
          endAdornment={<InputAdornment position="weight">lbs</InputAdornment>}
            id="outlined-adornment-location"
            value={values.weight}
            onChange={handleChange('weight')}
            label="Location"
          />
      </FormControl>
      <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
          <InputLabel>Distance</InputLabel>
          <OutlinedInput
          endAdornment={<InputAdornment position="distance">miles</InputAdornment>}
            id="outlined-adornment-name"
            value={values.distance}
            onChange={handleChange('distance')}
            label="Location"
          />
        </FormControl>
        <TextField
            style={{width: values.type=='limit' ? '25ch' : '51ch', marginTop: 16, alignSelf: 'center'}}
          id="outlined-select-currency"
          select
          label="Transport Method"
          value={values.transport_method}
          onChange={handleChange('transport_method')}
        >
            <MenuItem key={"Truck"} value={'truck'}>
              {"Truck"}
            </MenuItem>
            <MenuItem key={"Ship"} value={'ship'}>
              {"Ship"}
            </MenuItem>
            <MenuItem key={"Train"} value={'train'}>
              {"Train"}
            </MenuItem>
            <MenuItem key={"Plane"} value={'plane'}>
              {"Plane"}
            </MenuItem>
        </TextField>
        </div>
    </Box>
    <Button variant="contained"
    color="primary"
    style={{marginTop: 50}}
    onClick={() => {
    const db = getDatabase();
    const hash = uuid()
    values.type = 'Shipping'
    var reference = ref(db, 'users/' + user.uid + '/footprints/' + hash);
    set(reference, values);
    reference = ref(db, '/uncalculated_emissions/' + user.uid);
    set(reference, {'0':hash});
    setValues({
        weight: 0,
        distance: 0,
        transport_method: 'Truck'
      })
   }}>{'Submit'}</Button>
    </div>}
    </>
    );
  }

  export default CalculateScreen;
*/









/*
// Flights
function CalculateScreen({setActiveProfileIndex}) {
    const [userData, setUserData] = React.useState({})

    const [user, loading, error] = useAuthState(auth);

    const dbRef = ref(getDatabase());
    console.log(user?.uid)
    get(child(dbRef, `users/${user?.uid}`)).then((snapshot) => {
    if (snapshot.exists()) {
        // console.log(snapshot.val());
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
        start: '',
        end: '',
        round_trip: 'No',
        num_passengers: 1
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
          <InputLabel>{'Departure Airport'}</InputLabel>
          <OutlinedInput
          endAdornment={<InputAdornment position="start"></InputAdornment>}
            id="outlined-adornment-location"
            value={values.start}
            onChange={handleChange('start')}
            label="Location"
          />
      </FormControl>
      <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
          <InputLabel>Destination Airport</InputLabel>
          <OutlinedInput
          endAdornment={<InputAdornment position="start"></InputAdornment>}
            id="outlined-adornment-name"
            value={values.end}
            onChange={handleChange('end')}
            label="Location"
          />
        </FormControl>
        <TextField
            style={{width: values.type=='limit' ? '25ch' : '51ch', marginTop: 16, alignSelf: 'center'}}
          id="outlined-select-currency"
          select
          label="Round trip?"
          value={values.round_trip}
          onChange={handleChange('round_trip')}
        >
            <MenuItem key={"Yes"} value={true}>
              {"Yes"}
            </MenuItem>
            <MenuItem key={"No"} value={false}>
              {"No"}
            </MenuItem>
        </TextField>
        </div>
        <div>
        <FormControl sx={{ m: 1, width: '25ch', marginTop: 2, marginRight: 2, marginLeft: -1 }} variant="outlined">
          <InputLabel>{'Number of Passengers'}</InputLabel>
          <OutlinedInput
          endAdornment={<InputAdornment position="start"></InputAdornment>}
            id="outlined-adornment-location"
            value={values.num_passengers}
            onChange={handleChange('num_passengers')}
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
    values.type = 'Flight'
    var reference = ref(db, 'users/' + user.uid + '/footprints/' + hash);
    set(reference, values);
    reference = ref(db, '/uncalculated_emissions/' + user.uid);
    set(reference, {'0':hash});
    setValues({
        start: '',
        end: '',
        round_trip: 'No',
        num_passengers: 1
      })
   }}>{'Submit'}</Button>
    </div>}
    </>
    );
  }

  export default CalculateScreen;
*/








/*
// Electricity
function CalculateScreen({setActiveProfileIndex}) {

    const [userData, setUserData] = React.useState({})

    const [user, loading, error] = useAuthState(auth);

    const dbRef = ref(getDatabase());
    console.log(user?.uid)
    get(child(dbRef, `users/${user?.uid}`)).then((snapshot) => {
    if (snapshot.exists()) {
        //console.log(snapshot.val());
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
          endAdornment={<InputAdornment position="start"></InputAdornment>}
            id="outlined-adornment-location"
            value={values.state}
            onChange={handleChange('state')}
            label="Location"
          />
      </FormControl>
      <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
          <InputLabel>Country</InputLabel>
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
*/






















/*
// Old code
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
