import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, Modal, View, TextInput, FlatList, Linking, ActivityIndicator } from "react-native";
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
// import { useMemo } from "react";
import ApiModel from "../../common/ApiModel";
import { useMemo } from "react";

const About = (props) => {
  const navigation = useNavigation()
  const [about, setAbout] = useState()
  const [isLoading, setIsLoading] = useState(false)
  console.log('-------ABOUT--', about?.contents)
 
//About Api
const getAllCategory = async() => {
  setIsLoading(true);
  let data = JSON.stringify({
    "type":"aboutUs"
  })
  ApiModel.sendApiCall(
    `/api/PrivacyAndAbout/v1/getAllPrivacyAndAboutUsByType`,
    data,
    null,
    response => {
      console.log('------------ABOUT&US', response)
      setIsLoading(false);
      if (response?.message == 'Success.') {
        setAbout(response?.data)
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
  getAllCategory()
},[])




 

  return (
    <View style={{flex: 1, backgroundColor:Colors.white}}>
     
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
               About Us
              </Text>
        </View>



    {/* <ScrollView contentContainerStyle={{paddingBottom:200}}> */}
        <>
        <View style={{height:'25%', width:'100%'}}>
            <Image resizeMode="contain" source={Images.about} style={{height:'100%', width:'100%'}}/> 
        </View>

        <Text style={[Textstyles.bold, {width: "95%", marginVertical:vh(2), alignSelf: "center", fontSize: 30, color: Colors.black}]}>
            Who we are
        </Text>

        {isLoading ? <ActivityIndicator style={{flex:1, marginTop:'10%', justifyContent:'center'}} size="large" color={Colors.red}/>:
          <>

      <FlatList
        contentContainerStyle={{}}
        showsVerticalScrollIndicator={false}
        data={about?.contents}
        renderItem={({ item }) => (
        <>
        <Text style={[Textstyles.medium, {width: "95%", marginVertical:vh(1), alignSelf: "center", fontSize: 24, color: Colors.black}]}>
          {item?.title} 
          
        </Text>

        <View style={{width:'95%', alignSelf:'center', marginVertical:vh(1)}}>
          <Text> {item?.description} </Text>
         {/* <Text style={[{fontSize:15,color:Colors.gray}, Textstyles.normal]}>
          {item?.description} 
           at <TouchableOpacity onPress={() => Linking.openURL('https://rickshawfoods.com')}
            style={{marginTop:7, height:20,}}>
              <Text
                style={[ Textstyles.normal ,{
                  fontSize:15,
                  color:Colors.red,
                  marginTop:4,
                  height:20,
                  textDecorationLine:'underline'
                }]}
              >
                https://rickshawfoods.com
              </Text>
            </TouchableOpacity> (the "Site") and any related mobile or software applications ("Ricksha Food Platform") 
           including but not limited to delivery of information via the website whether existing now or in 
           the future that link to the Terms (collectively, the "Services").
         </Text> */}
        </View>
        </>
        )}
        keyExtractor={(i, index) => "id" + index}
      />
      </>
}
  </>
{/* </ScrollView> */}
</View>
  );
};

export default About;

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
});
