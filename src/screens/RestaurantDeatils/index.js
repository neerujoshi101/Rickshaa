import { ImageBackground, StyleSheet, FlatList, Clipboard, TextInput, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import Images from '../../utils/images'
import Icons from '../../utils/icons'
import {Colors, hp, hpx, wp} from '../../utils/AppConstant';
import { useNavigation } from '@react-navigation/native'
import CustomModal from '../../common/CustomModal';
import Snack from '../../utils/snackbar';
// import MapView, { PROVIDER_GOOGLE, Marker, Polyline } from 'react-native-maps';
import MapView, { PROVIDER_GOOGLE, Marker,Polyline } from 'react-native-maps';
import { decode } from "@mapbox/polyline";
import MapViewDirections from 'react-native-maps-directions';
import {
    widthPercentageToDP as vw,
    heightPercentageToDP as vh,
  } from "react-native-responsive-screen";
import Textstyles from '../../utils/text';
import { useRef } from 'react';

const RestaurantDeatils = (props) => {
  const navigation = useNavigation()
  const [copiedText, setCopiedText] = useState('')
  const [lat, setLat] = useState('') //for storing latitude
  const [long, setLong] = useState('') //for storing longitude
  const [visible, setVisible] = useState(false)
  const [coordinates] = useState([
    {
      latitude: 48.8587741,
      longitude: 2.2069771,
    },
    {
      latitude: 48.8323785,
      longitude: 2.3361663,
    },
  ]);
  const map = useRef();
  const [coords, setCoords] = useState([
    { latitude: 37.766155, longitude: -122.51058, image: Icons.Home },
    { latitude: 37.799476, longitude: -122.397995, image:Images.iconOfficial},
  ]);
  const [foodItems, setFoodItems] = useState(props?.route?.params?.data?.recipes)


  const origin = {latitude: 37.3318456, longitude: -122.0296002};
  const destination = {latitude: 37.771707, longitude: -122.4053769};
  const GOOGLE_MAPS_APIKEY = 'AIzaSyDTj0kKBvohq3gkjNoOE1dvJNLXr7UiPTA';





  const copyToClipboard = (txt) => {
    console.log('------------txt', txt)
    Clipboard.setString(txt)
    Snack('Copied to cliboard')
  }
  
  let icon = {
    url: 'https://your_domain.com/your_directory/your_image.jpg',
    scaledSize: { width: 69, height: 41 }
 }



  return (
    <View style={{flex:1, backgroundColor:Colors.white}}>

      {/* <MapView
        style={styles.maps}
        initialRegion={{
          latitude: coordinates[0].latitude,
          longitude: coordinates[0].longitude,
          latitudeDelta: 0.0622,
          longitudeDelta: 0.0121,
        }}>
        <MapViewDirections
          origin={origin}
          destination={destination}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeWidth={4}
          strokeColor="#111111"
        />
        <Marker coordinate={coordinates[0]} />
        <Marker coordinate={coordinates[1]} />
      </MapView> */}


        {/* <MapView
        
              ref={map}
              // showsTraffic={true}
              showsBuildings={true}
              
              followUserLocation={true}
              loadingEnabled={true}
              showsUserLocation={true}
              loadingIndicatorColor={Colors.red}
              style={{ width: '100%', height: 200,}}
              initialRegion={{
                latitude: 37.7948605,
                longitude: -122.4596065,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
              provider={PROVIDER_GOOGLE}>
          {coords.map((coords, index) => (
              <Marker 
                key={index} 
                coordinate={coords} 
                image={coords.image}
                width={48}
                height={48}
                title="Estimated Delivery Time"
                description="arriving in 20 minutes"
              />
              ))}
              <Polyline
                coordinates={coords}
                strokeColor={'red'}
                // coordinates={[
                //   { latitude: 37.8025259, longitude: -122.4351431 }, //create tringle by this coords
                //   { latitude: 37.7896386, longitude: -122.421646 },
                //   { latitude: 37.7665248, longitude: -122.4161628 },
                //   { latitude: 37.7734153, longitude: -122.4577787 },
                //   { latitude: 37.7948605, longitude: -122.4596065 },
                //   { latitude: 37.8025259, longitude: -122.4351431 }
                // ]}
                // strokeColors={[
                //   '#7F0000',
                //   '#00000000', // no color, creates a "long" gradient between the previous and next coordinate
                //   '#B24112',
                //   '#E5845C',
                //   '#238C23',
                //   '#7F0000'
                // ]}
                strokeWidth={5}
              />
        </MapView> */}

{console.log('------recipes------', props?.route?.params?.data)}

        <MapView
            provider={PROVIDER_GOOGLE}
            style={{
                height: 200,
                width: '100%',
                alignSelf:'center',
            }}
            region={{
                latitude: 40.730610,
                longitude:-73.935242,
                latitudeDelta: 0.1,
                longitudeDelta: 0.0121,
            }}>
            <Marker coordinate={{ latitude : 40.730610, longitude :-73.935242 }}></Marker>
        </MapView>

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
              }}>
            <View style={{ width: "40%" }}>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{
                  height: 46,
                  width: 46,
                  borderRadius: 23,
                  elevation:6,
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
            </View>

    <View style={{width:'95%',  backgroundColor:Colors.white, alignSelf:'center'}}>
      <Text style={[Textstyles.medium, {fontSize:20, color:Colors.black, marginTop:vh(2),  fontWeight:'600'}]}>{props?.route?.params?.data?.restaurantName}</Text>
      <View style={{ marginVertical:2,}}>
      <View style={{  width:'95%', }}>
        {/* <FlatList
          data={props?.route?.params?.data?.recipes}
          contentContainerStyle={{width:'100%'}}
          numColumns={2}
          renderItem={({ item }) => ( */}
            <View style={{ flexDirection:'row'}}>
                <Text style={{fontSize:6, color:Colors.gray, paddingTop:6, marginHorizontal:vh(0.5)}}>{'\u2B24'} </Text>
                <Text style={[Textstyles.normal, styles.title_text1]}>{props?.route?.params?.data?.recipes}</Text>
            </View>
            {/* )}
            keyExtractor={(i, index) => "id" + index}
        /> */}
      </View>
      </View>
    </View>


    <View style={{height:1,marginVertical:vh(3), width:'100%', alignSelf:'flex-end', backgroundColor:'lightgrey'}}></View>
<ScrollView showsVerticalScrollIndicator={false}>
    <>
    <TouchableOpacity onPress={() => copyToClipboard(`${props?.route?.params?.data?.address}`)}
            style={{flexDirection:'row', alignItems:'center', width:'95%', alignSelf:'center', paddingHorizontal:vh(1), justifyContent:'space-between'}}>
       <View style={{width:'17.5%'}}>
        <Image source={Icons.location} style={{height:24, width:24}}/>
        </View>
        <View style={{width:'65%',}}>
        <Text style={[Textstyles.medium, {fontSize:16, color:Colors.black}]}>{props?.route?.params?.data?.address}</Text>
        </View>
        <View style={{width:'17.5%', }}>
        <Image source={Icons.copyRed} style={{height:24, alignSelf:'flex-end', width:24}}/>
        </View>
    </TouchableOpacity>

    <View style={{height:1,marginVertical:vh(3), width:'85%', alignSelf:'flex-end', backgroundColor:'lightgrey'}}></View>


{visible ? 
    <TouchableOpacity onPress={() => setVisible(false)}
                style={{flexDirection:'row', alignItems:'center', width:'95%', alignSelf:'center', paddingHorizontal:vh(1), justifyContent:'space-between'}}>
        <View style={{width:'17.5%', }}>
            <Image source={Icons.clockRed} style={{height:24, width:24}}/>
            </View>
            <View style={{width:'65%'}}>
            <Text style={{fontSize:16, fontWeight:'500', color:Colors.black}}>Open until 10:00 PM
            {/* {props?.route?.params?.data?.openTime} */}
            </Text>
            </View>
            <View style={{width:'17.5%', }}>
            <Image source={Icons.minusRed} style={{height:24,alignSelf:'flex-end', width:24}}/>
        </View>
    </TouchableOpacity>
    :
    <TouchableOpacity onPress={() => setVisible(true)}
            style={{flexDirection:'row', alignItems:'center', width:'95%', alignSelf:'center', paddingHorizontal:vh(1), justifyContent:'space-between'}}>
        <View style={{width:'17.5%', }}>
        <Image source={Icons.clockRed} style={{height:24, width:24}}/>
        </View>
        <View style={{width:'65%'}}>
        <Text style={[Textstyles.medium, {fontSize:16, color:Colors.black}]}>Open until 10:00 PM
        {/* {props?.route?.params?.data?.openTime} */}
        </Text>
        </View>
        <View style={{width:'17.5%', }}>
        <Image source={Icons.plusRed} style={{height:24,alignSelf:'flex-end', width:24}}/>
        </View>
    </TouchableOpacity>
}

    {visible &&
        <View style={{}}>
            <View style={{width:'95%', marginTop:vh(4), alignSelf:'center'}}>
              <FlatList
                data={props?.route?.params?.data?.timings}
                contentContainerStyle={{width:'100%'}}
                  renderItem={({ item }) => (
                <View style={{width:'62%', alignSelf:'center'}}>
                  {console.log('-------------item====', item)}
                    <Text style={[Textstyles.medium, {fontSize:15, fontWeight:'500', color:Colors.black}]}>{item?.day }</Text>
                    <Text style={[Textstyles.normal, {fontSize:14, marginVertical:1, color:Colors.gray}]}>{item?.timeStart} - {item?.timeEnd}</Text>
                </View>
               )}
            keyExtractor={(i, index) => "id" + index}
        /> 
            </View>
        </View>
    }

    <View style={{height:1,marginVertical:vh(3), width:'100%', alignSelf:'flex-end', backgroundColor:'lightgrey'}}></View>
      <View style={{flexDirection:'row', alignItems:'center', width:'95%', alignSelf:'center', paddingHorizontal:vh(1)}}>
          <View style={{width:'17.5%'}}>
              <Image source={Icons.starRed} style={{height:24, width:24}}/>
              </View>
              <View style={{width:'87.5%'}}>
              <Text style={[Textstyles.medium, {fontSize:17, color:Colors.black}]}>
                {/* {props?.route?.params?.data?.Rating}  */}
                {props?.route?.params?.data?.rating} (500+ ratings)</Text>
              </View>
              {/* <Image source={Icons.plusRed} style={{height:24, width:24}}/> */}
      </View>
    <View style={{height:1,marginVertical:vh(3), width:'100%', alignSelf:'flex-end', backgroundColor:'lightgrey'}}></View>
    </>
    </ScrollView>
    </View>
  )
}

