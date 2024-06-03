import React, { useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  // TextInput,
  Button,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { TextInput } from "react-native-paper";
import {
  widthPercentageToDP as vw,
  heightPercentageToDP as vh,
} from "react-native-responsive-screen";
import Images from "../../utils/images";
import { Colors } from "../../utils/AppConstant";
import { useNavigation } from "@react-navigation/native";
import ApiModel from "../../common/ApiModel";
import PhoneInput from "react-native-phone-number-input";
import Textstyles from "../../utils/text";
import Snack from '../../utils/snackbar'
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import Geolocation from '@react-native-community/geolocation';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Login() {
  const navigation = useNavigation();
  const [isLoding, setIsLoading] = useState(false);
  const [isGoLoding, setIsGoLoading] = useState(false)
  const phoneInput = useRef(null);
  const [value, setValue] = useState("");
  const [loggedIn, setLoggedIn] = useState();
  console.log('--------value', value)

  const validatemn = mn => {
    var re =/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    return re.test(mn);}
  

  //Login function
  const onLogin = () => {
    setIsLoading(true);
    Geolocation.getCurrentPosition(async info => {
      if (info) {
        let form = JSON.stringify({
            "phone": value,
            "latitude": info.coords.latitude,
            "longitude": info.coords.longitude,
        });
      console.log('suitrrrreeee', form)
      ApiModel.sendApiCall(
        '/api/users/v1/registration',
        form,
        null,
       async response => {
          console.log('-----------response', response)
          setIsLoading(false);
          if (response?.message === 'Success.') {
            console.log('HIT SUCCESSS')
            await AsyncStorage.setItem("UserId", JSON.stringify(response?.data?.userId))
            navigation.navigate('OtpVerification', {phone: value})
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

  const googleSignIn = async () => {
    setIsGoLoading(true);
    GoogleSignin.configure({
      scopes: ['email'],
      webClientId:
        '874361242359-jbjhk8ne2kmidiggadjjkt9t8h79h4rm.apps.googleusercontent.com',
      offlineAccess: true,
    });
    try {
      const userInfo = await GoogleSignin.signIn();
      setIsGoLoading(false);
      if (!loggedIn) {
        Geolocation.getCurrentPosition(async info => {
          if (info) {
            let latitude = info.coords.latitude;
            let longitude = info.coords.longitude;
        let data = JSON.stringify({
          "firstName": userInfo?.user?.givenName,
          "lastName": userInfo?.user?.familyName,
          "email": userInfo?.user?.email,
          "profile": userInfo?.user?.photo,
          "registerType": "gmail",
          "latitude": latitude,
          "longitude": longitude,
        })
        console.log('Dataaaaaaaaaaaaaaa------aasss----', data)
        // dispatch({
        //   type:types.SOCIAL_GOOGLE_LOGIN,
        //   payload:data
        // })
        ApiModel.sendApiCall(
          '/api/users/v1/socialLogin',
          data,
          null,
        async  response => {
          setIsGoLoading(false);
            console.log('-----------ress6666666', response)
            if (response?.status == 1) {
              await AsyncStorage.setItem("UserId", JSON.stringify(response?.data?.userId))
              
              // props.saveUserData(response?.sussess);
              navigation.navigate('Bottom');
            } else {
              setIsGoLoading(false);
              // Alert.alert(
              //   'User exist',
              //   'This email id is already registered.',
              //   [{text: 'OK', onPress: () => {}, style: 'default'}],
              //   {cancelable: false},
              // );
            }
          },
          error => {
            setIsGoLoading(false);
            console.log('the error during sign up===>', error);
          },
        );
        }else{
          console.log('error')
        }
      });
      } else {
        setIsGoLoading(false)
        Snack('Please Logged In');
      }
    } catch (error) {
      console.log('the eror',error)
      Alert.alert(
        'Declined',
        'Sign in cancelled. Please try again',
        [{text:'OK', onPress: ()=>{}, style:'default'}],
        {cancelable:false}
      )
      setIsGoLoading(false)
    }
  };





  return (
    <ScrollView style={styles.container}>
     {/* <View style={styles.container}> */}
        <View
          style={{
            width: "100%",
            height: "100%",
            alignSelf: "center",
            borderTopEndRadius: 40,
            borderTopStartRadius: 40,
            backgroundColor: Colors.white,
          }}
        >
          <View style={styles.imgView}>
            <Image
              resizeMode="center"
              source={Images.RickshaaIcon}
              style={styles.img}
            />
          </View>

          <Text
            style={[Textstyles.medium, {
              fontSize: 20,
              marginVertical: vh(2),
              textAlign: "center",
              // fontWeight: "600",
              color:Colors.black,
            }]}>Enter your mobile number</Text>
          

          <View style={{ width: "100%", alignSelf: "center" }}>
            <View style={styles.inputView}>
              <PhoneInput
                ref={phoneInput}
                defaultValue={value}
                defaultCode="US"
                // defaultCode="IN"
                onChangeFormattedText={(text) => {
                  setValue(text);
                }}
                withDarkTheme
                withShadow
                // autoFocus
                containerStyle={styles.phoneContainer}
                textContainerStyle={styles.textInput}
              />
            </View>
          </View>

          <TouchableOpacity onPress={() => onLogin()}
            style={styles.loginBtn}>
            {isLoding ? <ActivityIndicator size="small" color="#ffffff"/>:
            <Text style={[Textstyles.normal, { color: Colors.white, fontSize: 18 }]}>Continue</Text>}
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={[Textstyles.normal , styles.text]}>Don't have an accout? Sign Up Now</Text>
          </TouchableOpacity>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: 10,
            }}
          >
            <View
              style={{
                flex: 1,
                height: 2,
                backgroundColor: "rgb(202,202,202)",
              }}
            />
            <View>
              <Text style={[Textstyles.normal , { width: 40, color: "black", textAlign: "center" }]}>
                Or
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                height: 2,
                backgroundColor: "rgb(202,202,202)",
              }}
            />
          </View>
          <TouchableOpacity>
            <Text style={[Textstyles.normal, styles.text]}>Sign up with Social Networks</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => googleSignIn()}
              style={styles.loginBtn1}>
          {isGoLoding ? <ActivityIndicator size="small" color="#000000"/>:
            <>
            <Image source={Images.Google} style={{ height: 30, width: 30 }} />
            <Text
              style={[Textstyles.medium, {
                color: Colors.black,
                fontSize: 15,
                alignItems:'center', 
                marginTop:2,
                marginHorizontal: vh(1),
              }]}>
              Continue with Google
            </Text></>}
          </TouchableOpacity>

          <TouchableOpacity style={styles.loginBtn1}>
            <Image source={Images.apple} style={{ height: 30, width: 30 }}/>
            <Text
              style={[Textstyles.medium,{
                color: Colors.black,
                fontSize: 15,
                marginHorizontal: vh(1),
                marginTop:2,
              }]}
            >
              Continue with Apple
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.loginBtn1}>
            <Image source={Images.facebook} style={{ height: 30, width: 30 }} />
            <Text
              style={[Textstyles.medium ,{
                color: Colors.black,
                fontSize: 15,
                marginTop:2,
                marginHorizontal: vh(1),
              }]}
            >
              Continue with Facebook
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ width: "35%", alignSelf: "center", marginTop: vh(3) }}
          >
            <Text
              style={[Textstyles.medium,{
                textDecorationLine: "underline",
                fontWeight: "600",
                textAlign: "center",
                color:Colors.gray
              }]}
            >
              Find my Account
            </Text>
          </TouchableOpacity>
          <Text
            style={[Textstyles.normal,{
              textAlign: "center",
              alignItems: "center",
              fontSize: 12,
              width: "90%",
              alignSelf: "center",
              marginTop: vh(3),
              color:Colors.black
            }]}
          >
            By clicking Sign up, Continue with Facebook, Continue with Google or
            Continue with Apple, you agree to our
            <TouchableOpacity onPress={() => navigation.navigate('TermsCondition')}
              style={{marginTop:7, height:20,}}>
              <Text
                style={[ Textstyles.normal ,{
                  color: Colors.red,
                  fontSize: 12,
                  height:20,
                  marginTop:7,
                  textDecorationLine:'underline'
                }]}
              >
                Terms and Conditions
              </Text>
            </TouchableOpacity>
            <Text style={{color:Colors.black}}> and </Text>
            <TouchableOpacity onPress={() => navigation.navigate('PrivacyPolicy')}
              style={{marginTop:7, height:20,}}>
              <Text
                style={[Textstyles.normal,{
                  color: Colors.red,
                  fontSize: 12,
                  height:20,
                  marginTop:7,
                  textDecorationLine:'underline'
                }]}
              >
                Privacy Statement
              </Text>
            </TouchableOpacity>
          </Text>
        </View>
    {/* </View> */}
  </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  phoneContainer: {
    width: "95%",
    height: 50,
    elevation: 5,
    borderColor: "lightgrey",
    borderWidth: 1,
    borderRadius: 5,
    marginLeft: 8,
  },
  textInput: {
    paddingVertical: 0,
    elevation: 2,
    borderRadius: 5,
  },
  imgView: {
    alignSelf: "center",
    width: "100%",
    height: 120,
  },
  img: {
    width: vw(50),
    height: vh(20),
    borderRadius: 20,
    alignSelf: "center",
  },
  img1: {
    width: vw(25),
    height: vh(10),
    borderRadius: 5,
    alignSelf: "center",
    marginTop: vh(3),
  },
  userimg: {
    width: vw(15),
    height: vh(12),
    borderRadius: 20,
    alignSelf: "center",
    marginTop: -vh(4),
  },
  inputView: {
    borderRadius: 5,
    // borderColor:'grey',
    width: "95%",
    height: 50,
    alignSelf: "center",
  },

  TextInput: {
    // height: 50,
    width: "90%",
    // flex: 1,
    // padding: 10,
    // marginLeft: 20,
  },

  forgot_button: {
    height: 30,
    marginBottom: 20,
    alignSelf: "flex-end",
    marginRight: 28,
    color: "black",
    // marginTop:-vh(1),
  },

  loginBtn: {
    width: "80%",
    borderRadius: 10,
    marginTop: vh(3),
    height: 48,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: "black",
  },

  loginBtn1: {
    width: "80%",
    borderRadius: 10,
    marginVertical: vh(1),
    flexDirection: "row",
    height: 48,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: "#E5E4E2",
  },

  text: {
    height: 30,
    marginBottom: 10,
    alignSelf: "center",
    color: "black",
    marginTop: 9,
  },

  img6: {
    width: vw(10),
    height: vh(10),
    // borderRadius: 5,
    alignSelf: "center",
    marginTop: -vh(3),
  },
});

{
  /* <TextInput
            style={styles.TextInput}
            value={email}
            keyboardType="number-pad"
            autoFocus
            placeholderTextColor="#003f5c"
            onChangeText={(email) => setEmail(email)}
            theme={{
              roundness: 5,
              colors: {
                primary: Colors.black,
                text: Colors.black,
                placeholder: Colors.black
              },
            }}
            underlineColor={Colors.yellow}
            mode="outlined"
            label="Phone No."
            // right= {TextInput.Affix }
            left={
              // <TextInput.Icon name={Images.usa} size={22} color={'lighgrey'}/>,
              <TextInput.Affix text="+1"  color={'black'}/>
            }
          /> */
}
