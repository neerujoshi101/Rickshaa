import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  widthPercentageToDP as vw,
  heightPercentageToDP as vh,
} from "react-native-responsive-screen";
import Icons from "../../utils/icons";
import Images from '../../utils/images'
import { Colors ,  hpx, wp, wpx,} from '../../utils/AppConstant'
import Textstyles from "../../utils/text";


const OrderHistory = () => {
  const navigation = useNavigation()
  const [searchTxt, setSearchTxt] = useState("");
  const [DataBkp, setCardDataBkp] = useState('');
  const [history, setHistory] = useState(
    [
        {
        "categoryId": "1",
        "restaurantName": "Kaka Da Hotel",
        "address":"R-1208, Raj Nagar, Ghaziabad",
        "status":"Delivered",
        "date": "15 Jan 2023 at 11:56PM",
        "image": Images.KadaiPaneer,
        "rating": '4.9',
        "paymentMode": 'Online',
        "restaurantPhone":'+1 516-773-2000',
        "phoneNumber":'941144XXXX',
        "Deliverto":"H-1106, Raj Nagar Extention, Ghaziabad",
        "amount":'$23.00',
        "Data": [
                {
                "itemId": "1",
                "Quantity": "5",
                "item": 'Matar Paneer',
                "price":'$5.00'
                },
                {
                "itemId": "2",
                "Quantity": "5",
                "item": 'Tandoori Butter Roti',
                "price":'$8.00'
                },
                {
                "itemId": "3",
                "Quantity": "1",
                "item": 'Dal Makhani',
                "price":'$5.00'
                },
            ]
        },
        {
            "categoryId": "2",
            "restaurantName": "Punjab Da Dhaba",
            "address":"G-1409, Raj Nagar, Ghaziabad",
            "status":"Cancelled",
            "date": "12 Jan 2023 at 11:56PM",
            "image": Images.dalMakhani,
            "amount":'$30.00',
            "paymentMode": 'Cash on Delivery (COD)',
            "restaurantPhone":'+1 516-773-3000',
            "phoneNumber":'961144XXXX',
            "Deliverto":"G-106, Raj Nagar Extention, Ghaziabad",
            "rating": '4.6',
            "Data": [
                    {
                    "itemId": "1",
                    "Quantity": "5",
                    "item": 'Paneer Makhani',
                    "price":'$9.00'
                    },
                    {
                    "itemId": "2",
                    "Quantity": "5",
                    "item": 'Tandoori Butter Roti',
                    "price":'$9.00'
                    },
                ]
        },
         {
            "categoryId": "3",
            "restaurantName": "Shaan-e-America",
            "address":"H-206, Raj Nagar, Ghaziabad",
            "status":"Delivered",
            "date": "10 Jan 2023 at 11:56PM",
            "image": Images.chinese,
            "amount":'$30.00',
            "paymentMode": 'Online',
            "restaurantPhone":'+1 516-773-6000',
            "phoneNumber":'967744XXXX',
            "Deliverto":"G-1088, Raj Nagar Extention, Ghaziabad",
            "rating": '4.2',
            "Data": [
                    {
                    "itemId": "1",
                    "Quantity": "5",
                    "item": 'Paneer Makhani',
                    "price":'$7.00'
                    },
                    {
                    "itemId": "2",
                    "Quantity": "5",
                    "item": 'Tandoori Butter Roti',
                    "price":'$8.00'
                    },
                ]
        },
        {
            "categoryId": "4",
            "restaurantName": "Indian Special",
            "address":"D-1006, Raj Nagar, Ghaziabad",
            "status":"Cancelled",
            "date": "06 Jan 2023 at 11:56PM",
            "image": Images.indian,
            "amount":'$30.00',
            "paymentMode": 'Cash on Delivery (COD)',
            "restaurantPhone":'+1 516-773-3800',
            "phoneNumber":'981144XXXX',
            "Deliverto":"G-1086, Raj Nagar Extention, Ghaziabad",
            "rating": '4.9',
            "Data": [
                    {
                    "itemId": "1",
                    "Quantity": "5",
                    "item": 'Paneer Makhani',
                    "price":'$5.00'
                    },
                    {
                    "itemId": "2",
                    "Quantity": "5",
                    "item": 'Tandoori Butter Roti',
                    "price":'$4.00'
                    },
                ]
        },
    ])
  
  const onSearch = (txt) => {
    console.log('---------------txt', txt)
    setSearchTxt(txt);
    let search = history;
    if (txt) {
      const newData = search.filter((item) => {
        const itemData = item?.restaurantName
          ? item?.restaurantName?.toUpperCase()
          : "".toUpperCase();
        const textData = txt.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setCardDataBkp(newData);
    } else {
      setCardDataBkp(history);
    }
  };

  useEffect(() => {
    setCardDataBkp(history);
  }, [history]);

    const renderCart = ({item}) => {
        return (
        <TouchableOpacity onPress={() => navigation.navigate('OrderSummary', {data:item})}
          style={styles.container}>
          <View 
          style={styles.content_view}>
            <View style={styles.first_line_view}>
              <Image
                resizeMode="contain"
                source={item?.image}
                style={styles.notification_icon}
              />
            </View>

            <View style={{ width:'60%', paddingTop:5, height:'100%', justifyContent:'flex-start'}}>
              <View style={{flexDirection:'row'}}>
                <Text style={[Textstyles.medium, styles.title_text, {fontSize:15}]}>{item?.restaurantName}</Text>
              </View>

              <View style={{flexDirection:'row', marginTop:-5, alignItems:'center'}}>
                <Text style={[Textstyles.normal, styles.title_text1]}>{item?.address}</Text>
              </View>
            </View>
        {item?.status === 'Delivered' ? 
          <View style={{width:'22%',borderRadius:10, right:2, height:28, backgroundColor:'#E2E6E2', justifyContent:'center'}}>
            <Text style={[Textstyles.medium,{textAlign:'center', color:Colors.gray, fontSize:12}]}>{item?.status}</Text>
          </View>
          // : item?.status === 'Preparing' ?
          // <View style={{width:'22%',borderRadius:10, height:28, right:2, backgroundColor:'darkgreen', justifyContent:'center'}}>
          //   <Text style={[Textstyles.medium,{textAlign:'center', color:Colors.white, fontSize:12}]}>{item?.status}</Text>
          // </View>
          :
          <View style={{width:'22%',borderRadius:10, height:28, right:2, backgroundColor:Colors.red, justifyContent:'center'}}>
           <Text style={[Textstyles.medium,{textAlign:'center', color:Colors.white, fontSize:12}]}>{item?.status}</Text>
          </View>
        }
          </View>

        <View style={{height:1, backgroundColor:'#E2E6E2'}}></View>

         {item?.Data?.map((item, index) => {
            return (
            <View  
              style={styles.content_view}>
              <View style={{ width:'80%',paddingVertical:2, left:vh(0.7)}}>
                <View style={{ flexDirection:'row', alignItems:'center', marginVertical:vh(0.2),}}>
                  <Image source={Icons.item} style={{height:16, width:16}}/>
                <View style={{flexDirection:'row', left:5}}>
                  <Text style={[Textstyles.medium, styles.title_text, {fontSize:14, }]}>{item?.Quantity}</Text>
                  <Text style={{color:Colors.gray}}>x</Text>
                  <Text style={[Textstyles.medium, styles.title_text, {fontSize:14, }]}> {item?.item}</Text>
                 </View>                
                </View>
              </View>
            </View>
            )
          })}

        <View style={{height:1, alignSelf:'flex-end', width:'97%', borderStyle:'dotted', backgroundColor:'#E2E6E2'}}></View>

        <View style={{flexDirection:'row',paddingVertical:vh(1.5), justifyContent:'space-between', paddingHorizontal:vh(1)}}>
            <Text style={[Textstyles.normal,{color:Colors.gray}]}>{item?.date}</Text>
            <Text style={[Textstyles.medium,{color:Colors.black}]}>{item?.amount}</Text>
        </View>
        </TouchableOpacity>
        );
      };


  return (
    <View style={{ flex: 1 }}>
        <View
              style={{
                flexDirection: "row",
                // backgroundColor: "#E2E6E2",
                height: 50,
                width: "100%",
              }}
            >
              <TouchableOpacity
               onPress={() => navigation.goBack()}
                style={{
                  height: 40,
                  paddingLeft: 10,
                  width: "15%",
                  alignSelf: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  source={Icons.arrowRed}
                  style={{ height: 30, width: 30 }}
                />
              </TouchableOpacity>
              <Text
                style={[
                  Textstyles.medium,
                  {
                    width: "95%",
                    alignSelf: "center",
                    fontSize: 18,
                    color: Colors.black,
                  },
                ]}
              >
                Order History
              </Text>
            </View>



            <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              borderRadius:20,
              alignSelf: "center",
              marginTop:vh(1),
              backgroundColor: Colors.white,
              width:'95%',
              elevation: 6,
            }}
          >
        <View
          style={{
            width:'12%',
          }}
        >
          <Image source={Icons.search} style={{ height: 22, alignSelf:'flex-end', width: 22 }}/>
        </View>


        <TextInput
          value={searchTxt}
          placeholder="Search by restaurant..."
          placeholderTextColor={Colors.gray}
          // autoFocus
          theme={{
            // roundness: 20,
            // height:50,
            colors: {
              primary: Colors.black,
              text: Colors.black,
              placeholder: Colors.black,
            },
          }}
          onChangeText={(txt) => onSearch(txt)}
          style={{
            width: "80%",
            height: 50,
            fontSize: 16,
            paddingRight: 5,
            // paddingLeft: 5,
            backgroundColor:Colors.white,
            alignSelf: "center",
            color:Colors.black
          }}
        />
      </View>

       <FlatList 
        contentContainerStyle={{paddingBottom:30}}
        showsVerticalScrollIndicator={false}
        data={DataBkp} renderItem={renderCart}
      />
    </View>
  );
};

export default OrderHistory;

const styles = StyleSheet.create({
    container4: {
        backgroundColor: "white",
        width: "100%",
        alignSelf: "center",
        height: "100%",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
      input1: {
        margin: 12,
        height: 45,
        borderRadius: 5,
        backgroundColor:'#E2E6E2',
        padding: 0,
        paddingTop: 5,
        paddingLeft: 5,
      },
      loginBtn: {
        width: "80%",
        borderRadius: 10,
        marginTop: vh(2),
        height: 48,
        alignItems: "center",
        alignSelf: "center",
        justifyContent: "center",
        backgroundColor: Colors.gray,
      },
      categoryData_view: {
        marginHorizontal: wpx(8),
        paddingLeft: wpx(10),
        paddingRight: wpx(10),
        borderRadius: 5,
        marginVertical: wpx(10),
        height: hpx(80),
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: hpx(4),
      },
      scrollView_text: {
        textAlign: 'center',
        marginTop: 4,
        color: Colors.black,
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: 15,
        fontWeight:'500'
      },
      cat_line_view: {
        height: hpx(5),
        width: wpx(5),
        borderRadius: 3,
      },

      container:{
        width: '95%',
        alignSelf: 'center',
        borderColor:'lightgrey',
        borderWidth:1,
        marginVertical: hpx(2),
        borderRadius:10,
        marginTop:vh(2)
      },
      content_view:{
        flexDirection:'row',
        width:'100%',
        alignItems:'center',
        // marginVertical:vh(1)
      },
      first_line_view:{
        height:60,
        width:60,
        justifyContent:'center',
      },
      notification_icon:{
        height:50,
        width:50,
        borderRadius: 10,
        alignSelf:'center',
        padding:10,
        backgroundColor: '#E2E6E2',
        elevation: 6,
      },
      title_text:{
        color: Colors.black,
        fontSize: 12,
        fontWeight: '400',
        // textAlign: 'center',
      },
      title_text1:{
        color: Colors.gray,
        fontSize: 13,
      },
      title_desc:{
        color: Colors.black, 
        fontSize: 14, 
        width:'55%',
      }
});
