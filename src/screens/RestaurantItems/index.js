import {
  ImageBackground,
  StyleSheet,
  FlatList,
  TextInput,
  Text,
  View,
  Image,
  TouchableOpacity,
  Modal,
  Share,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import Images from "../../utils/images";
import Icons from "../../utils/icons";
import { Colors, hp, hpx, wp } from "../../utils/AppConstant";
import { useNavigation } from "@react-navigation/native";
import CustomModal from "../../common/CustomModal";
import {
  widthPercentageToDP as vw,
  heightPercentageToDP as vh,
} from "react-native-responsive-screen";
import Textstyles from "../../utils/text";
import { ScrollView } from "react-native-gesture-handler";
import { useMemo } from "react";
import ApiModel from "../../common/ApiModel";

const RestaurantItems = (props) => {
  const navigation = useNavigation();
  const [search, serSearch] = useState(false);
  const [searchTxt, setSearchTxt] = useState("");
  const [getQuantity, setQuantity] = useState(1);
  const [servedId, setServedId] = useState('1')
  const [unlockModal, setUnlockModal] = useState(false);
  const [Deliver, setDeliver] = useState("Delivery");
  const [cardDataBkp, setCardDataBkp] = useState([]);
  const [Add, setAdd] = useState(false);
  const [visible, setVisible] = useState(true);
  const [visible1, setVisible1] = useState(true);
  const [penClick, setPenClick] = useState(false)
  const [fav, setFav] = useState(false)
  const [reward, setReward] = useState(false)
  const [openGroup, setOpenGroup] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
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
  console.log('------------props?.route?.params?.data', props?.route?.params?.data)
  const onSelectServred = (item) => {
    console.log("------------onServred", item);
    setServedId(item?.id);
  };
  const [allProducts, setAllProducts] = useState();
  const [items, setItems] = useState([
      {
        id: "1",
        itemName: "Fry Daal Makhani",
        discountedPrice: "50",
        itemPrice: "69",
        image: Images.dalMakhani,
        rating: 206,
      },
    // {
    //   id: "2",
    //   itemName: "Paneer Makhni",
    //   discountedPrice: "100",
    //   itemPrice: "129",
    //   image: Images.KadaiPaneer,
    //   rating: 500,
    // },
    // {
    //   id: "3",
    //   itemName: "Soya Chaap",
    //   discountedPrice: "59",
    //   itemPrice: "89",
    //   image: Images.soyaChaap,
    //   rating: 600,
    // },
    // {
    //   id: "4",
    //   itemName: "Special Thali",
    //   discountedPrice: "159",
    //   itemPrice: "200",
    //   image: Images.indian,
    //   rating: 60,
    // },
    // {
    //   id: "5",
    //   itemName: "Asia Special Combo",
    //   discountedPrice: "199",
    //   itemPrice: "229",
    //   image: Images.chinese,
    //   rating: 89,
    // },
  ]);
  // const [Pickup , setPickup] = useState(false)

  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          `Check out this deal from Ricksha Foods!'\n\n\n\n'Hungry? Get $10 off your first 2 Ricksha Foods orders of $50 or more. Terms apply`
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

  // console.log("-----------allProducts====", allProducts?.vegProducts);
  const updateCart = (type, item) => {
    if (type == "Increase") {
      setQuantity(getQuantity + 1);
      // let increaseBody = {
      //   productid: item?.productid,
      //   qty: parseInt(item?.qty) + 1,
      //   userid: currentUser?.id,
      // };
      // dispatch({
      //   type: types.UPDATE_CART,
      //   payload: increaseBody,
      // });
    } else {
      if (getQuantity >= 1) {
        setQuantity(getQuantity - 1);
      }
      if (getQuantity == 1) {
        console.log("HIT SET ADD FALSE");
        setAdd(false);
      }
      // let decreaseBody = {
      //   productid: item?.productid,
      //   qty: parseInt(item?.qty) - 1,
      //   userid: currentUser?.id,
      // };
      // dispatch({
      //   type: types.UPDATE_CART,
      //   payload: decreaseBody,
      // });
    }
  };

  const onOrderType = (txt) => {
    setDeliver(txt);
    // if (txt === 'Delivery') {
    //   setDeliver(true)
    //   setPickup(false)
    // }else{
    //   setDeliver(false)
    //   setPickup(true)
    // }
  };

  const onSearch = (txt) => {
    setSearchTxt(txt);
    let search = allProducts;
    if (txt) {
      const newData = search.filter((item) => {
        const itemData = item?.itemName
          ? item?.itemName?.toUpperCase()
          : "".toUpperCase();
        const textData = txt.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setCardDataBkp(newData);
    } else {
      setCardDataBkp(items);
    }
  };

  useEffect(() => {
    setCardDataBkp(items);
  }, [items]);



  //Get Product By Rest.ID Api
const getAllCategory = async() => {
  setIsLoading(true);
  let data = JSON.stringify({
    "restaurantId": "6405a826b115a410f63ae9ad"
  })
  ApiModel.sendApiCall(
    `/api/Product/v1/getAllProductsByRestaurantId`,
    data,
    null,
    response => {
      console.log('------------PRODUCTSS', response)
      setIsLoading(false);
      if (response?.message == 'Success.') {
        setAllProducts(response?.data)

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
    <View style={{ flex: 1, backgroundColor: Colors.white }}>
      {unlockModal && (
        <CustomModal
          visible={unlockModal}
          onClose={() => setUnlockModal(false)}
          data={props?.route?.params?.data}
          onPress={() => {
            proceedToPay(), setUnlockModal(false);
          }}
          isUnlock
          label={``}
        />
      )}

     

      <ImageBackground
        resizeMode="cover"
        source={{uri:props?.route?.params?.data?.profile}}
        style={{
          justifyContent: "space-between",
          height: 170,
          width: "100%",
        }}
      >
        {search ? (
          <View
            style={{
              flexDirection: "row",
              marginTop: vh(1),
              width: "90%",
              alignSelf: "center",
              alignItems: "center",
              justifyContent: "space-between",
              flexDirection: "row",
              position: "absolute",
              // backgroundColor:'pink'
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                borderRadius: 20,
                alignSelf: "center",
                marginTop: vh(1),
                backgroundColor: Colors.white,
                width: "100%",
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
                  style={{ height: 25, alignSelf: "flex-end", width: 25 }}
                />
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
                style={[
                  Textstyles.normal,
                  {
                    width: "82%",
                    height: 50,
                    fontSize: 15,
                    paddingRight: 5,
                    backgroundColor: Colors.white,
                    alignSelf: "center",
                    color: Colors.black,
                  },
                ]}
              />
            </View>
          </View>
        ) : (
          <View
            style={{
              flexDirection: "row",
              marginTop: vh(3),
              width: "90%",
              alignSelf: "center",
              alignItems: "center",
              justifyContent: "space-between",
              flexDirection: "row",
              position: "absolute",
              // backgroundColor:'pink'
            }}
          >
            <View style={{ width: "40%" }}>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{
                  height: 46,
                  width: 46,
                  elevation: 6,
                  borderRadius: 23,
                  backgroundColor: Colors.white,
                  justifyContent: "center",
                }}
              >
                <Image
                  source={Icons.arrowRed}
                  style={{ height: 24, alignSelf: "center", width: 24 }}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: "row",
                width: "35%",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                onPress={() => serSearch("true")}
                style={{
                  height: 46,
                  width: 46,
                  elevation: 6,
                  borderRadius: 23,
                  backgroundColor: Colors.white,
                  justifyContent: "center",
                }}
              >
                <Image
                  source={Icons.search}
                  style={{ height: 24, alignSelf: "center", width: 24 }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setUnlockModal(true)}
                style={{
                  height: 46,
                  width: 46,
                  elevation: 6,
                  borderRadius: 23,
                  backgroundColor: Colors.white,
                  justifyContent: "center",
                }}
              >
                <Image
                  source={Icons.menuRed}
                  style={{ height: 24, alignSelf: "center", width: 24 }}
                />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ImageBackground>
      <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 70 }}>
        <View
          style={{
            width: "95%",
            backgroundColor: Colors.white,
            alignSelf: "center",
          }}
        >
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("RestaurantDeatils", {
                data: props?.route?.params?.data,
              })
            }
            style={{
              marginVertical: 2,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {/* {console.log('----------------props++++', props?.route?.params?.data?.address)} */}
            <View>
              <Text
                style={[
                  Textstyles.medium,
                  {
                    fontSize: 20,
                    color: Colors.black,
                    marginTop: vh(1),
                  },
                ]}
              >
                {props?.route?.params?.data?.restaurantName}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  width: "50%",
                  alignItems: "center",
                }}
              >
                <Image
                  source={Icons.starhalf}
                  style={{ height: 14, marginBottom: 4, width: 14 }}
                />
                <View
                  style={{
                    left: 5,
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Text style={[Textstyles.medium, styles.title_text1,{color:'darkgreen'}]}>
                    {/* {props?.route?.params?.data?.Rating}  */}
                    4.9 (500+ ratings)
                  </Text>
                  <Text style={{ fontSize: 6, color:Colors.gray, marginHorizontal: vh(0.5) }}>
                    {"\u2B24"}
                  </Text>
                  <Text style={[Textstyles.medium, styles.title_text1]}>{props?.route?.params?.data?.categoryName}</Text>
                  <Text
                    style={[
                      Textstyles.medium,
                      { fontSize: 6, color:Colors.gray, marginHorizontal: vh(0.5) },
                    ]}
                  >
                    {"\u2B24"}{" "}
                  </Text>
                  <Text style={styles.title_text1}>$</Text>
                </View>
              </View>
              <Text
                style={[
                  Textstyles.normal,
                  { color: "black", fontSize: 13 },
                ]}
              >
                {props?.route?.params?.data?.address}
              </Text>
              <Text
                style={[Textstyles.normal, { color: "black", fontSize: 13 }]}
              >
                Tab for hours, info and more
              </Text>
            </View>
            <View>
              <Image
                source={Icons.rightRed}
                style={{ height: 18, width: 18 }}
              />
            </View>
          </TouchableOpacity>

          <View
            style={{
              backgroundColor: Colors.white,
              alignItems: "center",
              justifyContent: "space-around",
              flexDirection: "row",
              marginVertical: vh(2),
              width: "95%",
              alignSelf: "center",
              height: 45,
              borderRadius: 30,
              borderColor:Colors.red,
              borderWidth:1
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
                  height: 40,
                  borderColor:Colors.red,
                  borderWidth:1,
                  width: "48.2%",
                }}
              >
                <Text
                  style={[
                    Textstyles.medium,
                    {
                      textAlign: "center",
                      color: Colors.red,
                      marginBottom: -5,
                    },
                  ]}
                >
                  Delivery
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    alignSelf: "center",
                  }}
                >
                  <Text
                    style={[
                      Textstyles.normal,
                      {
                        textAlign: "center",
                        fontSize: 11,
                        color:Colors.red
                      },
                    ]}
                  >
                    {props?.route?.params?.data?.deliveryTime}
                  </Text>
                  <Text style={{ fontSize: 5, marginTop:-3, color:Colors.red, marginHorizontal: vh(0.5) }}>
                    {"\u2B24"}
                  </Text>
                  <Text
                    style={[
                      Textstyles.normal,
                      {
                        textAlign: "center",
                        fontSize: 11,
                        fontWeight: "500",
                        color:Colors.red
                      },
                    ]}
                  >
                    {props?.route?.params?.data?.currency}{props?.route?.params?.data?.deliveryCharge}
                  </Text>
                </View>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => onOrderType("Delivery")}
                style={{
                  alignSelf: "center",
                  justifyContent: "center",
                  borderRadius: 30,
                  height: 40,
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
                    },
                  ]}
                >
                  Delivery
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    alignSelf: "center",
                  }}
                >
                  <Text
                    style={[
                      Textstyles.normal,
                      {
                        textAlign: "center",
                        fontSize: 11,
                        color:Colors.gray
                      },
                    ]}
                  >
                   {props?.route?.params?.data?.deliveryTime}
                  </Text>
                  <Text style={{ fontSize: 5, marginTop:-3, color:Colors.gray, marginHorizontal: vh(0.5) }}>
                    {"\u2B24"}
                  </Text>
                  <Text
                    style={[
                      Textstyles.normal,
                      {
                        textAlign: "center",
                        fontSize: 11,
                        color:Colors.gray
                      },
                    ]}
                  >
                     {props?.route?.params?.data?.currency}{props?.route?.params?.data?.deliveryCharge}
                  </Text>
                </View>
              </TouchableOpacity>
            )}

            {Deliver === "Pick-up" ? (
              <TouchableOpacity
                onPress={() => onOrderType("Delivery")}
                style={{
                  height: 40,
                  backgroundColor: Colors.white,
                  justifyContent: "center",
                  elevation: 6,
                  borderRadius: 30,
                  width: "48.2%",
                  borderColor:Colors.red,
                  borderWidth:1,
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
                    },
                  ]}
                >
                  Pick-up
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    alignSelf: "center",
                  }}
                >
                  <Text
                    style={[
                      Textstyles.normal,
                      {
                        textAlign: "center",
                        fontSize: 11,
                        color:Colors.red
                      },
                    ]}
                  >
                    25-45 min
                  </Text>
                  <Text style={{ fontSize: 5, marginTop:-3, color:Colors.red, marginHorizontal: vh(0.5) }}>
                    {"\u2B24"}
                  </Text>
                  <Text
                    style={[
                      Textstyles.normal,
                      {
                        textAlign: "center",
                        fontSize: 11,
                        color:Colors.red
                      },
                    ]}
                  >
                    50+ Miles
                  </Text>
                </View>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => onOrderType("Pick-up")}
                style={{
                  height: 40,
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
                      marginBottom: -5,
                    },
                  ]}
                >
                  Pick-up
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    alignSelf: "center",
                  }}
                >
                  <Text
                    style={[
                      Textstyles.normal,
                      {
                        textAlign: "center",
                        fontSize: 11,
                        color:Colors.gray
                      },
                    ]}
                  >
                    25-45 min
                  </Text>
                  <Text style={{ fontSize: 5, marginTop:-3, marginHorizontal: vh(0.5) }}>
                    {"\u2B24"}
                  </Text>
                  <Text
                    style={[
                      Textstyles.normal,
                      {
                        textAlign: "center",
                        fontSize: 11,
                        fontWeight: "500",
                        color:Colors.gray
                      },
                    ]}
                  >
                    50+ Miles
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          </View>

          <TouchableOpacity onPress={()=> setOpenGroup(true)}
            style={{flexDirection:'row', marginTop:2, marginLeft:vh(0.5), marginVertical:vh(3), paddingLeft:2, paddingRight:2, justifyContent:'space-evenly', borderRadius:20, borderWidth:1, borderColor:Colors.red, height:30, width:'34%',  alignItems:'center', }}>
            <Image source={Icons.inviteRed} style={{height:16, width:16}}/>
            <Text style={[ Textstyles.medium, {color:Colors.red, marginTop:2, fontWeight:'500'}]}>Group order</Text>
          </TouchableOpacity>


          <TouchableOpacity onPress={() => setReward(true)}
              style={{height:60, marginTop:0, alignItems:'center', backgroundColor:'#E8E8E8', 
                justifyContent:'space-between', marginVertical:vh(2), paddingHorizontal:vh(1),
                flexDirection:'row', width:'100%'}}>
              <View style={{flexDirection:'row', alignItems:'center', width:'85%'}}>
              <Image source={Icons.rewardsRed} style={{height:20, width:20,}}/>
              <View style={{ width:'95%', flexDirection:'row', alignItems:'center', }}>
              <Text style={[Textstyles.medium, {fontSize: 16, color: Colors.black,left:vh(1)}]}>
                5 orders until NZ$15 reward <Text style={{ fontSize: 6, bottom:5, marginHorizontal: vh(0.2) }}>
                      {"\u2B24"}
                </Text> <Text style={[Textstyles.normal, {fontSize: 14, color: Colors.black,left:vh(1)}]}>
                NZ$30 minimum
              </Text>
              </Text>
                
              </View>
              </View>
                <Image source={Icons.rightRed} style={{height:18, padding:3, alignSelf:'center', width:18}}/>
          </TouchableOpacity>
      
         
         
          

