import { Image, StyleSheet, Text, View, FlatList, TextInput, ScrollView, Modal, TouchableOpacity, TouchableHighlight, TouchableWithoutFeedback } from 'react-native'
import React, { useEffect, useReducer, useState } from 'react'
import { Colors ,  hpx, wp, wpx,} from '../../utils/AppConstant'
import Icons from '../../utils/icons'
import { useNavigation } from '@react-navigation/native'
import Images from '../../utils/images'
import { widthPercentageToDP as vw, heightPercentageToDP as vh} from "react-native-responsive-screen";
import Textstyles from '../../utils/text'
// import {Picker} from '@react-native-picker/picker';
import ImagePicker from 'react-native-image-crop-picker';
import OTPTextView from '../../common/Otp'

const EditProfile = (props) => {
    const navigation = useNavigation()
    const [images, setImages] = useState('')
    const [imageModal, setImageModal] = useState(false)
    const [editName, setEditName] = useState(false)
    const [editN, onEditN] = React.useState("Dhananjay");
    const [editLast, setEditLast] = useState(false)
    const [editL, onEditL] = React.useState("Chauhan");
    const [editEmail, setEditEmail] = useState(false)
    const [editEmailId, onEditEmailId]= React.useState('dhananjays124@gmail.com')
    const [editPhone, setEditPhone] = useState(false)
    const [editPhoneN, onEditPhoneN]= React.useState('9411441937')
    const [otpScreenEnable, setOtpScreenEnable] = useState(false)
    const [otpVal, setOtpVal] = useState('');
    const [otpPhone, setOtpPhone] = useState('');
    const [time, setTime] = React.useState(props.initialValue || 30);
    const timerRef = React.useRef(time);
    
    
  
    React.useEffect(() => {
      const timerId = setInterval(() => {
        timerRef.current -= 1;
        if (timerRef.current < 0) {
          clearInterval(timerId);
        } else {
          setTime(timerRef.current);
        }
      }, 1000);
      return () => {
        clearInterval(timerId);
      };
    }, [time]);
    

    console.log('------------------', images)

    const imageEdit = (type) => {
      console.log('-----------TYPE', type)
      if(type == 'Camera'){
        ImagePicker.openCamera({
          width:300,
          height:400,
          cropping:true
        })
        .then(img => {
          setImages(img.path)
          setImageModal(false)
        })
        .catch(error => {
          setImageModal(false)
        })
      }else if(type == 'Album'){
        ImagePicker.openPicker({
          width: 300,
          height: 400,
          cropping: true,
        }).then(img => {
          setImages(img.path);
          setImageModal(false)
        })
        .catch(error => {
          console.log('something wrong in image edit');
          setImageModal(false)
        });
      }
    };


  return (
    <View style={{ flex: 1, backgroundColor:Colors.white }}>
      <TouchableWithoutFeedback onPress={() => setImageModal(false)}>
        <>
        <View
              style={{
                flexDirection: "row",
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
            </View>

    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{paddingBottom:50}}>
        <View style={{width:'95%', alignSelf:'center'}}>
          <Text
            style={[Textstyles.medium, {
              marginVertical: vh(1),
              color: Colors.black,
              fontSize:34
            }]}>
            Edit Account
          </Text>
      </View>


      <TouchableOpacity onPress={() => setImageModal(true)}
          style={{ alignSelf:'flex-start', marginLeft:vh(4), marginTop:vh(3)}}>
        <View 
            style={{height:100, justifyContent:'center', borderColor:Colors.red, borderWidth:1, width:100, borderRadius:50 }}>
          <Image resizeMode='cover' source={images != '' ? {uri: images} : Icons.userProfile} style={{ height:'100%', borderRadius:100, alignSelf:'center', width:'100%',}}/>
        </View>

            <View
                 style={{
                   backgroundColor: Colors.white,
                   height: 28,
                   borderRadius: 14,
                   justifyContent: "center",
                   width: 28,
                   borderColor:Colors.red,
                   borderWidth:1,
                   marginTop:-vh(3.5),
                   marginLeft:vh(1)
                 }}
               >
                 <Image
                   source={Icons.editPen}
                   style={{ height: 18, alignSelf: "center", width: 18 }}
                 />
            </View>
      </TouchableOpacity>

<View style={{height:1.5, marginVertical:vh(4), backgroundColor:'#E2E6E2'}}></View>


  <TouchableOpacity onPress={() => setEditName(true)}
    style={{width:'95%', padding:5, borderRadius:5, justifyContent:'center', paddingHorizontal:vh(1), alignSelf:'center'}}>
    <Text style={[Textstyles.normal, {fontSize:13, color:Colors.gray}]}>Fisrt Name</Text>
    <Text style={[Textstyles.medium, {fontSize:16, color:Colors.black}]}>{editN != '' ? editN : null}</Text>
  </TouchableOpacity>


  <TouchableOpacity onPress={() => setEditLast(true)}
    style={{width:'95%', padding:5, marginTop:vh(2.5), borderRadius:5, justifyContent:'center', paddingHorizontal:vh(1), alignSelf:'center'}}>
    <Text style={[Textstyles.normal, {fontSize:13, color:Colors.gray}]}>Last Name</Text>
    <Text style={[Textstyles.medium, {fontSize:16, color:Colors.black}]}>{editL != '' ? editL : null}</Text>
  </TouchableOpacity>


  <TouchableOpacity onPress={() => setEditPhone(true)}
      style={{width:'95%', padding:5,  marginTop:vh(2.5), borderRadius:5, alignSelf:'center'}}>
    <View style={{flexDirection:'row', width:'100%', justifyContent:'space-between'}}>
      <Text style={[Textstyles.normal, {fontSize:13, color:Colors.gray}]}>Phone Number</Text>
      <Text style={[Textstyles.normal, {fontSize:13, color:'darkgreen'}]}>Verified</Text>
    </View>

    <View style={{flexDirection:'row', alignItems:'center', marginVertical:vh(0.5)}}>
      <Image source={Icons.united} style={{height:24, width:24}}/>
      <Text style={[Textstyles.medium, {fontSize:16, paddingTop:2, marginHorizontal:vh(2), color:Colors.black}]}>{editPhoneN != '' ? editPhoneN : null}</Text>
    </View>
  </TouchableOpacity>


  <TouchableOpacity onPress={() => setEditEmail(true)}
      style={{width:'95%', padding:5,  marginTop:vh(2.5), borderRadius:5, alignSelf:'center'}}>
    <View style={{flexDirection:'row', width:'100%', justifyContent:'space-between'}}>
      <Text style={[Textstyles.normal, {fontSize:13, color:Colors.gray}]}>Email</Text>
      <Text style={[Textstyles.normal, {fontSize:13, color:'darkgreen'}]}>Verified</Text>
    </View>

    <View style={{flexDirection:'row', alignItems:'center',}}>
      <Text style={[Textstyles.medium, {fontSize:16,  color:Colors.black}]}>{editEmailId != '' ? editEmailId : null}</Text>
    </View>
  </TouchableOpacity>


  <TouchableOpacity style={{width:'95%', padding:5, marginTop:vh(2.5), borderRadius:5, justifyContent:'center', paddingHorizontal:vh(1), alignSelf:'center'}}>
    <Text style={[Textstyles.normal, {fontSize:13, color:Colors.gray}]}>Password</Text>
    <Text style={[Textstyles.bold, {fontSize:22, marginTop:-vh(1.5), letterSpacing:2, color:Colors.black}]}>.....</Text>
  </TouchableOpacity>

  <View style={{flexDirection:'row', width:'95%', marginVertical:vh(2), alignSelf:'center', alignItems:'center', justifyContent:'space-between'}}>
    <Image source={Images.Google} style={{height:40, width:40}}/>
    <Text style={[Textstyles.normal, {fontSize:13, color:'darkgreen'}]}>Connected</Text>
  </View>


  {imageModal && (
        <Modal  
          animationType="fade"
          transparent={true}
          // visible={() => setImageModal(false)}   
          onRequestClose={() => setImageModal(false)}
          onBackdropPress={() => setImageModal(false)}
          style={{}} >
            <TouchableOpacity onPress={() => setImageModal(false)}
              style={{bottom:'24%', position:'absolute', alignSelf:'center'}}>
              <Image source={Icons.cross} style={{height:45, width:45}}/>
            </TouchableOpacity>
            <TouchableWithoutFeedback onPress={() => setImageModal(false)}>
            <View
              style={{
                width: '100%',
                height:'23%',
                flexDirection: 'row',
                paddingVertical: 20,
                borderTopWidth:1.5,
                borderLeftWidth:1.5,
                borderRightWidth:1.5,
                borderColor:Colors.red,
                backgroundColor:Colors.white,
                borderTopLeftRadius:20,
                borderTopRightRadius:20,
                bottom:0,
                position:'absolute'
              }}>
              <View
                style={{
                  width: '50%',
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  onPress={() => imageEdit('Camera')}
                  style={{height: 65, alignItems:'center', width: 80}}>
                  <Image
                    source={Icons.camera}
                    style={{height: '100%', width: '100%'}}
                  />
                   <View style={{flexDirection:'row', alignItems:'center',}}>
                    <Text style={[Textstyles.medium, {fontSize:16,  color:Colors.black}]}>Camera</Text>
                   </View>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  width: '50%',
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  onPress={() => imageEdit('Album')}
                  style={{height: 65, alignItems:'center', width: 80}}>
                  <Image
                    source={Icons.gallery}
                    style={{height: '100%', width: '100%'}}
                  />
                   <View style={{flexDirection:'row', alignItems:'center',}}>
                    <Text style={[Textstyles.medium, {fontSize:16,  color:Colors.black}]}>Gallery</Text>
                   </View>
                </TouchableOpacity>
              </View>
             </View>
            </TouchableWithoutFeedback>
            </Modal>
      )}

  {editName && (
        <Modal
          transparent={true}
          animationType={"slide"}
          style={{ width: "95%", position: "absolute", height: "100%" }}
        >
          <View style={styles.container4}>
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
                  onPress={() => setEditName(false)}
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
                  Enter first name
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
                placeholder="First Name"
                style={[Textstyles.medium, styles.input1]}
                value={editN}
                onChangeText={onEditN}
              />
            </View>

            <TouchableOpacity
              onPress={() => setEditName(false)}
              style={styles.loginBtn6}
            >
              <Text
                style={[
                  Textstyles.normal,
                  { color: Colors.white, fontSize: 18 },
                ]}
              >
                Save
              </Text>
            </TouchableOpacity>
          </View>
        </Modal>
      )}

  {editLast && (
        <Modal
          transparent={true}
          animationType={"slide"}
          style={{ width: "95%", position: "absolute", height: "100%" }}
        >
          <View style={styles.container4}>
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
                  onPress={() => setEditLast(false)}
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
                  Enter last name
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
                placeholder="Last Name"
                style={[Textstyles.medium, styles.input1]}
                value={editL}
                onChangeText={onEditL}
              />
            </View>

            <TouchableOpacity
              onPress={() => setEditLast(false)}
              style={styles.loginBtn6}
            >
              <Text
                style={[
                  Textstyles.normal,
                  { color: Colors.white, fontSize: 18 },
                ]}
              >
                Save
              </Text>
            </TouchableOpacity>
          </View>
        </Modal>
      )}

  {editEmail && (
        <Modal
          transparent={true}
          animationType={"slide"}
          style={{ width: "95%", position: "absolute", height: "100%" }}
        >
          <View style={styles.container4}>
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
                  onPress={() => setEditEmail(false)}
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
                      width: "100%",
                      left: vh(2),
                      alignSelf: "center",
                      fontSize: 18,
                      color: Colors.black,
                    },
                  ]}
                >
                 {otpScreenEnable ? 'Please enter otp' : 'Confirm your email address'} 
                </Text>
              </View>
            </View>


          {otpScreenEnable ? 
            <View style={{width:'95%'}}>
            <Text
              style={[ Textstyles.medium,{
                fontSize: 16,
                marginTop: vh(5),
                marginVertical: vh(2),
                alignSelf: 'center',
                width: '90%',
                color: 'black',
              }]}>
              Enter the 4-digit code sent to you at {'\n'}{editEmailId}
            </Text>
            <View style={{ width: '70%', borderRadius: 5, }}>
              <OTPTextView
                autoFocus
                handleTextChange={(e) => setOtpVal(e)}
                containerStyle={{}}
              />
            </View>
      
      
            {time === 0 ? 
              <View style={{ backgroundColor: Colors.black, left: 10, marginTop: vh(2), borderRadius: 20, width: '60%', padding: 5 }}>
                <TouchableOpacity onPress={() => setTime(30)}
                  style={{ alignSelf: 'center', }}>
                  <Text style={[Textstyles.normal,{color:Colors.white}]}>I didn't receive a code</Text>
                </TouchableOpacity>
              </View>
            :
              <View style={{ backgroundColor: '#DCDCDC', left: 10, marginTop: vh(2), borderRadius: 20, width: '40%', padding: 5 }}>
                <View style={{ alignSelf: 'center', }}>
                  <Text style={[Textstyles.normal]}>Resend otp in {time}</Text>
                </View>
              </View>
            }
          </View>
            :
            <View
              style={{
                width: "95%",
                alignSelf: "center",
                marginTop: 5,
                height: 50,
              }}
            >
              <TextInput
                placeholder="name@example.com"
                style={[Textstyles.medium, styles.input1]}
                value={editEmailId}
                onChangeText={onEditEmailId}
              />
            </View>
            }

          {otpScreenEnable ? 
            <TouchableOpacity
            onPress={() =>{ 
              setEditEmail(false)
              setOtpScreenEnable(false)
            }}
            style={styles.loginBtn6}
          >
            <Text
              style={[
                Textstyles.normal,
                { color: Colors.white, fontSize: 18 },
              ]}
            >
              Save
            </Text>
            </TouchableOpacity>
            :
            <TouchableOpacity
            onPress={() =>{ 
              setOtpScreenEnable(true)
              // setEditEmail(false)
            }}
            style={styles.loginBtn6}
          >
            <Text
              style={[
                Textstyles.normal,
                { color: Colors.white, fontSize: 18 },
              ]}
            >
              Update
            </Text>
            </TouchableOpacity>
          }

          </View>
        </Modal>
      )}
  
  {editPhone && (
        <Modal
          transparent={true}
          animationType={"slide"}
          style={{ width: "95%", position: "absolute", height: "100%" }}
        >
          <View style={styles.container4}>
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
                  onPress={() => setEditPhone(false)}
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
                      width: "100%",
                      left: vh(2),
                      alignSelf: "center",
                      fontSize: 18,
                      color: Colors.black,
                    },
                  ]}
                >
                 {otpScreenEnable ? 'Please enter otp' : 'Confirm your email address'} 
                </Text>
              </View>
            </View>


          {otpScreenEnable ? 
            <View style={{width:'95%'}}>
            <Text
              style={[ Textstyles.medium,{
                fontSize: 16,
                marginTop: vh(5),
                marginVertical: vh(2),
                alignSelf: 'center',
                width: '90%',
                color: 'black',
              }]}>
              Enter the 4-digit code sent to you at {'\n'}{editPhoneN}
            </Text>
            <View style={{ width: '70%', borderRadius: 5, }}>
              <OTPTextView
                autoFocus
                handleTextChange={(e) => setOtpPhone(e)}
                containerStyle={{}}
              />
            </View>
      
      
            {time === 0 ? 
              <View style={{ backgroundColor: Colors.black, left: 10, marginTop: vh(2), borderRadius: 20, width: '60%', padding: 5 }}>
                <TouchableOpacity onPress={() => setTime(30)}
                  style={{ alignSelf: 'center', }}>
                  <Text style={[Textstyles.normal,{color:Colors.white}]}>I didn't receive a code</Text>
                </TouchableOpacity>
              </View>
            :
              <View style={{ backgroundColor: '#DCDCDC', left: 10, marginTop: vh(2), borderRadius: 20, width: '40%', padding: 5 }}>
                <View style={{ alignSelf: 'center', }}>
                  <Text style={[Textstyles.normal]}>Resend otp in {time}</Text>
                </View>
              </View>
            }
          </View>
            :
            <View
              style={{
                width: "95%",
                alignSelf: "center",
                marginTop: 5,
                height: 50,
              }}
            >
              <TextInput
                placeholder="0000000000"
                style={[Textstyles.medium, styles.input1]}
                value={editPhoneN}
                onChangeText={onEditPhoneN}
              />
            </View>
            }

          {otpScreenEnable ? 
            <TouchableOpacity
            onPress={() =>{ 
              setEditPhone(false)
              setOtpScreenEnable(false)
            }}
            style={styles.loginBtn6}
          >
            <Text
              style={[
                Textstyles.normal,
                { color: Colors.white, fontSize: 18 },
              ]}
            >
              Save
            </Text>
            </TouchableOpacity>
            :
            <TouchableOpacity
            onPress={() =>{ 
              setOtpScreenEnable(true)
              // setEditEmail(false)
            }}
            style={styles.loginBtn6}
          >
            <Text
              style={[
                Textstyles.normal,
                { color: Colors.white, fontSize: 18 },
              ]}
            >
              Update
            </Text>
            </TouchableOpacity>
          }

          </View>
        </Modal>
      )}

