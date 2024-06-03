import { Image, StyleSheet, Text, TextInput, TouchableOpacity, Modal, View, ScrollView, ViewBase } from "react-native";
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


const Wallet = () => {
  const navigation = useNavigation()
  const [addVoucher, setaddVoucher] = useState(false);
  const [voucherCode, onVoucherCode] = React.useState("");
  const [payment, setPayment] = useState(false);
  const [method, setMethod] = useState('')

  console.log('------------Method', method)

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
            </View>

        <View style={{width:'95%', alignSelf:'center'}}>
          <Text
            style={[Textstyles.medium, {
              marginVertical: vh(1),
              color: Colors.black,
              fontSize:34
            }]}>
            Wallet
          </Text>
        </View>

       <TouchableOpacity onPress={() => navigation.navigate('WalletHistory')}
                style={{alignSelf:'center', backgroundColor:'#E2E6E2', paddingVertical:vh(4), alignItems:'center', borderRadius:20, marginVertical:vh(1), width:'95%'}}>
            <View style={{ width:'100%', paddingHorizontal:vh(1), justifyContent:'center', }}>
            <Text style={[Textstyles.medium, { color:Colors.black, fontSize:18}]}>Rickshaa Food Balance</Text>
            </View>

            <View style={{height:60, justifyContent:'space-between', paddingHorizontal:vh(2), flexDirection:'row', alignItems:'center', width:'100%'}}>
            <Text style={[Textstyles.bold, { color:Colors.black, fontSize:28}]}>$10.00</Text>
            <Image source={Icons.rightRed} style={{height:16, width:16}}/>
            </View>
       </TouchableOpacity>

      <View style={{height:15, marginVertical:vh(2), width:'100%', alignSelf:'center', backgroundColor:'#E2E6E2'}}></View>

            <View style={{ width: "95%", alignSelf: "center" }}>
              <Text
                style={[
                  Textstyles.medium,
                  {
                    color: Colors.black,
                    fontSize: 18,
                  },
                ]}
              >
                Payment Method
              </Text>
            </View>
    <View style={{alignSelf:'center', width:'95%', marginVertical:vh(2), justifyContent:'center'}}>
        {method != 'Cash' ? 
            <TouchableOpacity
              onPress={() => {
                setMethod('Online (Debit or Credit Cards)')
                setPayment(false)
                }}
              style={{
                height: 50,
                width: "95%",
                paddingLeft: vh(1),
                backgroundColor: "#E2E6E2",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <View style={{ width: "15%" }}>
                <Image
                  source={Icons.online}
                  style={{ height: 28, width: 28 }}
                />
              </View>

              <View style={{ width: "80%" }}>
                <Text
                  style={[
                    Textstyles.medium,
                    { fontSize: 16, color: Colors.black },
                  ]}
                >
                  Online (Debit or Credit Cards)
                </Text>
              </View>
            </TouchableOpacity>
            :
            <TouchableOpacity
                onPress={() =>{ 
                    setMethod('Cash')
                    setPayment(false)    
                }}
              style={{
                height: 50,
                width: "95%",
                alignItems: "center",
                paddingLeft: vh(1),
                backgroundColor: "#E2E6E2",
                flexDirection: "row",
              }}
            >
              <View style={{ width: "15%" }}>
                <Image source={Icons.cash} style={{ height: 35, width: 35 }} />
              </View>

              <View style={{ width: "80%" }}>
                <Text
                  style={[
                    Textstyles.medium,
                    { fontSize: 16, color: Colors.black },
                  ]}
                >
                  Cash on Delivery (COD)
                </Text>
              </View>
            </TouchableOpacity>
        }
    </View>
            <TouchableOpacity
              onPress={() => setPayment(true)}
              style={{
                padding: 5,
                alignSelf: "center",
                width: "55%",
                borderRadius: 30,
                marginTop:vh(1),
                left: vh(1),
                alignSelf: "flex-start",
                backgroundColor: Colors.white,
                borderColor:Colors.red,
                borderWidth:1,
                alignItems: "center",
                paddingLeft: vh(1),
                flexDirection: "row",
              }}
            >
              <View style={{ width: "12%" }}>
                <Image
                  source={Icons.plusRed}
                  style={{
                    height: 12,
                    alignSelf: "flex-end",
                    right: 5,
                    width: 12,
                  }}
                />
              </View>

              <View style={{ width: "79%" }}>
                <Text
                  style={[
                    Textstyles.medium,
                    { fontSize: 14, paddingTop: 1, color: Colors.red },
                  ]}
                >
                  Add Payment Method
                </Text>
              </View>
            </TouchableOpacity>

        <View style={{height:2, marginVertical:vh(2), marginTop:vh(4), backgroundColor:'#E2E6E2'}}></View>

            <View style={{ width: "95%", alignSelf: "center" }}>
              <Text
                style={[
                  Textstyles.medium,
                  {
                    marginVertical: vh(2),
                    color: Colors.black,
                    fontSize: 18,
                  },
                ]}
              >
                Vouchers
              </Text>
            </View>


            <TouchableOpacity
              onPress={() => setaddVoucher(true)}
              style={{
                padding: 5,
                alignSelf: "center",
                width: "50%",
                borderRadius: 30,
                left: vh(1),
                alignSelf: "flex-start",
                backgroundColor: Colors.white,
                borderColor:Colors.red,
                borderWidth:1,
                alignItems: "center",
                paddingLeft: vh(1),
                flexDirection: "row",
              }}
            >
              <View style={{ width: "14%" }}>
                <Image
                  source={Icons.plusRed}
                  style={{
                    height: 12,
                    alignSelf: "flex-end",
                    right: 5,
                    width: 12,
                  }}
                />
              </View>

              <View style={{ width: "79%" }}>
                <Text
                  style={[
                    Textstyles.medium,
                    { fontSize: 14, paddingTop: 1, color: Colors.red },
                  ]}
                >
                  Add voucher code
                </Text>
              </View>
            </TouchableOpacity>


    {addVoucher && (
        <Modal
          transparent={true}
          animationType={"slide"}
          style={{ width: "95%", position: "absolute", height: "100%" }}
        >
          <View style={styles.container4}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "#E2E6E2",
                height: 50,
                width: "100%",
              }}
            >
              <View style={{ flexDirection: "row", width: "70%" }}>
                <TouchableOpacity
                  onPress={() => setaddVoucher(false)}
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
            </View>

            <Text
              style={[
                Textstyles.medium,
                {
                  width: "95%",
                  marginTop: vh(3),
                  alignSelf: "center",
                  fontSize: 27,
                  color: Colors.black,
                },
              ]}
            >
              Add voucher code
            </Text>

            <View style={{ width: "95%", alignSelf: "center", height: 50 }}>
              <TextInput
                placeholder="Enter voucher code"
                placeholderTextColor={"grey"}
                style={[Textstyles.normal, styles.input1, { fontSize: 16 }]}
                value={voucherCode}
                onChangeText={onVoucherCode}
              />
            </View>

            <View
              style={{ marginTop: vh(5), width: "90%", alignSelf: "center" }}
            >
              <Text style={[Textstyles.normal, { fontSize: 12 }]}>
                Enter the code in order to claim and use your voucher
              </Text>
            </View>

            <TouchableOpacity
              onPress={() => setaddVoucher(false)}
              style={[styles.loginBtn, { marginTop: vh(10) }]}
            >
              <Text
                style={[
                  Textstyles.normal,
                  { color: Colors.white, fontSize: 18 },
                ]}
              >
                Continue
              </Text>
            </TouchableOpacity>
          </View>
        </Modal>
      )}

{payment && (
        <Modal
          transparent={true}
          animationType={"slide"}
          style={{ width: "95%", position: "absolute", height: "100%" }}
        >
          <View style={styles.container4}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "#E2E6E2",
                height: 50,
                width: "100%",
              }}
            >
              <View style={{ flexDirection: "row", width: "70%" }}>
                <TouchableOpacity
                  onPress={() => setPayment(false)}
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
                {/* <Text style={[Textstyles.medium, { width:'80%', left:vh(2), alignSelf:'center', fontSize:18, color: Colors.black }]}>
                Select Payment Option
              </Text> */}
              </View>
            </View>

            <Text
              style={[
                Textstyles.medium,
                {
                  width: "95%",
                  alignSelf: "center",
                  fontSize: 27,
                  color: Colors.black,
                },
              ]}
            >
              Payment options
            </Text>

            <View style={{ width: "95%", alignSelf: "center" }}>
              <Text
                style={[
                  Textstyles.medium,
                  {
                    marginVertical: vh(3),
                    color: Colors.black,
                    fontSize: 18,
                  },
                ]}
              >
                Payment Method
              </Text>
            </View>

            <TouchableOpacity
              onPress={() => {
                setMethod('Online (Debit or Credit Cards)')
                setPayment(false)
                }}
              style={{
                height: 50,
                width: "95%",
                paddingLeft: vh(1),
                backgroundColor: "#E2E6E2",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <View style={{ width: "15%" }}>
                <Image
                  source={Icons.online}
                  style={{ height: 28, width: 28 }}
                />
              </View>

              <View style={{ width: "80%" }}>
                <Text
                  style={[
                    Textstyles.medium,
                    { fontSize: 16, color: Colors.black },
                  ]}
                >
                  Online (Debit or Credit Cards)
                </Text>
              </View>


              {/* <View>
                <Image source={}
              </View> */}
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() =>{ 
                    setMethod('Cash')
                    setPayment(false)    
                }}
              style={{
                height: 50,
                width: "95%",
                marginTop: vh(3),
                alignItems: "center",
                paddingLeft: vh(1),
                backgroundColor: "#E2E6E2",
                flexDirection: "row",
              }}
            >
              <View style={{ width: "15%" }}>
                <Image source={Icons.cash} style={{ height: 35, width: 35 }} />
              </View>

              <View style={{ width: "80%" }}>
                <Text
                  style={[
                    Textstyles.medium,
                    { fontSize: 16, color: Colors.black },
                  ]}
                >
                  Cash on Delivery (COD)
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </Modal>
      )}

            
    </View>
  );
};

export default Wallet;

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
});
