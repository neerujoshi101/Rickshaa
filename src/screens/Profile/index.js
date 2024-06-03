import { Image, StyleSheet, Text, TouchableOpacity, View, ScrollView, ViewBase, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  widthPercentageToDP as vw,
  heightPercentageToDP as vh,
} from "react-native-responsive-screen";
import Icons from "../../utils/icons";
import Images from '../../utils/images'
import { Colors } from "../../utils/AppConstant";
import Textstyles from "../../utils/text";
import ApiModel from "../../common/ApiModel";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import { useMemo } from "react";


const Profile = () => {
  const navigation = useNavigation()
  const [isLoding, setIsLoading] = useState(false);
  const [profile, setProfile] = useState()



  const getProfile = async() => {
    let Id = await AsyncStorage.getItem('UserId');
    let userId = await JSON.parse(Id)
    console.log('--------------566666666', userId)
    setIsLoading(true);
    let data = JSON.stringify({
      "userId": userId
    })
    ApiModel.sendApiCall(
      `/api/users/v1/getUser`,
      data,
      null,
      response => {
        console.log('------------ttttttt profile', response)
        setIsLoading(false);
        if (response?.message == 'Success.') {
          setProfile(response?.data);
          // props.saveUserData(response?.data);
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

  useMemo(() =>{
    getProfile();
  },[])


  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getProfile();
    });
    return unsubscribe;
  }, [navigation]);




console.log('-----------profile', profile?.firstName)
  return (
    <View style={{ flex:1 }}>
    
      <View style={{height:130, alignItems:'center', flexDirection:'row', justifyContent:'space-between', width:'95%'}}>
        <Text style={[Textstyles.bold, {fontSize:30, width:'70%', left:vh(2), color:Colors.black}]}>{profile?.firstName} {profile?.lastName}</Text>
        <TouchableOpacity onPress={() => navigation.navigate('ProfileSetting', {data: profile})}
            style={{height:60, justifyContent:'center', borderColor:Colors.black, right:vh(1), borderWidth:1, width:60, borderRadius:30 }}>
          <Image source={
            profile?.profile
            ? {uri: profile?.profile}
            : Icons.userProfile
            // Icons.userProfile
            } style={{ height:profile?.profile ? 54 : 45, alignSelf:'center', borderRadius:27, width:profile?.profile ? 54 : 45,}}/>
        </TouchableOpacity>
      </View>

    <View style={{alignSelf:'center', marginVertical:vh(2), flexDirection:'row', justifyContent:'space-between', width:'95%'}}>
      <TouchableOpacity 
            onPress={() =>  navigation.navigate('Favorites')}
            style={{height:100, justifyContent:'center', alignItems:'center', borderRadius:20,  width:'30%', backgroundColor:'#E2E6E2'}}>
          <Image source={Icons.wishlistColor} style={{height:30, marginVertical:5, width:30}}/>
          <Text style={[Textstyles.medium, { color:Colors.black, fontSize:15}]}>Favorites</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Wallet')}
          style={{height:100, justifyContent:'center', alignItems:'center', borderRadius:20,  width:'30%',backgroundColor:'#E2E6E2'}}>
          <Image source={Icons.walletColor} style={{height:30, marginVertical:5, width:30}}/>
          <Text style={[Textstyles.medium, { color:Colors.black, fontSize:15}]}>Wallet</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('OrderHistory')}
            style={{height:100, justifyContent:'center', alignItems:'center', borderRadius:20,  width:'30%',backgroundColor:'#E2E6E2'}}>
          <Image source={Icons.orderColor} style={{height:30, marginVertical:5, width:30}}/>
          <Text style={[Textstyles.medium, { color:Colors.black, fontSize:16}]}>Orders</Text>
      </TouchableOpacity>
    </View>

      <View style={{height:15, marginVertical:vh(2), backgroundColor:'#E2E6E2'}}></View>

      {isLoding ? <ActivityIndicator size="large" color={Colors?.red} style={{flex:1}}/> :
        <>

      <ScrollView contentContainerStyle={{paddingBottom:50}}>  
      <View style={{width:'90%', alignSelf:'center'}}>

        {/* <TouchableOpacity onPress={() => navigation.navigate('promoRedeem')}
            style={{flexDirection:'row', width:'95%', alignSelf:'center', marginTop:vh(4), alignItems:'center'}}>
          <Image source={Icons.promoCode} style={{height:24, width:24}}/>
          <Text style={[Textstyles.normal, {marginLeft:vh(2), color:Colors.black, fontSize:17, fontWeight:'400'}]}>Promotions</Text>
        </TouchableOpacity> */}


        <TouchableOpacity onPress={() => navigation.navigate('Help')}
            style={{flexDirection:'row', width:'100%', alignSelf:'center', marginTop:vh(4), alignItems:'center'}}>
          <View style={{width:'10%',}}>
          <Image source={Icons.helpRed} style={{height:24, alignSelf:'center', width:24}}/>
          </View>
          <View style={{ width:'90%'}}>
          <Text style={[Textstyles.normal, {marginLeft:vh(1), color:Colors.black, fontSize:17, fontWeight:'400'}]}>Help</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('RestaurantsRewards')}
            style={{flexDirection:'row', width:'100%', alignSelf:'center', marginTop:vh(4), alignItems:'center'}}>
          <View style={{width:'10%'}}>
          <Image source={Icons.rewardsRed} style={{height:24, alignSelf:'center', width:24}}/>
          </View>
          <View style={{ width:'90%'}}>
          <Text style={[Textstyles.normal, {marginLeft:vh(1), color:Colors.black, fontSize:17, fontWeight:'400'}]}>Restaurant Rewards</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('RestaurantsOffers')}
            style={{flexDirection:'row', width:'100%', alignSelf:'center', marginTop:vh(4), alignItems:'center'}}>
          <View style={{width:'10%'}}>
            <Image source={Icons.offers} style={{height:24, alignSelf:'center', width:24}}/>
          </View>

          <View style={{ width:'90%'}}>
          <Text style={[Textstyles.normal, {marginLeft:vh(1), color:Colors.black, fontSize:17, fontWeight:'400'}]}>Offers</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('AddressBook')}
            style={{flexDirection:'row', width:'100%', alignSelf:'center', marginTop:vh(4), alignItems:'center'}}>
          <View style={{width:'10%'}}>
          <Image source={Icons.addressBook} style={{height:22, alignSelf:'center', width:22}}/>
          </View>
          <View style={{ width:'90%'}}>
          <Text style={[Textstyles.normal, {marginLeft:vh(1), color:Colors.black, fontSize:17, fontWeight:'400'}]}>Address Book</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('InviteFriend')}
            style={{flexDirection:'row', width:'100%', alignSelf:'center', marginTop:vh(4), alignItems:'center'}}>
          <View style={{width:'10%'}}>
            <Image source={Icons.inviteRed} style={{height:24, alignSelf:'center', width:24}}/>
          </View>
          <View style={{ width:'90%'}}>
          <Text style={[Textstyles.normal, {marginLeft:vh(1), color:Colors.black, fontSize:17, fontWeight:'400'}]}>Invite Friends</Text>
          <Text style={[Textstyles.normal, {marginLeft:vh(1),fontSize:12, marginTop:-2, color:Colors.gray}]}>Get $10 off your order</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('PrivacyPolicy')}
            style={{flexDirection:'row', width:'100%', alignSelf:'center', marginTop:vh(4), alignItems:'center'}}>
          <View style={{width:'10%'}}>
          <Image source={Icons.hideRed} style={{height:24, alignSelf:'center', width:24}}/>
          </View>
          <View style={{ width:'90%'}}>
          <Text style={[Textstyles.normal, {marginLeft:vh(1), color:Colors.black, fontSize:17, fontWeight:'400'}]}>Privacy & Policy</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('About')}
            style={{flexDirection:'row', width:'100%', alignSelf:'center', marginTop:vh(4), alignItems:'center'}}>
          <View style={{width:'10%'}}>
           <Image source={Icons.infoRed} style={{height:24, alignSelf:'center', width:24}}/>
          </View>
          <View style={{ width:'90%'}}>
            <Text style={[Textstyles.normal, {marginLeft:vh(1), color:Colors.black, fontSize:17, fontWeight:'400'}]}>About</Text>
          </View>
        </TouchableOpacity>

       
      </View>
    </ScrollView>
    </>
    }
      </View>
    );
  };

export default Profile;

const styles = StyleSheet.create({});
