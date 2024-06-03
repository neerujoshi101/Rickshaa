import { Image, StyleSheet, Text, View, FlatList, TextInput, ScrollView, Modal, TouchableOpacity, Alert, ActivityIndicator } from 'react-native'
import React, { useEffect, useReducer, useState } from 'react'
import { Colors ,  hpx, wp, wpx,} from '../../utils/AppConstant'
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
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import Snack from '../../utils/snackbar'
import { useMemo } from 'react'
import Geolocation from '@react-native-community/geolocation';  
import ApiModel from '../../common/ApiModel'

const ProfileSetting = (props) => {
    const navigation = useNavigation()
    const [address, setAddress] = useState(false);
    const [adress, onAddress] = React.useState("");
    const [landmark, onLandmark] = React.useState("");
    const [building, onBulding] = React.useState("");
    const [area, onArea] = React.useState("");
    const [instrtion, onInstrtion] = React.useState("");
    const [label, onlabel] = React.useState("");
    const [instractionId, setInstractionId] = useState("1");
    const [instrationData, setInstrationData] = useState();
    const [showAddress, setShowAddress] = useState(false)
    const [getLat, setLat] = useState()
    const [getLong, setLong] = useState()
    const [isLoding, setIsLoading] = useState(false);
    const [allAdressData, setAllAdressData] = useState();
    const [isCritical, setCritical] = useState(false);
    const[radioButton , setRadioButton] = useState('Home');
    const [delivery, setDelivery] = useState([
        {
          id: "1",
          name: "Meet at door",
          image: Icons.userDoor,
        },
        {
          id: "2",
          name: "Meet outside",
          image: Icons.outside,
        },
        {
          id: "3",
          name: "Leave at door",
          image: Icons.doorRed,
        },
      ]);
      const onValue = (txt) =>{
        setRadioButton(txt)
      }
      console.log('------get allAdressData++', radioButton)

//Get All Adrresss
const getAllAddress = async() => {
  let Id = await AsyncStorage.getItem('UserId');
  let userId = await JSON.parse(Id)
  setIsLoading(true);
  let form = JSON.stringify({
    "userId": userId,
  });
  ApiModel.sendApiCall(
    `/api/Address/v1/getAllAddressesByUserId`,
    form,
    null,
    response => {
      console.log('------------ttttttt Address', response)
      setIsLoading(false);
      if (response?.message == 'Success.') {
        setAllAdressData(response?.data);
      } else {
        setIsLoading(false);
      }
    },
    error => {
      setIsLoading(false);
      console.log('the error in get profile api===>', error);
    },
  );
};

useEffect(()=>{
  getAllAddress()
},[address])

useEffect(() => {
  const unsubscribe = navigation.addListener('focus', () => {
    getAllAddress();
  });
  return unsubscribe;
}, [navigation]);


  //Address Update
   const onUpdateAdd = async() => {
    let Id = await AsyncStorage.getItem('UserId');
    let userId = await JSON.parse(Id)
    setIsLoading(true);
        let form = JSON.stringify({
          "flatNo": adress,
          "userId": userId,
          "landMark": landmark,
          "buildingName": building,
          "instructions": instrtion,
          "deliveryOptions": instrationData,
          "label": radioButton,
          "district": area
        });
      ApiModel.sendApiCall(
        `/api/Address/v1/createAddress`,
        form,
        null,
       async response => {
          setIsLoading(false);
          if (response?.message === 'Success.') {
            setAddress(false)
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


    const onInstractionSave = (item) => {
      setInstractionId(item?.id);
      setInstrationData(item);
    };


  useMemo(()=>{
    Geolocation.getCurrentPosition(async info => {
      if (info) {
        setLat(info.coords.latitude)
        setLong(info.coords.longitude)
      }})
  })



    const signOut = async () => {
      GoogleSignin.configure({
        scopes: ['email'],
        webClientId:
          '874361242359-jbjhk8ne2kmidiggadjjkt9t8h79h4rm.apps.googleusercontent.com',
        offlineAccess: true,
      });
      try {
        await GoogleSignin.revokeAccess();
        await GoogleSignin.signOut();
        navigation.replace('Login')
      } catch (error) {
        console.error('error', error);
      }
    };
  
    const onLogout = async () => {
      let usertype = await AsyncStorage.getItem('isNewUser');
      let type = await JSON.parse(usertype)
      console.log('----HIT usertype', type == true)
      if (type == true) {
            AsyncStorage.clear();
            navigation.replace('Login')
            Snack('Logout Successful')
        }else{
            AsyncStorage.clear();
            signOut();
            navigation.replace('Login')       
            Snack('Logout Successful')
        }
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
            </View>

<ScrollView
 showsVerticalScrollIndicator={false}
 contentContainerStyle={{paddingBottom:50}}>
        <View style={{width:'95%', alignSelf:'center'}}>
          <Text
            style={[Textstyles.medium, {
              marginVertical: vh(1),
              color: Colors.black,
              fontSize:34
            }]}>
            Settings
          </Text>
        </View>


      <View style={{height:120, alignItems:'center', alignSelf:'center', justifyContent:'space-between', width:'95%'}}>
        <TouchableOpacity onPress={() => navigation.navigate('ProfileSetting')}
            style={{height:80, justifyContent:'center', borderColor:Colors.black, borderWidth:1, width:80, borderRadius:50 }}>
          <Image source={
            props?.route?.params?.data?.profile ?
            {uri: props?.route?.params?.data?.profile} :
            Icons.userProfile
            } style={{ height:props?.route?.params?.data?.profile ? 74 : 45, alignSelf:'center', borderRadius:37, width:props?.route?.params?.data?.profile ? 74 : 45,}}/>
        </TouchableOpacity>
        <View style={{ width:'100%', alignSelf:'center',}}>
        <Text style={[Textstyles.medium, {fontSize:18, textAlign:'center', color:Colors.black}]}>{props?.route?.params?.data?.firstName} {props?.route?.params?.data?.lastName}</Text>
        </View>
      </View>

    <View style={{width:'95%', alignSelf:'center'}}>
      <TouchableOpacity onPress={() => navigation.navigate('EditProfile')}
        style={{alignSelf:'center',}}>
        <Text style={[Textstyles.medium, {fontSize:15, alignSelf:'center', color:'darkgreen'}]}>EDIT ACCOUNT</Text>
      </TouchableOpacity>
    </View>

    <View style={{width:'95%', alignSelf:'center'}}>
        <Text
        style={[Textstyles.medium, {
            marginVertical: vh(3),
            color: Colors.black,
            fontSize:17
        }]}>
        Saved Places
        </Text>
    </View>


    <TouchableOpacity onPress={() => setAddress(true)}
            style={{alignItems:'center', width:'95%', alignSelf:'center', height:50, flexDirection:'row'}}>
        <View style={{width:'12%', justifyContent:'center',}}>
            <Image source={Icons.Home} style={{height:30,  width:30}}/>
        </View>

        <View style={{width:'80%'}}>
            <Text style={[Textstyles.medium, {fontSize:16, color:Colors.black}]}>Home</Text>
            <Text style={[Textstyles.medium, {fontSize:13, marginTop:-5, color:Colors.gray}]}>Add Home</Text>
        </View>
    </TouchableOpacity>


    <TouchableOpacity onPress={() => setAddress(true)}
            style={{alignItems:'center', width:'95%', marginTop:vh(2), alignSelf:'center', height:50, flexDirection:'row'}}>
        <View style={{width:'12%', justifyContent:'center',}}>
            <Image source={Icons.work} style={{height:22, left:3,  width:22}}/>
        </View>

        <View style={{width:'80%'}}>
            <Text style={[Textstyles.medium, {fontSize:16, color:Colors.black}]}>Work</Text>
            <Text style={[Textstyles.medium, {fontSize:13, marginTop:-5, color:Colors.gray}]}>Add Work</Text>
        </View>
    </TouchableOpacity>


   

 {showAddress ? 
    <View style={{width:'95%', marginTop:vh(3), alignSelf:'center'}}>
      <TouchableOpacity onPress={() => setShowAddress(false)}
        style={{}}>
        <Text style={[Textstyles.medium, {fontSize:14, alignSelf:'flex-start', color:'darkgreen'}]}>View Less</Text>
      </TouchableOpacity>
    </View>
    :
    <View style={{width:'95%', marginTop:vh(3), alignSelf:'center'}}>
      <TouchableOpacity onPress={() => setShowAddress(true)}
        style={{}}>
        <Text style={[Textstyles.medium, {fontSize:14, alignSelf:'flex-start', color:'darkgreen'}]}>View All</Text>
      </TouchableOpacity>
    </View>
 }

    {showAddress && 
      <FlatList
       contentContainerStyle={{}}
       showsVerticalScrollIndicator={false}
       data={allAdressData}
       renderItem={({ item }) => (
        <View
            style={{
            flexDirection: "row",
            marginTop: vh(2),
            alignItems: "center",
            width: "95%",
            alignSelf: "center",
            paddingHorizontal: vh(1),
            justifyContent: "space-between",
            }}
        >
            <View style={{ width: "17.5%" }}>
            
            <Image
                source={item?.label === 'Home' ? Icons.Home : Icons.office}
                style={{ height: 22, width: 22 }}
            />
            </View>
            <View style={{ width: "65%" }}>
            <Text
                style={[
                Textstyles.medium,
                { fontSize: 14, color: Colors.black },
                ]}
            >
                {item?.flatNo}
            </Text>
            <Text
                style={[
                Textstyles.normal,
                { fontSize: 13, color: Colors.gray },
                ]}
            >
                {item?.district}
            </Text>
            </View>
            <View style={{ width: "17.5%" }}>
            
            {/* <TouchableOpacity
                style={{
                backgroundColor: "#E2E6E2",
                height: 36,
                borderRadius: 18,
                justifyContent: "center",
                width: 36,
                alignSelf: "flex-end",
                }}
            >
                <Image
                source={Icons.editPen}
                style={{ height: 22, alignSelf: "center", width: 22 }}
                />
            </TouchableOpacity> */}
            </View>
        </View>
      )}
      keyExtractor={(i, index) => "id" + index}
      // onRefresh={() => getSearch()}
      // refreshing={loding}
    />
    }


<View style={{height:10, marginVertical:vh(2), backgroundColor:'#E2E6E2'}}></View>


<View style={{width:'95%', alignSelf:'center'}}>
<TouchableOpacity onPress={() => onLogout()}
  style={{}}>
<Text style={[Textstyles.medium, {fontSize:22,  color:'darkgreen'}]}>Sign Out</Text>
</TouchableOpacity>
</View>


    {address && (
        <Modal
          transparent={true}
          animationType={"slide"}
          style={{ width: "95%", position: "absolute", height: "100%" }}
        >
          <View style={styles.container4}>
            <View
              style={{
                flexDirection: "row",
                backgroundColor: "#E2E6E2",
                height: 50,
                width: "100%",
              }}
            >
              <TouchableOpacity
                onPress={() => setAddress(false)}
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
                Address details
              </Text>
            </View>

            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 50 }}
              style={{ width: "100%" }}
            >
              <MapView
                provider={PROVIDER_GOOGLE}
                style={{
                  height: 160,
                  width: "100%",
                  alignSelf: "center",
                }}
                region={{
                  latitude: getLat,
                  longitude: getLong,
                  latitudeDelta: 0.1,
                  longitudeDelta: 0.0121,
                }}
              >
                <Marker
                  coordinate={{ latitude: getLat, longitude: getLong }}
                ></Marker>
              </MapView>

              {/* <Text
                style={[
                  Textstyles.bold,
                  {
                    width: "95%",
                    alignSelf: "center",
                    marginTop: vh(3),
                    fontSize: 20,
                    color: Colors.black,
                  },
                ]}
              >
                New York, United States
              </Text> */}

              <View style={{ width: "95%", alignSelf: "center", height: 50 }}>
                <TextInput
                  placeholder="Apt. flat or floor number (required)*"
                  style={[Textstyles.medium, styles.input1]}
                  placeholderTextColor={'#36454F'}
                  value={adress}
                  onChangeText={onAddress}
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
                  placeholder="Landmark"
                  style={[Textstyles.medium, styles.input1]}
                  placeholderTextColor={'#36454F'}
                  value={landmark}
                  onChangeText={onLandmark}
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
                  placeholder="Business or building name"
                  placeholderTextColor={'#36454F'}
                  style={[Textstyles.medium, styles.input1]}
                  value={building}
                  onChangeText={onBulding}
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
                  placeholder="Area/District"
                  placeholderTextColor={'#36454F'}
                  style={[Textstyles.medium, styles.input1]}
                  value={area}
                  onChangeText={onArea}
                />
              </View>

              <View
                style={{ width: "95%", marginTop: vh(2), alignSelf: "center" }}
              >
                <Text
                  style={[
                    Textstyles.medium,
                    {
                      marginVertical: vh(1),
                      color: Colors.black,
                      fontSize: 17,
                    },
                  ]}
                >
                  Delivery options
                </Text>
              </View>

              <View
                style={{ height: "8%", alignSelf: "flex-end", width: "97%" }}
              >
                <ScrollView
                  contentContainerStyle={{ paddingRight: 50 }}
                  keyboardShouldPersistTaps="handled"
                  horizontal
                  showsHorizontalScrollIndicator={false}
                >
                  {delivery?.map((item, index) => {
                    return (
                      <TouchableOpacity
                        onPress={() => onInstractionSave(item)}
                        style={[
                          styles.categoryData_view2,
                          {
                            borderColor:instractionId == item?.id
                            ? Colors.red
                            : Colors.gray,
                            backgroundColor:
                              instractionId == item?.id
                                ? Colors.white
                                : Colors.white,
                          },
                        ]}
                      >
                        <Image
                          source={item?.image}
                          style={{ height: 14, width: 14 }}
                        />
                        <Text
                          style={[
                            Textstyles.medium,
                            styles.scrollView_text2,
                            {
                              color:
                                instractionId == item?.id
                                  ? Colors.red
                                  : Colors.black,
                              marginTop: 3,
                              marginLeft: 5,
                            },
                          ]}
                        >
                          {item?.name}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </ScrollView>
              </View>

              <View
                style={{
                  width: "95%",
                  alignSelf: "center",
                  marginTop: -5,
                  height: 50,
                }}
              >
                <TextInput
                  placeholder="Add instructions"
                  placeholderTextColor={'#36454F'}
                  style={[Textstyles.medium, styles.input1]}
                  value={instrtion}
                  onChangeText={onInstrtion}
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

              <View style={{ width: "95%", alignSelf: "center" }}>
                <Text
                  style={[
                    Textstyles.medium,
                    {
                      marginVertical: vh(1),
                      color: Colors.black,
                      fontSize: 17,
                    },
                  ]}
                >
                  Address label
                </Text>
              </View>

              <View
                style={{
                  width: "95%",
                  alignSelf: "center",
                  marginTop: -5,
                  height: 50,
                }}
              >
                {/* <TextInput
                  placeholder="Add a label (ex. school)"
                  placeholderTextColor={'#36454F'}
                  style={[Textstyles.medium, styles.input1]}
                  value={label}
                  onChangeText={onlabel}
                /> */}

    <View style={styles.container1}>
          <TouchableOpacity
           onPress={() => 
            onValue('Home')
          }
          style={{flexDirection:'row', alignItems:'center'}}>
            <View
                style={styles.radioCircle}
               >
                  {radioButton === 'Home' && <View style={styles.selectedRb} />}
            </View>
            <Text style={[Textstyles.medium,{color:Colors.black, marginTop:2, left:5}]}>Home</Text>
            </TouchableOpacity>


            <TouchableOpacity 
            onPress={() => 
              onValue('Office')
            }
            style={{flexDirection:'row', alignItems:'center'}}>
            <View
                style={[styles.radioCircle, {right:5}]}
                >
                  {radioButton === 'Office' && <View style={styles.selectedRb} />}
            </View>
            <Text style={[Textstyles.medium,{color:Colors.black, marginTop:2}]}>Office</Text>
            </TouchableOpacity>
        </View>



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
                onPress={() =>{
                  onUpdateAdd()
                  }
                }
                style={styles.loginBtn3}
              >
              {isLoding ? <ActivityIndicator size="small" color="#ffffff"/>:
                <Text
                  style={[
                    Textstyles.normal,
                    { color: Colors.white, fontSize: 17 },
                  ]}
                >
                Continue
                </Text>
              }
              </TouchableOpacity>
            </ScrollView>
          </View>
        </Modal>
      )}

</ScrollView>
    </View>
  )
}

export default ProfileSetting

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
      container1: {
        marginBottom: 20,
        alignItems: 'center',
        flexDirection: 'row',
        // backgroundColor:'pink',
        width:'70%',
        justifyContent:'space-between',
        alignItems:'center'
    },
      radioCircle: {
        height: 25,
        width: 25,
        borderRadius: 100,
        borderWidth: 2,
        borderColor: Colors.red,
        alignItems: 'center',
        justifyContent: 'center',
      },
      selectedRb: {
        width: 15,
        height: 15,
        borderRadius: 50,
        backgroundColor: Colors.red,
        },
      loginBtn3: {
        width: "80%",
        borderRadius: 10,
        marginVertical: vh(3),
        height: 48,
        alignItems: "center",
        alignSelf: "center",
        justifyContent: "center",
        backgroundColor: Colors.gray,
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
        // borderWidth: 1,
        // borderColor: Colors.gray,
        padding: 0,
        paddingTop: 5,
        paddingLeft: 5,
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