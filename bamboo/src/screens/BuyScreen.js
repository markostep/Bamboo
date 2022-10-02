import React, { useEffect } from 'react';
//import List from '@mui/material/List';
//import ListItem from '@mui/material/ListItem';
//import ListItemButton from '@mui/material/ListItemButton';

import { getDatabase, ref, onValue, set, child, remove, get} from 'firebase/database';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import { auth, logInWithEmailAndPassword, signInWithGoogle, db, logout, registerWithEmailAndPassword, sendPasswordReset  } from "../components/utils/firebase";

//import {usePostData} from '../components/utils/postData'

var list = [
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

    const [monthly_dr_buy_book, set_monthly_dr_buy_book] = React.useState({})
    const [monthly_dr_sell_book, set_monthly_dr_sell_book] = React.useState({})
    const [monthly_beecs_buy_book, set_monthly_beecs_buy_book] = React.useState({})
    const [monthly_beecs_sell_book, set_monthly_beecs_sell_book] = React.useState({})
    const [onetime_dr_buy_book, set_onetime_dr_buy_book] = React.useState({})
    const [onetime_dr_sell_book, set_onetime_dr_sell_book] = React.useState({})
    const [onetime_beecs_buy_book, set_onetime_beecs_buy_book] = React.useState({})
    const [onetime_beecs_sell_book, set_onetime_beecs_sell_book] = React.useState({})

    const [list, setList] = React.useState([
        'Company 1',
        'Company 2',
        'Company 3',
        'Company 1',
        'Company 2',
        'Company 3',
        'Company 1',
        'Company 2',
        'Company 3'
      ])

    const dbRef = ref(getDatabase());

    useEffect(() => {
        var tempList = []
        get(child(dbRef, `books/monthly/beecs/buy`)).then((snapshot) => {
            if (snapshot.exists()) {
                var tempArray = []
                snapshot.forEach((child) => {
                    console.log(child.key, child.val()); 
                    tempArray.push(child.val());
                    tempList.push(child.val());
                  });
                set_monthly_beecs_buy_book(tempArray)
            } else {
                console.log("No data available");
            }
            }).catch((error) => {
            console.error(error);
            });
        
            get(child(dbRef, `books/monthly/direct_removal/buy`)).then((snapshot) => {
            if (snapshot.exists()) {
                var tempArray = []
                snapshot.forEach((child) => {
                    console.log(child.key, child.val()); 
                    tempArray.push(child.val());
                    tempList.push(child.val());
                  });
                set_monthly_dr_buy_book(tempArray)
            } else {
                console.log("No data available");
            }
            }).catch((error) => {
            console.error(error);
            });
        
            get(child(dbRef, `books/onetime/beecs/buy`)).then((snapshot) => {
            if (snapshot.exists()) {
                var tempArray = []
                snapshot.forEach((child) => {
                    console.log(child.key, child.val()); 
                    tempArray.push(child.val());
                    tempList.push(child.val());
                  });
                set_onetime_beecs_buy_book(tempArray)
            } else {
                console.log("No data available");
            }
            }).catch((error) => {
            console.error(error);
            });
        
            get(child(dbRef, `books/onetime/direct_removal/buy`)).then((snapshot) => {
            if (snapshot.exists()) {
                var tempArray = []
                snapshot.forEach((child) => {
                    console.log(child.key, child.val()); 
                    tempArray.push(child.val());
                    tempList.push(child.val());
                  });
                set_onetime_dr_buy_book(tempArray)
            } else {
                console.log("No data available");
            }
            }).catch((error) => {
            console.error(error);
            });
        
        
            get(child(dbRef, `books/monthly/beecs/sell`)).then((snapshot) => {
            if (snapshot.exists()) {
                var tempArray = []
                snapshot.forEach((child) => {
                    console.log(child.key, child.val()); 
                    tempArray.push(child.val());
                    tempList.push(child.val());
                  });
                set_monthly_beecs_sell_book(tempArray)
            } else {
                console.log("No data available");
            }
            }).catch((error) => {
            console.error(error);
            });
        
            get(child(dbRef, `books/monthly/direct_removal/sell`)).then((snapshot) => {
            if (snapshot.exists()) {
                var tempArray = []
                snapshot.forEach((child) => {
                    console.log(child.key, child.val()); 
                    tempArray.push(child.val());
                    tempList.push(child.val());
                  });
                set_monthly_dr_sell_book(tempArray)
            } else {
                console.log("No data available");
            }
            }).catch((error) => {
            console.error(error);
            });
        
            get(child(dbRef, `books/onetime/beecs/sell`)).then((snapshot) => {
            if (snapshot.exists()) {
                var tempArray = []
                snapshot.forEach((child) => {
                    console.log(child.key, child.val()); 
                    tempArray.push(child.val());
                    tempList.push(child.val());
                  });
                set_onetime_beecs_sell_book(tempArray)
            } else {
                console.log("No data available");
            }
            }).catch((error) => {
            console.error(error);
            });
        
            get(child(dbRef, `books/onetime/direct_removal/sell`)).then((snapshot) => {
            if (snapshot.exists()) {
                var tempArray = []
                snapshot.forEach((child) => {
                    console.log(child.key, child.val()); 
                    tempArray.push(child.val());
                    tempList.push(child.val());
                  });
                set_onetime_dr_sell_book(tempArray)
            } else {
                console.log("No data available");
            }
            }).catch((error) => {
            console.error(error);
            });
            setList(tempList)

            get(dbRef).then((snapshot) => {
            if (snapshot.exists()) {
                console.log('snapshot here')
                console.log(snapshot.val().companies)
                //setName(snapshot.val().name)
                //companyData = snapshot.val().companyData
                setCompanies(snapshot.val().companies)
                //setValues({ ...values, ['company_id']: snapshot.val().companyData.companyId });
            } else {
                console.log("No data available");
            }
            }).catch((error) => {
            console.error(error);
            });

            
            /*var tempCompanyData = []
            list.forEach((item) => {
                tempCompanyData.push(findCompanyData(item?.company_id))
            })
            setCompanyData(tempCompanyData)*/
    }, []);

    //const [companyData, setCompanyData] = React.useState([])

    const [companies, setCompanies] = React.useState()

    //postData = usePostData()
  
    //list = postData
    console.log('look here')

    console.log(list)
    const displayList = list

    const findCompanyData = (companyId) => {
        var companyData = {}

        console.log('company id')
        console.log(companyId)

        /*ref = db.ref(`companies/Seller/${companyId}/`);

        ref.on('value', (snapshot) => {
            console.log('snappy')
            console.log(snapshot.val());
          }, (errorObject) => {
            console.log('The read failed: ' + errorObject.name);
          }); */

          /*const db = getDatabase();
            const starCountRef = ref(db, 'companies/Seller/' + companyId + '/');
            onValue(starCountRef, (snapshot) => {
            const data = snapshot.val();
            console.log('data')
            console.log(data)
            return data
            });*/

        const dbRef = ref(getDatabase());
        get(dbRef, `companies/Seller/${companyId}/`).then((snapshot) => {
        if (snapshot.exists()) {
            console.log('snapshot here')
            console.log(snapshot.val().companies.Seller[companyId]);
            //setName(snapshot.val().name)
            //companyData = snapshot.val().companyData
            return snapshot.val().companies.Seller[companyId]
            //setValues({ ...values, ['company_id']: snapshot.val().companyData.companyId });
        } else {
            console.log("No data available");
        }
        }).catch((error) => {
        console.error(error);
        });
    }


    function renderRow(props) {
        const { index, style } = props;
      
        return (
          <ListItem style={style} key={index} component="div" disablePadding>
            <ListItemButton style={{height: 200}} onClick={() => {console.log('clicked')}}>
                <h3 style={{color: 'black'}}>
                {`${companies?.Seller[list[index]?.company_id]?.companyName}`}
                </h3>
                <p style={{color: 'gray', fontSize: 20}}>{list[index]?.price}</p>
                <p>{list[index]?.monthly}</p>
                <p>{list[index]?.type}</p>
                <p>{list[index]?.tons}</p>
                <p>{list[index]?.tech}</p>
                <ListItemText style={{color: 'black'}} primary={`Carbon Company ${list[index]?.company_id}`} />
              
              
            </ListItemButton>
          </ListItem>
        );
      }
    //list = onetime_dr_sell_book
    //list = monthly_dr_buy_book.concat(monthly_dr_sell_book).concat(monthly_beecs_buy_book).concat(monthly_beecs_sell_book).concat(onetime_dr_buy_book).concat(onetime_dr_sell_book).concat(onetime_beecs_buy_book).concat(onetime_beecs_sell_book)
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