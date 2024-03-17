import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Image,
  ScrollView,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

const ContactInfo = () => {
  const [mute, setMute] = useState<boolean>(false);
  const [muteValue, setMuteValue] = useState<string>('No');
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'rgba(59, 38, 130, 1)'}}>
      <StatusBar
        animated={true}
        backgroundColor="rgba(255, 255, 255, 1)"
        barStyle="light-content"
      />
      <View
        style={{
          backgroundColor: 'rgba(59, 38, 130, 1)',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: responsiveHeight(7),
          paddingHorizontal: responsiveWidth(3),
        }}>
        <TouchableOpacity>
          <Ionicons name="chevron-back" color={'white'} size={25} />
        </TouchableOpacity>
        <Text
          style={{
            color: 'rgba(255, 255, 255, 1)',
            fontSize: 16,
            fontWeight: '600',
            fontFamily: 'Poppins',
            lineHeight: 22,
          }}>
          Contact Info
        </Text>
        <TouchableOpacity>
          <MaterialCommunityIcons
            name="flag-outline"
            color={'white'}
            size={25}
          />
        </TouchableOpacity>
      </View>
      <ScrollView style={{backgroundColor: '#fff', flex: 1}}>
        <View style={{}}>
          <Image
            source={{uri: 'https://i.postimg.cc/yN8Yn1JV/pxfuel.jpg'}}
            resizeMode="cover"
            style={{
              height: 100,
              width: 100,
              borderRadius: 50,
              backgroundColor: 'red',
              alignSelf: 'center',
              marginVertical: responsiveHeight(2),
            }}
          />
          <Text
            style={{
              color: 'rgba(59, 38, 130, 1)',
              fontSize: 17,
              fontWeight: '600',
              fontFamily: 'Poppins',
              lineHeight: 25.5,
              alignSelf: 'center',
            }}>
            Aaron Blackfoard
          </Text>
          <Text
            style={{
              color: 'rgba(102, 102, 102, 1)',
              fontSize: 14,
              fontWeight: '500',
              fontFamily: 'Poppins',
              lineHeight: 21,
              alignSelf: 'center',
            }}>
            +91 6652400111
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <TouchableOpacity
              style={{
                backgroundColor: 'rgba(246, 246, 252, 1)',
                height: responsiveHeight(13),
                width: responsiveWidth(26),
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'center',
                marginHorizontal: 15,
                marginVertical: 10,
              }}>
              <MaterialCommunityIcons
                name="video"
                color={'rgba(59, 38, 130, 1)'}
                size={30}
              />
              <Text
                style={{
                  color: 'rgba(59, 38, 130, 1)',
                  fontSize: 14,
                  fontWeight: '600',
                  fontFamily: 'Poppins',
                  lineHeight: 24,
                }}>
                Video
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: 'rgba(246, 246, 252, 1)',
                height: responsiveHeight(13),
                width: responsiveWidth(26),
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <MaterialIcons
                name="search"
                color={'rgba(59, 38, 130, 1)'}
                size={30}
              />
              <Text
                style={{
                  color: 'rgba(59, 38, 130, 1)',
                  fontSize: 14,
                  fontWeight: '600',
                  fontFamily: 'Poppins',
                  lineHeight: 24,
                }}>
                Search
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          style={{
            padding: 10,
            marginTop: 10,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
            borderBottomWidth: 1,
            borderTopWidth: 1,
            borderColor: 'rgba(242, 240, 247, 1)',
          }}>
          <View
            style={{
              backgroundColor: 'rgba(246, 246, 252, 1)',
              height: 50,
              width: 50,
              borderRadius: 50,
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft: responsiveWidth(3),
            }}>
            <MaterialIcons
              name="person-outline"
              size={30}
              color={'rgba(59, 38, 130, 1)'}
            />
          </View>
          <View style={{paddingLeft: responsiveWidth(5)}}>
            <Text
              style={{
                marginBottom: responsiveHeight(1),
                color: 'rgba(102, 102, 102, 1)',
                fontWeight: '500',
                fontFamily: 'Poppins',
                fontSize: 16,
                lineHeight: 24,
              }}>
              About
            </Text>
            <Text
              style={{
                // marginBottom: responsiveHeight(2),
                color: 'rgba(59, 38, 130, 1)',
                fontWeight: '600',
                fontFamily: 'Poppins',
                fontSize: 16,
                lineHeight: 24,
              }}>
              Status of a person
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            padding: 10,
            // marginTop: 10,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
            borderBottomWidth: 1,
            borderTopWidth: 1,
            borderColor: 'rgba(242, 240, 247, 1)',
          }}>
          <View
            style={{
              backgroundColor: 'rgba(246, 246, 252, 1)',
              height: 50,
              width: 50,
              borderRadius: 50,
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft: responsiveWidth(3),
            }}>
            <MaterialCommunityIcons
              name="image-multiple-outline"
              size={30}
              color={'rgba(59, 38, 130, 1)'}
            />
          </View>
          <View style={{paddingLeft: responsiveWidth(5)}}>
            <Text
              style={{
                marginBottom: responsiveHeight(1),
                color: 'rgba(102, 102, 102, 1)',
                fontWeight: '500',
                fontFamily: 'Poppins',
                fontSize: 16,
                lineHeight: 24,
              }}>
              Media
            </Text>
            <Text
              style={{
                // marginBottom: responsiveHeight(2),
                color: 'rgba(59, 38, 130, 1)',
                fontWeight: '600',
                fontFamily: 'Poppins',
                fontSize: 16,
                lineHeight: 24,
              }}>
              Media, Links, and Docs (135)
            </Text>
          </View>
          <Ionicons
            name="chevron-forward-outline"
            color={'rgba(102, 102, 102, 1)'}
            size={25}
            style={{marginLeft: 'auto'}}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setMute(!mute)}
          style={{
            padding: 10,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
            borderBottomWidth: 1,
            borderTopWidth: 1,
            borderColor: 'rgba(242, 240, 247, 1)',
          }}>
          <View
            style={{
              backgroundColor: 'rgba(246, 246, 252, 1)',
              height: 50,
              width: 50,
              borderRadius: 50,
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft: responsiveWidth(3),
            }}>
            <MaterialIcons
              name="volume-mute"
              size={30}
              color={'rgba(59, 38, 130, 1)'}
            />
          </View>
          <View style={{paddingLeft: responsiveWidth(5)}}>
            <Text
              style={{
                marginBottom: responsiveHeight(1),
                color: 'rgba(102, 102, 102, 1)',
                fontWeight: '500',
                fontFamily: 'Poppins',
                fontSize: 16,
                lineHeight: 24,
              }}>
              Mute
            </Text>
            <Text
              style={{
                // marginBottom: responsiveHeight(2),
                color: 'rgba(59, 38, 130, 1)',
                fontWeight: '600',
                fontFamily: 'Poppins',
                fontSize: 16,
                lineHeight: 24,
              }}>
              {muteValue}
            </Text>
          </View>
          <Ionicons
            name="chevron-forward-outline"
            color={'rgba(102, 102, 102, 1)'}
            size={25}
            style={{marginLeft: 'auto'}}
          />
        </TouchableOpacity>
        <View style={{paddingBottom: responsiveHeight(10)}}>
          <View
            style={{
              backgroundColor: 'rgba(242, 240, 247, 1)',
              padding: responsiveHeight(2),
            }}>
            <Text
              style={{
                color: 'rgba(102, 102, 102, 1)',
                fontSize: 14,
                fontWeight: '600',
                fontFamily: 'Poppins',
                lineHeight: 21,
              }}>{`0 groups in common`}</Text>
          </View>
          <TouchableOpacity
            style={{
              padding: 10,
              // marginTop: 10,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start',
              borderBottomWidth: 1,
              borderTopWidth: 1,
              borderColor: 'rgba(242, 240, 247, 1)',
            }}>
            <View
              style={{
                backgroundColor: 'rgba(246, 246, 252, 1)',
                height: 50,
                width: 50,
                borderRadius: 50,
                alignItems: 'center',
                justifyContent: 'center',
                marginLeft: responsiveWidth(3),
              }}>
              <MaterialIcons
                name="people-alt"
                size={30}
                color={'rgba(59, 38, 130, 1)'}
              />
            </View>
            <View style={{paddingLeft: responsiveWidth(5)}}>
              <Text
                style={{
                  marginBottom: responsiveHeight(1),
                  color: 'rgba(102, 102, 102, 1)',
                  fontWeight: '500',
                  fontFamily: 'Poppins',
                  fontSize: 16,
                  lineHeight: 24,
                }}>
                Create group with Wade Wareen
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View
        style={{
          backgroundColor: 'rgba(255, 255, 255, 1)',
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'space-around',
          padding: responsiveHeight(2),
          borderTopWidth: 1,
          borderColor: 'rgba(242, 240, 247, 1)',
        }}>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            borderRightWidth: 1,
            borderColor: 'rgba(242, 240, 247, 1)',
            paddingRight: responsiveWidth(10),
            // marginLeft: 'auto',
          }}>
          <MaterialCommunityIcons
            name="delete-outline"
            size={30}
            color={'rgba(220, 38, 38, 1)'}
          />
          <Text
            style={{
              color: 'rgba(220, 38, 38, 1)',
              fontSize: 14,
              fontWeight: '600',
              fontFamily: 'Poppins',
              lineHeight: 21,
            }}>
            Delete Chat
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            // justifyContent: 'center',
          }}>
          <MaterialCommunityIcons
            name="block-helper"
            size={23}
            color={'rgba(220, 38, 38, 1)'}
            style={{marginRight: responsiveWidth(2)}}
          />
          <Text
            style={{
              color: 'rgba(220, 38, 38, 1)',
              fontSize: 14,
              fontWeight: '600',
              fontFamily: 'Poppins',
              lineHeight: 21,
            }}>
            Block Contact
          </Text>
        </TouchableOpacity>
      </View>
      <Modal
        data-testid="modalll"
        transparent={true}
        onRequestClose={() => setMute(!mute)}
        visible={mute}>
        <TouchableOpacity
          testID="isModalTest"
          onPressOut={() => setMute(!mute)}
          style={{flex: 1, backgroundColor: 'rgba(52, 52, 52, 0.8)'}}>
          <TouchableWithoutFeedback>
            <>
              <View
                style={{
                  backgroundColor: 'rgba(245, 245, 245, 0.9)',
                  height: responsiveHeight(30),
                  borderRadius: 20,
                  marginTop: 'auto',
                  // paddingVertical: responsiveHeight(2),
                  // paddingHorizontal: responsiveHeight(1),
                  marginHorizontal: responsiveWidth(3),
                }}>
                <Text
                  style={{
                    color: 'rgba(102, 102, 102, 1)',
                    fontSize: 16,
                    fontWeight: '400',
                    fontFamily: 'Poppins',
                    lineHeight: 18,
                    alignSelf: 'center',
                    paddingVertical: responsiveHeight(2.5),
                  }}>
                  Mute Notifications
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    setMuteValue('8 Hours');
                    setMute(!mute);
                  }}
                  style={{
                    padding: responsiveHeight(2),
                    borderTopWidth: 1,
                    borderBottomWidth: 1,
                    borderColor: 'rgba(60, 60, 67, 0.36)',
                  }}>
                  <Text
                    style={{
                      color: 'rgba(59, 38, 130, 1)',
                      fontSize: 16,
                      fontWeight: '500',
                      fontFamily: 'Poppins',
                      lineHeight: 22,
                      textAlign: 'center',
                    }}>
                    8 Hours
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setMuteValue('1 Week');
                    setMute(!mute);
                  }}
                  style={{
                    padding: responsiveHeight(2),
                    borderBottomWidth: 1,
                    borderColor: 'rgba(60, 60, 67, 0.36)',
                  }}>
                  <Text
                    style={{
                      color: 'rgba(59, 38, 130, 1)',
                      fontSize: 16,
                      fontWeight: '500',
                      fontFamily: 'Poppins',
                      lineHeight: 22,
                      textAlign: 'center',
                    }}>
                    1 Week
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setMuteValue('Always');
                    setMute(!mute);
                  }}
                  style={{
                    padding: responsiveHeight(2),
                    borderColor: 'rgba(60, 60, 67, 0.36)',
                  }}>
                  <Text
                    style={{
                      color: 'rgba(59, 38, 130, 1)',
                      fontSize: 16,
                      fontWeight: '500',
                      fontFamily: 'Poppins',
                      lineHeight: 22,
                      textAlign: 'center',
                    }}>
                    Always
                  </Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                onPress={() => setMute(!mute)}
                style={{
                  backgroundColor: 'white',
                  paddingVertical: responsiveHeight(2),
                  paddingHorizontal: responsiveHeight(1),
                  margin: responsiveHeight(2),
                  borderRadius: 10,
                }}>
                <Text
                  style={{
                    color: 'rgba(59, 38, 130, 1)',
                    fontSize: 16,
                    fontWeight: '500',
                    fontFamily: 'Poppins',
                    lineHeight: 22,
                    textAlign: 'center',
                  }}>
                  Cancel
                </Text>
              </TouchableOpacity>
            </>
          </TouchableWithoutFeedback>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
};

export default ContactInfo;