{isLoading ? <ActivityIndicator style={{flex:1, marginTop:'10%', justifyContent:'center'}} size="large" color={Colors.red}/>:
<>
          {visible && (
            <FlatList
              contentContainerStyle={{}}
              showsVerticalScrollIndicator={false}
              // data={cardDataBkp}
              data={allProducts}
              renderItem={({ item }) => (

                <View style={{ marginVertical: vh(2) }}>

{console.log('-------------------YYYYYY', item?.products)}
                  {/* {visible ? ( */}
                  <TouchableOpacity
                    // onPress={() => setVisible(false)}
                    style={{
                      width: "100%",
                      // borderRadius: 5,
                      backgroundColor: "#E8E8E8",
                      height: 45,
                      paddingHorizontal: 5,
                      alignItems: "center",
                      justifyContent: "space-between",
                      flexDirection: "row",
                      alignSelf: "center",
                    }}
                  >
                    <Text
                      style={[Textstyles.medium, { color: Colors.black, fontSize: 16 }]}
                    >
                      {item?.slug} ({item?.count})
                    </Text>
                    {/* <Image source={Icons.arrowUp} style={{ height: 18, width: 18 }} /> */}
                  </TouchableOpacity>
                {/* ) : (
                  <TouchableOpacity
                    onPress={() => setVisible(true)}
                    style={{
                      width: "100%",
                      // borderRadius: 5,
                      backgroundColor: "#E8E8E8",
                      height: 45,
                      paddingHorizontal: 5,
                      alignItems: "center",
                      justifyContent: "space-between",
                      flexDirection: "row",
                      alignSelf: "center",
                    }}
                  >
                    <Text
                      style={[Textstyles.medium, { color: Colors.black, fontSize: 16 }]}
                    >
                      Vegetarian ({allProducts?.vegCount})
                    </Text>
                    <Image
                      source={Icons.arrowDown1}
                      style={{ height: 18, width: 18 }}
                    />
                  </TouchableOpacity>
                )} */}




{item?.products?.map((item, index) => {
              return (
                  <View style={styles.itemContainer}>
                    <View style={styles.rowContainer}>
                      <Text style={[Textstyles.medium, styles.offerPriceText]}>
                        {item?.productName}
                      </Text>
                  
                      <View
                        style={{
                          flexDirection: "row",
                          width: "50%",
                          alignItems: "center",
                          marginTop:-5,
                        }}
                      >
                        <Image
                          source={Icons.rating1}
                          style={{ height: 22, width: 18 }}
                        />
                        <View
                          style={{
                            left: 5,
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          <Text
                            style={[
                              Textstyles.medium,
                              styles.title_text1,
                              { fontSize: 12, color:'darkgreen' },
                            ]}
                          >
                            {item?.rating} reviews
                          </Text>
                        </View>
                      </View>

                      <View style={{ flexDirection: "row", height:20 }}>
                        <Text
                          style={[
                            Textstyles.medium,
                            styles.offerPriceText,
                            { fontSize: 15 },
                          ]}
                        >
                         {item?.currency}{item?.discountPrice}
                        </Text>
                        <Text
                          style={[Textstyles.medium, styles.actualPriceText]}
                        >
                          {item?.currency}{item?.price}
                        </Text>
                      </View>

                      <Text style={[Textstyles.medium, styles.quantity, {paddingTop:4, marginBottom:-5}]}>
                        Quantity
                      </Text>

                      {Add ? (
                        <View style={styles.buttonContainer}>
                          <TouchableOpacity
                            onPress={() => updateCart("Decrease")}
                            style={{ padding: hpx(1) }}
                          >
                            <Image
                              source={
                                getQuantity == 0
                                  ? Icons.greyMinus
                                  : Icons.minusRed
                              }
                              // source={Icons.minusRed}
                              style={styles.deleteButton}
                            />
                          </TouchableOpacity>
                          <Text
                            style={[Textstyles.medium, styles.quantityText]}
                          >
                            {getQuantity}
                          </Text>
                          <TouchableOpacity
                            onPress={() => updateCart("Increase")}
                            style={{ padding: hpx(3)}}>
                            <Image
                              source={Icons.plusRed}
                              style={styles.addButton}
                            />
                          </TouchableOpacity>
                        </View>
                      ) : (
                        <TouchableOpacity
                          onPress={() => {
                            setAdd(true), 
                            setPenClick(true)
                            setQuantity(1);
                          }}
                          style={[
                            styles.buttonContainer,
                            {
                              borderWidth: 1,
                              justifyContent: "center",
                              backgroundColor: Colors.white,
                              borderColor: Colors.red,
                            },
                          ]}
                        >
                          <Text
                            style={[
                              Textstyles.medium,
                              {
                                color: Colors.red,
                                // marginTop: 1,
                                textAlign: "center",
                                fontSize: 16,
                              },
                            ]}
                          >
                            ADD
                          </Text>
                          <View style={{ left: vh(2), marginTop: -vh(1.5) }}>
                            <Image
                              source={Icons.plusRed}
                              style={{
                                height: 14,
                                alignSelf: "flex-end",
                                width: 14,
                              }}
                            />
                          </View>
                        </TouchableOpacity>
                      )}
                      
                    </View>
                    <View style={styles.imageView}>
                      <Image
                        resizeMode="cover"
                        source={{uri: item?.images[0]}}
                        style={styles.cartImage}
                      />
                    </View>
                  </View>
 );
})}


                </View>
            
              )}
              keyExtractor={(i, index) => "id" + index}
              // onRefresh={() => getSearch()}
              // refreshing={loding}
            />
          )}
                </>
        }
        </View>
      </ScrollView>


    {openGroup && (
            <Modal  
              animationType="fade"
              transparent={true}
              // onRequestClose={() => setPenClick(false)}
              onBackdropPress={() => setOpenGroup(false)}
              style={{}} >
           <View style={styles.container1}>
              <TouchableOpacity
                onPress={() => setOpenGroup(false)}
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

              <View style={{height:'20%', width:'100%'}}>
                  <Image resizeMode="contain" source={Images.termsCondition} style={{height:'100%', width:'100%'}}/> 
              </View>

            <View style={{flexDirection:'row', width:'100%', justifyContent:'space-between', alignSelf:'center', alignItems:'center'}}>
              <Text style={[Textstyles.bold, {marginVertical:vh(2), width:'90%', alignSelf: "center", fontSize: 30, color: Colors.black}]}>
                  Dhananjay's group order
              </Text>
              <TouchableOpacity
                style={{
                backgroundColor: "#E2E6E2",
                height: 36,
                borderRadius: 18,
                justifyContent: "center",
                width: 36,
                }}>
                <Image
                source={Icons.editPen}
                style={{ height: 22, alignSelf: "center", width: 22 }}
                />
            </TouchableOpacity>
            </View>
          
          <View style={{width:'100%', alignSelf:'center'}}>
            <Text style={[Textstyles.medium,{fontSize:18, marginVertical:vh(1), color:Colors.gray}]}>{props?.route?.params?.data?.ResturatName}</Text>
            <Text>Invite guests to add items with a shareable link. Pay for everybody or have guests pay for their share once they're done</Text>
          </View>


          <View
             style={{
               flexDirection: "row",
               marginTop: vh(4),
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
               <TouchableOpacity
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
               </TouchableOpacity>
             </View>
            </View>

            <View style={{height:2, left:'5%', width:'95%', alignSelf:'flex-end', marginTop:vh(2), backgroundColor:'#E2E6E2'}}></View>

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
                source={Icons.clockRed}
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
                No deadline 
            </Text>
            <Text
                style={[
                Textstyles.normal,
                { fontSize: 13, color: Colors.gray },
                ]}
            >
                Guests can order at any time
            </Text>
            </View>
            <View style={{ width: "17.5%" }}>
            
            <TouchableOpacity
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
            </TouchableOpacity>
            </View>
        </View>

        <View style={{height:2, left:'5%', width:'95%', alignSelf:'flex-end', marginTop:vh(2), backgroundColor:'#E2E6E2'}}></View>

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
                source={Icons.cash}
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
               Pay for everybody
            </Text>
            <Text
                style={[
                Textstyles.normal,
                { fontSize: 13, color: Colors.gray },
                ]}
            >
                No spending limit
            </Text>
            </View>
            <View style={{ width: "17.5%" }}>
            
            <TouchableOpacity
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
            </TouchableOpacity>
            </View>
        </View>

        <TouchableOpacity onPress={()=> onShare()}
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
            <Text style={[Textstyles.normal, { color: Colors.white, textAlign:'center', fontSize: 18 }]}>Invite guests</Text> 
          </TouchableOpacity>


        </View>
        </Modal>
      )}

      {reward && (
            <Modal  
              animationType="fade"
              transparent={true}
              // onRequestClose={() => setPenClick(false)}
              onBackdropPress={() => setReward(false)}
              style={{}} >
                <View
                  style={{
                    width: '100%',
                    height:'70%',
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
                justifyContent:'center', paddingHorizontal:vh(1),
                borderTopLeftRadius:20, alignSelf:'center',
                borderTopRightRadius:20, width:'100%'}}>
                <Text style={[Textstyles.medium,{fontSize:20, textAlign:'center', color:Colors.black}]}>Restaurant Rewards</Text>
            </View>

        <ScrollView
          style={{}}
          contentContainerStyle={{paddingBottom:120}}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
            <>
          <View style={{width:'95%',  alignSelf:'center'}}>
            <Text
              style={[Textstyles.medium, {
                marginTop: vh(2),
                color: Colors.black,
                fontSize:17
              }]}>
              How to get a reward
            </Text>
            <Text style={[Textstyles.normal,{fontSize:14, marginVertical:vh(1), color:Colors.gray}]}>Complete a total of 5 orders of at least NZ$30 each (before taxes and fees)</Text>
          </View>


          <View style={{width:'95%',  alignSelf:'center'}}>
            <Text
              style={[Textstyles.medium, {
                marginTop: vh(2),
                color: Colors.black,
                fontSize:17
              }]}>
              Valid at
            </Text>

            <Text style={[Textstyles.normal,{fontSize:14, marginVertical:vh(1), color:Colors.gray}]}>{props?.route?.params?.data?.ResturatName}</Text>
          </View>

          <View style={{width:'95%',  alignSelf:'center'}}>
            <Text
              style={[Textstyles.medium, {
                marginTop: vh(2),
                color: Colors.black,
                fontSize:17
              }]}>
              Details
            </Text>

            <Text style={[Textstyles.normal,{fontSize:14, marginVertical:vh(1), color:Colors.gray}]}>
              Rewards expire 90 days after you earn them. 
              They can be used only once, on a single order, 
              and may not be combined with any other offer.</Text>
            <Text style={[Textstyles.normal,{fontSize:14, marginVertical:vh(1), color:Colors.gray}]}>
              If a Restaurant cancels their programme after you've started earning rewards, 
              you'll have 60 days to finish earning the reward and 90 days to use any rewards 
              you've earned at at that Restaurant.</Text>
          </View>
            </>
      </ScrollView>

          <TouchableOpacity onPress={() => setReward(false)}
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
            <Text style={[Textstyles.normal, { color: Colors.white, textAlign:'center', fontSize: 18 }]}>OK</Text> 
          </TouchableOpacity>
          </View>
        </Modal>
      )}

      {getQuantity >= 1 && (
        <TouchableOpacity onPress={() => navigation.navigate('Checkout')}
          style={{
            height: 55,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "95%",
            position: "absolute",
            bottom: 10,
            borderRadius: 10,
            alignSelf: "center",
            backgroundColor: Colors.red,
          }}
        >
          <View>
            <Text
              style={[
                Textstyles.medium,
                {
                  fontSize: 13,
                  left: vh(2),
                  marginTop: 6,
                  color: Colors.white,
                },
              ]}
            >
              1 ITEM
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: -3,
                left: vh(2),
              }}
            >
              <Text
                style={[Textstyles.bold, { fontSize: 15, color: Colors.white }]}
              >
                $200
              </Text>
              <Text
                style={[
                  Textstyles.normal,
                  {
                    left: vh(1),
                    marginTop: -2,
                    fontSize: 11,
                    color: Colors.white,
                  },
                ]}
              >
                plus taxes
              </Text>
            </View>
          </View>
          <View
            style={{ flexDirection: "row", right: vh(1), alignItems: "center" }}
          >
            <Text
              style={[Textstyles.bold, { color: Colors.white, fontSize: 16 }]}
            >
              Next
            </Text>
            <Image
              source={Icons.arrowRight1}
              style={{ height: 14, marginTop: -3, width: 14 }}
            />
          </View>
        </TouchableOpacity>
      )}

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
              <Image source={props?.route?.params?.data?.image} style={{height:50, width:50, borderRadius:5}}/>
              <Text
                style={[
                  Textstyles.medium,
                  {
                    fontSize: 18,
                    color: Colors.black,
                    left:vh(1),
                    width:'82%'
                  },
                ]}
              >
                {props?.route?.params?.data?.ResturatName}
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
            <Text style={[Textstyles.normal, { color: Colors.white, textAlign:'center', fontSize: 18 }]}>Add items</Text> 
          </TouchableOpacity>
          </View>
        </Modal>
      )}

    </View>
  );
};

