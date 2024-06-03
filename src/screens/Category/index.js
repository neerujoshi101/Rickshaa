import { ActivityIndicator, FlatList, Image, ImageBackground, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  widthPercentageToDP as vw,
  heightPercentageToDP as vh,
} from "react-native-responsive-screen";
import Icons from "../../utils/icons";
import { Colors, hp, hpx, wp } from "../../utils/AppConstant";
import Images from "../../utils/images";
import Textstyles from "../../utils/text";
import ApiModel from "../../common/ApiModel";
import { useMemo } from "react";


const Category = (props) => {
  const navigation = useNavigation()
  const [isLoding, setIsLoading] = useState(false);
  const [searchTxt, setSearchTxt] = useState("");
  const [cardDataBkp, setCardDataBkp] = useState([]);
  const [newCatUpdate, setNewCatUpdate] = useState([]);
  const [categoryData , setCategoryData] = useState();
  
  
  
  const getCategory = async() => {
    setIsLoading(true);
    ApiModel.sendApiCall(
      `/api/categories/v1/getAllCategories`,
      null,
      'GET',
      response => {
        console.log('------------ttttttt GETcATEGORY', response)
        setIsLoading(false);
        if (response?.message == 'Success.') {
          setCategoryData(response?.data);
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
    getCategory();
    },[])

 
  const onSearch = (txt) => {
    console.log('---------------txt', txt)
    setSearchTxt(txt);
    let search = categoryData;
    if (txt) {
      const newData = search.filter((item) => {
        const itemData = item?.title
          ? item?.title?.toUpperCase()
          : "".toUpperCase();
        const textData = txt.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setCardDataBkp(newData);
    } else {
      setCardDataBkp(categoryData);
    }
  };

  useEffect(() => {
    setCardDataBkp(categoryData);
  }, [categoryData]);

  

// //getAllCategory
//   const getAllCategory = async() => {
//     setIsLoading(true);
//     ApiModel.sendApiCall(
//       `/api/categories/v1/getAllCategories`,
//       null,
//       'GET',
//       response => {
//         console.log('------------ttttttt GETcATEGORY', response)
//         setIsLoading(false);
//         if (response?.message == 'Success.') {
//           setNewCatUpdate(response?.data);
//           // props.saveUserData(response?.data);
//         } else {
//           setIsLoading(false);
//         }
//       },
//       error => {
//         setIsLoading(false);
//         console.log('the error in get profile api===>', error);
//       },
//     );
//   };

//   useMemo(() =>{
//     getAllCategory();
//   },[])




  const emptyRender = () => {
    return(
      <View style={{flex:1, justifyContent:'center', alignItems:'center', marginTop:hp(10)}}>
        <Image source={Images.empty} style={{height:400,width:400, resizeMode:'center'}} />
        <Text style={[{color:Colors.black}, Textstyles.normal]}>No Records Found!!</Text>
      </View>
    )
  }


  return (
    <View style={{ flex: 1 }}>

      {/* <View style={{height:50, justifyContent:'center', backgroundColor:Colors.white}}>
        <Text style={[Textstyles.medium, {alignSelf:'center', color:Colors.black, fontSize:20}]}>Category</Text>
      </View> */}
      
      <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              borderRadius: 20,
              alignSelf: "center",
              marginTop:vh(1),
              backgroundColor: Colors.white,
              width:'95%',
              elevation: 6,
            }}
          >
        <View
          style={{
            width:'12%',
          }}
        >
          <Image source={Icons.search} style={{ height: 22, alignSelf:'flex-end', width: 22 }} />
        </View>


        <TextInput
          value={searchTxt}
          placeholder="Foods, Drinks, etc..."
          placeholderTextColor={Colors.gray}
          // autoFocus
          theme={{
            // roundness: 20,
            // height:50,
            colors: {
              primary: Colors.black,
              text: Colors.black,
              placeholder: Colors.black,
            },
          }}
          onChangeText={(txt) => onSearch(txt)}
          style={{
            width: "80%",
            height: 50,
            fontSize: 16,
            paddingRight: 5,
            // paddingLeft: 5,
            backgroundColor:Colors.white,
            alignSelf: "center",
            color:Colors.black
          }}
        />
      </View>


{isLoding ? <ActivityIndicator size="large" color={Colors?.red} style={{flex:1}}/>:
       <>
    <ScrollView contentContainerStyle={{paddingBottom:10}}>
      <Text style={[Textstyles.medium, { fontSize:22, width:'95%', alignSelf:'center', marginVertical:vh(0.5), marginTop:vh(2), color: Colors.black }]}>
        All Categories
        </Text>

          <View style={{width:'95%', alignSelf:'center'}}>
            <FlatList
              // data={cardDataBkp}
              data={cardDataBkp}
              numColumns={2}
              ListEmptyComponent={emptyRender}
              renderItem={({ item }) => (
                    // <View style={{width:'90%',elevation: 10, marginVertical:vh(1.5), position:'relative', alignSelf:'center'}}>  
                    //   <Image resizeMode="cover" source={item?.image} style={{width:'100%',overflow : "hidden", elevation: 10,  borderRadius:20, alignSelf:'center', height:85}}/>    
                    //     <Text style={[Textstyles.medium, {marginTop:-vh(3.9), height:25, borderRadius:10, paddingTop:3, alignSelf:'center', width:'50%', overflow : "hidden", textAlign:'center', backgroundColor: '#000000a0', position:'relative',  fontSize:14, letterSpacing:1, color:Colors.white}]}>{item?.name}</Text>
                    // </View>

                
                  <TouchableOpacity onPress={() => navigation.navigate('Restaurants', {data:item})}
                        style={{width:'45%',left:-2.5, margin:10, justifyContent:'space-between',  elevation: 10, marginVertical:vh(1)}}>  
                    <View style={{width:150}}>
                      <Image  source={{uri:item?.icon}} style={{width:'100%',overflow : "hidden", borderWidth:1.5, borderColor:'lightgrey', elevation: 10, borderTopRightRadius:10,  borderTopLeftRadius:10,  height:90}}/>    
                    </View>
                    <View style={{backgroundColor:Colors.white, height:35, justifyContent:'center', borderBottomWidth:1.5, borderLeftWidth:1.5, borderRightWidth:1.5, borderColor:'lightgrey', borderBottomLeftRadius:10, borderBottomRightRadius:10, width:150}}>
                      <Text style={[Textstyles.medium, { borderRadius:10, textAlign:'center',  fontSize:14, color:Colors.black}]}>{item?.title}</Text>
                    </View>  
                  </TouchableOpacity>
                  )}
                keyExtractor={(i, index) => "id" + index}
            />
          </View>


{/* <Text style={[Textstyles.medium, { width:'95%', fontSize:17, alignSelf:'center', marginVertical:vh(2), color: Colors.black }]}>
        All Categories
        </Text>

        <FlatList
              data={allCategory}
              numColumns={2}
              renderItem={({ item }) => (
              // <View style={{width:'90%',elevation: 5, marginVertical:vh(2), position:'relative', alignSelf:'center'}}>  
              //   <Image resizeMode="cover" source={item?.image} style={{width:'100%',overflow : "hidden", elevation: 5,  borderRadius:20, alignSelf:'center', height:85}}/>    
              //     <Text style={[Textstyles.medium, {marginTop:-vh(3.9), borderRadius:10, alignSelf:'center', height:25, width:'50%', overflow : "hidden", textAlign:'center', paddingTop:3, backgroundColor: '#000000a0', position:'relative',  fontSize:14, letterSpacing:1, color:Colors.white}]}>{item?.name}</Text>
              // </View>

              <View style={{width:'90%',elevation: 5, marginVertical:vh(2), position:'relative', alignSelf:'center'}}>  
                <Image resizeMode="cover" source={item?.image} style={{width:'100%',overflow : "hidden", elevation: 5,  borderRadius:20, alignSelf:'center', height:85}}/>    
                  <Text style={[Textstyles.medium, {marginTop:-vh(3.9), borderRadius:10, alignSelf:'center', height:25, width:'50%', overflow : "hidden", textAlign:'center', paddingTop:3, backgroundColor: '#000000a0', position:'relative',  fontSize:14, letterSpacing:1, color:Colors.white}]}>{item?.name}</Text>
              </View>


                )}
                keyExtractor={(i, index) => "id" + index}
                // onRefresh={() => getSearch()}
                // refreshing={loding}
              /> */}


    </ScrollView>
    </>
}
    </View>
  );
};

export default Category;

const styles = StyleSheet.create({
});
