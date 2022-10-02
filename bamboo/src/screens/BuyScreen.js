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
            <ListItemButton style={{height: 300}} onClick={() => {console.log('clicked')}}>
                <div style={{ justifyContent: 'left', width: '80%', alignSelf: 'flex-start', marginLeft: 20}}>
                <div style={{flexDirection: 'row', display: 'flex'}}>
                <h3 style={{color: 'black', marginBottom: -20}}>
                {`${companies?.Seller[list[index]?.company_id]?.companyName}`}
                </h3>
                <h3 style={{color: 'gray', marginBottom: -20}}>
                {', ' + companies?.Seller[list[index]?.company_id]?.location}
                </h3>
                </div>
                <h3 style={{color: 'gray', fontSize: 30, marginBottom: -20}}>{list[index]?.tech != 'any' ? list[index]?.tech : "Any Technology"}</h3>
                <h3 style={{color: 'gray', fontSize: 30}}>{list[index]?.monthly ? 'Monthly Contract' : 'One-time Contract'}</h3>
                {list[index]?.rating &&
                <>
                <h3 style={{color: '#02cf73', display: 'flex', marginRight: 10}}>{Math.round(list[index]?.rating * 10) / 10} <GiBamboo size={40} color='#02cf73' style={{alignSelf: 'flex-end', display: 'flex'}}></GiBamboo></h3>
                
                </>}
                </div>



                <div style={{ justifyContent: 'right', width: '50%', alignSelf: 'flex-start', marginTop: 10}}>
                <p style={{color: 'gray', fontSize: 30, marginBottom: -20}}>{list[index]?.type == 'limit' ? 'Limit Order' : 'Market Order'}</p>
                <p style={{color: 'gray', fontSize: 30, marginBottom: -20}}>{list[index]?.tons + ' tons/yr'}</p>
                {list[index]?.type == 'limit' && <p style={{color: 'gray', fontSize: 30, marginBottom: -20}}>{'$' + list[index]?.price + '/ton'}</p>}
                </div>

                

                <div style={{ justifyContent: 'right', width: '50%', alignSelf: 'flex-start', marginTop: 35}}>
                <p style={{color: 'gray', fontSize: 20}}>
                    {companies?.Seller[list[index]?.company_id]?.description ? companies?.Seller[list[index]?.company_id]?.description : "This company hasn't added a description yet!"}
                </p>
                </div>
                {/*<ListItemText style={{color: 'black'}} primary={`Carbon Company ${list[index]?.company_id}`} />*/}
              
              
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
        height={907}
        style={{marginLeft: '0%'}}
        width={'100%'}
        itemSize={300}
        itemCount={list.length}
        overscanCount={5}
      >
        {renderRow}
      </FixedSizeList>
      </div>
    );
  }
  
  export default BuyScreen;