export default RestaurantItems;

const styles = StyleSheet.create({
  title_text1: {
    color: Colors.black,
    fontSize: 14,
    fontWeight: "500",
    // textAlign: 'center',
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
  quantityText: {
    color: Colors.red,
    fontSize: 16,
    marginTop:-2,
    // textAlign: "center",
    // padding: hpx(3),
    // backgroundColor:'pink'
  },
  addButton: {
    height: 16,
    width: 16,
  },
  buttonContainer: {
    backgroundColor: Colors.white,
    flexDirection: "row",
    height: 30,
    padding: hpx(5),
    marginVertical: 5,
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 1,
    borderColor: Colors.red,
    borderWidth: 1,
    width: "55%",
    borderRadius: 100,
  },
  quantity: {
    color: Colors.black,
    fontSize: 14,
    // textAlign: 'center',
  },
  itemName: {
    color: Colors.textColor,
    fontSize: 15,
    // textAlign: 'center',
  },
  actualPriceText: {
    fontSize: 15,
    color: Colors.gray,
    left: 4,
    textAlign: "center",
    textDecorationLine: "line-through",
    textAlignVertical: "center",
  },
  offerPriceText: {
    fontSize: 16,
    color: Colors.black,
    // marginVertical: vh(0.5),
    // textAlign: 'center',
  },
  rowContainer: {
    width: "50%",
    justifyContent: "center",
    paddingLeft: 5,
    // backgroundColor:'pink',
    alignItems: "flex-start",
  },
  imageView: {
    width: "50%",
    padding: 6,
  },
  cartImage: {
    height: 130,
    width: "85%",
    borderRadius: 10,
    alignSelf: "center",
  },
  deleteButton: {
    height: 16,
    width: 16,
    resizeMode: "contain",
  },
  itemContainer: {
    flexDirection: "row",
    width: "97%",
    alignSelf: "center",
  },
 
});