</ScrollView>
</>
</TouchableWithoutFeedback>














</View>
  )
}

export default EditProfile

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
      loginBtn3: {
        width: "80%",
        borderRadius: 10,
        marginVertical: vh(3),
        height: 48,
        alignItems: "center",
        alignSelf: "center",
        justifyContent: "center",
        backgroundColor: Colors.gray,
      },
      loginBtn6: {
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
      container4: {
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
      input1: {
        margin: 12,
        height: 45,
        borderRadius: 5,
        // backgroundColor:'#E2E6E2',
        // borderWidth: 1,
        // borderColor: Colors.gray,
        borderBottomWidth:1,
        borderBottomColor:Colors.black,
        padding: 0,
        paddingTop: 5,
        paddingLeft: 5,
      },
      categoryData_view2: {
        marginHorizontal: wpx(8),
        paddingLeft: wpx(10),
        width: "33%",
        borderWidth: 1,
        borderRadius: 30,
        marginVertical: wpx(10),
        height: hpx(40),
        alignItems: "center",
        flexDirection: "row",
        elevation: 5,
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
        width: wpx(5),
        borderRadius: 3,
      },

      container:{
        width: '95%',
        alignSelf: 'center',
        backgroundColor: Colors.white,
        padding: hpx(10),
        marginVertical: hpx(1),
    
      },
      scrollView_text2: {
        color: Colors.black,
        fontSize: 13,
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