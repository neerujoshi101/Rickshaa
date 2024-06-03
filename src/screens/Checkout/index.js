import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Modal,
  TextInput,
  Share,
  TouchableWithoutFeedback,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import Textstyles from "../../utils/text";
import {
  widthPercentageToDP as vw,
  heightPercentageToDP as vh,
} from "react-native-responsive-screen";
import { Colors, hpx, wp, wpx } from "../../utils/AppConstant";
import Icons from "../../utils/icons";
import { useNavigation } from "@react-navigation/native";
import Images from "../../utils/images";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import ApiModel from "../../common/ApiModel";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import Geolocation from "@react-native-community/geolocation";
import { useMemo } from "react";

const Checkout = () => {
  const [Deliver, setDeliver] = useState("Delivery");
  const navigation = useNavigation();
  const [isLoding, setIsLoading] = useState(false); // 
  const [addLoading, setIsAddLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [instraction, setInstraction] = useState(false);
  const [address, setAddress] = useState(false);
  const [addAddress, setAddAddress] = useState(false);
  const [getQuantity, setQuantity] = useState(1);
  const [priority, setPriority] = useState(false);
  const [standard, setStandard] = useState(true);
  const [schedule, setSchedule] = useState(false);
  const [promoCode, setPromoCode] = useState(false);
  const [payment, setPayment] = useState(false);
  const [promo, setPromo] = useState(false);
  const [addVoucher, setaddVoucher] = useState(false);
  const [searchTxt, setSearchTxt] = useState("");
  const [categoryId, setCategoryId] = useState("1");
  const [slotId, setSlotId] = useState("7");
  const [servedId, setServedId] = useState('1')
  const [instractionId, setInstractionId] = useState("1");
  const [instrationData, setInstrationData] = useState();
  const [mode, setMode] = useState();
  const [note, setNote] = useState();
  const [secheduleTime, setSecheduleTime] = useState(false);
  const [slotData, setSlotData] = useState();
  const [catData, setCatData] = useState();
  const [text, onChangeText] = React.useState("");
  const [adress, onAddress] = React.useState("");
  const [landmark, onLandmark] = React.useState("");
  const [building, onBulding] = React.useState("");
  const [promoApply, onPromoApply] = React.useState("");
  const [voucherCode, onVoucherCode] = React.useState("");
  const [area, onArea] = React.useState("");
  const [instrtion, onInstrtion] = React.useState(""); //onlabel
  const [label, onlabel] = React.useState("");
  const [finalSchedule, setFinalSchedule] = useState(false);
  const [mthod, setMthod] = useState('')
  const [penClick, setPenClick] = useState(false)
  const [imageModal, setImageModal] = useState(false)
  const [allAdressData, setAllAdressData] = useState();
  const [getLat, setLat] = useState()
  const [getLong, setLong] = useState()
  const[radioButton , setRadioButton] = useState('Home');
  const [fav, setFav] = useState(false)
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
  const [categoryData, setCategoryData] = useState([
    {
      id: "1",
      schedule: "Sunday",
      status: "Closed",
    },
    {
      id: "2",
      schedule: "Monday",
      status: "9 Jan",
    },
    {
      id: "3",
      schedule: "Tuesday",
      status: "10 Jan",
    },
    {
      id: "4",
      schedule: "Wednesday",
      status: "11 Jan",
    },
    {
      id: "5",
      schedule: "Thursday",
      status: "12 Jan",
    },
    {
      id: "6",
      schedule: "Friday",
      status: "13 Jan",
    },
    {
      id: "7",
      schedule: "Saturday",
      status: "Closed",
    },
  ]);
  const [deliverySlot, setDeliverySlot] = useState([
    {
      id: "7",
      slot: "8:15 AM - 8:45 AM",
    },
    {
      id: "8",
      slot: "8:30 AM - 9:00 AM",
    },
    {
      id: "9",
      slot: "9:00 AM - 9:30 AM",
    },
    {
      id: "10",
      slot: "9:30 AM - 10:00 AM",
    },
    {
      id: "11",
      slot: "10:00 AM - 10:30 AM",
    },
    {
      id: "12",
      slot: "10:30 AM - 11:00 AM",
    },
    {
      id: "13",
      slot: "11:00 AM - 11:30 AM",
    },
    {
      id: "14",
      slot: "11:30 AM - 12:00 PM",
    },
    {
      id: "15",
      slot: "12:00 PM - 12:30 PM",
    },
    {
      id: "16",
      slot: "12:30 PM - 01:00 PM",
    },
    {
      id: "17",
      slot: "01:00 AM - 01:30AM",
    },
    {
      id: "18",
      slot: "01:30 PM - 02:00 PM",
    },
    {
      id: "19",
      slot: "02:00 PM - 02:30 PM",
    },
    {
      id: "20",
      slot: "02:30 PM - 03:00 PM",
    },
    {
      id: "21",
      slot: "03:00 PM - 03:30 PM",
    },
    {
      id: "22",
      slot: "03:30 PM - 04:00 PM",
    },
  ]);
  const [customise, setCustomise] = useState([
    {
      id: "1",
      item: "Servers(2 Pcs, For 1)",
      price:"$10"
    },
    {
      id: "2",
      item: "Servers(4 Pcs, For 2)",
      price:"$10"
    },
    {
      id: "3",
      item: "Servers(8 Pcs, For 4)",
      price:"$10"
    },
  ]);
  const [categoryData1, setCategoryData1] = useState([
    {
        'id' : '1',
        'tip': 'Not now'
    },
    {
        'id' : '2',
        'tip': '$5'
    },
    {
        'id' : '3',
        'tip': '$10'
    },
    {
        'id' : '4',
        'tip': '$15'
    },
    // {
    //     'id' : '5',
    //     'tip': '$20'
    // },
    // {
    //     'id' : '6',
    //     'tip': '$25'
    // },
    // {
    //     'id' : '7',
    //     'tip': '$30'
    // },
  ])

  useMemo(()=>{
    Geolocation.getCurrentPosition(async info => {
      if (info) {
        setLat(info.coords.latitude)
        setLong(info.coords.longitude)
      }})
  })

  const onCatSelect1 = (item) => {
    console.log('------------onCAT', item)
    setCategoryId(item?.id)
  }

  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          "Rickshaa Food | Promise Delivered \n Get $10 for every friend that tries Ricksha Food",
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

  const onOrderType = (txt) => {
    setDeliver(txt);
  };

  const updateCart = (type, item) => {
    if (type == "Increase") {
      setQuantity(getQuantity + 1);
    } else {
      if (getQuantity >= 2) {
        setQuantity(getQuantity - 1);
      }
    }
  };

  const onPriority = (txt) => {
    console.log("--------onPriority", txt);
    if (txt === "Priority") {
      setPriority(true);
      setStandard(false);
      setSchedule(false);
    } else if (txt === "Standard") {
      setPriority(false);
      setStandard(true);
      setSchedule(false);
    } else if (txt === "Schedule") {
      setPriority(false);
      setStandard(false);
      setSchedule(true);
      setSecheduleTime(true);
    }
  };

  const onSelectSlot = (item) => {
    console.log("------------onSLOT", item);
    setSlotId(item?.id);
    setSlotData(item);
  };

  const onSelectServred = (item) => {
    console.log("------------onServred", item);
    setServedId(item?.id);
    // setSlotData(item);
  };

  const onCatSelect = (item) => {
    console.log("------------onCAT", item);
    setCategoryId(item?.id);
    setCatData(item);
  };

  const onSheduleSubmit = () => {
    setSecheduleTime(false);
    setFinalSchedule(true);
  };

  const onInstractionSave = (item) => {
    setInstractionId(item?.id);
    setInstrationData(item);
  };

  const onInstractions = () => {
    setInstraction(false);
    setMode(instrationData);
    if (text != "") {
      setNote(text);
    } else {
      setNote("Add delivery note");
    }
  };

  const onFullAdd = () => {
    setAddress(true);
    setAddAddress(false);
  };

  const onEditPen = () =>{
    setPenClick(true)
  }
  const onValue = (txt) =>{
    setRadioButton(txt)
  }
  console.log('------------ Address----', allAdressData)

//Get All Adrresss
const getAllAddress = async() => {
  let Id = await AsyncStorage.getItem('UserId');
  let userId = await JSON.parse(Id)
  setIsAddLoading(true);
  let form = JSON.stringify({
    "userId": userId,
  });
  ApiModel.sendApiCall(
    `/api/Address/v1/getAllAddressesByUserId`,
    form,
    null,
    response => {
      setIsAddLoading(false);
      if (response?.message == 'Success.') {
        setAllAdressData(response?.data);
      } else {
        setIsAddLoading(false);
      }
    },
    error => {
      setIsAddLoading(false);
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
            setAddAddress(true)
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






  return (
    <View style={{ flex: 1, backgroundColor: Colors.white }}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{
          height: 50,
          justifyContent: "center",
          backgroundColor: Colors.white,
        }}
      >
        <Image
          source={Icons.arrowRed}
          style={{ height: 30, left: vh(1), width: 30 }}
        />
      </TouchableOpacity>

      <Text
        style={[
          Textstyles.medium,
          {
            width: "95%",
            alignSelf: "center",
            fontSize: 25,
            marginVertical: vh(1),
            color: Colors.black,
          },
        ]}
      >
        Checkout
      </Text>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}>
        <>
          <View
            style={{
              backgroundColor: Colors.white,
              alignItems: "center",
              justifyContent: "space-around",
              flexDirection: "row",
              marginVertical: vh(2),
              width: "85%",
              alignSelf: "center",
              height: 45,
              borderRadius: 30,
              borderColor:Colors.red,
              borderWidth:1,
            }}
          >
            {Deliver === "Delivery" ? (
              <TouchableOpacity
                onPress={() => onOrderType("Pick-up")}
                style={{
                  backgroundColor: Colors.white,
                  elevation: 6,
                  justifyContent: "center",
                  borderRadius: 30,
                  borderWidth:1,
                  borderColor:Colors.red,
                  height: 38,
                  width: "48%",
                }}
              >
                <Text
                  style={[
                    Textstyles.medium,
                    {
                      textAlign: "center",
                      color: Colors.red,
                      marginBottom: -5,
                      fontSize: 15,
                    },
                  ]}
                >
                  Delivery
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => onOrderType("Delivery")}
                style={{
                  alignSelf: "center",
                  justifyContent: "center",
                  borderRadius: 30,
                  height: 38,
                  width: "48%",
                }}
              >
                <Text
                  style={[
                    Textstyles.medium,
                    {
                      textAlign: "center",
                      color: Colors.black,
                      marginBottom: -5,
                      fontSize: 15,
                    },
                  ]}
                >
                  Delivery
                </Text>
              </TouchableOpacity>
            )}

            {Deliver === "Pick-up" ? (
              <TouchableOpacity
                onPress={() => onOrderType("Delivery")}
                style={{
                  height: 38,
                  backgroundColor: Colors.white,
                  justifyContent: "center",
                  elevation: 6,
                  borderWidth:1,
                  borderColor:Colors.red,
                  borderRadius: 30,
                  width: "48%",
                }}
              >
                <Text
                  style={[
                    Textstyles.medium,
                    {
                      textAlign: "center",
                      color: Colors.red,
                      alignItems: "flex-end",
                      marginBottom: -5,
                      fontSize: 15,
                    },
                  ]}
                >
                  Pick-up
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => onOrderType("Pick-up")}
                style={{
                  height: 38,
                  borderRadius: 30,
                  justifyContent: "center",
                  alignSelf: "center",
                  width: "48%",
                }}
              >
                <Text
                  style={[
                    Textstyles.medium,
                    {
                      textAlign: "center",
                      color: Colors.black,
                      fontSize: 15,
                      marginBottom: -5,
                    },
                  ]}
                >
                  Pick-up
                </Text>
              </TouchableOpacity>
            )}
          </View>

          <View style={{}}>
            <View
              style={{
                height: 1,
                marginVertical: vh(3),
                width: "100%",
                backgroundColor: "lightgrey",
              }}
            ></View>
            <TouchableOpacity
              // onPress={() => setAddress(true)}
              onPress={() => setAddAddress(true)}
              style={{
                flexDirection: "row",
                alignItems: "center",
                width: "95%",
                alignSelf: "center",
                paddingHorizontal: vh(1),
                justifyContent: "space-between",
              }}
            >
              <View style={{ width: "17.5%" }}>
                <Image
                  source={Icons.location}
                  style={{ height: 22, width: 22 }}
                />
              </View>
              <View style={{ width: "65%" }}>
                <Text
                  style={[
                    Textstyles.medium,
                    { fontSize: 15, color: Colors.black },
                  ]}
                >
                  NY 10018, United States
                </Text>
                <Text
                  style={[
                    Textstyles.normal,
                    { fontSize: 13, color: Colors.gray },
                  ]}
                >
                  575 8th Ave, New York
                </Text>
              </View>
              <View style={{ width: "17.5%" }}>
                <Image
                  source={Icons.rightRed}
                  style={{ height: 18, alignSelf: "flex-end", width: 18 }}
                />
              </View>
            </TouchableOpacity>

            <View
              style={{
                height: 1,
                marginVertical: vh(3),
                width: "85%",
                alignSelf: "flex-end",
                backgroundColor: "lightgrey",
              }}
            ></View>

            <TouchableOpacity
              onPress={() => setInstraction(true)}
              style={{
                flexDirection: "row",
                alignItems: "center",
                width: "95%",
                alignSelf: "center",
                paddingHorizontal: vh(1),
                justifyContent: "space-between",
              }}
            >
              {mode != undefined && mode != "" ? (
                <View style={{ width: "17.5%" }}>
                  <Image
                    source={mode?.image}
                    style={{ height: 22, width: 22 }}
                  />
                </View>
              ) : (
                <View style={{ width: "17.5%" }}>
                  <Image
                    source={Icons.clockRed}
                    style={{ height: 22, width: 22 }}
                  />
                </View>
              )}

              {mode != undefined && mode != "" ? (
                <View style={{ width: "65%" }}>
                  <Text
                    style={[
                      Textstyles.medium,
                      { fontSize: 15, color: Colors.black },
                    ]}
                  >
                    {mode?.name}
                  </Text>
                  <Text
                    style={[
                      Textstyles.normal,
                      { fontSize: 13, color: "darkgreen" },
                    ]}
                  >
                    {note}
                  </Text>
                </View>
              ) : (
                <View style={{ width: "65%" }}>
                  <Text
                    style={[
                      Textstyles.medium,
                      { fontSize: 15, color: Colors.black },
                    ]}
                  >
                    Meet at door
                  </Text>
                  <Text
                    style={[
                      Textstyles.normal,
                      { fontSize: 13, color: "darkgreen" },
                    ]}
                  >
                    Add delivery note
                  </Text>
                </View>
              )}
              <View style={{ width: "17.5%" }}>
                <Image
                  source={Icons.rightRed}
                  style={{ height: 18, alignSelf: "flex-end", width: 18 }}
                />
              </View>
            </TouchableOpacity>

            <View
              style={{
                height: 1,
                marginVertical: vh(3),
                width: "100%",
                backgroundColor: "lightgrey",
              }}
            ></View>
          </View>

          <View
            style={{
              width: "95%",
              justifyContent: "space-between",
              flexDirection: "row",
              alignSelf: "center",
            }}
          >
            <Text
              style={[
                Textstyles.bold,
                {
                  marginVertical: vh(1),
                  color: Colors.black,
                  fontSize: 17,
                },
              ]}
            >
              Delivery time
            </Text>

            <Text
              style={[
                Textstyles.medium,
                {
                  marginVertical: vh(1),
                  color: Colors.black,
                  fontSize: 14,
                },
              ]}
            >
              15-30 min(s)
            </Text>
          </View>

          <View style={{ marginVertical: vh(2) }}>
            <TouchableOpacity
              onPress={() => onPriority("Priority")}
              style={{
                height: 50,
                width: "95%",
                paddingHorizontal: vh(2.5),
                alignItems: "center",
                justifyContent: "space-between",
                flexDirection: "row",
                borderRadius: 30,
                borderColor: priority ? Colors.red : Colors.gray,
                borderWidth: 1,
                alignSelf: "center",
              }}
            >
              <View>
                <Text
                  style={[
                    Textstyles.medium,
                    { fontSize: 15, color: priority ? Colors.red : Colors.black },
                  ]}
                >
                  Priority
                </Text>
                <Text
                  style={[
                    Textstyles.normal,
                    { fontSize: 12, marginTop: -5, color:priority ? Colors.red : Colors.gray },
                  ]}
                >
                  Delivered directly to you
                </Text>
              </View>
              <View>
                <Text
                  style={[
                    Textstyles.normal,
                    { fontSize: 12, color:priority ? Colors.red : Colors.gray },
                  ]}
                >
                  +$2.99
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => onPriority("Standard")}
              style={{
                height: 50,
                width: "95%",
                marginTop: vh(1),
                paddingHorizontal: vh(2.5),
                borderRadius: 30,
                justifyContent: "center",
                borderColor: standard ? Colors.red : Colors.gray,
                borderWidth: 1,
                alignSelf: "center",
              }}
            >
              <View>
                <Text
                  style={[
                    Textstyles.medium,
                    { fontSize: 15, color: standard ? Colors.red : Colors.black },
                  ]}
                >
                  Standard
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => onPriority("Schedule")}
              style={{
                height: 50,
                width: "95%",
                marginTop: vh(1),
                paddingHorizontal: vh(2.5),
                borderRadius: 30,
                justifyContent: "center",
                borderColor: schedule ? Colors.red : Colors.gray,
                borderWidth: 1,
                alignSelf: "center",
              }}
            >
            {finalSchedule &&
              catData != undefined &&
              slotData != undefined ? (
                <View style={{}}>
                  <Text
                    style={[
                      Textstyles.medium,
                      { fontSize: 15, color:schedule ? Colors.red : Colors.black },
                    ]}
                  >
                    {catData?.schedule} {catData?.status}, {slotData?.slot}
                  </Text>
                </View>
              ) : (
                <View style={{}}>
                  <Text
                    style={[
                      Textstyles.medium,
                      { fontSize: 15, color: Colors.black },
                    ]}
                  >
                    Schedule
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          </View>

          <View style={{ width: "95%", alignSelf: "center" }}>
            <Text
              style={[
                Textstyles.bold,
                {
                  marginVertical: vh(2),
                  color: Colors.black,
                  fontSize: 17,
                },
              ]}
            >
              Order Summary
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              paddingHorizontal: vh(1),
              width: "95%",
              alignItems: "center",
              alignSelf: "center",
            }}
          >
            <View style={{ width: "75%" }}>
              <Text
                style={[
                  Textstyles.medium,
                  { color: Colors.black, fontSize: 16 },
                ]}
              >
                Tandoori Chicken
              </Text>
              <Text style={[Textstyles.normal, { color: Colors.gray }]}>
                4 Pieces Chicken <Text style={{ fontSize: 6 }}>{"\u2B24"}</Text>{" "}
                Cheese
              </Text>
              <View style={{flexDirection:'row'}}>
              <View style={{ flexDirection: "row", height: 20 }}>
                <Text
                  style={[
                    Textstyles.medium,
                    styles.offerPriceText,
                    { fontSize: 15 },
                  ]}
                >
                  $20
                </Text>
                <Text style={[Textstyles.medium, styles.actualPriceText]}>
                  $25
                </Text>
              </View>
              <TouchableOpacity onPress={() => setPenClick(true)}
                style={{left:vh(2), paddingLeft:2, height:20, paddingRight:2, width:50, borderRadius:10, flexDirection:'row', alignItems:'center', borderWidth:1, borderColor:Colors.red, justifyContent:'center'}}>
                <Text style={[Textstyles.normal,{fontSize:12, color:Colors.red}]}>Edit</Text>
                <Image source={Icons.editPen} style={{height:14, left:3, width:14}}/>
              </TouchableOpacity>
              </View>
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={() => updateCart("Decrease")}
                style={{ padding: hpx(1) }}
              >
                <Image
                  source={getQuantity == 1 ? Icons.Remove : Icons.minusRed}
                  // source={Icons.minusRed}
                  style={styles.deleteButton}
                />
              </TouchableOpacity>
              <Text style={[Textstyles.medium, styles.quantityText]}>
                {getQuantity}
              </Text>
              <TouchableOpacity
                onPress={() => updateCart("Increase")}
                style={{ padding: hpx(3) }}
              >
                <Image source={Icons.plusRed} style={styles.addButton} />
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={{
              height: 1,
              marginVertical: vh(2),
              width: "95%",
              alignSelf: "flex-end",
              backgroundColor: "lightgrey",
            }}
          ></View>

          <View
            style={{
              flexDirection: "row",
              paddingHorizontal: vh(1),
              width: "95%",
              alignItems: "center",
              alignSelf: "center",
            }}
          >
            <View style={{ width: "75%" }}>
              <Text
                style={[
                  Textstyles.medium,
                  { color: Colors.black, fontSize: 16 },
                ]}
              >
                Butter Naan
              </Text>
              <Text style={[Textstyles.normal, { color: Colors.gray }]}>
                2 Garlic Naan <Text style={{ fontSize: 6 }}>{"\u2B24"}</Text>{" "}
                Extra Cheese
              </Text>
            <View style={{flexDirection:'row'}}>
              <View style={{ flexDirection: "row", height: 20 }}>
                <Text
                  style={[
                    Textstyles.medium,
                    styles.offerPriceText,
                    { fontSize: 15 },
                  ]}
                >
                  $20
                </Text>
                <Text style={[Textstyles.medium, styles.actualPriceText]}>
                  $25
                </Text>
              </View>
              <TouchableOpacity onPress={() => setPenClick(true)}
                style={{left:vh(2), paddingLeft:2, height:20, paddingRight:2, width:50, borderRadius:10, flexDirection:'row', alignItems:'center', borderWidth:1, borderColor:Colors.red, justifyContent:'center'}}>
                <Text style={[Textstyles.normal,{fontSize:12, color:Colors.red}]}>Edit</Text>
                <Image source={Icons.editPen} style={{height:14, left:3, width:14}}/>
              </TouchableOpacity>
            </View>
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={() => updateCart("Decrease")}
                style={{ padding: hpx(1) }}>
                <Image
                  source={getQuantity == 1 ? Icons.Remove : Icons.minusRed}
                  // source={Icons.minusRed}
                  style={styles.deleteButton}
                />
              </TouchableOpacity>
              <Text style={[Textstyles.medium, styles.quantityText]}>
                {getQuantity}
              </Text>
              <TouchableOpacity
                onPress={() => updateCart("Increase")}
                style={{ padding: hpx(3) }}
              >
                <Image source={Icons.plusRed} style={styles.addButton} />
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              height: 1,
              marginVertical: vh(2),
              width: "95%",
              alignSelf: "flex-end",
              backgroundColor: "lightgrey",
            }}
          ></View>

          <TouchableOpacity
            // onPress={() => navigation.navigate('RestaurantItems')}
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginVertical: vh(2),
              left: vh(2),
              paddingLeft: 2,
              paddingRight: 2,
              borderRadius: 20,
              // backgroundColor: "#E2E6E2",
              backgroundColor:Colors.white,
              borderColor:Colors.red,
              borderWidth:1,
              height: 28,
              right: 20,
              width: "25%",
              alignItems: "center",
            }}
          >
            <Image
              source={Icons.plusRed}
              style={{ height: 11, right: 4, width: 10 }}
            />
            <Text
              style={[
                Textstyles.medium,
                { color: Colors.red, marginTop: 2, fontSize: 13 },
              ]}
            >
              Add items
            </Text>
          </TouchableOpacity>

          <View
            style={{
              height: 1,
              marginVertical: vh(2),
              width: "85%",
              alignSelf: "flex-end",
              backgroundColor: "lightgrey",
            }}
          ></View>
          <TouchableOpacity
            onPress={() => setPromo(true)}
            style={{
              flexDirection: "row",
              alignItems: "center",
              width: "95%",
              alignSelf: "center",
              paddingHorizontal: vh(1),
              justifyContent: "space-between",
            }}
          >
            <View style={{ width: "17.5%" }}>
              <Image
                source={Icons.promoRed}
                style={{ height: 30, width: 30 }}
              />
            </View>
            <View style={{ width: "65%" }}>
              <Text
                style={[
                  Textstyles.medium,
                  { fontSize: 15, color: Colors.black },
                ]}
              >
                Add a promo
              </Text>
            </View>
            <View style={{ width: "17.5%" }}>
              <Image
                source={Icons.rightRed}
                style={{ height: 18, alignSelf: "flex-end", width: 18 }}
              />
            </View>
          </TouchableOpacity>
          <View
            style={{
              height: 1,
              marginVertical: vh(2),
              width: "85%",
              alignSelf: "flex-end",
              backgroundColor: "lightgrey",
            }}
          ></View>

          <View
            style={{
              width: "95%",
              marginTop: vh(2),
              justifyContent: "space-between",
              paddingHorizontal: vh(1),
              flexDirection: "row",
              alignSelf: "center",
            }}
          >
            <Text
              style={[Textstyles.normal, { fontSize: 15, color: Colors.gray }]}
            >
              Subtotal
            </Text>
            <Text
              style={[Textstyles.normal, { fontSize: 15, color: Colors.gray }]}
            >
              $50
            </Text>
          </View>

          <View
            style={{
              width: "95%",
              marginTop: vh(1),
              justifyContent: "space-between",
              paddingHorizontal: vh(1),
              flexDirection: "row",
              alignSelf: "center",
            }}
          >
            <Text
              style={[Textstyles.normal, { fontSize: 15, color: Colors.gray }]}
            >
              Delivery fee
            </Text>
            <Text
              style={[Textstyles.normal, { fontSize: 15, color: Colors.gray }]}
            >
              $2.99
            </Text>
          </View>

          <View
            style={{
              width: "95%",
              marginTop: vh(1),
              justifyContent: "space-between",
              paddingHorizontal: vh(1),
              flexDirection: "row",
              alignSelf: "center",
            }}
          >
            <Text
              style={[Textstyles.normal, { fontSize: 15, color: Colors.gray }]}
            >
              Service fee
            </Text>
            <Text
              style={[Textstyles.normal, { fontSize: 15, color: Colors.gray }]}
            >
              $8.99
            </Text>
          </View>

          <View
            style={{
              width: "95%",
              marginTop: vh(1),
              justifyContent: "space-between",
              paddingHorizontal: vh(1),
              flexDirection: "row",
              alignSelf: "center",
            }}
          >
            <Text
              style={[Textstyles.medium, { fontSize: 16, color: Colors.black }]}
            >
              Total
            </Text>
            <Text
              style={[Textstyles.medium, { fontSize: 16, color: Colors.black }]}
            >
              $60.99
            </Text>
          </View>

          <View
            style={{
              height: 1,
              marginVertical: vh(3),
              width: "100%",
              alignSelf: "flex-end",
              backgroundColor: "lightgrey",
            }}
          ></View>

        <View style={{backgroundColor:Colors.white, elevation:2, padding:10, width:'95%', alignSelf:'center', borderRadius:10}}>
          <View style={{ width:'100%',alignSelf:'center', paddingTop:vh(1)}}>
            <Text style={[Textstyles.medium, {fontSize:16, color:Colors.black}]}>Tip your delivery partner</Text>
          </View>
        <View style={{width:'100%', alignSelf:'center'}}>
            <Text style={[Textstyles.normal, {fontSize:11, color:Colors.gray}]}>Your kindness means a lot! 100% of your tip goes to your delivery Partner.</Text>
        </View>




        <View style={{ width:'100%', alignSelf:'center'}}>
            <ScrollView
                contentContainerStyle={{}}
                keyboardShouldPersistTaps="handled"
                horizontal
                showsHorizontalScrollIndicator={false}>
                {categoryData1?.map((item, index) => {
                    return (
                    <TouchableOpacity
                        onPress={() => onCatSelect1(item)}
                        style={[styles.categoryData_view5, {borderColor: categoryId == item?.id ? Colors.red : Colors.gray, borderWidth: 1}]}>
                        <Text
                          style={[
                            Textstyles.medium,
                            styles.scrollView_text5,
                            {
                            color:categoryId == item?.id ? Colors.red : Colors.black,
                            textAlign:'center'
                            },
                        ]}>{item?.tip}</Text>
                    </TouchableOpacity>
                    );
                })}
                </ScrollView>
        </View>
        </View>

          <View
            style={{
              height: 1,
              marginVertical: vh(3),
              width: "85%",
              alignSelf: "flex-end",
              backgroundColor: "lightgrey",
            }}
          ></View>
          <TouchableOpacity
            onPress={() => setPayment(true)}
            style={{
              flexDirection: "row",
              alignItems: "center",
              width: "95%",
              alignSelf: "center",
              paddingHorizontal: vh(1),
              justifyContent: "space-between",
            }}
          >
            <View style={{ width: "17.5%" }}>
              <Image
                source={Icons.paymentOption}
                style={{ height: 30, width: 30 }}
              />
            </View>
            <View style={{ width: "65%" }}>
              {mthod != '' ?
              <Text
              style={[
                Textstyles.medium,
                { fontSize: 15, color: Colors.black },
              ]}
            >
              {mthod}
            </Text>
            :
              <Text
                style={[
                  Textstyles.medium,
                  { fontSize: 15, color: Colors.black },
                ]}
              >
                Select payment options
              </Text>
            }
            </View>
            <View style={{ width: "17.5%" }}>
              <Image
                source={Icons.rightRed}
                style={{ height: 18, alignSelf: "flex-end", width: 18 }}
              />
            </View>
          </TouchableOpacity>

          <View
            style={{
              height: 1,
              marginVertical: vh(2),
              width: "85%",
              alignSelf: "flex-end",
              backgroundColor: "lightgrey",
            }}
          ></View>


        <View style={{backgroundColor:Colors.white, elevation:2, padding:10, width:'95%', alignSelf:'center', borderRadius:10}}>
          <View style={{ width:'100%',alignSelf:'center', paddingTop:vh(1)}}>
            <Text style={[Textstyles.medium, {fontSize:16, color:Colors.black}]}>Cancellation Policy</Text>
          </View>
          <View style={{width:'100%', alignSelf:'center'}}>
              <Text style={[Textstyles.normal, {fontSize:11, color:Colors.gray}]}>100% cancellation fee will be applicable if you decide to cancel the order anytime after order placement. Avoid cancellation as it leads to food wastage</Text>
          </View>
        </View>

          <View style={{ width: "92%", marginTop: vh(8), alignSelf: "center" }}>
            <Text
              style={[Textstyles.normal, { fontSize: 11, color: Colors.gray }]}
            >
              If you're not around when the courier arrives, they'll leave your
              order at the door. By placing your order, you agree to take full
              responsibility for it once it's delivered. Orders containing
              alcohol or other restricted items may not be eligible for leave at
              door and will be returned to the shop if you are not available.
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => navigation.navigate("AddTip")}
            style={styles.loginBtn}
          >
            <Text
              style={[Textstyles.normal, { color: Colors.white, fontSize: 18 }]}
            >
              Next
            </Text>
          </TouchableOpacity>
        </>
      </ScrollView>

      {penClick && (
            <Modal  
              animationType="fade"
              transparent={true}
              // onRequestClose={() => setPenClick(false)}
              onBackdropPress={() => setPenClick(false)}
              style={{}} >
                <TouchableOpacity onPress={() => setPenClick(false)}
                  style={{bottom:'62%', position:'absolute', alignSelf:'center'}}>
                  <Image source={Icons.cross} style={{height:45, width:45}}/>
                </TouchableOpacity>
                <View
                  style={{
                    width: '100%',
                    height:'60%',
                    // flexDirection: 'row',
                    // paddingVertical: 20,
                    borderTopWidth:1.5,
                    borderLeftWidth:1.5,
                    borderRightWidth:1.5,
                    borderColor:Colors.red,
                    backgroundColor:'#fff0f5',
                    borderTopLeftRadius:20,
                    borderTopRightRadius:20,
                    bottom:0,
                    position:'absolute'
                  }}>


                <View style={{height:70, alignItems:'center', backgroundColor:Colors.white, 
                    justifyContent:'space-between', paddingHorizontal:vh(1),
                    borderTopLeftRadius:20, flexDirection:'row',
                    borderTopRightRadius:20, width:'100%'}}>
                  <View style={{flexDirection:'row', alignItems:'center', width:'85%'}}>
                  <Image source={Images.indian} style={{height:50, width:50, borderRadius:5}}/>
                  <Text
                    style={[
                      Textstyles.medium,
                      {
                        fontSize: 18,
                        color: Colors.black,
                        left:vh(1)
                      },
                    ]}
                  >
                    Buttar Chicken Factory
                  </Text>
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

      <ScrollView
          style={{}}
          contentContainerStyle={{paddingBottom:120}}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
            <>
            <View style={{width:'90%', marginVertical:vh(2), backgroundColor:Colors.white, alignSelf:'center', borderRadius:10, elevation:1}}>
              <View style={{ flexDirection:'row', marginTop:vh(1), paddingVertical:vh(2), paddingHorizontal:vh(2), justifyContent:'space-between',}}>
                <View style={{}}> 
                <Text
                    style={[
                      Textstyles.medium,
                      {
                        fontSize: 16,
                        color: Colors.black,
                      },
                    ]}
                  >
                    CUSTOMIZATION
                  </Text>
                  <Text style={[Textstyles.normal,{fontSize:12, color:Colors.gray}]}>Select any 1 option</Text>
                </View>

                <View style={{height:20, width:70, justifyContent:'center', borderRadius:5, borderColor:Colors.yellow, borderWidth:1}}>
                  <Text style={{fontSize:10, textAlign:'center'}}>REQUIRED</Text>
                </View>
              </View>
              <View style={{height:1, backgroundColor:'#E2E6E2'}}></View>

              <View style={{ width: "95%", marginTop: vh(2) }}>
                
                    {customise?.map((item, index) => {
                      return (
                        <>
                          <TouchableOpacity
                            onPress={() => onSelectServred(item)}
                            style={{}}
                          >
                            <View
                              style={{
                                // marginVertical: vh(1),
                                justifyContent: "space-between",
                                paddingHorizontal: vh(1),
                                flexDirection: "row",
                              }}
                            >
                              <Text
                                style={[
                                  Textstyles.medium,
                                  { fontSize: 16, color: item?.id == servedId ? Colors.red : Colors.black},
                                ]}
                              >
                              {item?.item}
                              </Text>
                              <View>
                                <Image
                                  source={
                                    item?.id == servedId
                                      ? Icons.Checked
                                      : Icons.unChecked
                                  }
                                  style={{ height: 22, width: 22 }}
                                />
                              </View>
                            </View>
                          </TouchableOpacity>
                          <View
                            style={{
                              height: 1,
                              marginVertical: vh(2),
                              width: "100%",
                              // alignSelf: "flex-end",
                              backgroundColor: "lightgrey",
                            }}
                          ></View>
                      </> 
                      );
                    })}
            </View>
          </View> 
            </>
      </ScrollView>

            <TouchableOpacity onPress={() => setPenClick(false)}
              style={{
                height: 55,
                alignItems: "center",
                width: "95%",
                position: "absolute",
                justifyContent:'center',
                bottom: 10,
                borderRadius: 10,
                alignSelf: "center",
                backgroundColor: Colors.red,
              }}
            >
            <Text style={[Textstyles.normal, { color: Colors.white, textAlign:'center', fontSize: 18 }]}>Revised items</Text> 
            </TouchableOpacity>
          </View>
        </Modal>
      )}

      {secheduleTime && (
        <Modal
          transparent={true}
          // animationType={"fade"}
          animationType={"slide"}
          style={{ width: "95%", height: "80%" }}
        >
          <View style={styles.container1}>
            <TouchableOpacity
              onPress={() => setSecheduleTime(false)}
              style={{
                height: 40,
                width: "95%",
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
                Textstyles.bold,
                {
                  width: "95%",
                  alignSelf: "center",
                  fontSize: 28,
                  color: Colors.black,
                },
              ]}
            >
              Schedule delivery
            </Text>
            <Text
              style={[
                Textstyles.normal,
                { textAlign: "left", alignSelf: "center", width: "94%" },
              ]}
            >
              Restaurant opens at Monday 8:15 AM
            </Text>

            <View style={{ height: "14%", width: "100%" }}>
              <ScrollView
                contentContainerStyle={{ paddingRight: 400 }}
                keyboardShouldPersistTaps="handled"
                horizontal
                showsHorizontalScrollIndicator={false}
              >
                {categoryData?.map((item, index) => {
                  return (
                    <>
                      {item?.status != "Closed" ? (
                        <TouchableOpacity
                          onPress={() => onCatSelect(item)}
                          style={[
                            styles.categoryData_view,
                            {
                              borderColor:
                                categoryId == item?.id
                                  ? Colors.red
                                  : Colors.gray,
                              borderWidth: categoryId == item?.id ? 1.5 : 1,
                            },
                          ]}
                        >
                          <Text
                            style={[
                              Textstyles.medium,
                              styles.scrollView_text,
                              {
                                color:categoryId == item?.id ? Colors.red : Colors.black,
                              },
                            ]}
                          >
                            {item?.schedule}
                          </Text>
                          <Text
                            style={[
                              Textstyles.normal,
                              styles.scrollView_text,
                              {
                                color:categoryId == item?.id ? Colors.red : Colors.gray,
                                fontSize: 13,
                              },
                            ]}
                          >
                            {item?.status}
                          </Text>
                        </TouchableOpacity>
                      ) : (
                        <View
                          // onPress={() => onCatSelect(item)}
                          style={[
                            styles.categoryData_view,
                            {
                              borderColor: Colors.gray,
                              borderWidth: categoryId == item?.id ? 1.5 : 1,
                            },
                          ]}
                        >
                          <Text
                            style={[
                              Textstyles.medium,
                              styles.scrollView_text,
                              {
                                color: Colors.gray,
                              },
                            ]}
                          >
                            {item?.schedule}
                          </Text>
                          <Text
                            style={[
                              Textstyles.normal,
                              styles.scrollView_text,
                              {
                                color: Colors.gray,
                                fontSize: 13,
                              },
                            ]}
                          >
                            {item?.status}
                          </Text>
                        </View>
                      )}
                    </>
                  );
                })}
              </ScrollView>
            </View>

            <View style={{ width: "95%", marginTop: vh(2) }}>
              <ScrollView
                style={{ height: "56%" }}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}>
                {deliverySlot?.map((item, index) => {
                  return (
                    <>
                      <TouchableOpacity
                        onPress={() => onSelectSlot(item)}
                        style={{}}
                      >
                        <View
                          style={{
                            marginVertical: vh(1),
                            justifyContent: "space-between",
                            paddingHorizontal: vh(1),
                            flexDirection: "row",
                          }}
                        >
                          <Text
                            style={[
                              Textstyles.medium,
                              { fontSize: 16, color: item?.id == slotId ? Colors.red : Colors.black},
                            ]}
                          >
                            {item?.slot}
                          </Text>
                          <View>
                            <Image
                              source={
                                item?.id == slotId
                                  ? Icons.Checked
                                  : Icons.unChecked
                              }
                              style={{ height: 22, width: 22 }}
                            />
                          </View>
                        </View>
                      </TouchableOpacity>
                      <View
                        style={{
                          height: 1,
                          marginVertical: vh(2),
                          width: "100%",
                          alignSelf: "flex-end",
                          backgroundColor: "lightgrey",
                        }}
                      ></View>
                    </>
                  );
                })}
              </ScrollView>
            </View>

            <TouchableOpacity
              onPress={() => onSheduleSubmit()}
              style={styles.scheduleBtn}
            >
              <Text
                style={[
                  Textstyles.medium,
                  { color: Colors.white, fontSize: 16 },
                ]}
              >
                Schedule
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setSecheduleTime(false)}
              style={styles.cancelBtn}
            >
              <Text
                style={[
                  Textstyles.medium,
                  { color: Colors.black, fontSize: 16 },
                ]}
              >
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </Modal>
      )}

      {instraction && (
        <Modal
          transparent={true}
          // animationType={"fade"}
          animationType={"slide"}
          style={{ width: "95%", position: "absolute", height: "100%" }}
        >
          <View style={styles.container3}>
            <TouchableOpacity
              onPress={() => setInstraction(false)}
              style={{
                height: 40,
                width: "95%",
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
                Textstyles.bold,
                {
                  width: "90%",
                  alignSelf: "center",
                  fontSize: 28,
                  color: Colors.black,
                },
              ]}
            >
              Delivery options
            </Text>

            <View
              style={{
                height: 70,
                marginVertical: vh(1),
                alignSelf: "flex-end",
                width: "95%",
              }}
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
                          borderColor:instractionId == item?.id ? Colors.red : Colors.black,
                          backgroundColor:
                            instractionId == item?.id
                              ? Colors.white
                              : Colors.white,
                        },
                      ]}>
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

            <View style={{ width: "95%", justifyContent:'center', height: 50 }}>
              <TextInput
                multiline
                autoFocus
                placeholder="Add instractions"
                style={[Textstyles.medium, styles.input]}
                value={text}
                onChangeText={onChangeText}
              />
            </View>

            <TouchableOpacity
              onPress={() => onInstractions()}
              style={styles.loginBtn3}
            >
              <Text
                style={[
                  Textstyles.normal,
                  { color: Colors.white, fontSize: 17 },
                ]}
              >
                Continue
              </Text>
            </TouchableOpacity>
          </View>
        </Modal>
      )}

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
                style={[Textstyles.medium, styles.input1]}
                value={label}
                onChangeText={onlabel}
              /> */}

      <View style={styles.container6}>
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
              // onPress={() => setAddress(false)}
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

      {addAddress && (
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
                onPress={() => setAddAddress(false)}
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
                Save Address
              </Text>
            </View>

            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 50 }}
              style={{ width: "100%" }}
            >
              {/* <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  borderRadius: 30,
                  alignSelf: "center",
                  marginTop: vh(1),
                  backgroundColor: Colors.white,
                  width: "95%",
                  elevation: 6,
                }}
              >
                <View
                  style={{
                    width: "12%",
                  }}
                >
                  <Image
                    source={Icons.search}
                    style={{ height: 22, alignSelf: "flex-end", width: 22 }}
                  />
                </View>

                <TextInput
                  value={searchTxt}
                  placeholder="Enter a new address"
                  placeholderTextColor={Colors.black}
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
                  onChangeText={() => setSearchTxt()}
                  style={{
                    width: "80%",
                    height: 50,
                    fontSize: 16,
                    paddingRight: 5,
                    // paddingLeft: 5,
                    // paddingTop:-5,
                    backgroundColor: Colors.white,
                    alignSelf: "center",
                    color: Colors.black,
                  }}
                />
              </View> */}

              <TouchableOpacity
                onPress={() => onFullAdd()}
                style={styles.loginBtn4}
              >
                <Image
                  source={Icons.plusRed}
                  style={{ height: 13, width: 13 }}
                />
                <Text
                  style={[
                    Textstyles.medium,
                    { color: Colors.red, fontSize: 14 },
                  ]}
                >
                  Add new address
                </Text>
              </TouchableOpacity>

              {/* <View
                style={{ width: "95%", marginTop: vh(1), alignSelf: "center" }}
              >
                <Text
                  style={[
                    Textstyles.medium,
                    {
                      marginVertical: vh(2),
                      color: Colors.black,
                      fontSize: 17,
                    },
                  ]}
                >
                  Nearby
                </Text>
              </View> */}

              {/* <TouchableOpacity
                // onPress={() => setAddress(true)}
                // onPress={() => setAddAddress(true)}
                style={{
                  flexDirection: "row",
                  marginTop: vh(1),
                  alignItems: "center",
                  width: "95%",
                  alignSelf: "center",
                  paddingHorizontal: vh(1),
                  justifyContent: "space-between",
                }}
              >
                <View style={{ width: "17.5%" }}>
                  <Image
                    source={Icons.liveLocation}
                    style={{ height: 24, width: 24 }}
                  />
                </View>
                <View style={{ width: "65%" }}>
                  <Text
                    style={[
                      Textstyles.medium,
                      { fontSize: 14, color: Colors.black },
                    ]}
                  >
                    NY 10018, United States
                  </Text>
                  <Text
                    style={[
                      Textstyles.normal,
                      { fontSize: 13, color: Colors.gray },
                    ]}
                  >
                    575 8th Ave, New York
                  </Text>
                </View>
                <View style={{ width: "17.5%" }}>
                  <View
                    style={{
                      backgroundColor: "#E2E6E2",
                      // borderWidth:1,
                      // borderColor:Colors.red,
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
                  </View>
                </View>
              </TouchableOpacity> */}

              <View
                style={{
                  height: 1,
                  marginVertical: vh(1),
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
                  Your saved address
                </Text>
              </View>


{addLoading ? <ActivityIndicator style={{flex:1, marginTop:'10%', justifyContent:'center'}} size="large" color={Colors.red}/>:
<>
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
    </>
    }



              <View
                style={{
                  height: 1,
                  marginVertical: vh(3),
                  width: "100%",
                  backgroundColor: "lightgrey",
                }}
              ></View>

              {/* <TouchableOpacity 
            onPress={() => onFullAdd()}
            style={styles.loginBtn3}>
            <Text style={[Textstyles.normal, { color: Colors.white, fontSize: 17 }]}>Save and continue</Text>
          </TouchableOpacity> */}
            </ScrollView>
          </View>
        </Modal>
      )}

      {promo && (
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
                  onPress={() => setPromo(false)}
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
                      width: "50%",
                      left: vh(2),
                      alignSelf: "center",
                      fontSize: 18,
                      color: Colors.black,
                    },
                  ]}
                >
                  Promo
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => setPromoCode(true)}
                style={{
                  backgroundColor: Colors.black,
                  justifyContent: "center",
                  borderRadius: 30,
                  padding: 5,
                  paddingLeft: 10,
                  paddingRight: 10,
                  height: 30,
                }}
              >
                <Text
                  style={[
                    Textstyles.medium,
                    { fontSize: 14, color: Colors.white },
                  ]}
                >
                  Enter code
                </Text>
              </TouchableOpacity>
            </View>

            <View
              style={{
                height: "50%",
                width: "95%",
                justifyContent: "flex-end",
              }}
            >
              <Image
                source={Icons.promo}
                style={{ height: 100, alignSelf: "center", width: 100 }}
              />
              <Text
                style={[
                  Textstyles.bold,
                  {
                    width: "95%",
                    textAlign: "center",
                    fontSize: 24,
                    color: Colors.black,
                  },
                ]}
              >
                Get your first promo
              </Text>

              <Text
                style={[
                  Textstyles.normal,
                  {
                    width: "95%",
                    textAlign: "center",
                    fontSize: 17,
                    color: Colors.gray,
                  },
                ]}
              >
                Save $10 for every friend that tries Ricksha Foods
              </Text>
            </View>

            <TouchableOpacity
              onPress={() => onShare()}
              style={styles.loginBtn6}
            >
              <Text
                style={[
                  Textstyles.normal,
                  { color: Colors.white, fontSize: 18 },
                ]}
              >
                Invite Friends
              </Text>
            </TouchableOpacity>
          </View>
        </Modal>
      )}

      {promoCode && (
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
                  onPress={() => setPromoCode(false)}
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
                      width: "80%",
                      left: vh(2),
                      alignSelf: "center",
                      fontSize: 18,
                      color: Colors.black,
                    },
                  ]}
                >
                  Enter promo code
                </Text>
              </View>
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
                placeholder="Enter promo code"
                style={[Textstyles.medium, styles.input1]}
                value={promoApply}
                onChangeText={onPromoApply}
              />
            </View>

            <TouchableOpacity
              onPress={() => setPromoCode(false)}
              style={styles.loginBtn6}
            >
              <Text
                style={[
                  Textstyles.normal,
                  { color: Colors.white, fontSize: 18 },
                ]}
              >
                Apply
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
                onPress={()=>{ 
                  setMthod('Online (Debit or Credit Cards)')
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

            <TouchableOpacity
             onPress={() =>{
                setMthod('Cash on Delivery (COD)')
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

            <View
              style={{ width: "95%", marginTop: vh(5), alignSelf: "center" }}
            >
              <Text
                style={[
                  Textstyles.medium,
                  {
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
                padding: 4,
                alignSelf: "center",
                width: "48%",
                borderRadius: 30,
                marginVertical: vh(1),
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
              <View style={{ width: "17%" }}>
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

              <View style={{ width: "77%" }}>
                <Text
                  style={[
                    Textstyles.medium,
                    { fontSize: 14, paddingTop: 1, color: Colors.red },
                  ]}
                >
                  Add Voucher code
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </Modal>
      )}

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
    </View>
  );
};

export default Checkout;

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: Colors.white,
    flexDirection: "row",
    height: 32,
    padding: hpx(5),
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 1,
    borderColor: Colors.red,
    borderWidth: 1,
    width: "25%",
    borderRadius: 100,
  },
  loginBtn6: {
    width: "50%",
    borderRadius: 10,
    marginTop: vh(10),
    height: 48,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: Colors.gray,
    // backgroundColor: "#038847",
  },
  input: {
    height: "90%",
    margin: 12,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    paddingTop:15,
    // textAlignVertical: "top",
  },
  container6: {
    marginBottom: 20,
    alignItems: 'center',
    flexDirection: 'row',
    // backgroundColor:'pink',
    width:'70%',
    justifyContent:'space-between',
    alignItems:'center'
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
  scrollView_text: {
    marginTop: -4,
    color: Colors.black,
    fontSize: 15,
  },
  scrollView_text5: {
    marginTop: -2,
    color: Colors.black,
    fontSize: 14,
    padding:2,
    width:'100%',
    alignSelf:'center'
  },
  scrollView_text2: {
    color: Colors.black,
    fontSize: 13,
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
  categoryData_view: {
    marginHorizontal: wpx(8),
    paddingLeft: wpx(10),
    width: "21%",
    borderWidth: 1,
    borderRadius: 10,
    marginVertical: wpx(10),
    height: hpx(80),
    justifyContent: "center",
    paddingTop: hpx(4),
    elevation: 5,
    backgroundColor: Colors.white,
  },
  categoryData_view5: {
    // marginHorizontal: wpx(8),
    justifyContent:'center',
    alignItems:'center',
    width: 70,
    borderWidth: 1,
    borderRadius: 10,
    marginVertical: wpx(10),
    marginHorizontal:5,
    height: hpx(50),
    paddingTop: hpx(4),
    elevation: 5,
    backgroundColor: Colors.white,
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
  container1: {
    backgroundColor: "white",
    padding: 10,
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
  container3: {
    backgroundColor: "white",
    width: "100%",
    alignSelf: "center",
    // paddingBottom:15,
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
  header: {
    backgroundColor: "#fff",
    paddingHorizontal: 5,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    height: 50,
    width: "100%",
    borderTopLeftRadius: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.black,
    borderTopRightRadius: 20,
    shadowColor: "#00000040",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 1,
    elevation: 5,
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
  loginBtn4: {
    width: "42%",
    borderRadius: 30,
    marginVertical: vh(2),
    left: vh(1),
    flexDirection: "row",
    height: 35,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.white,
    borderColor:Colors.red,
    borderWidth:1
  },
  scheduleBtn: {
    width: "80%",
    borderRadius: 10,
    marginTop: vh(1),
    height: 40,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: Colors.gray,
  },
  cancelBtn: {
    width: "80%",
    borderRadius: 10,
    marginTop: vh(1),
    height: 40,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: "lightgrey",
  },
  quantity: {
    color: Colors.black,
    fontSize: 14,
  },
  deleteButton: {
    height: 16,
    width: 18,
    resizeMode: "contain",
  },
  quantityText: {
    color: Colors.black,
    fontSize: 16,
    textAlign: "center",
    // padding: hpx(3),
  },
  addButton: {
    height: 16,
    width: 16,
  },
  actualPriceText: {
    fontSize: 14,
    color: Colors.gray,
    left: 4,
    textAlign: "center",
    textDecorationLine: "line-through",
    textAlignVertical: "center",
  },
  offerPriceText: {
    fontSize: 16,
    color: Colors.black,
  },
});
