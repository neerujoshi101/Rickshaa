import React, { useMemo, useState } from 'react';
import {
  Modal,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
  ScrollView,
  Share,
  Text,
} from 'react-native';
import { Colors } from '../../utils/AppConstant';
import Images from '../../utils/images';
import {
  widthPercentageToDP as vw,
  heightPercentageToDP as vh,
} from 'react-native-responsive-screen';
import Icons from '../../utils/icons';
import { useNavigation } from '@react-navigation/native';
import Textstyles from '../../utils/text';

const CustomModal = props => {
    const [Fav, setFav] = useState(false)
    const navigation = useNavigation()
    console.log('---------PROSSSS', props?.data)

    const onShare = async () => {
        try {
          const result = await Share.share({
            message:
              'Rickshaa Food | Promise Delivered',
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

  return (
    <Modal
      visible={props.isVisible}
      transparent={true}
      onRequestClose={() => {
        !props.isVisible;
      }}
      animationType="slide">
      <TouchableWithoutFeedback onPress={props.onClose}>
        <View style={styles.modalOverlay} />
      </TouchableWithoutFeedback>


      <View style={{
        backgroundColor: Colors.white,
        width: '100%',
        position: 'absolute',
        bottom: 0,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
      }}>

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{width: '94%', marginVertical:vh(3), alignSelf: 'center'}}>
              <View style={{marginTop:vh(1)}}>
              {Fav === true &&
                <TouchableOpacity onPress={() => setFav(false)}
                        style={{ height:50,  flexDirection:'row', marginVertical:vh(1), alignItems:'center'}}>
                      <Image source={Icons.heartFill} style={{height:22, width:22}}/>
                  <Text style={[Textstyles.medium, {marginLeft:vh(3), color:Colors.black, fontSize:18,}]}>Add to Favorite</Text>
                </TouchableOpacity>
             }
             {Fav === false &&
                <TouchableOpacity onPress={() => setFav(true)}
                        style={{ height:50, marginVertical:vh(1), flexDirection:'row', alignItems:'center'}}>
                      <Image source={Icons.heartBlank} style={{height:22, width:22}}/>
                  <Text style={[Textstyles.medium,{marginLeft:vh(3), color:Colors.black, fontSize:18, fontWeight:'500'}]}>Add to Favorite</Text>
                </TouchableOpacity>
              }
                <View style={{height:1, width:'90%', alignSelf:'flex-end', backgroundColor:'lightgrey'}}></View>

                <TouchableOpacity onPress={() => onShare()}
                        style={{ height:50, marginVertical:vh(1), flexDirection:'row', alignItems:'center'}}>
                    <Image source={Icons.shareRed} style={{height:20, width:20}}/>
                  <Text style={[Textstyles.medium, {marginLeft:vh(3), color:Colors.black, fontSize:18, fontWeight:'500'}]}>Share</Text>
                </TouchableOpacity>
                <View style={{height:1, width:'90%', alignSelf:'flex-end', backgroundColor:'lightgrey'}}></View>

                <TouchableOpacity onPress={() => 
                    navigation.navigate('RestaurantDeatils', {data: props?.data})}
                      style={{ height:50, marginVertical:vh(1), flexDirection:'row', alignItems:'center'}}>
                    <Image source={Icons.infoRed} style={{height:22, width:22}}/>
                  <Text style={[Textstyles.medium,{marginLeft:vh(3), color:Colors.black, fontSize:18, fontWeight:'500'}]}>View Store Info</Text>
                </TouchableOpacity>
                <View style={{height:1, width:'90%', alignSelf:'flex-end', backgroundColor:'lightgrey'}}></View>
              </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  loginBtn: {
    width: "80%",
    borderRadius: 10,
    marginTop: vh(3),
    height: 48,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: "black",
  },
  container: {
    backgroundColor: Colors.white,
    width: '100%',
    // height: '80%',
    position: 'absolute',
    bottom: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  closeIcnView: {
    bottom: vh(8),
    alignSelf: 'center',
  },
  closeIcon: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
  imageContainer: {
    height: vh(20),
    width: vw('95%'),
    alignSelf: 'center',
    borderRadius: 50,
    top: vh(0.6),
  },
  product_img_view: {
    backgroundColor: Colors.white,
    width: '75%',
    height: '90%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    elevation: 10,
    marginTop: vh(1),
  },
  product_img: {
    width: '100%',
    height: '100%',
    resizeMode: 'center',
    borderRadius: 10,
  },
  activeDotStyle: {
    backgroundColor: 'transparent',
  },
  wrapper: {
    height: vh(24),
    borderRadius: 50,
  },
  product_heading_view: {
    marginVertical: vh(1),
    width: '100%',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  product_heading_txt: {
    fontSize: 18,
    color: Colors.black,
  },
  share_view: {
    borderRadius: 20,
    elevation: 10,
    backgroundColor: Colors.white,
  },
  share_img: {
    height: 30,
    width: 30,
  },
  product_details_view: {
    marginTop: vh(1),
    width: '100%',
    alignSelf: 'center',
  },
  product_details_heading: {
    fontSize: 15,
    color: Colors.black,
    marginBottom: vh(1),
  },
  product_details_txt: {
    fontWeight: 'normal',
    fontSize: 15,
  },
  product_amount_view: {
    flexDirection: 'row',
  },
  product_amount_heading: {
    fontSize: 16,
    color: Colors.black,
  },
  product_amount_txt: {
    color: 'red',
    textDecorationLine: 'line-through',
    fontWeight: 'normal',
    fontSize: 15,
  },
  product_percent_view: {
    backgroundColor: Colors.dimGreen,
    borderRadius: 10,
    elevation: 10,
    width: '18%',
    justifyContent: 'center',
    alignItems: 'center',
    aspectRatio: 1 / 0.35,
    marginLeft: vw(2),
  },
  product_percent_text: {
    textAlign: 'center',
    paddingBottom: 3,
    color: Colors.white,
  },
  btn_view: {
    width: '40%',
    height: vh(6),
    position: 'absolute',
    backgroundColor: Colors.dimGreen,
    elevation: 10,
    borderRadius: 4,
    bottom: vh(2),
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  btn_txt: {
    color: Colors.white,
    fontSize: 18,
  },
});

// const mapStateToProps = state => ({
//   wallet_data: state.wallet
// })

export default CustomModal;

//connect(mapStateToProps, null)
