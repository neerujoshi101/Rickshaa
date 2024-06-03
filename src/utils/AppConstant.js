import {Dimensions, PixelRatio, Platform} from 'react-native';

const {height: SCREEN_HEIGHT, width: SCREEN_WIDTH} = Dimensions.get('window');

const scale = SCREEN_WIDTH / 375;

const normalizeFont = size => {
  const newSize = size * scale;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 1;
  }
};

const widthPercentageToDP = widthPercent => {
  // Convert string input to decimal number
  const elemWidth = parseFloat(widthPercent);
  return PixelRatio.roundToNearestPixel((SCREEN_WIDTH * elemWidth) / 100);
};

const heightPercentageToDP = heightPercent => {
  // Convert string input to decimal number
  const elemHeight = parseFloat(heightPercent);
  return PixelRatio.roundToNearestPixel((SCREEN_HEIGHT * elemHeight) / 100);
};

const widthFromPixel = (widthPx, w = 375) => {
  const newSize = widthPx * (SCREEN_WIDTH / w);
  return newSize;
};

const heightFromPixel = (heightPx, h = 812) => {
  const newSize = heightPx * (SCREEN_HEIGHT / h);
  return newSize;
};

export const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
export const mobileRegex = /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/;
export const firstnameRegex = /^[a-zA-Z_ -]{3,40}$/;
export const lastnameRegex = /^[a-zA-Z_ -]{3,40}$/;


export const Colors = {
  themeColor: '#0285C5',
  yellow: '#F5B20C',
  white: '#FFFFFF',
  red: '#DD0000',
  gray: '#7D7C7C',
  green: '#02a556',
 
  offWhite: "#F3F5F9",
  logcolortext: '#174079',
  offWhite2: "#F6F5FB",
  lightWhite: '#F5F5F5',
  black: '#000000',
  lightBlue: '#87CEFA',
  blue: '#0000FF',
  neonBlue: '#b6b6ff',
  // green: '#00FF00',
  buttonGreen: '#388E3C',
  lightGreen: '#43A047',
  dimGreen: '#A5D6A7',
  
  orange: '#FFA500',
  pink: '#FFC0CB',
  
  dimYellow: '#E6EE9C',
  mintCream: '#F5FFFA',
  borderColor:'#A5D6A766',
  buttonColor:'#A5D6A7',
  textColor: '#0F2D52' //new theme color for text
};

export const FontSize = {
    doubleExtraLarge:20,
    extraLarge: 18,
    large: 16,
    medium: 14,
    small: 12
}

export const baseUrl = 'https://dev.gazingtechnosoft.com/swati/gazingnursery/api'

export {
  widthFromPixel as wpx,
  heightFromPixel as hpx,
  normalizeFont as nf,
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
};
