import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  ImageBackground,
  Platform,
  ListViewComponent,
  ScrollView,
  KeyboardAvoidingView,
  FlatList,
  Modal,
  ActivityIndicator,
} from "react-native";
// import { TextInput } from 'react-native-paper';
import {
  widthPercentageToDP as vw,
  heightPercentageToDP as vh,
} from "react-native-responsive-screen";
import Images from "../../utils/images";
import { Colors, FontSize } from "../../utils/AppConstant";
import { useNavigation } from "@react-navigation/native";
import Icons from "../../utils/icons";
import CheckBox from '@react-native-community/checkbox';
import Slider from '@react-native-community/slider';
import TextStyle from '../../utils/text'
import Textstyles from "../../utils/text";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ApiModel from "../../common/ApiModel";
import { useMemo } from "react";
import { useEffect } from "react";
import { Item } from "react-native-paper/lib/typescript/components/Drawer/Drawer";

export default function Home() {
  const navigation = useNavigation();
  const [searchTxt, setSearchTxt] = useState("");
  const [filter , setFilter] = useState(false)
  const [isLow, setLow] = useState(false);
  const [isMedium, setMedium] = useState(false);
  const [isHigh, setHigh] = useState(false);
  const [isCritical, setCritical] = useState(false);
  const [isDefect, setDefect] = useState(false);
  const [isEnhacement, setEnhancement] = useState(false);
  const [isCR, setCR] = useState(false);
  const [isNewOne, setNewOne] = useState(false);
  const [isOldOne, setOldOne] = useState(false);
  const [price, setPrice] = useState('');
  const [maxDelivery, setMaxDelivery] = useState('');
  const [Value, setValue] = useState(0); //deliveryRange
  const [sortId, setSortId] = useState('1')
  const [dietaryCheck, setDietaryCheck] = useState('1')
  const [isLoding, setIsLoading] = useState(false);
  const [history, setHistory] = useState(
        {
        "categoryId": "1",
        "restaurantName": "Kaka Da Hotel",
        "address":"R-1208, Raj Nagar, Ghaziabad",
        "status":"Delivered",
        "date": "15 Jan 2023 at 11:56PM",
        "image": Images.KadaiPaneer,
        "repeat":'yes',
        "rating": '4.9',
        "paymentMode": 'Online',
        "restaurantPhone":'+1 516-773-2000',
        "phoneNumber":'941144XXXX',
        "Deliverto":"H-1106, Raj Nagar Extention, Ghaziabad",
        "amount":'$23.00',
        "Data": [
                {
                "itemId": "1",
                "Quantity": "5",
                "item": 'Matar Paneer',
                "price":'$5.00'
                },
                {
                "itemId": "2",
                "Quantity": "5",
                "item": 'Tandoori Butter Roti',
                "price":'$8.00'
                },
                {
                "itemId": "3",
                "Quantity": "1",
                "item": 'Dal Makhani',
                "price":'$5.00'
                },
            ]
        },
    )
  const [topCategory, setTopCategory] = useState([
    {
      'id' : '1',
      'name': 'Fast Food',
      'Category':'FastFood',
      'from': 'Category',
      'Icon': Icons.fastFood,
  },
    {
      'id' : '2',
      'name': 'Indian',
      'Category':'Indian',
      'from': 'Category',
      'Icon': Icons.indian,
  },
  {
      'id' : '3',
      'name': 'Pizza',
      'Category':'Pizza',
      'from': 'Category',
      'Icon': Icons.pizza,
  },
  {
      'id' : '4',
      'name': 'Bubble tea',
      'Category':'BubbleTea',
      'from': 'Category',
      'Icon': Icons.bubbleTea,
  },
  ])
  const [priceRange, setPriceRange] = useState([
    {
      id:'1',
      Price: '$100',
    },
    {
      id:'2',
      Price: '$200',
    },
    {
      id:'3',
      Price: '$300',
    },
    {
      id:'4',
      Price: '$500',
    },
    {
      id:'5',
      Price: '$600',
    },
    {
      id:'6',
      Price: '$700',
    },
    {
      id:'8',
      Price: '$800',
    },
    {
      id:'9',
      Price: '$900',
    },
    {
      id:'10',
      Price: '$1000',
    },
  ]);
  const [deliveryRange, setDeliveryRange] = useState([
    {
      id:'1',
      Price: '$1',
    },
    {
      id:'2',
      Price: '$4',
    },
    {
      id:'3',
      Price: '$6',
    },
    {
      id:'4',
      Price: '$8',
    },
    {
      id:'5',
      Price: '$10',
    },
  ]);
  const [filterName, setFilterName] = useState([
    {
      id:'1',
      Image: Icons.checkMarkRed,
      filterName: 'Picked for you (Default)'
    },
    {
      id:'2',
      Image: Icons.popularRed,
      filterName: 'Most popular'
    },
    {
      id:'3',
      Image: Icons.ratingRed,
      filterName: 'Rating'
    },
    {
      id:'4',
      Image: Icons.timeRed,
      filterName: 'Fast delivery time'
    },
  ]);
  const [Items, SetItems] = useState([
    {
      id: "1",
      Image: Images.KadaiPaneer,
      name: "Pizza",
    },
    {
      id: "2",
      Image: Images.noodles,
      name: "Noodles",
    },
    {
      id: "3",
      Image: Images.KadaiPaneer,
      name: "Burger",
    },
    {
      id: "4",
      Image: Images.noodles,
      name: "Chicken",
    },
    {
      id: "5",
      Image: Images.KadaiPaneer,
      name: "Thali",
    },
    {
      id: "6",
      Image: Images.noodles,
      name: "Rolls",
    },
    {
      id: "7",
      Image: Images.KadaiPaneer,
      name: "Chowmein",
    },
    {
      id: "8",
      Image: Images.noodles,
      name: "Paneer",
    },
    {
      id: "9",
      Image: Images.KadaiPaneer,
      name: "Winter Food",
    },
    {
      id: "10",
      Image: Images.noodles,
      name: "Dosa",
    },
    // {
    //   id: "11",
    //   Image: Images.KadaiPaneer,
    //   name: "Paneer",
    // },
    // {
    //   id: "12",
    //   Image: Images.noodles,
    //   name: "Paneer",
    // },
    // {
    //   id: "13",
    //   Image: Images.KadaiPaneer,
    //   name: "Paneer",
    // },
    // {
    //   id: "14",
    //   Image: Images.noodles,
    //   name: "Paneer",
    // },
    // {
    //   id: "15",
    //   Image: Images.KadaiPaneer,
    //   name: "Paneer",
    // },
  ]);
  const [dietary, setDietary] = useState([
    {
      id:'1',
      Image: Icons.vegetarianRed,
      dietaryName: 'Vegetarian'
    },
    {
      id:'2',
      Image: Icons.favRed,
      dietaryName: 'Vegan'
    },
    {
      id:'3',
      Image: Icons.glutenRed,
      dietaryName: 'Gluten-free'
    },
    {
      id:'4',
      Image: Icons.halalRed,
      dietaryName: 'Halal'
    },
    {
      id:'5',
      Image: Icons.allergyRed,
      dietaryName: 'Allergy Friendly'
    },
  ]);

  const [profile, setProfile] = useState()
  const [categoryData , setCategoryData] = useState();
  const [allProducts, setAllProducts] = useState();

  console.log('---------GET CATEE BY PRODUCT', allProducts)


   //Get Product By Rest.ID Api
const getAllCategory = async() => {
  setIsLoading(true);
  let data = JSON.stringify({
    "categoryId": "6405accbf7179511b7e8759e"  
  })
  ApiModel.sendApiCall(
    `/api/Restaurants/v1/getRestaurantsByCategory`,
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
    getAllCategory();
    },[])



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


  return (
    <View style={styles.container}>
       
      <ImageBackground
        source={Images.ImageBackground}
        style={{
          justifyContent: "space-between",
          height: 170,
          // backgroundColor: "pink",
          width: "100%",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            marginTop: vh(1),
            width: "95%",
            alignSelf: "center",
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: "row",
            position: "absolute",
            backgroundColor: 'transparent',
            // backgroundColor:'#ffffff99',
            padding:10,
            borderRadius:2,
          }}
        >
          <View style={{ width: "72%"}}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={[TextStyle.medium, { color: "white", fontSize: 15 }]}>Delivered to</Text>
              <Image
                source={Icons.arrowDown}
                style={{ height: 15, left: 3, top: 2, width: 15 }}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                marginVertical: 2,
                alignItems: "center",
              }}
            >
              
              <Image
                source={Icons.location}
                style={{ height: 18, width: 18 }}
              />
              <Text
                style={[TextStyle.medium, {
                  color: Colors.white,
                  fontSize: 17,
                  left: 5,
                  fontWeight: "600",
                }]}
              >
                43, New York city...
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              width: "28%",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <View style={{flexDirection:'row'}}>
            <Image
              source={Icons.redBell}
              style={{ height: 30, justifyContent: "center", width: 30 }}
            />
            <View style={{backgroundColor: 'darkgreen', justifyContent:'center', left:-10, top:-5, padding:2, minWidth:23, height:23, borderRadius: 100}}>
              <Text style={[TextStyle.normal,{color:Colors.white, paddingLeft:5, paddingRight:5, textAlign:'center', fontSize:14}]}>6</Text>
            </View>
            </View>
          <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={{top:-5, justifyContent:'center', borderRadius:100, borderWidth:1, borderColor:Colors.black, height:50, width:50, alignItems:'center', borderRadius:25, backgroundColor:Colors.white}}>
            <Image
              // resizeMode="center"
              source={profile?.profile
                ? {uri: profile?.profile}
                : Icons.userProfile}
              style={{ height:profile?.profile? 50:40, borderRadius:profile?.profile? 25:20, width:profile?.profile? 50:40 }}
            />
          </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          borderRadius: 20,
          alignSelf: "center",
          marginTop: -vh(3.8),
          backgroundColor: Colors.white,
          width:'95%',
          elevation: 10,
          alignItems:'center'
        }}
      >
        <View
          style={{
            // left: 10,
            width:'12%'
          }}
        >
          <Image source={Icons.search} style={{ height: 25, alignSelf:'center', width: 25 }} />
        </View>

        <TextInput
          value={searchTxt}
          placeholder="Search Foods, Stores..."
          placeholderTextColor={Colors.gray}
          theme={{
            roundness: 10,
            colors: {
              primary: Colors.black,
              text: Colors.black,
              placeholder: Colors.black,
            },
          }}
          onChangeText={() => setSearchTxt()}
          style={[TextStyle.normal, {
            width: "75%",
            height: 50,
            fontSize: 16,
            paddingRight: 5,
            paddingLeft: 5,
            paddingBottom:8,
            justifyContent:'center',
            backgroundColor:Colors.white,
            alignSelf: "center",
            color:Colors.black
          }]}
        />

        <TouchableOpacity onPress={() => setFilter(true)}
          style={{
            height:40,
            justifyContent:'center',
            width:'12%',
            borderLeftWidth:1,
            borderColor:'lightgrey'
          }}
        >
          <Image source={Icons.filter} style={{ height: 25, alignSelf:'center', width: 25 }} />
        </TouchableOpacity>
      </View>

      {isLoding ? <ActivityIndicator size="large" color={Colors?.red} style={{flex:1}}/>:
       <>

      <ScrollView showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 100 }}>
        <>

      <View style={{alignSelf:'center', marginVertical:vh(2), flexDirection:'row', justifyContent:'space-between', width:'95%'}}>
          <TouchableOpacity onPress={() => navigation.navigate('Restaurants')}
              style={{height:90, justifyContent:'center', borderRadius:20,  width:'48%',backgroundColor:'#E2E6E2'}}>
             <View style={{ width:'90%', alignSelf:'center'}}>
              <Image source={Icons.restaurates} style={{height:35, alignSelf:'flex-end', marginVertical:5, width:35}}/>
              </View>
              <Text style={[ TextStyle.medium, { color:Colors.black,left:vh(1.5), fontSize:15}]}>Restaurants</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Restaurants', {data:'Convenience'})}
              style={{height:90, justifyContent:'center', borderRadius:20,  width:'48%',backgroundColor:'#E2E6E2'}}>
             <View style={{ width:'90%', alignSelf:'center'}}>
              <Image source={Icons.Convenience} style={{height:30, alignSelf:'flex-end', marginVertical:5, width:30}}/>
              </View>
              <Text style={[ TextStyle.medium, { color:Colors.black,left:vh(1.5), fontSize:15}]}>Convenience</Text>
          </TouchableOpacity>
      </View>

        <View style={{width:'95%', alignSelf:'center'}}>
          <Text
            style={[TextStyle.medium,{
              marginVertical: vh(2),
              color: Colors.black,
              fontSize:16
            }]}
          >
            Today's Best Choice
          </Text>
          </View>
      
          <TouchableOpacity onPress={() => navigation.navigate('RestaurantsOffers')}
            style={{
              flexDirection: "row",
              alignSelf: "center",
              borderRadius: 10,
              alignItems: "center",
              justifyContent: "space-around",
              height: 150,
              width: "95%",
              backgroundColor: Colors.yellow,
            }}
          >
            <Image
              resizeMode="center"
              source={Images.KadaiPaneer}
              style={{ height: 130, borderRadius: 10, width: 100 }}
            />
            <View style={{  }}>
              <Text
                style={[ TextStyle.bold , { fontSize: 17, color: Colors.white, fontWeight: "600" }]}
              >
                Big Brother Donuts
              </Text>
              <Text
                style={[ TextStyle.medium ,{ fontSize: 15, color: Colors.white, fontWeight: "600" }]}
              >
                #BestFriendPackage
              </Text>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image source={Icons.Store} style={{ height: 18, width: 18 }} />
                <Text style={[TextStyle.normal, {fontSize: 13, left: 5, color: Colors.white }]}>
                  Howkins Donuts
                </Text>
              </View>
              
              <View
                style={{
                  backgroundColor: Colors.gray,
                  top: vh(1.5),
                  borderRadius: 20,
                  width: "70%",
                  flexDirection:'row',
                  alignItems:'center',
                  justifyContent:'center'
                }}
              >
                <Image source={Icons.shopingBag} style={{height:12, width:12}}/>
                <Text
                  style={[TextStyle.normal, {
                    padding: 7,
                    color: Colors.white,
                    textAlign: "center",
                    fontSize:14,
                    top:1
                  }]}
                >
                  Order Now
                </Text>
              </View>
            </View>
          </TouchableOpacity>

          <View
            style={{
              width: "100%",
              alignSelf: "center",
              marginVertical: vh(3),
            }}
          >
          <View style={{width:'95%', alignItems:'center',  justifyContent:'space-between', flexDirection: "row", alignSelf:'center'}}>
            <Text style={[ TextStyle.medium , { color: Colors.black , fontSize:17}]}>
              Available Promo
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('RestaurantsOffers')}
              style={{paddingLeft:5}}>
            <Text style={[TextStyle.normal, { color: "green", fontSize: 12 }]}>See all</Text>
            </TouchableOpacity>
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              width: "98%",
              alignSelf: "center",
              justifyContent: "space-around",
            }}
          >
            <View
              style={{
                backgroundColor: Colors.white,
                borderRadius: 10,
                elevation: 10,
                width: "30%",
              }}
            >
              <View
                style={{
                  justifyContent: "space-between",
                  width: "95%",
                  marginHorizontal: 4,
                  marginVertical: 4,
                }}
              >

                <View
                  style={{
                    height: 90,
                    backgroundColor: "#DCDCDC",
                    alignSelf: "center",
                    justifyContent: "center",
                    borderRadius: 10,
                    width: 90,
                  }}
                >
                  <Image
                    resizeMode="cover"
                    source={Images.burger}
                    style={{
                      height: 60,
                      alignSelf: "center",
                      borderRadius: 10,
                      width: 60,
                    }}
                  />
                </View>
                <Text
                  style={[ TextStyle.normal, {
                    fontSize: 11,
                    width: "50%",
                    left: vh(1),
                    // paddingTop: 4,
                    top:2,
                    alignSelf: "flex-start",
                    color: Colors.white,
                    padding: 2,
                    borderRadius: 5,
                    paddingTop:4,
                    textAlign: "center",
                    backgroundColor: Colors.red,
                  }]}
                >
                  30% off
                </Text>
              </View>

              <Text
                style={[TextStyle.bold, {
                  left: vh(1.5),
                  width: "85%",
                  fontSize: 15,
                  color: Colors.black,
                }]}
              >
                Howkins Donuts
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  left: vh(1.5),
                  alignItems: "center",
                }}
              >
                <Image
                  source={Icons.starhalf}
                  style={{ height: 14, width: 14 }}
                />
                <Text style={[TextStyle.normal, {fontSize: 12, top:2, color: 'darkgreen', left:3}]}>
                  4.6
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  left: vh(1.5),
                  alignItems: "center",
                }}
              >
                <Image
                  source={Icons.location}
                  style={{ height: 12, width: 12 }}
                />
                <Text style={[ TextStyle.normal, { fontSize: 12, top:2, color: Colors.gray, left: 3 }]}>
                  0.6 Miles
                </Text>
              </View>
            </View>



            <View
              style={{
                backgroundColor: Colors.white,
                borderRadius: 10,
                elevation: 10,
                width: "30%",
              }}
            >
              <View
                style={{
                  justifyContent: "space-between",
                  width: "95%",
                  marginHorizontal: 4,
                  marginVertical: 4,
                }}
              >
                <View
                  style={{
                    height: 90,
                    backgroundColor: "#DCDCDC",
                    alignSelf: "center",
                    justifyContent: "center",
                    borderRadius: 10,
                    width: 90,
                  }}
                >
                  <Image
                    resizeMode="cover"
                    source={Images.noodles}
                    style={{
                      height: 60,
                      alignSelf: "center",
                      borderRadius: 10,
                      width: 60,
                    }}
                  />
                </View>
                <Text
                  style={[TextStyle.normal, {
                    fontSize: 11,
                    width: "50%",
                    left: vh(1),
                    top: 4,
                    alignSelf: "flex-start",
                    color: Colors.white,
                    padding: 2,
                    paddingTop:4,
                    borderRadius: 5,
                    textAlign: "center",
                    backgroundColor: Colors.red,
                  }]}
                >
                  30% off
                </Text>
              </View>

              <Text
                style={[TextStyle.bold, {
                  left: vh(1.5),
                  width: "85%",
                  fontSize: 15,
                  color: Colors.black,
                }]}
              >
                Noodles Kings
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  left: vh(1.5),
                  alignItems: "center",
                }}
              >
                <Image
                  source={Icons.starhalf}
                  style={{ height: 14, width: 14 }}
                />
                <Text style={[TextStyle.normal, { fontSize: 12, top:2, color: 'darkgreen', left: 3 }]}>
                  4.6
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  left: vh(1.5),
                  alignItems: "center",
                }}
              >
                <Image
                  source={Icons.location}
                  style={{ height: 12, width: 12 }}
                />
                <Text style={[TextStyle.normal, { fontSize: 12, color: Colors.gray, left: 3 }]}>
                  0.6 Miles
                </Text>
              </View>
            </View>

            <View
              style={{
                backgroundColor: Colors.white,
                padding: 2,
                borderRadius: 10,
                elevation: 10,
                width: "30%",
              }}
            >
              <View
                style={{
                  justifyContent: "space-between",
                  width: "95%",
                  marginHorizontal: 4,
                  marginVertical: 4,
                }}
              >
                <View
                  style={{
                    height: 90,
                    backgroundColor: "#DCDCDC",
                    alignSelf: "center",
                    justifyContent: "center",
                    borderRadius: 10,
                    width: 90,
                  }}
                >
                  <Image
                    resizeMode="cover"
                    source={Images.burger}
                    style={{
                      height: 60,
                      alignSelf: "center",
                      borderRadius: 10,
                      width: 60,
                    }}
                  />
                </View>
                <Text
                  style={[TextStyle.normal, {
                    fontSize: 11,
                    width: "50%",
                    left: vh(1),
                    top: 2,
                    alignSelf: "flex-start",
                    color: Colors.white,
                    padding: 2,
                    paddingTop:4,
                    borderRadius: 5,
                    textAlign: "center",
                    backgroundColor: Colors.red,
                  }]}
                >
                  30% off
                </Text>
              </View>

              <Text
                style={[TextStyle.bold,{
                  left: vh(1.5),
                  width: "85%",
                  fontSize: 15,
                  color: Colors.black,
                }]}
              >
                Pizza Junction
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  left: vh(1.5),
                  alignItems: "center",
                }}
              >
                <Image
                  source={Icons.starhalf}
                  style={{ height: 14, width: 14 }}
                />
                <Text style={[TextStyle.normal, { fontSize: 12, top:2, color: 'darkgreen', left: 3 }]}>
                  4.6
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  left: vh(1.5),
                  alignItems: "center",
                }}
              >
                <Image
                  source={Icons.location}
                  style={{ height: 12, width: 12 }}
                />
                <Text style={[ TextStyle.normal, { fontSize: 12, color: Colors.gray, left: 3 }]}>
                  0.6 Miles
                </Text>
              </View>
            </View>
          </View>


          <View
            style={{
              width: "100%",
              alignSelf: "center",
              marginVertical: vh(3),
            }}
          >
            <View style={{width:'95%', alignItems:'center', justifyContent:'space-between', flexDirection: "row", alignSelf:'center'}}>
            <Text style={[TextStyle.medium, {fontSize:17, color: Colors.black }]}>
              Category
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Restaurants')}
                style={{}}>
              <Text style={[TextStyle.normal, { color: "green", fontSize: 12 }]}>See all</Text>
            </TouchableOpacity>
            </View>
          </View>

          <View
            style={{ width: "95%", alignItems:'center', marginTop: -vh(1), alignSelf: "center" }}
          >
            <FlatList
              data={categoryData}
              numColumns={5}
              renderItem={({ item }) => (
                <TouchableOpacity
                onPress={() => navigation.navigate('Restaurants', {data:item, keyFrom: 'Category'})}
                  style={{
                    justifyContent: "space-between",
                    alignItems: "center",
                    width:'20%'
                  }}
                >
                  {/* {console.log('---------------GETTT CATEE', item)} */}
                  <Image
                    resizeMode="center"
                    source={{uri: item?.icon}}
                    style={{ height: 60, borderWidth:1, borderColor:Colors.yellow, borderRadius: 30, width: 60 }}
                  />
                  <Text
                    style={[TextStyle.medium,{
                      fontSize: 11,
                      fontWeight: "500",
                      color: Colors.black,
                      textAlign:'center'
                    }]}
                  >
                    {item?.title}
                  </Text>
                </TouchableOpacity>
              )}
              keyExtractor={(i, index) => "id" + index}
              // onRefresh={() => getSearch()}
              // refreshing={loding}
            />
          </View>


  <View style={{height:5, marginVertical:vh(2), backgroundColor:'#E2E6E2'}}></View>
    <View style={{width:'95%',  alignSelf:'center' }}>
          <FlatList
            data={allProducts?.slice(0,4)}
            numColumns={2}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
            <View style={{alignSelf:'center',  marginVertical:vh(1), width:'50%'}}>
              {/* {console.log('----------GET CATTEEE ITEMS', item)} */}
              <TouchableOpacity 
                    onPress={() => navigation.navigate('RestaurantItems', {data:item})}
                    style={{height:60,  alignItems:'center', justifyContent:'space-evenly', alignSelf:'center', flexDirection:'row', borderRadius:10,  width:'90%', backgroundColor:'#E2E6E2'}}>
                  <View style={{width:'70%'}}>    
                  <Text style={[Textstyles.medium, { color:Colors.black, textAlign:'center', fontSize:15}]}>{item?.restaurantName.slice(0,22)}</Text>
                  </View>
                  <Image source={{uri: item?.profile}} style={{height:40, borderRadius:5, marginVertical:5, width:40}}/>
              </TouchableOpacity>
            </View>
            )}
            keyExtractor={(i, index) => "id" + index}
          />
  </View>
