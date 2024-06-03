import { Image, ScrollView, StyleSheet, Text, Share, TouchableOpacity, Linking, View, Clipboard } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  widthPercentageToDP as vw,
  heightPercentageToDP as vh,
} from "react-native-responsive-screen";
import Icons from "../../utils/icons";
import Images from "../../utils/images";
import Textstyles from "../../utils/text";
import { Colors, hpx, nf, wp, wpx,} from '../../utils/AppConstant'
import Snack from '../../utils/snackbar'

const InviteFriend = (props) => {
  const navigation = useNavigation()

  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          `Check out this deal from Ricksha Foods!'\n\n\n\n'Hungry? Get $10 off your first 2 Ricksha Foods orders of $50 or more. Terms apply. Use my code at checkout: ricksha-dhananjay510ue`
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };


  const copyToClipboard = (txt) => {
    console.log('------------txt', txt)
    Clipboard.setString(txt)
    Snack('Copied to cliboard')
  }

  return (
    <View style={{flex: 1, backgroundColor:Colors.white}}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{height:50, justifyContent:'center', backgroundColor:Colors.white}}>
            <Image source={Icons.arrowRed} style={{height:30, left:vh(1), width:30}}/>
        </TouchableOpacity>
     
        <Text style={[Textstyles.medium, { width:'95%', alignSelf:'center', fontSize:25, marginVertical:vh(1), color: Colors.black }]}>
         Invite a friend, get $10
        </Text>



    <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{}}>
            <Image source={Icons.promo} style={{height:100, alignSelf:'center', width:100}}/>
        </View>

        <Text style={[Textstyles.normal,{fontSize:18, marginTop:vh(2), textAlign:'center'}]}>YOUR CODE</Text>

        <TouchableOpacity onPress={() => copyToClipboard('ricksha-dhananjay510ue')} 
            style={{borderStyle:'dotted', justifyContent:'center', marginVertical:vh(1), borderRadius:10, marginBottom:vh(5), alignSelf:'center', borderColor:Colors.gray, borderWidth:2, height:40, paddingLeft:vh(2), paddingRight:vh(2)}}>
            <Text style={[Textstyles.bold, {fontSize:20, color:'#02a556'}]}>ricksha-dhananjay510ue</Text>
        </TouchableOpacity>


        <View style={{width:'95%', alignSelf:'center', marginBottom:vh(5)}}>
         <Text style={[{fontSize:15,color:Colors.black, textAlign:'center'}, Textstyles.normal]}>
            Share your code with friend. When they use Ricksha Foods for first time, they get $10 off 2 orders of $10 off a $50 order
         </Text>
        </View>






        <View style={{}}>
            <TouchableOpacity onPress={()=> onShare()} style={{borderColor:Colors.red, paddingVertical:vh(1), borderWidth:1.5, padding:hpx(5), justifyContent:'center', alignItems:'center', width:'35%', alignSelf:'center', borderRadius:8}}>
                <Image source={Icons.share} style={{height:30, width:30}}/>
                <Text style={[{textAlign:'center', fontSize:16, color:Colors.red}, Textstyles.medium]}>Share</Text>
            </TouchableOpacity>

            {/* <TouchableOpacity onPress={()=>Linking.openURL('mailto:support@rickshawfoods.com')} style={{borderColor:Colors.red, paddingVertical:vh(1), borderWidth:1.5, padding:hpx(5), justifyContent:'center', alignItems:'center', width:'35%', alignSelf:'center', borderRadius:8}}>
                <Image source={Icons.emailIcon} style={{height:30, width:30}}/>
                <Text style={[{textAlign:'center', fontSize:16, color:Colors.red}, Textstyles.medium]}>Email to us</Text>
            </TouchableOpacity> */}
        </View>
    </ScrollView>


</View>
  );
};

export default InviteFriend;

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
        marginTop: vh(10),
        height: 48,
        alignItems: "center",
        alignSelf: "center",
        justifyContent: "center",
        backgroundColor:Colors.gray
        // backgroundColor: "#038847",
      },
      
});
