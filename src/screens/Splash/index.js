import {View, StatusBar, ImageBackground, Alert, Text, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import Images from '../../utils/images';
import styles from './styles';
import { Colors } from '../../utils/AppConstant';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useMemo } from 'react';

// Hey there!!!!

export default function Splash() {
  const navigation = useNavigation();
  const [retry, settry] = useState(0);
  const [getMobile, setAsync ] = useState('');
  const TRANSITIONS = ['fade', 'slide', 'none'];
  const [statusBarTransition, setStatusBarTransition] = useState(
    TRANSITIONS[0],
  );

  
  // useEffect( ()  =>  {
  //       setTimeout(() => {
  //         navigation.replace('Login')
  //       }, 2000);
  // }, [retry]);

  const gettingData = async () => {
    let Id = await AsyncStorage.getItem('UserId');
    let userId = await JSON.parse(Id)
    console.log('---------userid checkingg', userId)
    setAsync(userId)
        setTimeout(() => {
          if (userId != null) {
            navigation.replace('Bottom')
            // navigation.navigate('UpdateProfile')
          }else {
          navigation.replace('Login')
          }
        }, 2000);
    };

  // useEffect(()=>{
  //   gettingData()
  // }, [getMobile])

  useMemo(()=>{
    gettingData()
  },[])


  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={Colors.yellow}
        animated={true}
        showHideTransition={statusBarTransition}
      />
      <View style={styles.imgView}>
        <Image resizeMode='center' source={Images.RickshaaIcon1} style={styles.img} />
      </View>
    </View>
  );
}
