import React from "react";
import { Modal, View, StyleSheet, ActivityIndicator, Image, Text } from "react-native";
import { Colors } from "../../utils/AppConstants";
import Images from "../../utils/images";

const CustomLoader = props => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={props.visible}
      supportedOrientations={["portrait", "landscape"]}
      // onRequestClose={() => {
      //   props.toggleFuction(false);
      // }}
      onDismiss={() => {}}>
      <View style={styles.viewParent}>
        {/* <ActivityIndicator animating={true} size="large" color={Colors.white} /> */}
       <View style={{backgroundColor:'#e5eff1', height:80, justifyContent:'center',  borderRadius:10, width:80}}>
        <Image  source={Images.loader} style={{height:70, alignSelf:'center', width:70}}/>
        </View>
        {/* <Text>Please Wait</Text> */}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  viewParent: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CustomLoader;