{/* <Text style={styles.title_text1}>{props?.route?.params?.data?.Rating} (500+ ratings))</Text> */}

export default RestaurantDeatils

const styles = StyleSheet.create({
  title_text1:{
    color: Colors.gray,
    fontSize: 14,
    // fontWeight: '500',
  },
  quantityText: {
    color: Colors.black,
    fontSize: 16,
    textAlign: 'center',
    textAlignVertical: 'center',
    padding: hpx(3),
    top: hpx(2),
    // fontWeight:'500'
  },
  addButton: {
    height: 15,
    width: 20,
  },
  buttonContainer: {
    backgroundColor: '#E2E6E2',
    flexDirection: 'row',
    padding: hpx(5),
    marginVertical:5,
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 1,
    width: '60%',
    borderRadius: 100,
  },
  quantity: {
    color: Colors.black,
    fontSize: 14,
    fontWeight:'500'
    // textAlign: 'center',
  },
  itemName: {
    color: Colors.textColor,
    fontSize: 15,
    // textAlign: 'center',
  },
  actualPriceText: {
    fontSize: 17,
    color: Colors.gray,
    left:4,
    textAlign: 'center',
    textDecorationLine: 'line-through',
    textAlignVertical: 'center',
  },
  offerPriceText: {
    fontSize: 18,
    color: Colors.black,
    fontWeight:'500',
    marginVertical:vh(0.5)
    // textAlign: 'center',
  },
  rowContainer: {
    width: '50%',
    justifyContent: 'center',
    paddingLeft:5,
    // backgroundColor:'pink',
    alignItems: 'flex-start',
  },
  imageView: {
    width: '50%',
    padding: 6,
  },
  cartImage: {
    height: 130,
    width: '85%',
    borderRadius:5,
    alignSelf:'center'
  },
  deleteButton: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
  },
  itemContainer: {
    flexDirection: 'row',
    width: '97%',
    alignSelf: 'center',
    
  },
})