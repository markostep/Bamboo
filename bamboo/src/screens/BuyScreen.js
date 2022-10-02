import React from 'react';
//import List from '@mui/material/List';
//import ListItem from '@mui/material/ListItem';
//import ListItemButton from '@mui/material/ListItemButton';

import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
//import {usePostData} from '../components/utils/postData'

function renderRow(props) {
  const { index, style } = props;

  return (
    <ListItem style={style} key={index} component="div" disablePadding>
      <ListItemButton style={{height: 200}} onClick={() => {console.log('clicked')}}>
        <ListItemText style={{color: 'black'}} primary={`Carbon Company ${index + 1}`} />
      </ListItemButton>
    </ListItem>
  );
}

const list = [
    'Company 1',
    'Company 2',
    'Company 3',
    'Company 1',
    'Company 2',
    'Company 3',
    'Company 1',
    'Company 2',
    'Company 3'
  ];

  const directList = [
    'Direct Removal Company 1',
    'Company 2',
    'Company 3',
    'Company 1',
    'Company 2',
    'Company 3',
    'Company 1',
    'Company 2',
    'Company 3'
  ];
  const numbers = [1, 2, 3, 4, 5, 6, 7,8, 9, 10, 11, 12, 13, 14, 15];
const listItems = numbers.map((number) =>
  <li>{number}</li>
);
  

//var postData = []
function BuyScreen() {

    //postData = usePostData()
  
    //list = postData
    return (
      <div style={{backgroundColor: 'white', width: '100%'}}>
        {/*<header style={{justifyContent: 'flex-start'}}>
        <div>
          
          <h3 style={{color: 'black'}}>Buy</h3>
        </div>
        </header>
    <ul>{listItems}</ul>*/}
        
        <FixedSizeList
        header
        height={910}
        style={{marginLeft: '25%'}}
        width={'50%'}
        itemSize={200}
        itemCount={list.length}
        overscanCount={5}
      >
        {renderRow}
      </FixedSizeList>
      </div>
    );
  }
  
  export default BuyScreen;