<View style={{height:5, marginVertical:vh(2), backgroundColor:'#E2E6E2'}}></View>

      <View style={{width:'95%', alignSelf:'center'}}>
          <Text
            style={[Textstyles.medium, {
              marginVertical: vh(2),
              color: Colors.black,
              fontSize:17
            }]}>
            Repeat Last Order
          </Text>
      </View>

          <TouchableOpacity onPress={()=> navigation.navigate('OrderSummary', {data: history})}
            style={{
              flexDirection: "row",
              alignSelf: "center",
              borderRadius: 10,
              alignItems: "center",
              justifyContent: "space-around",
              height: 150,
              width: "95%",
              backgroundColor: Colors.yellow,
            }}
          >
          <View style={{alignSelf:'center', width:'35%'}}>
            <Image
              source={Images.KadaiPaneer}
              resizeMode='center'
              style={{ height: 130, borderRadius: 10, alignSelf:'center', width: 90 }}
            />
          </View>
            <View style={{ width:'65%' , marginTop:-vh(2), paddingHorizontal:vh(2)}}>
            <View style={{ flexDirection: "row", marginVertical:3, alignItems: "center" }}>
                <Image source={Icons.Store} style={{ height: 18, width: 18 }} />
                <Text style={[TextStyle.normal, {fontSize: 13, left: 5, color: Colors.white}]}>
                  {history?.restaurantName}
                </Text>
              </View>

              <Text
                style={[TextStyle.medium, {fontSize: 15, marginVertical:3, color: Colors.white, fontWeight: "600"}]}>
                Chocolate Donuts with choco chips
              </Text>
            
            <View style={{flexDirection:'row', top:4, justifyContent:'space-between', width:'50%'}}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Image
                  source={Icons.starhalf1}
                  style={{ height: 14, width: 14 }}
                />
                <Text style={[TextStyle.normal, { fontSize: 12, top:2, color: 'darkgreen', left: 3 }]}>
                  4.6
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Image
                  source={Icons.location}
                  style={{ height: 12, width: 12 }}
                />
                <Text style={[TextStyle.normal, { fontSize: 12, top:2, color: 'darkgreen', left: 3 }]}>
                  0.6 Miles
                </Text>
              </View>
            </View>
             

            <View style={{flexDirection:'row', marginTop:vh(1.2),}}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                // marginVertical:5,
                
              }}
            >
              <Text style={[TextStyle.medium, { fontSize: 14, color: Colors.white, fontWeight:'600',}]}>
               $ 200.00
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text style={[ TextStyle.medium, { fontSize: 13, left:vh(1), textDecorationLine:'line-through', color: Colors.gray}]}>
                $ 150.00
              </Text>
            </View>
          </View>
            </View>
          </TouchableOpacity>

        <View
          style={{
            width: "100%",
            alignSelf: "center",
            marginVertical: vh(3),
          }}
        >
        <View style={{width:'95%', alignItems:'center', justifyContent:'space-between', flexDirection: "row", alignSelf:'center'}}>
          <Text style={[Textstyles.medium, { fontSize:17, color: Colors.black }]}>
            Special for you
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('RestaurantsRewards')}
            style={{paddingLeft:5}}>
          <Text style={[TextStyle.normal, { color: "green", fontSize: 12 }]}>See all</Text>
          </TouchableOpacity>
        </View>
        </View>

        <View style={{height:170,  alignSelf:'center', flexDirection:'row', width:'95%'}}>
        <View style={{backgroundColor:Colors.red, borderRadius:5, padding:1, paddingTop:4, left:5, paddingLeft:5, paddingRight:5,  zIndex:99, position:'absolute',marginTop:10,}}>
          <Text style={[TextStyle.normal, {color:Colors.white, fontSize:12}]}>30% off</Text>
        </View>
        <Image resizeMode="center" source={Images.soyaChaap} style={{height:'100%', overflow:'hidden', borderRadius:10, alignSelf:'center', width:'100%'}}></Image>
        </View>

        <View style={{width:'92%', marginTop:2, alignSelf:'center'}}>
          <View style={{flexDirection:'row', justifyContent:'space-between'}}>
           <Text style={[TextStyle.medium, {fontSize:15, fontWeight:'500', color:Colors.black}]}>Soya Chaap with delicious chat</Text>
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
           <Text style={[TextStyle.normal, { fontSize: 12, top:2, color: 'darkgreen', left: 3 }]}>
             4.8
           </Text>
         </View>
           </View>
           <Text style={[TextStyle.normal, {fontSize:13,fontWeight:'500', color:Colors.gray}]}>$ 150 Delivery Fee 50-60 min</Text>
        </View>
        </>
      </ScrollView>


