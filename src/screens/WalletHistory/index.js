import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView, FlatList } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  widthPercentageToDP as vw,
  heightPercentageToDP as vh,
} from "react-native-responsive-screen";
import Icons from "../../utils/icons";
import Images from '../../utils/images'
import { Colors ,  hpx, wp, wpx,} from '../../utils/AppConstant'
import Textstyles from "../../utils/text";


const WalletHistory = () => {
  const navigation = useNavigation()
  const [addVoucher, setaddVoucher] = useState(false);
  const [voucherCode, onVoucherCode] = React.useState("");
  const [payment, setPayment] = useState(false);
  const [method, setMethod] = useState('');
  const [history, setHistory] = useState(
    [
        {
        "categoryId": "1",
        "categoryTitle": "This month" , "Data": [
                {
                "itemId": "1",
                "itemTitle": "Credit via SBI",
                "Date": '11 January',
                "amount":'$10'
                },
                {
                "itemId": "2",
                "itemTitle": "Pizza 2(items)",
                "Date": '11 January',
                "amount":'-$34'
                },
                {
                "itemId": "1",
                "itemTitle": "Credit via HDFC",
                "Date": '11 January',
                "amount":'$10'
                },
                {
                "itemId": "2",
                "itemTitle": "Indian Special Thali 2(items)",
                "Date": '11 January',
                "amount":'-$34'
                }
            ]
        },
        {
        "categoryId": "2",
        "categoryTitle": "February 2019", "Data": [
                {
                "itemId": "1",
                "itemTitle": "Indian Special Thali",
                "Date": '7 February',
                "amount":'-$30'
                },
                {
                "itemId": "2",
                "itemTitle": "Burgur 2(items)",
                "Date": '12 February',
                "amount":'-$40'
                }
            ]
        },
        {
            "categoryId": "3",
            "categoryTitle": "March 2017", "Data": [
                    {
                    "itemId": "1",
                    "itemTitle": "Indian Special Thali",
                    "Date": '17 March',
                    "amount":'-$30'
                    },
                    {
                    "itemId": "2",
                    "itemTitle": "Burgur 2(items)",
                    "Date": '12 March',
                    "amount":'-$40'
                    }
                ]
            }
    ])

    const renderCart = ({item}) => {
        return (
            <>
          <View style={styles.container}>
            <View style={{ width: "100%", marginTop:vh(4), alignSelf: "center" }}>
              <Text
                style={[
                  Textstyles.medium,
                  {
                    color: Colors.black,
                    fontSize: 18,
                  },
                ]}
              >
                {item?.categoryTitle}
              </Text>
            </View>

      <View style={{height:2, marginVertical:vh(1),  width:'100%', alignSelf:'center', backgroundColor:'#E2E6E2'}}></View>
            
        {item?.Data?.map((item, index) => {
            return (
            <View  
              style={styles.content_view}>
              <View style={{ width:'80%', left:vh(0.7)}}>
                <View style={{ marginTop:5}}>
                  <Text style={[Textstyles.medium, styles.title_text, {fontSize:16}]}>{item?.itemTitle}</Text>
                  <Text style={[Textstyles.normal, styles.title_text1]}>{item?.Date}</Text>
                </View>
              </View>
    
                <View style={{width:'20%', justifyContent:'center'}}>
                <View style={{justifyContent:'center', alignItems:'center',}}>
                <Text style={[Textstyles.medium, { fontSize:15, color:Colors.black, fontWeight:'500',  textAlign:'center',}]}>{item?.amount}</Text>
                </View>
                </View>
            </View>
             )
            })}
          </View>
      <View style={{height:2, marginVertical:vh(1), width:'100%', alignSelf:'center', backgroundColor:'#E2E6E2'}}></View>
</>
        );
      };


  return (
    <View style={{ flex: 1 }}>
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
                Wallet History
              </Text>
            </View>

        <TouchableOpacity 
                style={{alignSelf:'center', paddingVertical:vh(1), alignItems:'center', borderRadius:10, marginVertical:vh(1), width:'95%'}}>
            <View style={{height:60, paddingHorizontal:vh(2), width:'100%'}}>
            <Text style={[Textstyles.bold, { color:Colors.black, fontSize:50}]}>$10.00</Text>
            </View>
        </TouchableOpacity>
    
       <FlatList 
        contentContainerStyle={{paddingBottom:30}}
        data={history} renderItem={renderCart} />

    </View>
  );
};

export default WalletHistory;

const styles = StyleSheet.create({
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
        padding: 0,
        paddingTop: 5,
        paddingLeft: 5,
      },
      loginBtn: {
        width: "80%",
        borderRadius: 10,
        marginTop: vh(2),
        height: 48,
        alignItems: "center",
        alignSelf: "center",
        justifyContent: "center",
        backgroundColor: Colors.gray,
      },
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
        // padding: hpx(10),
        marginVertical: hpx(1),
    
      },
      content_view:{
        flexDirection:'row',
        width:'100%',
        alignItems:'center',
        marginVertical:vh(1)
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
        color: Colors.gray,
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
