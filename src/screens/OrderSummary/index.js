import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView, FlatList, Linking } from "react-native";
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


const OrderSummary = (props) => {
  const navigation = useNavigation()
  const [searchTxt, setSearchTxt] = useState("");
  const [DataBkp, setCardDataBkp] = useState('');
  const [Fav, setFav] = useState(true);
  const [history, setHistory] = useState(
    [
        {
        "categoryId": "1",
        "restaurantName": "Kaka Da Hotel",
        "address":"Raj Nagar, Ghaziabad",
        "status":"Delivered",
        "date": "05 Jan 2023 at 11:56PM",
        "image": Images.KadaiPaneer,
        "amount":'$23.00',
        "Data": [
                {
                "itemId": "1",
                "Quantity": "5",
                "item": 'Matar Paneer',
                },
                {
                "itemId": "2",
                "Quantity": "5",
                "item": 'Tandoori Butter Roti',
                },
                {
                "itemId": "3",
                "Quantity": "1",
                "item": 'Dal Makhani',
                },
            ]
        },
        {
            "categoryId": "2",
            "restaurantName": "Punjab Da Dhaba",
            "address":"Raj Nagar, Ghaziabad",
            "status":"Cancelled",
            "date": "15 Jan 2023 at 11:56PM",
            "image": Images.dalMakhani,
            "amount":'$30.00',
            "Data": [
                    {
                    "itemId": "1",
                    "Quantity": "5",
                    "item": 'Paneer Makhani',
                    },
                    {
                    "itemId": "2",
                    "Quantity": "5",
                    "item": 'Tandoori Butter Roti',
                    },
                ]
        },
         {
            "categoryId": "3",
            "restaurantName": "Shaan-e-America",
            "address":"Raj Nagar, Ghaziabad",
            "status":"Delivered",
            "date": "15 Jan 2023 at 11:56PM",
            "image": Images.chinese,
            "amount":'$30.00',
            "Data": [
                    {
                    "itemId": "1",
                    "Quantity": "5",
                    "item": 'Paneer Makhani',
                    },
                    {
                    "itemId": "2",
                    "Quantity": "5",
                    "item": 'Tandoori Butter Roti',
                    },
                ]
        },
        {
            "categoryId": "4",
            "restaurantName": "Indian Special",
            "address":"Raj Nagar, Ghaziabad",
            "status":"Cancelled",
            "date": "15 Jan 2023 at 11:56PM",
            "image": Images.indian,
            "amount":'$30.00',
            "Data": [
                    {
                    "itemId": "1",
                    "Quantity": "5",
                    "item": 'Paneer Makhani',
                    },
                    {
                    "itemId": "2",
                    "Quantity": "5",
                    "item": 'Tandoori Butter Roti',
                    },
                ]
        },
    ])

    // console.log('-----------props', props?.route?.params?.data?.Data)

    const renderCart = ({item}) => {
        return (
          <View style={styles.container}>
            {console.log('------------', item)}
            <View  
              style={styles.content_view}>
              <View style={{ width:'95%', paddingVertical:2, left:vh(0.7)}}>
                <View style={{ flexDirection:'row', alignItems:'center', marginVertical:vh(0.2),}}>
                  <Image source={Icons.item} style={{height:16, width:16}}/>
                <View style={{flexDirection:'row', left:5}}>
                  <Text style={[Textstyles.medium, styles.title_text, {fontSize:15, }]}> {item?.item}</Text>
                 </View>  
                </View>
                
              <View style={{flexDirection:'row', alignItems:'center', width:'100%' }}>
                <View style={{flexDirection:'row', width:'80%', alignItems:'center'}}>
                  <View style={{borderWidth:1, borderRadius:5, borderColor:Colors.red}}>
                  <Text style={[Textstyles.medium, styles.title_text, {fontSize:14, textAlign:'center', height:20, width:20 }]}>{item?.Quantity}</Text>
                  </View>
                    <Text style={{color:Colors.gray, fontSize:12, left:vh(0.5)}}>X</Text> 
                    <Text style={[Textstyles.medium, {color:Colors.gray, fontSize:15, color:Colors.black, left:vh(2)}]}>{item?.price}</Text> 
                  </View>
                  <Text style={[Textstyles.medium,{color:Colors.black, width:'20%', paddingTop:2, textAlign:'right'}]}>$20.00</Text>
                </View> 
              </View>
            </View>
          </View>
          
        );
      };


  return (
    <View style={{ flex: 1, backgroundColor:Colors.white }}>
        <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{
          height: 50,
          justifyContent: "center",
          backgroundColor: Colors.white,
        }}
      >
        <Image
          source={Icons.arrowRed}
          style={{ height: 30, left: vh(1), width: 30 }}
        />
      </TouchableOpacity>

      <Text
        style={[
          Textstyles.medium,
          {
            width: "95%",
            alignSelf: "center",
            fontSize: 25,
            marginVertical: vh(1),
            color: Colors.black,
          },
        ]}
      >
        Order Summary
      </Text>

 <ScrollView 
  showsVerticalScrollIndicator={false}
  contentContainerStyle={{paddingBottom:50}}>
  <>
  
      
      <TouchableOpacity
            style={{
              marginVertical: 2,
              width:'95%',
              alignSelf:'center'
            }}
          >
            <View>
              <Text
                style={[
                  Textstyles.medium,
                  {
                    fontSize: 20,
                    color: Colors.black,
                    marginTop: vh(1),
                  },
                ]}
              >
                {props?.route?.params?.data?.restaurantName}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  width: "50%",
                  alignItems: "center",
                }}
              >
                <Image
                  source={Icons.starhalf}
                  style={{ height: 14, marginBottom: 4, width: 14 }}
                />
                <View
                  style={{
                    left: 5,
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Text style={[Textstyles.medium, styles.title_text1]}>
                    {props?.route?.params?.data?.rating} (500+ ratings)
                  </Text>
                </View>
              </View>
              <Text
                style={[
                  Textstyles.normal,
                  { color: "lightblack", fontSize: 13 },
                ]}
              >
                {props?.route?.params?.data?.address}
              </Text>
            </View>
          </TouchableOpacity>

        <View style={{flexDirection:'row',marginVertical:vh(2), alignSelf:'center', width: "95%", justifyContent:'space-between'}}>
          <Text
            style={[
              Textstyles.medium,
              {
                alignSelf: "center",
                fontSize: 20,
                marginVertical: vh(2),
                color: Colors.black,
              },
            ]}
          >
            Your Order
          </Text>

        {Fav ?  
          <TouchableOpacity onPress={() => setFav(false)}
              style={{borderWidth:1,paddingLeft:5, paddingRight:5, height:25, justifyContent:'center', borderRadius:10, alignSelf:'center', backgroundColor:Colors.white, borderColor:Colors.red}}>
            <Text style={[Textstyles.medium,{color:Colors.red, fontSize:11, paddingTop:2,}]}>MARK AS FAVORITES</Text>
          </TouchableOpacity>
        :
        <TouchableOpacity onPress={() => setFav(true)}
            style={{borderWidth:1,paddingLeft:5, paddingRight:5, height:25, justifyContent:'center', borderRadius:10, alignSelf:'center', backgroundColor:Colors.red, borderColor:Colors.red}}>
          <Text style={[Textstyles.medium,{color:Colors.white, fontSize:11, paddingTop:2,}]}>REMOVE FROM FAVORITES</Text>
        </TouchableOpacity>
        }
        </View>

      <View style={{height:2, backgroundColor:'#E2E6E2'}}></View>

      <View>
       <FlatList 
        contentContainerStyle={{}}
        showsVerticalScrollIndicator={false}
        data={props?.route?.params?.data?.Data} renderItem={renderCart}/>
        <View style={{flexDirection:'row', paddingVertical:vh(1.5), width:'95%', alignSelf:'center', justifyContent:'space-between', paddingHorizontal:vh(1)}}>
           <Text style={[Textstyles.medium,{color:Colors.black, fontSize:16}]}>Item total</Text>
           <Text style={[Textstyles.medium,{color:Colors.black, fontSize:16}]}>$60.00</Text>
        </View>
        <View style={{height:1, width:'95%', alignSelf:'center', backgroundColor:'#E2E6E2'}}></View>
      </View>

        <View style={{flexDirection:'row', width:'95%', paddingVertical:vh(0.5), alignSelf:'center', justifyContent:'space-between', paddingHorizontal:vh(1)}}>
           <Text style={[Textstyles.medium,{color:'#2596be', fontSize:14}]}>Coupan- (WELCOME50)</Text>
           <Text style={[Textstyles.medium,{color:'#2596be', fontSize:14}]}>you saved $1.00</Text>
        </View>

        <View style={{paddingVertical:vh(0.5)}}>
          <View style={{flexDirection:'row', width:'95%', alignSelf:'center', justifyContent:'space-between', paddingHorizontal:vh(1)}}>
           <Text style={[Textstyles.normal,{color:Colors.black, fontSize:12}]}>Taxes</Text>
           <Text style={[Textstyles.normal,{color:Colors.black, fontSize:12}]}>$1.00</Text>
          </View>

          <View style={{flexDirection:'row', width:'95%', paddingVertical:vh(0.2), alignSelf:'center', justifyContent:'space-between', paddingHorizontal:vh(1)}}>
           <Text style={[Textstyles.normal,{color:Colors.black, fontSize:12}]}>Delivery Charge</Text>
           <Text style={[Textstyles.normal,{color:Colors.black, fontSize:12}]}>$2.00</Text>
          </View>

          <View style={{flexDirection:'row', width:'95%', alignSelf:'center', paddingVertical:vh(0.2), justifyContent:'space-between', paddingHorizontal:vh(1)}}>
           <Text style={[Textstyles.normal,{color:Colors.black, fontSize:12}]}>Restaurant Packaging Charge</Text>
           <Text style={[Textstyles.normal,{color:Colors.black, fontSize:12}]}>$1.00</Text>
          </View>

          <View style={{flexDirection:'row', width:'95%', alignSelf:'center',paddingVertical:vh(0.2), justifyContent:'space-between', paddingHorizontal:vh(1)}}>
           <Text style={[Textstyles.normal,{color:Colors.black, fontSize:12}]}>Tip</Text>
           <Text style={[Textstyles.normal,{color:Colors.black, fontSize:12}]}>$2.00</Text>
          </View>
        </View>

          <View style={{height:1, width:'95%', alignSelf:'center', marginTop:vh(1),marginVertical:vh(0.2), backgroundColor:'#E2E6E2'}}></View>
            <View style={{flexDirection:'row', paddingVertical:vh(1.5), width:'95%', alignSelf:'center', justifyContent:'space-between', paddingHorizontal:vh(1)}}>
            <Text style={[Textstyles.medium,{color:Colors.black, fontSize:16}]}>Grand total</Text>
            <Text style={[Textstyles.medium,{color:Colors.black, fontSize:16}]}>$66.00</Text>
            </View>
          <View style={{height:1, width:'95%', alignSelf:'center', backgroundColor:'#E2E6E2'}}></View>



          <View style={{flexDirection:'row', alignItems:'center', width:'95%', marginTop:vh(2), padding:4, borderRadius:5, borderWidth:1, borderColor:'#2596be', alignSelf:'center', justifyContent:'space-between', paddingHorizontal:vh(1)}}>
           <Text style={[Textstyles.medium,{color:'#2596be', fontSize:14}]}>Your total savings</Text>
           <Text style={[Textstyles.medium,{color:'#2596be', fontSize:14}]}>$1.00</Text>
          </View>

        <View style={{width:'95%', marginTop:vh(3), alignSelf:'center'}}>
          <Text
            style={[
              Textstyles.medium,
              {
                fontSize: 20,
                marginVertical: vh(0.2),
                color: Colors.black,
              },
            ]}
          >
            Your Order
          </Text>
        </View>
       
        <View style={{height:1, width:'95%', alignSelf:'center', backgroundColor:'#E2E6E2'}}></View>
        
      <View style={{marginTop:vh(2),}}> 
        <View style={{width:'90%',  alignSelf:'center'}}>
          <Text style={[Textstyles.normal,{color:Colors.gray, fontSize:12}]}>Order Number</Text>
          <Text style={[Textstyles.medium,{color:Colors.black, marginTop:-4}]}>4074398934</Text>
        </View>

        <View style={{width:'90%', marginVertical:vh(2), alignSelf:'center'}}>
          <Text style={[Textstyles.normal,{color:Colors.gray, fontSize:12}]}>Payment</Text>
          <Text style={[Textstyles.medium,{color:Colors.black, marginTop:-4}]}>{props?.route?.params?.data?.paymentMode}</Text>
        </View>

        <View style={{width:'90%', marginVertical:vh(1), alignSelf:'center'}}>
          <Text style={[Textstyles.normal,{color:Colors.gray, fontSize:12}]}>Date</Text>
          <Text style={[Textstyles.medium,{color:Colors.black, marginTop:-4}]}>{props?.route?.params?.data?.date}</Text>
        </View>

        <View style={{width:'90%', marginVertical:vh(1), alignSelf:'center'}}>
          <Text style={[Textstyles.normal,{color:Colors.gray, fontSize:12}]}>Phone number</Text>
          <Text style={[Textstyles.medium,{color:Colors.black, marginTop:-4}]}>{props?.route?.params?.data?.phoneNumber}</Text>
        </View>

        <View style={{width:'90%', marginVertical:vh(1), alignSelf:'center'}}>
          <Text style={[Textstyles.normal,{color:Colors.gray, fontSize:12}]}>Deliver to</Text>
          <Text style={[Textstyles.medium,{color:Colors.black, marginTop:-4}]}>{props?.route?.params?.data?.Deliverto}</Text>
        </View>
      </View>


      <TouchableOpacity onPress={()=>Linking.openURL(`tel:${props?.route?.params?.data?.restaurantPhone}`)}
        style={{height:50, borderBottomWidth:1, justifyContent:'center', borderTopWidth:1, width:'95%', marginTop:vh(4), alignSelf:'center', borderColor:Colors.red}}>
        <Text style={[Textstyles.medium,{color:Colors.red, textAlign:'center'}]}>Call {props?.route?.params?.data?.restaurantName} {props?.route?.params?.data?.restaurantPhone}</Text>
      </TouchableOpacity>


{props?.route?.params?.data?.repeat === 'yes' &&
        <TouchableOpacity
              // onPress={() => setaddVoucher(false)}
              style={[styles.loginBtn, { marginTop: vh(10) }]}
            >
              <Text
                style={[
                  Textstyles.normal,
                  { color: Colors.white, fontSize: 18 },
                ]}
              >
                Repeat Order
              </Text>
        </TouchableOpacity>
}


          </>
  </ScrollView> 

    </View>
  );
};

export default OrderSummary

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
      input1: {
        margin: 12,
        height: 45,
        borderRadius: 5,
        backgroundColor:'#E2E6E2',
        padding: 0,
        paddingTop: 5,
        paddingLeft: 5,
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
      },
      cat_line_view: {
        height: hpx(5),
        width: wpx(5),
        borderRadius: 3,
      },

      container:{
        width: '95%',
        alignSelf: 'center',
        borderRadius:10,
        height:70,
        borderBottomColor:'#E2E6E2',
        borderBottomWidth:1,
        marginTop:vh(1),
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
      title_text1: {
        color: Colors.black,
        fontSize: 14,
      },
      title_desc:{
        color: Colors.black, 
        fontSize: 14, 
        width:'55%',
      }
});