{ filter &&
      <Modal 
      transparent={true}
      // animationType={"fade"}
      animationType={"slide"}
      style={{width:'95%', position:'absolute', height:'100%'}}
      >
    <View style={styles.container1}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setFilter(false)} 
          style={{}}>
          <Image
            source={Icons.arrowRed}
            style={{ resizeMode: "contain", height: 28, width: 28,  }}
          />
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', marginTop:5, marginRight: "32%" }}>
          <Image
            source={Icons.filter}
            style={{ resizeMode: "contain",  height: 20, top: 2, width: 20, }}
          />
          <Text style={[TextStyle.bold, styles.filterHeaderText]}>All Filters</Text>
        </View>
      </View>
      <View style={{ alignSelf: 'flex-end', marginRight: '9%' }}>
        <Image
          source={Images.ResetActive}
          style={{ resizeMode: "contain" }}
        />
      </View>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom:10}} >
      <View style={{width:'100%',  alignSelf:'flex-end'}}>
      <Text style={[Textstyles.bold, {fontSize:18, marginTop:vh(1), color: Colors.black }]}>
            Sort
          </Text>
      <FlatList
        data={filterName}
        renderItem={({ item }) => (
        <TouchableOpacity onPress={() => setSortId(item?.id)}
            style={{flexDirection:'row', justifyContent:'space-between', marginTop:vh(2), alignItems:'center'}}>
        <View style={{flexDirection:'row'}}>
          <Image source={item?.Image} style={{height:24, width:24}}/>
          <Text style={[TextStyle.normal, {marginLeft:vh(2), color:Colors.black, fontSize:16}]}>{item?.filterName}</Text>
        </View>
        {sortId === item?.id &&
        <View style={{right:10,}}>
          <Image source={Icons.done} style={{height:20, width:20}}/>
        </View>
        }
        </TouchableOpacity>
        )}
        keyExtractor={(i, index) => "id" + index}
      />  

      <Text style={[Textstyles.bold, styles.listHeaderTitle]}>
        Price range
      </Text>

      <FlatList
        data={priceRange}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <ScrollView>
            <View style={{flexDirection:'row', width:'100%', marginTop:vh(2), alignItems:'center'}}>
              {price === item?.id ? 
                <TouchableOpacity onPress={() => setPrice(item?.id) } style={{ marginHorizontal:vh(0.6), height:50, backgroundColor:Colors.black, borderRadius:25, borderWidth:1, borderColor:Colors.black, justifyContent:'center', alignItems:'center', width:50 }}>
                  <Text style={[TextStyle.normal,{color:Colors.white, fontWeight:'500', fontSize:15}]}>{item?.Price}</Text>
                </TouchableOpacity>
                :
                <TouchableOpacity onPress={() => setPrice(item?.id) } style={{ marginHorizontal:vh(0.6), height:50, borderRadius:25, borderWidth:1, borderColor:Colors.black, justifyContent:'center', alignItems:'center', width:50 }}>
                  <Text style={[TextStyle.normal, {color:Colors.black, fontSize:15}]}>{item?.Price}</Text>
                </TouchableOpacity>
              }
            </View>
        </ScrollView>
        )}
        keyExtractor={(i, index) => "id" + index}
      />  

          <Text style={[Textstyles.bold, styles.listHeaderTitle]}>
             Max. delivery fee
          </Text>

    <FlatList
        data={deliveryRange}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <ScrollView>
            <View style={{flexDirection:'row', width:'100%', marginTop:vh(2), alignItems:'center'}}>
              {maxDelivery === item?.id ?
              <TouchableOpacity onPress={() => setMaxDelivery(item?.id)}
                  style={{ marginHorizontal:vh(0.6), backgroundColor:Colors.black, height:50, borderRadius:25, borderWidth:1, borderColor:Colors.black, justifyContent:'center', alignItems:'center', width:50 }}>
                <Text style={[TextStyle.normal, {color:Colors.white, fontWeight:'500', fontSize:15}]}>{item?.Price}</Text>
              </TouchableOpacity>
              :
              <TouchableOpacity onPress={() => setMaxDelivery(item?.id)}
                  style={{ marginHorizontal:vh(0.6), height:50, borderRadius:25, borderWidth:1, borderColor:Colors.black, justifyContent:'center', alignItems:'center', width:50 }}>
                <Text style={[TextStyle.normal,{color:Colors.black, fontWeight:'500', fontSize:15}]}>{item?.Price}</Text>
              </TouchableOpacity>
              }
            </View>
        </ScrollView>
        )}
        keyExtractor={(i, index) => "id" + index}
      />  

          <Text style={[Textstyles.bold, styles.listHeaderTitle]}>  
            Dietary
          </Text>

      <FlatList
        data={dietary}
        renderItem={({ item }) => (
        <TouchableOpacity onPress={() => setDietaryCheck(item?.id)}
            style={{flexDirection:'row', justifyContent:'space-between', marginTop:vh(2), alignItems:'center'}}>
          <View style={{flexDirection:'row'}}>
          <Image source={item?.Image} style={{height:24, width:24}}/>
          <Text style={[TextStyle.normal, {marginLeft:vh(2), color:Colors.black, fontSize:16, fontWeight:'400'}]}>{item?.dietaryName}</Text>
          </View>
        {dietaryCheck === item?.id &&
        <View style={{right:10,}}>
          <Image source={Icons.done} style={{height:20, width:20}}/>
        </View>
        }

        </TouchableOpacity>
        )}
        keyExtractor={(i, index) => "id" + index}
      />  
  </View>   



      <View style={styles.footerContainer}>
        <View style={styles.createBtn}>
          <TouchableOpacity onPress={() => setFilter(false)}>
            <Text style={[Textstyles.medium, styles.createText]}>Apply</Text>
          </TouchableOpacity>
        </View>
      </View>     
