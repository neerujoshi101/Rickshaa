import { Image, StyleSheet, Text, View, FlatList, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect, useReducer, useState } from 'react'
import { Colors ,  hp,  hpx, wp, wpx,} from '../../utils/AppConstant'
import Icons from '../../utils/icons'
import { useNavigation } from '@react-navigation/native'
import Images from '../../utils/images'
import {
    widthPercentageToDP as vw,
    heightPercentageToDP as vh,
  } from "react-native-responsive-screen";
import Textstyles from '../../utils/text'
import { useMemo } from 'react'
import ApiModel from '../../common/ApiModel'

const Restaurants = (props) => {
    const [categoryId, setCategoryId] = useState(
      props.route?.params?.data?._id ? props.route?.params?.data?._id : '6405accbf7179511b7e8759e');
    const [wishlist, setWishlist] = useState(false)
    const navigation = useNavigation()
    const [isLoding, setIsLoading] = useState(false)
    const [restLoading, setRestLoading] = useState(false)
    const [cardDataBkp, setCardDataBkp] = useState([]);
    const [cartData, setCartData] = useState([
      // {
      //   id:'1',
      //   Category:'Indian',
      //   ResturatName:'Buttar Chicken Factory',
      //   image:Images.soyaChaap,
      //   deliveryFee:'$26.18',
      //   ResturatAvailability:'15-30 min',
      //   buyOneGet:'Buy 1 get 1 free',
      //   Rating:'4.8',
      //   address: '575 8th Ave, New York, NY 10018, United States',
      //   openTime:'4:00 PM'
      // },
      // {
      //   id:'2',
      //   Category:'Indian',
      //   ResturatName:'Chawla Indian',
      //   image:Images.sushi,
      //   deliveryFee:'$20.18',
      //   ResturatAvailability:'15-30 min',
      //   buyOneGet:'',
      //   Rating:'4.2',
      //   address: '21-69 Steinway St, Queens, NY 11105, United States',
      //   openTime:'5:00 PM',
      // },
      // {
      //   id:'3',
      //   Category:'Asian',
      //   ResturatName:'Saravanaa Bhavan',
      //   image:Images.KadaiPaneer,
      //   deliveryFee:'$29.18',
      //   ResturatAvailability:'30-45 min',
      //   buyOneGet:'',
      //   Rating:'4.4',
      //   buyOneGet:'Buy 1 get 1 free',
      //   address: '575 8th Ave, New York, NY 10018, United States',
      //   openTime:'6:00 PM',
      // },
      // {
      //   id:'4',
      //   Category:'Indian',
      //   ResturatName:'Kesar Indian Kitchen',
      //   image:Images.soyaChaap,
      //   deliveryFee:'$15.18',
      //   ResturatAvailability:'30-40 min',
      //   buyOneGet:'',
      //   Rating:'3.9',
      //   address: '308 E 78th St, New York, NY 10075, United States',
      //   openTime:'7:00 PM'
      // },
      // {
      //   id:'5',
      //   Category:'Indian',
      //   ResturatName:'Satya South Indian Restaurant',
      //   image:Images.KadaiPaneer,
      //   deliveryFee:'$19.18',
      //   ResturatAvailability:'15-35 min',
      //   buyOneGet:'',
      //   Rating:'4.7',
      //   address: '44, New York City, USA',
      //   openTime:'8:00 PM'
      // },
      // {
      //   id:'6',
      //   Category:'Deals',
      //   ResturatName:'Curry In a Hurry',
      //   image:Images.soyaChaap,
      //   deliveryFee:'$2.99',
      //   ResturatAvailability:'15-25 min',
      //   buyOneGet:'',
      //   Rating:'4.6',
      //   buyOneGet:'Buy 1 get 1 free',
      //   address: '242, New York City, USA',
      //   openTime:'9:00 AM'
      // },
      // {
      //   id:'7',
      //   Category:'Pizza',
      //   ResturatName:'Green Door Pizza',
      //   image:Images.pizza,
      //   deliveryFee:'$1.99',
      //   ResturatAvailability:'15-25 min',
      //   buyOneGet:'',
      //   Rating:'4.6',
      //   buyOneGet:'Buy 1 get 1 free',
      //   address: '76, New York City, USA',
      //   openTime:'10:00 PM'
      // },
      // {
      //   id:'8',
      //   Category:'Pizza',
      //   ResturatName:'Pizza Club',
      //   image:Images.pizza,
      //   deliveryFee:'$3.99',
      //   ResturatAvailability:'25-35 min',
      //   buyOneGet:'',
      //   Rating:'4.1',
      //   buyOneGet:'',
      //   address: '90, New York City, USA',
      //   openTime:'11:00 PM'
      // },
      // {
      //   id:'9',
      //   Category:'HighestRated',
      //   ResturatName:'Donair Pizza',
      //   image:Images.pizza,
      //   deliveryFee:'$1.99',
      //   ResturatAvailability:'25-45 min',
      //   buyOneGet:'',
      //   Rating:'4.9',
      //   buyOneGet:'Buy 1 get 1 free',
      //   address: '89, New York City, USA',
      //   openTime:'12:00 PM'
      // },
      // {
      //   id:'10',
      //   Category:'FastFood',
      //   ResturatName:'Butter Burgur Customs',
      //   image:Images.burger,
      //   deliveryFee:'$2.99',
      //   ResturatAvailability:'25-45 min',
      //   buyOneGet:'',
      //   Rating:'4.1',
      //   buyOneGet:'Buy 1 get 1 free',
      //   address: '2, New York City, USA',
      //   openTime:'01:00 PM'
      // },
      // {
      //   id:'11',
      //   Category:'FastFood',
      //   ResturatName:'Hunger Fast Food',
      //   image:Images.burger,
      //   deliveryFee:'$4.99',
      //   ResturatAvailability:'15-35 min',
      //   buyOneGet:'',
      //   Rating:'4.2',
      //   buyOneGet:'',
      //   address: '26, New York City, USA',
      //   openTime:'02:00 PM'
      // },
      // {
      //   id:'12',
      //   Category:'Desserts',
      //   ResturatName:'Meet Fresh',
      //   image:Images.desserts,
      //   deliveryFee:'$2.99',
      //   ResturatAvailability:'20-35 min',
      //   buyOneGet:'',
      //   Rating:'4.4',
      //   buyOneGet:'Buy 1 get 1 free',
      //   address: '298, New York City, USA',
      //   openTime:'03:00 PM'
      // },
      // {
      //   id:'13',
      //   Category:'Desserts',
      //   ResturatName:'Ben & Jeerys Scoops',
      //   image:Images.chinese,
      //   deliveryFee:'$2.99',
      //   ResturatAvailability:'20-35 min',
      //   buyOneGet:'',
      //   Rating:'4.7',
      //   buyOneGet:'',
      //   address: '101, New York City, USA',
      //   openTime:'04:00 PM'
      // },
      // {
      //   id:'14',
      //   Category:'Chinese',
      //   ResturatName:'Taste of China',
      //   image:Images.chinese,
      //   deliveryFee:'$2.99',
      //   ResturatAvailability:'20-35 min',
      //   buyOneGet:'',
      //   Rating:'4.2',
      //   buyOneGet:'Buy 1 get 1 free',
      //   address: '89, New York City, USA',
      //   openTime:'05:00 PM'
      // },
      // {
      //   id:'15',
      //   Category:'BubbleTea',
      //   ResturatName:'Gong Cha',
      //   image:Images.bubbleTea,
      //   deliveryFee:'$1.99',
      //   ResturatAvailability:'20-35 min',
      //   buyOneGet:'',
      //   Rating:'4.6',
      //   buyOneGet:'Buy 1 get 1 free',
      //   address: '232, New York City, USA',
      //   openTime:'06:00 PM'
      // },
      // {
      //   id:'16',
      //   Category:'Indian',
      //   ResturatName:'Curry In A Hurry',
      //   image:Images.soyaChaap,
      //   deliveryFee:'$2.99',
      //   ResturatAvailability:'15-25 min',
      //   buyOneGet:'',
      //   Rating:'4.6',
      //   buyOneGet:'Buy 1 get 1 free',
      //   address: '87, New York City, USA',
      //   openTime:'01:30 PM'
      // },
      // {
      //   id:'17',
      //   Category:'Indian',
      //   ResturatName:'Hunger Fast Food',
      //   image:Images.burger,
      //   deliveryFee:'$4.99',
      //   ResturatAvailability:'15-35 min',
      //   buyOneGet:'',
      //   Rating:'4.2',
      //   buyOneGet:'',
      //   address: '121, New York City, USA',
      //   openTime:'10:00 PM'
      // },
    ]);
    const [categoryData, setCategoryData] = useState([
    //     {
    //         'id' : '1',
    //         'name': 'Indian',
    //         'image': Icons.indian,
    //         'Category':'Indian',
    //     },
    //     {
    //         'id' : '2',
    //         'name': 'Pizza',
    //         'image': Icons.pizza,
    //         'Category':'Pizza',
    //     },
    //     {
    //         'id' : '3',
    //         'name': 'Desserts',
    //         'image': Icons.dessert,
    //         'Category':'Desserts',
    //     },
    //     {
    //         'id' : '4',
    //         'name': 'Deals',
    //         'image': Icons.deals,
    //         'Category':'Deals',
    //     },
    //     {
    //         'id' : '5',
    //         'name': 'Highest Rated',
    //         'image': Icons.rated,
    //         'Category': 'HighestRated',
    //     },
    //     {
    //         'id' : '6',
    //         'name': 'Fast Food',
    //         'image': Icons.fastFood,
    //         'Category':'FastFood',
    //     },
    //     {
    //         'id' : '7',
    //         'name': 'Bubble tea',
    //         'image': Icons.bubbleTea,
    //         'Category':'BubbleTea',
    //     },
    //     {
    //         'id' : '8',
    //         'name': 'Chinese',
    //         'image': Icons.chinese,
    //         'Category':'Chinese',
    //     },
    //     {
    //         'id' : '9',
    //         'name': 'Asian',
    //         'image': Icons.asian,
    //         'Category':'Asian',
    //     },
     ])


     console.log('---cardDataBkp------cart data', cardDataBkp)

//GetAll Category
    const getAllCategory = async() => {
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

    //GetCategory By ID
    const getCategoryById = async() => {
      setRestLoading(true);
      let data = JSON.stringify({
        "categoryId": categoryId
      })
      ApiModel.sendApiCall(
        `/api/Restaurants/v1/getRestaurantsByCategory`,
        data,
        null,
        response => {
          // console.log('------------ttttttt GETcATEGORY BY ID', response)
          setRestLoading(false);
          if (response?.message == 'Success.') {
            setCartData(response?.data);
            // props.saveUserData(response?.data);
          } else {
            setRestLoading(false);
          }
        },
        error => {
          setRestLoading(false);
          console.log('the error in api===>', error);
        },
      );
    };
  
    useMemo(() =>{
      getAllCategory();
    },[])
    useMemo(() =>{
      getCategoryById()
    },[categoryId])
  



   
    console.log('-----------------cartData+++', cartData)

    const onFilter = (txt) => {
      setCategoryId(txt)
      console.log('-----------txt', txt)
      let search = cartData;
      if (txt) {
        const newData = search.filter(item => {
          const itemData = item?.title
            ? item?.title?.toUpperCase()
            : ''.toUpperCase();
          const textData = txt?.toUpperCase();
          return itemData.indexOf(textData) > -1;
        });
        setCardDataBkp(newData);
      } else {
        setCardDataBkp(cartData);
      }
    };
  
    useEffect(() => {
      setCardDataBkp(cartData);
      // onFilter('Indian')
      onFilter(props.route?.params?.data?._id ? props.route?.params?.data?._id : '6405accbf7179511b7e8759e')
    }, []);


      const renderCart = ({item}) => {
        {console.log('------------item++----', item)}
        return (
          <View style={styles.container}>
            <TouchableOpacity  onPress={() => navigation.navigate('RestaurantItems', {data: item})}
              style={styles.content_view}>
              <View style={styles.first_line_view}>
                <Image
                  // resizeMode="center"
                  source={{uri: item?.profile}}
                  style={styles.notification_icon}
                />
                
                <View style={{position:'absolute', width:60, height:75, left:5, alignItems:'flex-end',}}>
                {wishlist ?
                    <TouchableOpacity style={{height:30,backgroundColor:'#E2E6E2', borderRadius:15, justifyContent:'center', width:30}}
                        onPress={() => setWishlist(false)}>
                      <Image source={Icons.heartFill} style={{height:20, alignSelf:'center', width:20}}/>
                    </TouchableOpacity>
                  : 
                    <TouchableOpacity style={{height:30,backgroundColor:'#E2E6E2', borderRadius:15, justifyContent:'center', width:30}}
                    onPress={() => setWishlist(true)}>
                  <Image source={Icons.heartBlank} style={{height:20, alignSelf:'center', width:20}}/>
                </TouchableOpacity>
                  }
                </View>
              </View>
    
              <View style={{ width:'70%', left:vh(0.7)}}>
                <View style={{flexDirection:'row'}}>
                  <Text style={[Textstyles.medium, styles.title_text, {fontSize:15}]}>{item?.restaurantName}</Text>
                </View>
    
                <View style={{flexDirection:'row', marginTop:3, alignItems:'center'}}>
                  <Text style={[Textstyles.normal, styles.title_text1]}>
                    {/* {item?.deliveryFee}  */}
                    {item?.currency}{item?.deliveryCharge} Delivery fee*</Text>
                </View>
    
                <View style={{flexDirection:'row', marginTop:3,}}>
                <Text style={[Textstyles.normal, styles.title_text1]}>
                  {/* {item?.ResturatAvailability} */}
                  {item?.deliveryTime}
                  </Text>
                </View>
    
                <View style={{flexDirection:'row', alignItems:'center'}}>
                  <Text style={[Textstyles.normal, styles.title_text]}>{item?.ResturatStatus}</Text>
                  <Text style={[Textstyles.normal, styles.title_text, {color:item?.buyOneGet !='' && 'darkgreen'}]}>
                    {/* {item?.buyOneGet} */}
                   {item?.offers}
                    </Text>
                </View>
              </View>
    
            <View style={{width:'10%', height:'85%', justifyContent:'flex-start'}}>
              <View style={{justifyContent:'center', height:28, width:28, borderRadius:19, backgroundColor:'#E2E6E2', alignItems:'center',}}>
              <Text style={[Textstyles.medium, {fontSize:12, color:Colors.black, fontWeight:'500', paddingTop:2, textAlign:'center',}]}>
                {/* {item?.Rating} */}
                {item?.rating}
                </Text>
              </View>
            </View>
            </TouchableOpacity>
          </View>
        );
      };

      const emptyRender = () => {
        return(
          <View style={{flex:1, alignItems:'center'}}>
            <Image resizeMode='contain' source={Images.notFound} style={{ height:300, resizeMode:'center'}} />
            <Text style={[{color:Colors.black, top:-100}, Textstyles.normal]}>No Restaurant Added Yet!!</Text>
          </View>
        )
      }

      
  return (
    <View style={{ flex: 1, backgroundColor:Colors.white }}>
      {props.route?.params?.keyFrom != 'Category' ? 
      <>
       <TouchableOpacity onPress={() => navigation.goBack()} style={{height:50, justifyContent:'center', backgroundColor:Colors.white}}>
            <Image source={Icons.arrowRed} style={{height:30, left:vh(1), width:30}}/>
       </TouchableOpacity >
       {props.route?.params?.data === 'Convenience' ?
        <Text style={[Textstyles.medium, { width:'95%', alignSelf:'center', fontSize:25, marginVertical:vh(2), color: Colors.black }]}>
         All Stores
        </Text>
        :
        <>
        <Text style={[Textstyles.medium, { width:'95%', alignSelf:'center', fontSize:25, marginVertical:vh(2), color: Colors.black }]}>
         Restaurants
        </Text>
        
        <View>
          <ScrollView
          keyboardShouldPersistTaps="handled"
          horizontal
          showsHorizontalScrollIndicator={false}>
          {categoryData?.map((item, index) => {
            return (
              <TouchableOpacity
                onPress={() => onFilter(item?._id)}
                style={styles.categoryData_view}>

            <Image source={{uri:item?.icon}} style={{height:50, borderRadius:5, width:50,}}/>
            {console.log('---------------equal', categoryId , item?._id)}
                <Text
                  style={[
                    categoryId === item?._id
                      ? Textstyles.medium
                      : Textstyles.normal,
                    styles.scrollView_text,
                    {
                      color: categoryId === item?._id ? Colors.black : Colors.gray,
                    },
                  ]}>
                  {item?.title}
                </Text>

                <View
                  style={[
                    {
                      backgroundColor:
                        categoryId == item?._id ? Colors.red : null,
                    },
                    styles.cat_line_view,
                  ]}
                />
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
      </>
    }
      </>
      :
      <>
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
                Restaurants
              </Text>
            </View>


    {console.log('--------------VVVVVV', props.route?.params?.data?.title)}

      <View style={{paddingHorizontal:vh(2), justifyContent:'space-between', alignItems:'center',  flexDirection:'row'}}>
        <Text style={[Textstyles.medium, {alignSelf:'center', fontSize:25, marginVertical:vh(2), color: Colors.black }]}>
         {props.route?.params?.data?.title}
        </Text>
        <View style={{}}>
          <Image source={{uri: props.route?.params?.data?.icon}} style={{height:70, borderRadius:5, width:70}}/>
        </View>
      </View>
      </>
      }


      <View style={{height:10, marginVertical:vh(2), backgroundColor:'#E2E6E2'}}></View>
    {restLoading ? <ActivityIndicator size="large" color={Colors?.red} style={{marginTop:vh(5)}}/> :
    <FlatList 
    // data={cardDataBkp} 
    data={cartData}
    renderItem={renderCart} 
    showsVerticalScrollIndicator={false}
    ListEmptyComponent={emptyRender}
    />
    }
    </View>
  )
}

export default Restaurants

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
        width: wpx(8),
        borderRadius: 5,
      },

      container:{
        width: '95%',
        alignSelf: 'center',
        backgroundColor: Colors.white,
        padding: hpx(10),
        marginVertical: hpx(1),
    
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
})