import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Splash from '../screens/Splash/index'
import Login from '../screens/Login/Login';
import { Colors } from '../utils/AppConstant';
import Home from '../screens/Home';
import OtpVerification from '../screens/OtpVerification';
import Category from '../screens/Category';
import Profile from '../screens/Profile';
import Cart from '../screens/Card';
import Icons from '../utils/icons';
import Restaurants from '../screens/Restaurants';
import RestaurantItems from '../screens/RestaurantItems';
import RestaurantDeatils from '../screens/RestaurantDeatils';
import Checkout from '../screens/Checkout';
import AddTip from '../screens/AddTip';
import Favorites from '../screens/Favorites';
import ProfileSetting from '../screens/ProfileSetting';
import EditProfile from '../screens/EditProfile';
import Wallet from '../screens/Wallet';
import WalletHistory from '../screens/WalletHistory';
import OrderHistory from '../screens/OrderHistory';
import OrderSummary from '../screens/OrderSummary';
import Help from '../screens/Help';
import RestaurantsRewards from '../screens/RestaurantsRewards';
import RestaurantsOffers from '../screens/RestaurantOffers';
import InviteFriend from '../screens/InviteFriend';
import PromoRedeem from '../screens/PromoRedeem';
import AddressBook from '../screens/AddressBook';
import PrivacyPolicy from '../screens/PrivacyPolicy';
import About from '../screens/About';
import TermsCondition from '../screens/TermsCondition';
import Images from '../utils/images';
import UpdateProfile from '../screens/UpdateProfile';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function AppContainer() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Splash" component={Splash}/>
        <Stack.Screen name='Login' component={Login}/>
        <Stack.Screen name="Bottom" component={Bottom} />
        <Stack.Screen name='OtpVerification' component={OtpVerification} />
        <Stack.Screen name='Restaurants' component={Restaurants}/>
        <Stack.Screen name='RestaurantItems' component={RestaurantItems}/>
        <Stack.Screen name='RestaurantDeatils' component={RestaurantDeatils}/>
        <Stack.Screen name='Checkout' component={Checkout}/>
        <Stack.Screen name='AddTip' component={AddTip}/>
        <Stack.Screen name='Favorites' component={Favorites}/>
        <Stack.Screen name='ProfileSetting' component={ProfileSetting}/>
        <Stack.Screen name='EditProfile' component={EditProfile}/>
        <Stack.Screen name='Wallet' component={Wallet}/>
        <Stack.Screen name='WalletHistory' component={WalletHistory}/>
        <Stack.Screen name='OrderHistory' component={OrderHistory}/>
        <Stack.Screen name='OrderSummary' component={OrderSummary}/>
        <Stack.Screen name='Help' component={Help}/>
        <Stack.Screen name='RestaurantsRewards' component={RestaurantsRewards}/>
        <Stack.Screen name='RestaurantsOffers' component={RestaurantsOffers}/>
        <Stack.Screen name='InviteFriend' component={InviteFriend}/>
        <Stack.Screen name='PromoRedeem' component={PromoRedeem}/>
        <Stack.Screen name='AddressBook' component={AddressBook}/>
        <Stack.Screen name='PrivacyPolicy' component={PrivacyPolicy}/>
        <Stack.Screen name='About' component={About}/>
        <Stack.Screen name='TermsCondition' component={TermsCondition}/>
        <Stack.Screen name='UpdateProfile' component={UpdateProfile}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}


const Bottom = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarIcon: ({focused}) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ? Icons.Home : Icons.homeGrey;
          } else if (route.name === 'Browse') {
            iconName = focused
              ? Icons.search
              : Icons.searchGray;
          }  else if (route.name === 'Basket') {
            iconName = focused ?
            <View style={{height:20, width:20}}></View>
            :null


            iconName = focused
              ? 
              Icons.Cart
              : Icons.cartGrey;
           } else if (route.name === 'Profile') {
            iconName = focused ? Icons.User : Icons.UserGrey;
          }
          return <Image source={iconName} style={styles.img} />;
        },
        tabBarActiveTintColor: Colors.red,
        tabBarInactiveTintColor: Colors.black,
      })}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name='Browse' component={Category}/>
      <Tab.Screen 
        name='Basket' 
        component={Cart}
        options={{
          tabBarBadge: '2',
          // headerShown: false,
          tabBarBadgeStyle: { backgroundColor: 'darkgreen', paddingLeft:5, paddingRight:5,  paddingTop:2.5, left:7, minHeight: 22, minWidth: 22, borderRadius: 100}
        }}
        />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  img: {
    width: 25,
    height: 25,
    top:2,
    // backgroundColor:'pink'
  },
});