</ScrollView>

      
    </View>
    </Modal>
  }

                <TouchableOpacity  
                  onPress={()=> navigation.navigate('OrderHistory')}
                    style={{flex:1, position:'absolute',  alignSelf:'center', bottom:15,  height:50, width:'95%', elevation:10, borderRadius:25, alignItems:'center', justifyContent:'center'}}>
                        <View style={{ top:0, marginBottom:10, right:0, left:0,  justifyContent:'space-around', height:75, alignItems:'center', flexDirection:'row', backgroundColor:Colors.gray, borderRadius:20, width:'100%', alignSelf:'center'}}>
                          {/* <Image source={Icons.Cycles} style={{ height: 30,  width:30 }}/> */}
                          <Image source={Images.iconOfficial} style={{ height: 45,  width:45 }}/>
                          <View style={{right:10}}>
                          <Text style={[Textstyles.medium, {color:'lightgrey', fontSize:17}]}>You have 1 active order</Text>
                          <Text style={[Textstyles.normal,{color:'lightgrey'}]}>Delivering to your location</Text>
                          </View>
                          <View style={{height:40, backgroundColor:Colors.red,justifyContent:'center', borderRadius:20, width:40}}>
                          <Image source={Icons.nextWhiteIcon} style={{ height: 18,  alignSelf:'center',  width:20 }}/>
                          </View>
                        </View> 
                </TouchableOpacity>


      {/* <View style={{ top:0, marginBottom:10, right:0, left:0,  justifyContent:'space-around', height:80, alignItems:'center', flexDirection:'row', backgroundColor:Colors.gray, borderRadius:20, width:'95%', alignSelf:'center'}}>
        <Image source={Icons.Cycles} style={{ height: 30,  width:30 }}/>
        <View>
        <Text style={{color:'lightgrey', fontSize:17, fontWeight:'600'}}>You have 1 active order</Text>
        <Text style={{color:'lightgrey'}}>Delivering to your location</Text>
        </View>
        <View style={{height:40, backgroundColor:Colors.red,justifyContent:'center', borderRadius:20, width:40}}>
        <Image source={Icons.nextWhiteIcon} style={{ height: 18,  alignSelf:'center',  width:20 }}/>
        </View>
      </View>  */}

