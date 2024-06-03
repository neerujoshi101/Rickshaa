import { Image, StyleSheet, Text, View, FlatList, TextInput, ScrollView, Modal, TouchableOpacity, Alert, ActivityIndicator } from 'react-native'
import React, { useEffect, useReducer, useState } from 'react'
import { Colors ,  emailRegex,  hpx, wp, wpx,} from '../../utils/AppConstant'
import Icons from '../../utils/icons'
import { useNavigation } from '@react-navigation/native'
import Images from '../../utils/images'
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import {
    widthPercentageToDP as vw,
    heightPercentageToDP as vh,
  } from "react-native-responsive-screen";
import Textstyles from '../../utils/text'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Snack from '../../utils/snackbar'
import ApiModel from '../../common/ApiModel'

const UpdateProfile = (props) => {
    const navigation = useNavigation()
    const [firstName, onFistName] = React.useState("");
    const [lastName, onLastName] = React.useState("");
    const [emailId, onEmailId] = React.useState("");
    const [enabled, setEnabled] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false)
    console.log('--------enable', enabled)
    console.log('-----------emailId', emailRegex.test(emailId))

//Complete profile validation
  const validation = () => {
    if (firstName != '') {
      if (lastName != '') {
        if (emailId != '') {
            onCompleteProfile();
            // setEnabled(true)
        } else {
          Snack('Please enter your valid email id');
        }
      } else {
        Snack('Please enter your last name');
      }
    } else {
      Snack('Please enter your first name');
    }
  };

//Login function
   const onCompleteProfile = async() => {
    let Id = await AsyncStorage.getItem('UserId');
    let userId = await JSON.parse(Id)
    console.log('--------------566666666', userId)
    setIsLoading(true);
        let form = JSON.stringify({
            "firstName": firstName,
            "lastName": lastName,
            "email": emailId,
            "userId": userId
        });
      console.log('suitrrrreeee', form)
      ApiModel.sendApiCall(
        `/api/users/v1/userUpdate`,
        form,
        null,
       async response => {
          console.log('-----------response', response)
          setIsLoading(false);
          if (response?.message === 'Success') {
            console.log('HIT SUCCESSS')
            // await AsyncStorage.setItem("UserId", JSON.stringify(response?.data?.userId))
            navigation.replace('Bottom')
            // props.saveUserData(response?.sussess);
          } else {
            setIsLoading(false);
          }
        },
        error => {
          setIsLoading(false);
          console.log('the error is ==>', error);
          Snack(error?.message)
        },
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
                  style={{ height: 30, width:30 }}
                />
              </TouchableOpacity>
            </View>

<ScrollView
 showsVerticalScrollIndicator={false}
 contentContainerStyle={{paddingBottom:50}}>
        <View style={{width:'95%', alignSelf:'center'}}>
          <Text
            style={[Textstyles.medium, {
              marginVertical: vh(1),
              color: Colors.black,
              fontSize:28
            }]}>
            Complete your profile
          </Text>
        </View>


          <View style={styles.container4}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 50 }}
              style={{ width: "100%" }}
            >
              <View style={{ width: "95%", alignSelf: "center", height: 50 }}>
                <TextInput
                  placeholder="First Name"
                  placeholderTextColor={Colors.black}
                  style={[Textstyles.medium, styles.input1]}
                  value={firstName}
                  onChangeText={onFistName}
                />
              </View>


              <View
                style={{
                  width: "95%",
                  alignSelf: "center",
                  marginTop: 5,
                  height: 50,
                }}
              >
                <TextInput
                  placeholder="Last Name"
                  placeholderTextColor={Colors.black}
                  style={[Textstyles.medium, styles.input1]}
                  value={lastName}
                  onChangeText={onLastName}
                />
              </View>

              <View
                style={{
                  width: "95%",
                  alignSelf: "center",
                  marginTop: 5,
                  height: 50,
                }}
              >
                <TextInput
                  placeholder="Email Id"
                  placeholderTextColor={Colors.black}
                  style={[Textstyles.medium, styles.input1]}
                  value={emailId}
                  onChangeText={onEmailId}
                />
              </View>

              <View
                style={{
                  height: 1,
                  marginVertical: vh(3),
                  width: "100%",
                  backgroundColor: "lightgrey",
                }}
              ></View>

              <TouchableOpacity
                onPress={() => validation()}
                style={[styles.loginBtn3, {backgroundColor:enabled == true ? Colors.black : Colors.gray}]}
              >
                 {isLoading ? <ActivityIndicator size="small" color="#ffffff"/>:
                <Text
                  style={[
                    Textstyles.normal,
                    { color: Colors.white, fontSize: 17 },
                  ]}
                >
                Continue
                </Text>}  
              </TouchableOpacity>
            </ScrollView>
          </View>

</ScrollView>
    </View>
  )
}

export default UpdateProfile

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
      loginBtn3: {
        width: "80%",
        borderRadius: 10,
        marginVertical: vh(3),
        height: 48,
        alignItems: "center",
        alignSelf: "center",
        justifyContent: "center",
        
      },
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
        color:Colors.black,
        padding: 0,
        paddingTop: 5,
        paddingLeft: 10,
      },
      categoryData_view2: {
        marginHorizontal: wpx(8),
        paddingLeft: wpx(10),
        width: "33%",
        borderWidth: 1,
        borderRadius: 30,
        marginVertical: wpx(10),
        height: hpx(40),
        alignItems: "center",
        flexDirection: "row",
        elevation: 5,
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
      scrollView_text2: {
        color: Colors.black,
        fontSize: 13,
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