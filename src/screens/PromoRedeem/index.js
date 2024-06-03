import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import {
    widthPercentageToDP as vw,
    heightPercentageToDP as vh,
  } from "react-native-responsive-screen";
  import { Colors, hpx, wp, wpx } from "../../utils/AppConstant";
import Icons from '../../utils/icons';
import Textstyles from '../../utils/text';
import Images from '../../utils/images';

const PromoRedeem = () => {
    const navigation = useNavigation();
    const [promoApply, onPromoApply] = React.useState("");
    console.log('----------------', promoApply)




  return (
    <View style={styles.container}>
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
        autoCapitalize="characters"
        placeholder="Enter promo code"
        style={[Textstyles.medium, styles.input]}
        value={promoApply}
        onChangeText={onPromoApply}
      />
    </View>



{promoApply != '' &&
    <TouchableOpacity
    //   onPress={() => setPromoCode(false)}
      style={styles.promoButton}
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
}
  </View>
  )
}

export default PromoRedeem

const styles = StyleSheet.create({
    container: {
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
      input: {
        margin: 12,
        height: 50,
        fontSize:15,
        borderRadius: 5,
        backgroundColor:'#E2E6E2',
        padding: 0,
        // paddingTop: 5,
        paddingLeft: 5,
      },
      promoButton: {
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
})