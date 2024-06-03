import { Image, StyleSheet, Text, FlatList, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { hpx, wpx } from "../../utils/AppConstant";
import {
  widthPercentageToDP as vw,
  heightPercentageToDP as vh,
} from "react-native-responsive-screen";
import Icons from "../../utils/icons";
import { Colors } from "../../utils/AppConstant";
import Images from "../../utils/images";
import Textstyles from "../../utils/text";

const Cart = (props) => {
  const navigation = useNavigation()
  const [otpVal, setOtpVal] = useState('');
  const [cartData, setCartData] = useState([
    {
      id:'1',
      ResturatName:'Panera (2001L Street NW)',
      image:Images.soyaChaap,
      items: '2 items',
      price:'$46.18',
      deliveryAdd: 'Deliver to District of columbia',
      ResturatStatus:'Closed',
      ResturatAvailability:'Available Friday 6:00AM'
    },
    {
      id:'2',
      ResturatName:'WD (2001L Street NW)',
      image:Images.KadaiPaneer,
      items: '4 items',
      price:'$66.18',
      deliveryAdd: 'Deliver to District of California',
      ResturatStatus:'Open',
      ResturatAvailability:'Available Today 6:00AM'
    }
  ]);



    const renderCart = ({item}) => {
      console.log('----------CART item', item)
      return (
        <View style={styles.container}>
          <TouchableOpacity onPress={() => navigation.navigate('Checkout')}
          style={styles.content_view}>
            <View style={styles.first_line_view}>
              <Image
                resizeMode="contain"
                source={item?.image}
                style={styles.notification_icon}
              />
            </View>

            <View style={{ width:'70%' }}>
              <View style={{flexDirection:'row'}}>
                <Text style={[Textstyles.medium, styles.title_text, {fontSize:15}]}>{item?.ResturatName}</Text>
              </View>

              <View style={{flexDirection:'row', marginTop:-5, alignItems:'center'}}>
                <Text style={[Textstyles.normal, styles.title_text1]}>{item?.items}</Text>
                <Text style={[Textstyles.normal, {fontSize:6, marginHorizontal:vh(0.5)}]}>{'\u2B24'}</Text>
                <Text style={[Textstyles.normal, styles.title_text1]}>{item?.price}</Text>
              </View>

              <View style={{flexDirection:'row'}}>
              <Text style={[Textstyles.normal, styles.title_text1]}>{item?.deliveryAdd}</Text>
              </View>

              <View style={{flexDirection:'row', marginTop:-4, alignItems:'center'}}>
                <Text style={[Textstyles.medium, styles.title_text,{fontSize:13}]}>{item?.ResturatStatus}</Text>
                <Text style={[Textstyles.normal, {fontSize:6, marginHorizontal:vh(0.5)}]}>{'\u2B24'}</Text>
                <Text style={[Textstyles.medium, styles.title_text , {fontSize:13}]}>{item?.ResturatAvailability}</Text>
              </View>
            </View>

          <View style={{width:'10%', justifyContent:'center'}}>
            <Image source={Icons.rightRed} style={{height:16, right:7, width:16}}/>
          </View>
          </TouchableOpacity>
        </View>
      );
    };

  return (
    <View style={{ flex: 1 , backgroundColor:Colors.white}}>
        <View style={{height:50, justifyContent:'flex-end',  flexDirection:'row',width:'100%', backgroundColor:Colors.white}}>
          <TouchableOpacity onPress={()=> navigation.navigate('OrderHistory')}
            style={{flexDirection:'row', paddingLeft:2, paddingRight:2, justifyContent:'space-evenly', borderRadius:20, borderWidth:1, borderColor:Colors.red, height:30, alignSelf:'center', right:20, width:'22%',  alignItems:'center', }}>
            <Image source={Icons.docRed} style={{height:16, width:16}}/>
            <Text style={[ Textstyles.medium, {color:Colors.red, marginTop:2, fontWeight:'500'}]}>Orders</Text>
          </TouchableOpacity>
        </View>

      <Text style={[Textstyles.medium, { width:'95%', alignSelf:'center', fontSize:25, marginVertical:vh(2), color: Colors.black }]}>
        Cart
        </Text>

      <FlatList data={cartData} renderItem={renderCart} />
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container:{
    width: '95%',
    alignSelf: 'center',
    backgroundColor: Colors.white,
    marginVertical: hpx(10),

  },
  content_view:{
    flexDirection:'row',
    width:'100%',
    alignItems:'center'
  },
  first_line_view:{
    marginRight: wpx(12),
    borderColor:Colors.black,
    justifyContent:'center',
  },
  notification_icon:{
    height:80,
    width:80,
    borderRadius: 10,
    alignSelf:'center',
  },
  title_text:{
    color: Colors.black,
    fontSize: 14,
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
