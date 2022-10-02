import React, {useEffect} from 'react';
// import { initializeApp } from 'firebase/app';
// import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);


//import List from '@mui/material/List';
//import ListItem from '@mui/material/ListItem';
//import ListItemButton from '@mui/material/ListItemButton';

import { getDatabase, ref, onValue, set, child, remove, get} from 'firebase/database';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import { auth, logInWithEmailAndPassword, signInWithGoogle, db, logout, registerWithEmailAndPassword, sendPasswordReset  } from "../components/utils/firebase";
import { GiBamboo } from "react-icons/gi";
import { useAuthState } from "react-firebase-hooks/auth";

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
function HistoryScreen({filledSelected}) {

    const [filled_orders, set_filled_orders] = React.useState([])
    const [open_orders, set_open_orders] = React.useState([])

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
    const [userData, setUserData] = React.useState({})
    const [user, loading, error] = useAuthState(auth);
    const [currentCompanyId, setCurrentCompanyId] = React.useState('')
    const [loaded, setLoaded] = React.useState(false)
    const [loaded2, setLoaded2] = React.useState(false)
    const [loaded3, setLoaded3] = React.useState(false)
    const [loaded4, setLoaded4] = React.useState(false)

    setTimeout(function(){
        setLoaded4(true)
    }, 500); 


    useEffect(() => {
        const dbRef = ref(getDatabase());
        // console.log(user?.uid)
        get(child(dbRef, `users/${user?.uid}`)).then((snapshot) => {
        if (snapshot.exists()) {
            // console.log(snapshot.val());
            //setName(snapshot.val().name)
            setUserData(snapshot.val())
            setCurrentCompanyId(snapshot.val()?.companyData)
            setLoaded3(true)
        } else {
            console.log("No data available");
        }
        }).catch((error) => {
        console.error(error);
        });

/*         // console.log(user?.uid)
        get(child(dbRef, `users/${user?.uid}`)).then((snapshot) => {
        if (snapshot.exists()) {
            var tempList = []
            snapshot.forEach((child) => {
                console.log(child.key, child.val()); 
                tempArray.push(child.val());
                tempList.push(child.val());
              });
            set_filled_orders(tempArray)
            // console.log(snapshot.val());
            //setName(snapshot.val().name)
            setUserData(snapshot.val())
            setCurrentCompanyId(snapshot.val()?.companyData)
        } else {
            console.log("No data available");
        }
        }).catch((error) => {
        console.error(error);
        }); */
        

        var tempList = []
        get(child(dbRef, 'companies/Seller/' + currentCompanyId?.companyId + '/filled_orders/')).then((snapshot) => {
            if (snapshot.exists()) {
                var tempArray = []
                snapshot.forEach((child) => {
                    console.log(child.key, child.val()); 
                    tempArray.push(child.val());
                    tempList.push(child.val());
                  });
                set_filled_orders(tempArray)
                setLoaded(true)
                if (filledSelected) {
                    setList(filled_orders)
                    
                }
            } else {
                console.log("No data available");
            }
            }).catch((error) => {
            console.error(error);
            });

            /*const reference = ref(dbRef, 'companies/Seller/' + currentCompanyId?.companyId + '/open_orders/');

            const markersChanged = onValue(reference, (snapshot) => {
                if (snapshot.exists()) {
                    var tempArray = []
                    snapshot.forEach((child) => {
                        console.log(child.key, child.val()); 
                        tempArray.push(child.val());
                        tempList.push(child.val());
                      });
                      if (true) {
                        set_open_orders(tempArray)
                      }
                    
                }
            });*/
        
            get(child(dbRef, 'companies/Seller/' + currentCompanyId?.companyId + '/open_orders/')).then((snapshot) => {
                if (snapshot.exists()) {
                    var tempArray = []
                    snapshot.forEach((child) => {
                        console.log(child.key, child.val()); 
                        tempArray.push(child.val());
                        tempList.push(child.val());
                      });
                      set_open_orders(tempArray)
                      setLoaded2(true)
                      if (!filledSelected) {
                        setList(open_orders)
                      }
                    
                } else {
                    console.log("No data available");
                }
                }).catch((error) => {
                console.error(error);
                });

            /*get(dbRef).then((snapshot) => {
            if (snapshot.exists()) {
                console.log('snapshot here')
                console.log(snapshot.val().companies)
                //setName(snapshot.val().name)
                //companyData = snapshot.val().companyData
                setCompanies(snapshot.val().companies)
                //setValues({ ...values, ['company_id']: snapshot.val().companyData.companyId });
                if (snapshot.val().companies?.Seller[currentCompanyId?.companyId]?.filled_orders) {
                    var vals = Object.keys(companies?.Seller[currentCompanyId?.companyId]?.filled_orders).map(function(key) {
                        return snapshot.val().companies?.Seller[currentCompanyId?.companyId]?.filled_orders[key];
                    });
                    console.log(vals)
                    setList(vals)
                    }
            } else {
                console.log("No data available");
            }
            }).catch((error) => {
            console.error(error);
            });*/

            
            /*var tempCompanyData = []
            list.forEach((item) => {
                tempCompanyData.push(findCompanyData(item?.company_id))
            })
            setCompanyData(tempCompanyData)*/
    }, [loaded4]);

    //const [companyData, setCompanyData] = React.useState([])

    const [companies, setCompanies] = React.useState()

    //postData = usePostData()
  
    //list = postData
    console.log('look here')

    console.log(list)
    const displayList = list

    console.log('heyo')
    console.log(currentCompanyId?.companyId)
    console.log('yohey')
    //console.log(Array.from(companies?.Seller[currentCompanyId?.companyId]?.filled_orders?.values()))

    if (list == [
        'Company 1',
        'Company 2',
        'Company 3',
        'Company 1',
        'Company 2',
        'Company 3',
        'Company 1',
        'Company 2',
        'Company 3'
      ] && companies?.Seller[currentCompanyId?.companyId]?.filled_orders) {
        var vals = Object.keys(companies?.Seller[currentCompanyId?.companyId]?.filled_orders).map(function(key) {
            return companies?.Seller[currentCompanyId?.companyId]?.filled_orders[key];
        });
        console.log(vals)
        setList(vals)
        }
    
    /*if (companies?.Seller[currentCompanyId?.companyId]?.filled_orders) {
        //setList([...companies?.Seller[currentCompanyId?.companyId]?.filled_orders?.values()])
    }*/
    

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
            setLoaded4(true)
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
            <>
            { filledSelected &&
          <ListItem style={style} key={index} component="div" disablePadding>
            <ListItemButton style={{height: 150}} onClick={() => {console.log('clicked')}}>
                <div style={{ justifyContent: 'left', width: '80%', alignSelf: 'flex-start', marginLeft: 20}}>
                <div style={{flexDirection: 'row', display: 'flex'}}>
                </div>
                <h3 style={{color: 'gray', fontSize: 30, marginBottom: -20}}>{filled_orders[index]?.order1?.tech != 'any' ? filled_orders[index]?.tech : "Any Technology"}</h3>
                <h3 style={{color: 'gray', fontSize: 30}}>{filled_orders[index]?.monthly ? 'Monthly Contract' : 'One-time Contract'}</h3>
                </div>



                <div style={{ justifyContent: 'right', width: '50%', alignSelf: 'flex-start', marginTop: 10}}>
                <p style={{color: 'gray', fontSize: 30, marginBottom: -20}}>{filled_orders[index]?.order1?.tons + ' tons/yr'}</p>
                {<p style={{color: 'gray', fontSize: 30, marginBottom: -20}}>{'$' + filled_orders[index]?.order1?.price + '/ton'}</p>}
                </div>

                

                <div style={{ justifyContent: 'right', width: '50%', alignSelf: 'flex-start', marginTop: 35}}>
                </div>
                {/*<ListItemText style={{color: 'black'}} primary={`Carbon Company ${list[index]?.company_id}`} />*/}
              
              
            </ListItemButton>
          </ListItem>} 
          { !filledSelected &&
          <ListItem style={style} key={index} component="div" disablePadding>
            <ListItemButton style={{height: 150, display: 'flex'}} onClick={() => {console.log('clicked')}}>
                <div style={{ justifyContent: 'center', width: '80%', alignSelf: 'flex-start', marginLeft: 20}}>
                <div style={{flexDirection: 'row', display: 'flex'}}>
                </div>
                <h3 style={{color: 'gray', fontSize: 30, marginBottom: -20}}>{open_orders[index]?.tech != 'any' ? open_orders[index]?.tech : "Any Technology"}</h3>
                <h3 style={{color: 'gray', fontSize: 30}}>{open_orders[index]?.monthly ? 'Monthly Contract' : 'One-time Contract'}</h3>
                </div>



                <div style={{ justifyContent: 'center', width: '50%', alignSelf: 'flex-start', marginTop: 10}}>
                <p style={{color: 'gray', fontSize: 30, marginBottom: -20}}>{open_orders[index]?.type == 'limit' ? 'Limit Order' : 'Market Order'}</p>
                <p style={{color: 'gray', fontSize: 30, marginBottom: -20}}>{open_orders[index]?.tons + ' tons/yr'}</p>
                </div>

                

                <div style={{ justifyContent: 'right', width: '50%', alignSelf: 'flex-start', marginTop: 35}}>
                </div>
                {/*<ListItemText style={{color: 'black'}} primary={`Carbon Company ${list[index]?.company_id}`} />*/}
              
              
            </ListItemButton>
          </ListItem>}</>
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
        height={487}
        style={{marginLeft: '0%'}}
        width={'100%'}
        itemSize={150}
        itemCount={filledSelected ? filled_orders.length : open_orders.length}
        overscanCount={5}
      >
        {renderRow}
      </FixedSizeList>
      </div>
    );
  }
  
  export default HistoryScreen;
