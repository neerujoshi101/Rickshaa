import { Image, StyleSheet, Text, View, FlatList, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useReducer, useState } from 'react'
import { Colors ,  hpx, wp, wpx,} from '../../utils/AppConstant'
import Icons from '../../utils/icons'
import { useNavigation } from '@react-navigation/native'
import Images from '../../utils/images'
import {
    widthPercentageToDP as vw,
    heightPercentageToDP as vh,
  } from "react-native-responsive-screen";
import Textstyles from '../../utils/text'

const Favorites = (props) => {
    const [wishlist, setWishlist] = useState(true)
    const navigation = useNavigation()
    const [cartData, setCartData] = useState([
      {
        id:'1',
        Category:'Indian',
        ResturatName:'Buttar Chicken Factory',
        image:Images.soyaChaap,
        deliveryFee:'$26.18',
        ResturatAvailability:'15-30 min',
        buyOneGet:'Buy 1 get 1 free',
        Rating:'4.8',
        address: '575 8th Ave, New York, NY 10018, United States',
        openTime:'4:00 PM'
      },
      {
        id:'2',
        Category:'Indian',
        ResturatName:'Chawla Indian',
        image:Icons.indian,
        deliveryFee:'$20.18',
        ResturatAvailability:'15-30 min',
        buyOneGet:'',
        Rating:'4.2',
        address: '21-69 Steinway St, Queens, NY 11105, United States',
        openTime:'5:00 PM',
      },
      {
        id:'3',
        Category:'Asian',
        ResturatName:'Saravanaa Bhavan',
        image:Images.KadaiPaneer,
        deliveryFee:'$29.18',
        ResturatAvailability:'30-45 min',
        buyOneGet:'',
        Rating:'4.4',
        buyOneGet:'Buy 1 get 1 free',
        address: '575 8th Ave, New York, NY 10018, United States',
        openTime:'6:00 PM',
      },
      {
        id:'4',
        Category:'Indian',
        ResturatName:'Kesar Indian Kitchen',
        image:Images.soyaChaap,
        deliveryFee:'$15.18',
        ResturatAvailability:'30-40 min',
        buyOneGet:'',
        Rating:'3.9',
        address: '308 E 78th St, New York, NY 10075, United States',
        openTime:'7:00 PM'
      },
      {
        id:'5',
        Category:'Indian',
        ResturatName:'Satya South Indian Restaur..',
        image:Images.KadaiPaneer,
        deliveryFee:'$19.18',
        ResturatAvailability:'15-35 min',
        buyOneGet:'',
        Rating:'4.7',
        address: '44, New York City, USA',
        openTime:'8:00 PM'
      },
      {
        id:'6',
        Category:'Deals',
        ResturatName:'Curry In a Hurry',
        image:Images.soyaChaap,
        deliveryFee:'$2.99',
        ResturatAvailability:'15-25 min',
        buyOneGet:'',
        Rating:'4.6',
        buyOneGet:'Buy 1 get 1 free',
        address: '242, New York City, USA',
        openTime:'9:00 AM'
      },
      {
        id:'7',
        Category:'Pizza',
        ResturatName:'Green Door Pizza',
        image:Images.pizza,
        deliveryFee:'$1.99',
        ResturatAvailability:'15-25 min',
        buyOneGet:'',
        Rating:'4.6',
        buyOneGet:'Buy 1 get 1 free',
        address: '76, New York City, USA',
        openTime:'10:00 PM'
      },
      {
        id:'8',
        Category:'Pizza',
        ResturatName:'Pizza Club',
        image:Images.pizza,
        deliveryFee:'$3.99',
        ResturatAvailability:'25-35 min',
        buyOneGet:'',
        Rating:'4.1',
        buyOneGet:'',
        address: '90, New York City, USA',
        openTime:'11:00 PM'
      },
      {
        id:'9',
        Category:'HighestRated',
        ResturatName:'Donair Pizza',
        image:Images.pizza,
        deliveryFee:'$1.99',
        ResturatAvailability:'25-45 min',
        buyOneGet:'',
        Rating:'4.9',
        buyOneGet:'Buy 1 get 1 free',
        address: '89, New York City, USA',
        openTime:'12:00 PM'
      },
      {
        id:'10',
        Category:'FastFood',
        ResturatName:'Butter Burgur Customs',
        image:Icons.fastFood,
        deliveryFee:'$2.99',
        ResturatAvailability:'25-45 min',
        buyOneGet:'',
        Rating:'4.1',
        buyOneGet:'Buy 1 get 1 free',
        address: '2, New York City, USA',
        openTime:'01:00 PM'
      },
      {
        id:'11',
        Category:'FastFood',
        ResturatName:'Hunger Fast Food',
        image:Images.burger,
        deliveryFee:'$4.99',
        ResturatAvailability:'15-35 min',
        buyOneGet:'',
        Rating:'4.2',
        buyOneGet:'',
        address: '26, New York City, USA',
        openTime:'02:00 PM'
      },
      {
        id:'12',
        Category:'Desserts',
        ResturatName:'Meet Fresh',
        image:Icons.asian,
        deliveryFee:'$2.99',
        ResturatAvailability:'20-35 min',
        buyOneGet:'',
        Rating:'4.4',
        buyOneGet:'Buy 1 get 1 free',
        address: '298, New York City, USA',
        openTime:'03:00 PM'
      },
      {
        id:'13',
        Category:'Desserts',
        ResturatName:'Ben & Jeerys Scoops',
        image:Icons.dessert,
        deliveryFee:'$2.99',
        ResturatAvailability:'20-35 min',
        buyOneGet:'',
        Rating:'4.7',
        buyOneGet:'',
        address: '101, New York City, USA',
        openTime:'04:00 PM'
      },
      {
        id:'14',
        Category:'Chinese',
        ResturatName:'Taste of China',
        image:Images.chinese,
        deliveryFee:'$2.99',
        ResturatAvailability:'20-35 min',
        buyOneGet:'',
        Rating:'4.2',
        buyOneGet:'Buy 1 get 1 free',
        address: '89, New York City, USA',
        openTime:'05:00 PM'
      },
      {
        id:'15',
        Category:'BubbleTea',
        ResturatName:'Gong Cha',
        image:Icons.bubbleTea,
        deliveryFee:'$1.99',
        ResturatAvailability:'20-35 min',
        buyOneGet:'',
        Rating:'4.6',
        buyOneGet:'Buy 1 get 1 free',
        address: '232, New York City, USA',
        openTime:'06:00 PM'
      },
      {
        id:'16',
        Category:'Indian',
        ResturatName:'Curry In A Hurry',
        image:Images.soyaChaap,
        deliveryFee:'$2.99',
        ResturatAvailability:'15-25 min',
        buyOneGet:'',
        Rating:'4.6',
        buyOneGet:'Buy 1 get 1 free',
        address: '87, New York City, USA',
        openTime:'01:30 PM'
      },
      {
        id:'17',
        Category:'Indian',
        ResturatName:'Hunger Fast Food',
        image:Images.burger,
        deliveryFee:'$4.99',
        ResturatAvailability:'15-35 min',
        buyOneGet:'',
        Rating:'4.2',
        buyOneGet:'',
        address: '121, New York City, USA',
        openTime:'10:00 PM'
      },
    ]);
   
console.log('----------------cartdata', cartData)

      const renderCart = ({item}) => {
        return (
          <View style={styles.container}>
            <TouchableOpacity  
            onPress={() => navigation.navigate('RestaurantItems', {data: item})}
              style={styles.content_view}>
              <View style={styles.first_line_view}>
                <Image
                  resizeMode="center"
                  source={item?.image}
                  style={styles.notification_icon}
                />
                
                <View style={{position:'absolute', width:60, height:75, left:5, alignItems:'flex-end',}}>
                  {wishlist ?
                    <TouchableOpacity style={{height:30,backgroundColor:'#E2E6E2', borderRadius:15, justifyContent:'center', width:30}}
                        onPress={() => setWishlist(false)}>
                      <Image source={Icons.heartFill} style={{height:20, alignSelf:'center', width:20}}/>
                    </TouchableOpacity>
                  : 
                    <TouchableOpacity style={{height:30,backgroundColor:'#E2E6E2', borderRadius:15, justifyContent:'center', width:30}}
                    onPress={() => setWishlist(true)}>
                  <Image source={Icons.heartBlank} style={{height:20, alignSelf:'center', width:20}}/>
                </TouchableOpacity>
                  }
                </View>
              </View>
    
              <View style={{ width:'70%', left:vh(0.7)}}>
                <View style={{flexDirection:'row'}}>
                  <Text style={[Textstyles.medium, styles.title_text, {fontSize:15}]}>{item?.ResturatName}</Text>
                </View>
    
                <View style={{flexDirection:'row', marginTop:3, alignItems:'center'}}>
                  <Text style={[Textstyles.normal, styles.title_text1]}>{item?.deliveryFee} Delivery fee*</Text>
                </View>
    
                <View style={{flexDirection:'row', marginTop:3,}}>
                <Text style={[Textstyles.normal, styles.title_text1]}>{item?.ResturatAvailability}</Text>
                </View>
    
                <View style={{flexDirection:'row', alignItems:'center'}}>
                  <Text style={[Textstyles.normal, styles.title_text]}>{item?.ResturatStatus}</Text>
                  <Text style={[Textstyles.normal, styles.title_text, {color:item?.buyOneGet !='' && 'darkgreen'}]}>{item?.buyOneGet}</Text>
                </View>
              </View>
    
                <View style={{width:'10%', height:'85%', justifyContent:'flex-start'}}>
                <View style={{justifyContent:'center', height:28, width:28, borderRadius:19, backgroundColor:'#E2E6E2', alignItems:'center',}}>
                <Text style={[Textstyles.medium, { fontSize:12, fontWeight:'500',  textAlign:'center',}]}>{item?.Rating}</Text>
                </View>
                </View>
            </TouchableOpacity>
          </View>
        );
      };



  return (
    <View style={{ flex: 1, backgroundColor:Colors.white }}>
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
                Your Favorites
              </Text>
        </View>
        <View style={{width:'95%', alignSelf:'center'}}>
          <Text
            style={[Textstyles.medium, {
              marginVertical: vh(1),
              color: Colors.black,
              fontSize:17
            }]}>
            Recently added
          </Text>
      </View>
      {/* <View style={{height:10, marginVertical:vh(2), backgroundColor:'#E2E6E2'}}></View> */}
    <FlatList data={cartData} renderItem={renderCart} />

    </View>
  )
}

export default Favorites

const styles = StyleSheet.create({
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
        backgroundColor: Colors.white,
        padding: hpx(10),
        marginVertical: hpx(1),
    
      },
      content_view:{
        flexDirection:'row',
        width:'100%',
        alignItems:'center'
      },
      first_line_view:{
        height:60,
        width:60,
        marginRight: wpx(15),
        justifyContent:'center'
      },
      notification_icon:{
        height:80,
        width:80,
        borderRadius: 10,
        alignSelf:'center',
        padding:10,
        backgroundColor: '#E2E6E2',
        elevation: 6,
      },
      title_text:{
        color: Colors.black,
        fontSize: 13,
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
})