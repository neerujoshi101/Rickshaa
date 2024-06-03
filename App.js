import React, {useEffect} from 'react';
import AppContainer from './src/route/AppContainer';
import { LogBox } from 'react-native';

export default function App() {
  useEffect(()=>{
    LogBox.ignoreAllLogs();//Ignore all log notifications
  },[])
  return <AppContainer />
}