import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, Linking, View, FlatList, ActivityIndicator } from "react-native";
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
import ApiModel from "../../common/ApiModel";
import { useMemo } from "react";

const Help = (props) => {
  const navigation = useNavigation()
  const [rest, setRest] = useState(true)
  const [store, setStore] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [help, setHelp] = useState()
  console.log('----------', help?.description)


  const onActive = (txt) => {
    console.log("--------onRest", txt);
    if (txt === "Res") {
      setRest(true);
      setStore(false);
    } else {
      setRest(false);
      setStore(true);
    }
  };


   //Help&Support Api
   const getAllCategory = async() => {
    setIsLoading(true);
    let data = JSON.stringify({
      "type":"help"
    })
    ApiModel.sendApiCall(
      `/api/PrivacyAndAbout/v1/getAllPrivacyAndAboutUsByType`,
      data,
      null,
      response => {
        // console.log('------------HELP&SUPPORT', response)
        setIsLoading(false);
        if (response?.message == 'Success.') {
          setHelp(response?.data)
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

  useEffect(() =>{
    getAllCategory()
  },[])





  return (
    <View style={{flex: 1, backgroundColor:Colors.white}}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{height:50, justifyContent:'center', backgroundColor:Colors.white}}>
            <Image source={Icons.arrowRed} style={{height:30, left:vh(1), width:30}}/>
        </TouchableOpacity>
     
        <Text style={[Textstyles.medium, { width:'95%', alignSelf:'center', fontSize:25, marginVertical:vh(1), color: Colors.black }]}>
            Help
        </Text>

    <View style={{flexDirection:'row', height:40, marginTop:vh(2), justifyContent:'space-between', width:'75%', left:vh(2)}}>
    {rest ? 
        <TouchableOpacity onPress={() => onActive('Res')}
            style={{borderWidth:1.5, borderColor:Colors.red, borderRadius:20, justifyContent:'center', width:'48%'}}>
          <Text style={[Textstyles.normal,{color: Colors.red, textAlign:'center', fontSize: 18 }]}>Restaurates</Text>
        </TouchableOpacity>
        :
        <TouchableOpacity onPress={() => onActive('Res')}
            style={{borderWidth:1.5, borderColor:Colors.gray, borderRadius:20, justifyContent:'center', width:'48%'}}>
          <Text style={[Textstyles.normal,{color: Colors.gray, textAlign:'center', fontSize: 18 }]}>Restaurates</Text>
        </TouchableOpacity>
    }
    {store ? 
        <TouchableOpacity onPress={() => onActive('store')}
            style={{borderWidth:1.5, borderColor:Colors.red, borderRadius:20, justifyContent:'center', width:'48%'}}>
          <Text style={[Textstyles.normal,{color: Colors.red, textAlign:'center', fontSize: 18 }]}>Stores</Text>
        </TouchableOpacity>
        :
        <TouchableOpacity onPress={() => onActive('store')}
            style={{borderWidth:1.5, borderColor:Colors.gray, borderRadius:20, justifyContent:'center', width:'48%'}}>
          <Text style={[Textstyles.normal,{color: Colors.gray, textAlign:'center', fontSize: 18 }]}>Stores</Text>
        </TouchableOpacity>
    }
</View>

{rest &&
    <ScrollView showsVerticalScrollIndicator={false}>
       {/* <FlatList
        contentContainerStyle={{}}
        showsVerticalScrollIndicator={false}
        data={help}
        renderItem={({ item }) => (
        <>
      {item.helpType === 'Restaurant' && 
      <> */}


{isLoading ? <ActivityIndicator style={{flex:1, marginTop:'10%', justifyContent:'center'}} size="large" color={Colors.red}/>:
<>
        <View style={{paddingVertical:vh(5)}}>
            <View style={{width:'95%',alignSelf:'center'}}>
            <Text style={[{fontSize:15,color:Colors.black}, Textstyles.medium]}>
              {help?.description}
            </Text>
            </View>

            <View style={{width:'95%', alignSelf:'center', marginTop:hpx(15)}}>
            <Text style={[{fontSize:16,color:Colors.black}, Textstyles.medium]}>
                {help?.addressOne}{'\n'}{help?.addressTwo}{'\n'}
            </Text>
            </View>
        </View>

        <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-around'}}>
            <TouchableOpacity onPress={()=>Linking.openURL(`tel:${help?.phone}`)} style={{borderColor:Colors.red, borderWidth:1.5, padding:hpx(5), paddingVertical:vh(1), justifyContent:'center', alignItems:'center', width:'35%', alignSelf:'center', borderRadius:8}}>
                <Image source={Icons.phoneIcon} style={{height:30, width:30}}/>
                <Text style={[{textAlign:'center', fontSize:16, color:Colors.red}, Textstyles.medium]}>Call to us</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>Linking.openURL(`mailto:${help?.email}`)} style={{borderColor:Colors.red, paddingVertical:vh(1), borderWidth:1.5, padding:hpx(5), justifyContent:'center', alignItems:'center', width:'35%', alignSelf:'center', borderRadius:8}}>
                <Image source={Icons.emailIcon} style={{height:30, width:30}}/>
                <Text style={[{textAlign:'center', fontSize:16, color:Colors.red}, Textstyles.medium]}>Email to us</Text>
            </TouchableOpacity>
        </View>
        </>
}



        {/* </>
        } */}
        {/* </>
        )}
        keyExtractor={(i, index) => "id" + index}
      /> */}
    </ScrollView>
}

{store &&
    <ScrollView showsVerticalScrollIndicator={false}>
      {/* <FlatList
        contentContainerStyle={{}}
        showsVerticalScrollIndicator={false}
        data={help}
        renderItem={({ item }) => (
        <>
      {item.helpType === 'Store' && 
      <> */}

{isLoading ? <ActivityIndicator style={{flex:1, marginTop:'10%', justifyContent:'center'}} size="large" color={Colors.red}/>:
<>

        <View style={{paddingVertical:vh(5)}}>
            <View style={{width:'95%',alignSelf:'center',}}>
            <Text style={[{fontSize:15,color:Colors.black}, Textstyles.medium]}>
              {help?.description}
            </Text>
            </View>

            <View style={{width:'95%',alignSelf:'center',marginTop:hpx(10)}}>
            <Text style={[{fontSize:16,color:Colors.black}, Textstyles.medium]}>
             {help?.addressOne}{'\n'}{help?.addressTwo}
            </Text>
            </View>
        </View>

        <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-around'}}>
            <TouchableOpacity onPress={()=>Linking.openURL(`tel:${help?.phone}`)} style={{borderColor:Colors.red, paddingVertical:vh(1), borderWidth:1.5, padding:hpx(5), justifyContent:'center', alignItems:'center', width:'35%', alignSelf:'center', borderRadius:8}}>
                <Image source={Icons.phoneIcon} style={{height:30, width:30}}/>
                <Text style={[{textAlign:'center', fontSize:16, color:Colors.red}, Textstyles.medium]}>Call to us</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>Linking.openURL(`mailto:${help?.email}`)} style={{borderColor:Colors.red, paddingVertical:vh(1), borderWidth:1.5, padding:hpx(5), justifyContent:'center', alignItems:'center', width:'35%', alignSelf:'center', borderRadius:8}}>
                <Image source={Icons.emailIcon} style={{height:30, width:30}}/>
                <Text style={[{textAlign:'center', fontSize:16, color:Colors.red}, Textstyles.medium]}>Email to us</Text>
            </TouchableOpacity>
        </View>
        </>
}




        {/* </>
        }
        </>
        )}
        keyExtractor={(i, index) => "id" + index}
      /> */}
    </ScrollView>
}
</View>
  );
};

export default Help;

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
