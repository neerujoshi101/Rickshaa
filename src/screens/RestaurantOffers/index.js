import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, Linking, View, FlatList } from "react-native";
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

const RestaurantsOffers = (props) => {
  const navigation = useNavigation()
  const [fav, setFav] = useState(false)
  const [favData, setFavData] =  useState([
    {
    'id': '1',
    'reward': 'Buy 1 get 1 free',
    'ResturatName': 'Howkins Donuts',
    'deliveryFee': '$1.99',
    'deliveryTime': '10-25 min',
    'image':Images.indian,
    'Rating': '4.9',
    'Category':'Indian',
    'address': '575 8th Ave, New York, NY 10018, United States',
    },
    {
    'id': '2',
    'reward': 'Spend NZ$15, save NZ$3',
    'ResturatName': 'Noodles Kings',
    'deliveryFee': '$2.99',
    'deliveryTime': '15-25 min',
    'image':Images.chinese,
    'Rating': '4.7',
    'Category':'Indian',
    'address': '21-69 Steinway St, Queens, NY 11105, United States',
    },
    {
    'id': '3',
    'reward': 'NZ$0 Delivery Fee (spend NZ$30)',
    'ResturatName': '83 Pizza Junction',
    'deliveryFee': '$3.99',
    'deliveryTime': '20-35 min',
    'image':Images.pizza,
    'Rating': '4.4',
    'Category':'Indian',
    'address': '575 8th Ave, New York, NY 10018, United States',
    },
    {
    'id': '4',
    'reward': 'Buy 1 get 1 free',
    'ResturatName': 'Subway(Ponsonby)',
    'deliveryFee': '$1.99',
    'deliveryTime': '10-25 min',
    'image':Images.thai,
    'Rating': '4.6',
    'Category':'Indian',
    'address': '308 E 78th St, New York, NY 10075, United States',
    },
    {
    'id': '5',
    'reward': 'Free item (spend NZ$20)',
    'ResturatName': 'Mad Mex(Newmarket)',
    'deliveryFee': '$2.99',
    'deliveryTime': '15-30 min',
    'image':Images.soyaChaap,
    'Rating': '4.2',
    'Category':'Indian',
    'address': '44, New York City, USA',
    },
  ])

 

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
               Deals
              </Text>
        </View>
     

   <FlatList 
    contentContainerStyle={{paddingBottom:10}}
    showsVerticalScrollIndicator={false}
    data={favData}
    renderItem={({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('RestaurantItems', {data: item})}
        style={{paddingVertical:vh(1.5)}}>
        <View style={{height:170,  alignSelf:'center', flexDirection:'row', width:'95%'}}>
       <View style={{flexDirection:'row',alignItems:'center', justifyContent:'space-between', width:'100%', zIndex:99, position:'absolute', marginTop:5,}}>
        <View style={{backgroundColor:Colors.yellow, height:28, paddingLeft:vh(1), paddingRight:vh(1.5), justifyContent:'center', borderTopRightRadius:20, borderBottomRightRadius:20, padding:1, paddingTop:4}}>
          <Text style={[Textstyles.normal, {color:Colors.white,textAlign:'center', fontSize:14}]}>{item?.reward}</Text>
        </View>

      {fav ? 
         <TouchableOpacity onPress={() => setFav(false)}
         style={{backgroundColor:'#E2E6E2', right:5, height:36, width:36, borderRadius:18, justifyContent:'center', padding:1,}}>
       <Image source={Icons.heartFill} style={{height:22, padding:3, alignSelf:'center', width:22}}/>
     </TouchableOpacity>
     :
     <TouchableOpacity onPress={() => setFav(true)}
         style={{backgroundColor:'#E2E6E2', right:5, height:36, width:36, borderRadius:18, justifyContent:'center', padding:1,}}>
       <Image source={Icons.heartBlank} style={{height:22, padding:3, alignSelf:'center', width:22}}/>
     </TouchableOpacity>
        }
       </View>
        <Image resizeMode="center" source={item?.image} style={{height:'100%', overflow:'hidden', borderRadius:10, alignSelf:'center', width:'100%'}}></Image>
        </View>

        <View style={{width:'92%', marginTop:2, alignSelf:'center'}}>
          <View style={{flexDirection:'row', justifyContent:'space-between'}}>
           <Text style={[Textstyles.medium, {fontSize:15, fontWeight:'500', color:Colors.black}]}>{item?.ResturatName}</Text>
           <View
           style={{
             flexDirection: "row",
             alignItems: "center",
             right:vh(2)
           }}
         >
           <Image
             source={Icons.starhalf}
             style={{ height: 14, width: 14 }}
           />
           <Text style={[Textstyles.normal, { fontSize: 12, marginTop:2, color: 'darkgreen', left: 3 }]}>
             {item?.Rating}
           </Text>
         </View>
           </View>
           <Text style={[Textstyles.normal, {fontSize:13,fontWeight:'500', color:Colors.gray}]}>{item?.deliveryFee} Delivery Fee {item?.deliveryTime}</Text>
        </View>
    </TouchableOpacity>
     )}
     keyExtractor={(i, index) => "id" + index}
   /> 
</View>
  );
};

export default RestaurantsOffers;

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