</>
    }

      </View>
    );
  }

const styles = StyleSheet.create({


  container1: {
    backgroundColor: "white",
    paddingLeft:15,
    paddingRight:15,
    width:'100%',
    alignSelf:'center',
    height:'100%',
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  header: {
    backgroundColor: '#fff',
    paddingHorizontal: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    height: 50,
    width: '100%',
    borderTopLeftRadius:20,
    borderBottomWidth:1,
    borderBottomColor:Colors.gray,
    borderTopRightRadius:20,
    shadowColor: '#00000040',
    // shadowOffset: {
    //   width: 1, height: 1
    // },
    // shadowOpacity: 1,
    // elevation: 5,
  },
  scrollContainer: {
    paddingHorizontal: 28,
    backgroundColor: '#fff',
    marginVertical: 10,
    height:'50%'
  },
  resetFilters: {
    marginTop: 20,
    marginRight: 40,
    textAlign: 'right'
  },
  listSectionConteiner: {
    marginTop: 24
  },
  listHeaderTitle: {
    color: Colors.black,
    fontSize: 18,
    marginTop:vh(2)
  },
  severityText: {
    marginTop: 30,
    alignSelf: 'flex-start',
    left: '6%',
    color: '#00000099',
    fontSize: 16
  },
  listItem: {
    borderWidth: 1,
    marginTop: 5,
    height: 35,
    borderColor: '#E4E4E4',
    backgroundColor: Colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20
  },
  applyCancebtn: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  cancelebtn: {
    height: 40,
    width: 100,
    backgroundColor: 'red'

  },
  applybtn: {
    height: 40,
    width: 100,
    backgroundColor: 'blue'
  },
  listItemTitle: {
    fontSize: 15
  },
  listItemCheckbox: {
    width: 18,
    height: 18,
  },
  filterHeaderText: {
    color:Colors.black,
    fontSize: 20,
    bottom: 2,
    marginLeft: '3%',
  },
  cancelBtn: {
    width: '50%',
    backgroundColor: '#e0dede',
    justifyContent: 'center'

  },

  createBtn: {
    width: '80%',
    height: 45,
    borderRadius:10,
    alignSelf:'center',
    backgroundColor:Colors.gray,
    justifyContent: 'center',
  },
  cancelText: {
    color: '##00000099',
    // fontFamily: 'Roboto',
    fontSize: 18,
    textAlign: 'center'
  },

  createText: {
    color: 'white',
    // fontFamily: 'Roboto',
    fontSize: 17,
    textAlign: 'center',
  },

  footerContainer: {
    width: '100%',
    alignSelf: 'center',
    marginVertical:vh(4)
  },




















  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: Platform == "ios" ? vh(5) : 0,
    // alignItems: "center",
    // justifyContent: "center",
  },
  imgView: {
    alignSelf: "center",
    width: "100%",
    marginTop: -vh(5),
  },
  img: {
    width: vw(50),
    height: vh(20),
    borderRadius: 20,
    alignSelf: "center",
  },
  img1: {
    width: vw(25),
    height: vh(10),
    borderRadius: 5,
    alignSelf: "center",
    marginTop: vh(3),
  },
  userimg: {
    width: vw(15),
    height: vh(12),
    borderRadius: 20,
    alignSelf: "center",
    marginTop: -vh(4),
  },
  inputView: {
    borderRadius: 5,
    borderColor: "grey",
    // borderWidth:1,
    width: "95%",
    height: 45,
    marginBottom: 20,
    alignSelf: "center",
    marginLeft: 30,
  },

  TextInput: {
    height: 50,
    width: "90%",
    // flex: 1,
    // padding: 10,
    // marginLeft: 20,
  },

  forgot_button: {
    height: 30,
    marginBottom: 20,
    alignSelf: "flex-end",
    marginRight: 28,
    color: "black",
    // marginTop:-vh(1),
  },

  loginBtn: {
    width: "80%",
    // borderRadius: 25,
    height: 50,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    marginTop: -vh(2),
    backgroundColor: "#0000B9",
  },
  text: {
    height: 30,
    marginBottom: 20,
    alignSelf: "center",
    color: "black",
    marginTop: 9,
  },

  img6: {
    width: vw(10),
    height: vh(10),
    // borderRadius: 5,
    alignSelf: "center",
    marginTop: -vh(3),
  },
});
