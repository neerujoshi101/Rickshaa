import { ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import OTPTextView from "../../common/Otp"
import {
  widthPercentageToDP as vw,
  heightPercentageToDP as vh,
} from "react-native-responsive-screen";
import Icons from "../../utils/icons";
import { Colors } from "../../utils/AppConstant";
import Textstyles from "../../utils/text";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ApiModel from "../../common/ApiModel";
import Geolocation from '@react-native-community/geolocation';
import Snack from "../../utils/snackbar";

const OtpVerification = (props) => {
  const navigation = useNavigation()
  const [otpVal, setOtpVal] = useState('');
  const [time, setTime] = React.useState(props.initialValue || 30);
  const [seconds, setSeconds] = useState(30);
  const [isLoding, setIsLoading] = useState(false);
    const timerRef = React.useRef(time);
    console.log('time reff', timerRef)

    let getOriginal = props?.route?.params?.phone
    console.log('-------00GET USER DATAotpVal', getOriginal)


//resend function
  const onResendOtp = () => {
    setIsLoading(true);
    Geolocation.getCurrentPosition(async info => {
      if (info) {
        let form = JSON.stringify({
            "phone": getOriginal,
            "latitude": info.coords.latitude,
            "longitude": info.coords.longitude,
        });
      console.log('------------suiticalll', form)
      ApiModel.sendApiCall(
        '/api/users/v1/registration',
        form,
        null,
        response => {
          console.log('-----------response', response)
          setIsLoading(false);
          if (response?.message === 'Success.') {
            console.log('HIT SUCCESSS')
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
    }})
  };


//otp verification function
  const onOtpverification = async() => {
    let Id = await AsyncStorage.getItem('UserId');
    let userId = await JSON.parse(Id)
    console.log('--------------566666666', userId)
    setIsLoading(true);
    Geolocation.getCurrentPosition(async info => {
      if (info) {
        let form = JSON.stringify({
            "phone": getOriginal,
            "userId":userId,
            "otp": otpVal
        });
      ApiModel.sendApiCall(
        '/api/users/v1/verifyOtp',
        form,
        null,
       async response => {
          console.log('-----------response', response?.data?.isNewUser == false)
          setIsLoading(false);
          if (response?.data?.isNewUser == false) {
            navigation.replace('Bottom')
            await AsyncStorage.setItem("isNewUser", JSON.stringify(response?.data?.isNewUser))
          } else {
            navigation.replace('UpdateProfile')
            setIsLoading(false);
            await AsyncStorage.setItem("isNewUser", JSON.stringify(response?.data?.isNewUser))
          }
        },
        error => {
          setIsLoading(false);
          console.log('the error is ==>', error);
          Snack(error?.message)
        },
      );
    }})
  };

    useEffect(() => {
      if (seconds > 0) {
        setTimeout(() => setSeconds(seconds - 1), 1000);
      }
    }, [seconds]);

    console.log('------secondss', seconds)

  // React.useEffect(() => {
  //   const timerId = setInterval(() => {
  //     timerRef.current -= 1;
  //     if (timerRef.current < 0) {
  //       clearInterval(timerId);
  //     } else {
  //       setTime(timerRef.current);
  //     }
  //   }, 1000);
  //   return () => {
  //     clearInterval(timerId);
  //   };
  // }, [time]);


  return (
    <View style={{ flex: 1 }}>

      <Text
        style={[ Textstyles.medium,{
          fontSize: 16,
          marginTop: vh(5),
          marginVertical: vh(2),
          alignSelf: 'center',
          width: '90%',
          color: 'black',
        }]}>
        Enter the 4-digit code sent to you at {props?.route?.params?.phone}
      </Text>
      <View style={{ width: '70%', borderRadius: 5, }}>
        <OTPTextView
          autoFocus
          handleTextChange={(e) => setOtpVal(e)}
          containerStyle={{}}
        />
      </View>


      {seconds === 0 ? 
        <View style={{ backgroundColor: Colors.black, left: 10, marginTop: vh(2), borderRadius: 20, width: '60%', padding: 5 }}>
          <TouchableOpacity onPress={() =>{ 
            setSeconds(30)
            onResendOtp()
          }}
            style={{ alignSelf: 'center', }}>
            <Text style={[Textstyles.normal,{color:Colors.white, paddingTop:2}]}>I didn't receive a code resend</Text>
          </TouchableOpacity>
        </View>
      :
        <View style={{ backgroundColor: '#DCDCDC', left: 10, marginTop: vh(2), borderRadius: 20, width: '40%', padding: 5 }}>
          <View style={{ alignSelf: 'center', }}>
            <Text style={[Textstyles.normal, {paddingTop:2}]}>Resend otp in {seconds}</Text>
          </View>
        </View>
      }



      {/* <View style={{ backgroundColor: 'black', left: 10, marginTop: vh(2), borderRadius: 20, width: '60%', padding: 6 }}>
        <View style={{ alignSelf: 'center', }}>
          <Text style={[Textstyles.normal ,{ color: 'white', fontSize: 15 }]}>Login with social accounts</Text>
        </View>
      </View> */}

    <View style={{flex:1, justifyContent:'flex-end', marginVertical:vh(2)}}>
      <View style={{ height:50, alignItems:'center', flexDirection:'row', justifyContent:'space-between'}}>
        <TouchableOpacity  onPress={() => navigation.goBack()}
          style={{left:vh(2),}}>
          <Image source={Icons.backIcon} style={{height:24,  width:24}}/>
        </TouchableOpacity>
        {otpVal.length == 4 ?
          <TouchableOpacity onPress={() => onOtpverification()}
                style={{flexDirection:'row', width:'28%', justifyContent:'center', backgroundColor: '#000000', height:35, alignItems:'center', borderRadius:30, right:vh(2)}}>
            {isLoding ? <ActivityIndicator size="small" color="#ffffff"/>:
            <>
              <Text style={[ Textstyles.medium,{fontSize:17, right:5, marginTop:2, color:'white', fontWeight:'500'}]}>Next</Text>
              <Image source={Icons.nextWhiteIcon} style={{height:22, width:22}}/></>}
          </TouchableOpacity>
          :
          <View style={{flexDirection:'row', width:'28%', justifyContent:'center', backgroundColor: '#DCDCDC', padding:vh(0.6), borderRadius:30, right:vh(2)}}>
              <Text style={[ Textstyles.medium,{fontSize:18, right:5,marginTop:2, fontWeight:'600'}]}>Next</Text>
              <Image source={Icons.nextIcon} style={{height:22,marginTop:3, width:22}}/>
          </View>
        }
    </View>

      </View>
    </View>
  );
};

export default OtpVerification;

const styles = StyleSheet.create({});
