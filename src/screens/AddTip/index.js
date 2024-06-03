import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  widthPercentageToDP as vw,
  heightPercentageToDP as vh,
} from "react-native-responsive-screen";
import Icons from "../../utils/icons";
import Images from "../../utils/images";
import Textstyles from "../../utils/text";
import { Colors, hpx, wp, wpx,} from '../../utils/AppConstant'

const AddTip = (props) => {
  const navigation = useNavigation()
  const [categoryId, setCategoryId] = useState('1');
  

 

  return (
    <View style={{flex: 1, backgroundColor:Colors.white}}>
       <View
              style={{
                flexDirection: "row",
                backgroundColor: "#E2E6E2",
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
                Order Summary
              </Text>
        </View>

       
        <View
              style={{
                // flex: 1,
                // justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                //   backgroundColor: Colors.pink,
                  width:'95%',
                  alignItems: 'center',
                }}>
                  <View style={{top:hpx(-30), width:'100%'}}>
                    <View style={{alignSelf:'center'}}>
                      <Image source={Images.success_1} style={{height:250, width:250}} />
                    </View>
                    <View style={{justifyContent:'center', alignItems:'center', marginTop:-5, marginBottom:hpx(10)}}>
                      <Text style={[{color:Colors.black, fontSize:22,},Textstyles.bold]}>Thank you!</Text>
                      <Text style={[{color:Colors.gray, fontSize:17},Textstyles.medium]}>Your order has been placed successfully</Text>
                    </View>

                      
                    <Text style={[{color:Colors.black,textAlign:'center', fontSize:16},Textstyles.medium]}>Estimated Delivery Time</Text>
                    <Text style={[{color:Colors.gray, textAlign:'center', marginTop:-5, fontSize:14},Textstyles.medium]}>arriving in 20 minutes</Text>

                    
                  </View>
                {/* <TouchableOpacity
                  style={[
                    {
                      borderRadius: 6,
                      padding: 8,
                      elevation: 2,
                      backgroundColor: '#84B441',
                    },
                  ]}
                //   onPress={() => {
                //     dispatch({
                //       type:types.SET_ORDER,
                //       payload:null
                //     })
                //     setShowModal(!showModal)
                //     navigation.replace('User')
                //   }}
                  >
                  <Text
                    style={[Textstyles.bold,{
                      color: 'white',
                      // fontWeight: 'bold',
                      textAlign: 'center',
                      fontSize:15
                    }]}>
                    Continue Shopping
                  </Text>
                </TouchableOpacity> */}
              </View>
            </View>

          
          <View style={{marginTop:vh(10)}}>
            <View style={{width:'88%', alignSelf:'center',}}>
                      <Text style={[{color:Colors.red,  fontSize:10}, Textstyles.normal]}>NOTE: Orders on Saturday and Sunday will be delivered on Monday (Change with another message if required)</Text>
                    </View>
        <TouchableOpacity 
              onPress={() => navigation.navigate('Home')}
        style={styles.loginBtn}>
        <Text style={[Textstyles.normal, { color: Colors.white, fontSize: 18 }]}>Create Another Order</Text>
        </TouchableOpacity>

        </View>

    </View>
  );
};

export default AddTip;

const styles = StyleSheet.create({
    categoryData_view : {
        marginHorizontal: wpx(8),
        width:'25%',
        borderWidth:1,
        borderRadius: 10,
        marginVertical: vh(3),
        height: hpx(70),
        justifyContent: 'center',
        paddingTop: hpx(4),
        elevation:5,
        backgroundColor:Colors.white
      },
      scrollView_text: {
        marginTop: -4,
        color: Colors.black,
        fontSize: 15,
        textAlign:'center'
      },
      loginBtn: {
        width: "80%",
        borderRadius: 10,
        height: 48,
        marginTop:vh(2),
        alignItems: "center",
        alignSelf: "center",
        justifyContent: "center",
        backgroundColor:Colors.gray
        // backgroundColor: "#038847",
      },
      
});
