import './App.css';
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import React from 'react';
import BuyScreen from './screens/BuyScreen';
import SellScreen from './screens/SellScreen';
import CalculateScreen from './screens/CalculateScreen';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { TextField } from '@mui/material';
import { IoMdPerson } from "react-icons/io";
import { GiBamboo } from "react-icons/gi";
import IconButton from '@mui/material/IconButton';
import ProfileScreen from './screens/ProfileScreen';
import Dashboard from './screens/Dashboard';
import Register from './screens/Register';
import Login from './screens/Login';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ListingScreen from './screens/ListingScreen';

function App() {
  const [value, setValue] = React.useState(1);
  const [seachBarValue, setSearchBarValue] = React.useState("");

  const handleChange = (event) => {
    console.log('change')
    setSearchBarValue(event.target.value);
  };

  return (
    <ThemeProvider theme={theme}>
    <div style={{backgroundColor: 'white'}} className="App">
      <header style={{justifyContent: 'flex-start'}} className="App-header">
        <div style={{backgroundColor: 'white', width: '100%', justifyContent: 'space-between', display: 'flex', height: 100}}>
          <h1 style={{color: '#02cf73', backgroundColor: 'white', marginLeft: 10, width: 300, alignSelf: 'center'}}>Bamboo</h1>
          <GiBamboo size={70} color='#02cf73' style={{alignSelf: 'center'}}></GiBamboo>
          <TextField id="outlined-basic" label="Search" variant="outlined" style={{width: 1000, alignSelf: 'center', marginLeft: 50}} 
            value={seachBarValue}
            onChange={handleChange}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
              event.preventDefault();
              console.log(seachBarValue);
              console.log('User pressed Enter ✅');
              }
            }}/>
          <Tabs
            style={{width: 400, alignSelf: 'center', marginLeft: 150}}
            defaultValue={value}
            textColor="primary"
            indicatorColor="primary"
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
            >
              <Tab label="Buy"/>
              <Tab label="Sell"/>
              <Tab label="Calculate"/>
          </Tabs>
          <IconButton style={{alignSelf: 'center', marginRight: 20}} onClick={() => {setValue(3)}}>
          <IoMdPerson color='lightgray' size={50}> </IoMdPerson>
          </IconButton>
          
        </div>
        <div style={{width: '100%', height: 2, backgroundColor: 'lightgray'}}>

        </div>
        
        {/*<img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload baby rishi.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
  <h2>How to Create Tabs in ReactJS?</h2>*/}
      {value == 0 &&
      <BuyScreen>

      </BuyScreen>}
      {value == 1 &&
      <ListingScreen>

      </ListingScreen>}
      {value == 2 &&
      <CalculateScreen>
      </CalculateScreen>}
      {value == 3 &&
      <ProfileScreen>

      </ProfileScreen>
      }
      </header>
    </div>
    </ThemeProvider>
  );
}

export default App;

const theme = createTheme({
  palette: {
    primary: {
      main: '#02cf73'
    },
    secondary: {
      main: '#E33E7F'
    }
  }
});
