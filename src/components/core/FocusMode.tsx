import React, {Component} from 'react';

// Customizable Area Start
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Modal,
  TouchableWithoutFeedback,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  FlatList,
} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import CustomToggleSwitch from './CustomToggleButton';
// Customizable Area End

// import FocusModeController, {Props, configJSON} from './FocusModeController';
interface CountryCodeSelectorState {
  focused: boolean;
  addWordsModal: boolean;
  setWord: string;
  wordsArray: string[];
}
export default class FocusMode extends Component<{}, CountryCodeSelectorState> {
  constructor(props: {}) {
    super(props);
    // Initialize the state
    this.state = {
      focused: false,
      addWordsModal: false,
      setWord: '',
      wordsArray: ['Urgent', 'Help', 'SOS', 'Need to talk'],
    };
  }

  // Customizable Area Start

  pushWordsIntoArray = () => {
    const {setWord, wordsArray} = this.state;

    if (wordsArray.includes(setWord)) {
      Alert.alert('Word already exists!');
    } else {
      this.setState({wordsArray: [setWord, ...wordsArray]}, () => {
        this.toggleModal();
      });
    }
  };

  filterWord = (word: string) => {
    const filteredArray = this.state.wordsArray.filter(item => item !== word);
    this.setState({wordsArray: filteredArray});
  };

  renderArrayOfWords = (word: string) => {
    return (
      <TouchableOpacity
        disabled={!this.state.focused}
        onPress={() => this.filterWord(word)}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: 'rgba(225, 204, 255, 1)',
          padding: 7,
          margin: 5,
          borderRadius: 20,
          paddingHorizontal: responsiveWidth(5),
          justifyContent: 'center',
        }}>
        <MaterialIcons
          name={'delete-outline'}
          size={20}
          color={'rgba(59, 38, 130, 1)'}
        />
        <Text
          style={{
            color: 'rgba(59, 38, 130, 1)',
            fontFamily: 'Poppins',
            fontSize: 12,
            fontWeight: '500',
            lineHeight: 22,
          }}>
          {word}
        </Text>
      </TouchableOpacity>
    );
  };
  toggleModal = () => {
    this.setState({addWordsModal: !this.state.addWordsModal});
  };
  setWords = (e: string) => {
    this.setState({setWord: e});
  };
  setFocus = () => {
    this.setState({focused: !this.state.focused});
  };
  handlePress = (btnTitle: string) => {
    if (btnTitle === 'Add Words') {
      this.setState({addWordsModal: !this.state.addWordsModal});
    } else {
      Alert.alert('dsf', 'others');
    }
  };
  renderView = (
    heading: string,
    btnTitle: string,
    desc: string,
    dataToRender?: string[],
    renderItemFunction?: (
      item: string,
    ) => React.ReactElement<
      any,
      string | React.JSXElementConstructor<any>
    > | null,
  ) => {
    return (
      <>
        <View style={styles.messageNotificationsContainer}>
          <Text style={styles.messaseNotifications}>{heading}</Text>
        </View>
        <View style={styles.whiteBackground}>
          <View style={styles.blueBtnContainer}>
            {renderItemFunction && this.state.focused && (
              <View style={{paddingVertical: 10, paddingHorizontal: 10}}>
                <FlatList
                  testID="flatList"
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  nestedScrollEnabled={true}
                  renderItem={({item}) => renderItemFunction(item)}
                  data={dataToRender}
                />
              </View>
            )}
            <TouchableOpacity
              disabled={!this.state.focused}
              style={{
                backgroundColor: 'blue',
                maxWidth: responsiveWidth(60),
                alignSelf: 'center',
                marginTop: 15,
                borderRadius: 10,
                padding: 6,
              }}
              onPress={() => this.handlePress(btnTitle)}>
              <View style={[styles.nextviewInFocusHme]}>
                <Text style={styles.nextTitleHome}>{`+ ${btnTitle}`}</Text>
              </View>
            </TouchableOpacity>
            <View style={styles.descView}>
              <Text style={styles.descriptionText}>{desc}</Text>
            </View>
          </View>
        </View>
      </>
    );
  };
  // Customizable Area End

  render() {
    return (
      // Customizable Area Start
      // Merge Engine - render - Start
      <SafeAreaView style={styles.container}>
        <StatusBar
          animated={true}
          backgroundColor="rgba(59, 38, 130, 1)"
          barStyle="light-content"
        />
        <View style={styles.backBtnView}>
          <TouchableOpacity style={styles.backBtn}>
            <Ionicons name="chevron-back" color={'white'} size={25} />
          </TouchableOpacity>
          <Text style={styles.title}>{'FocusMode'}</Text>
        </View>
        <ScrollView style={styles.whiteBg}>
          {this.renderView(
            'SpecificTime',
            'Add Time',
            'hey this is add time desc',
          )}
          {this.renderView(
            'ExceptionContacts',
            'Add Contacts',
            'addContactsDesc',
          )}
          {this.renderView(
            'ExceptionsWords',
            'Add Words',
            'hey this is add time desc',
            this.state.wordsArray,
            this.renderArrayOfWords,
          )}
        </ScrollView>
        <View style={styles.shadowView}>
          <View style={styles.cloudView}>
            <MaterialIcons
              name={this.state.focused ? 'cloud-queue' : 'cloud-off'}
              size={20}
              color={'rgba(59, 38, 130, 1)'}
            />
          </View>
          <View style={styles.focusModeTxt}>
            <Text style={styles.focusModeTitle}>{'FocusMode'}</Text>
            <View style={styles.switchView}>
              <Text style={styles.descOfFocusMode}>{'focusModeDesc'}</Text>
            </View>
          </View>
          <View style={styles.leftMarginAuto}>
            <CustomToggleSwitch initialValue={false} onToggle={this.setFocus} />
          </View>
        </View>
        <Modal
          data-testid="modalll"
          data-modal="modal"
          transparent={true}
          onRequestClose={() => this.toggleModal()}
          visible={this.state.addWordsModal}>
          <TouchableOpacity
            data-modal="modal1"
            testID="isModalTest"
            onPressOut={() => this.toggleModal()}
            style={styles.modalStyle}>
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              style={styles.modalStyle}>
              <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View
                  style={{
                    marginTop: 'auto',
                    backgroundColor: 'white',
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: 20,
                      borderBottomWidth: 1,
                      borderColor: 'rgba(226, 232, 240, 1)',
                    }}>
                    <Text>Enter Word</Text>
                    <TouchableOpacity
                      onPress={() => this.toggleModal()}
                      style={{position: 'absolute', right: responsiveWidth(3)}}>
                      <MaterialIcons name="close" size={24} color="black" />
                    </TouchableOpacity>
                  </View>
                  <Image
                    source={{uri: 'https://i.postimg.cc/Jz5KTpMg/Vector.png'}}
                    resizeMode="contain"
                    style={{
                      height: 40,
                      width: 40,
                      alignSelf: 'center',
                      marginTop: 15,
                    }}
                  />
                  <View
                    style={{
                      paddingHorizontal: responsiveWidth(5),
                      paddingVertical: responsiveHeight(3),
                    }}>
                    <View style={styles.borderContainer}>
                      <TextInput
                        style={styles.textInput}
                        onChangeText={e => this.setWords(e)}
                        // value=''
                        placeholder="Enter exception word"
                        placeholderTextColor="rgba(166, 176, 191, 1)"
                      />
                    </View>
                  </View>
                  {/* <ButtonLinearGradient
                            testID='button'
                            disabled={!this.state.focused}
                            grediantStyle={styles.gradientBtn}
                            onPress={() => this.setActionAsPerHeading(btnTitle)}
                            renderItem={<View style={[styles.nextviewInFocusHme]}>
                                <Text style={styles.nextTitleHome}>{`+ ${btnTitle}`}</Text>
                            </View>}
                        /> */}
                  <TouchableOpacity
                    onPress={() => this.pushWordsIntoArray()}
                    disabled={this.state.setWord.length === 0}
                    style={{
                      backgroundColor: 'rgba(75, 50, 159, 1)',
                      padding: responsiveHeight(2.5),
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 20,
                      margin: responsiveHeight(2),
                    }}>
                    <Text style={styles.nextTitleHome}>Save Word</Text>
                  </TouchableOpacity>
                </View>
              </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
          </TouchableOpacity>
        </Modal>
      </SafeAreaView>
      // Merge Engine - render - End
      // Customizable Area End
    );
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  modalStyle: {
    flex: 1,
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
  },
  container: {backgroundColor: 'rgba(59, 38, 130, 1)', flex: 1},
  backBtnView: {
    backgroundColor: 'rgba(59, 38, 130, 1)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: responsiveHeight(7),
    paddingHorizontal: responsiveWidth(3),
  },
  backBtn: {position: 'absolute', left: 1},
  title: {
    color: 'rgba(255, 255, 255, 1)',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Poppins',
    lineHeight: 22,
  },
  whiteBg: {backgroundColor: '#fff', flex: 1},
  messageNotificationsContainer: {
    backgroundColor: 'rgba(242, 240, 247, 1)',
    padding: responsiveHeight(1),
  },
  messaseNotifications: {
    color: 'rgba(102, 102, 102, 1)',
    fontFamily: 'Poppins',
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 24,
  },
  gradientBtn: {
    height: 54,
    width: '84%',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 28,
    borderRadius: 26,
    overflow: 'hidden',
  },
  nextviewInFocusHme: {
    height: 52,
    width: '98.4%',
    marginRight: 1,
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 29,
    opacity: 1,
    shadowColor: '#6CB5F9',
    shadowOffset: {
      width: 5,
      height: 8,
    },
    shadowOpacity: 0.04,
    shadowRadius: 10.32,
    elevation: 4,
  },
  nextTitleHome: {
    textAlign: 'center',
    color: 'rgba(255, 255, 255, 1)',
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
  },
  descriptionText: {
    color: 'rgba(31, 31, 31, 1)',
    fontFamily: 'Poppins',
    fontWeight: '500',
    lineHeight: 18,
    textAlign: 'center',
    fontSize: 14,
    maxWidth: responsiveWidth(80),
  },
  shadowView: {
    backgroundColor: 'rgba(255, 255, 255, 1)',
    padding: responsiveHeight(2),
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 3,
    shadowRadius: 2,
  },
  leftMarginAuto: {marginLeft: 'auto'},
  descOfFocusMode: {
    color: 'rgba(31, 31, 31, 1)',
    fontFamily: 'Poppins',
    fontWeight: '400',
    lineHeight: 18,
    fontSize: 13,
  },
  switchView: {maxWidth: responsiveWidth(55), paddingTop: 5},
  focusModeTitle: {
    color: 'rgba(59, 38, 130, 1)',
    fontFamily: 'Poppins',
    fontWeight: '600',
    lineHeight: 24,
    fontSize: 18,
  },
  focusModeTxt: {marginLeft: responsiveWidth(5)},
  cloudView: {
    backgroundColor: 'rgba(225, 204, 255, 1)',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    width: 50,
    borderRadius: 50,
  },
  descView: {alignSelf: 'center', padding: responsiveHeight(2)},
  blueBtnContainer: {
    backgroundColor: 'rgba(246, 246, 252, 1)',
    borderRadius: 20,
  },
  whiteBackground: {
    backgroundColor: 'white',
    paddingVertical: responsiveHeight(2),
    paddingHorizontal: responsiveWidth(4),
  },
  borderContainer: {
    borderWidth: 5,
    borderColor: 'rgba(225, 204, 255, 1)', // Light blue border
    borderRadius: 15,
    // width: responsiveWidth(90),
    padding: 0, // Set padding to 0 to ensure borders touch
  },
  textInput: {
    height: responsiveHeight(7),
    width: responsiveWidth(87.2),
    borderWidth: 2,
    borderColor: 'rgba(59, 38, 130, 1)',
    borderRadius: 10,
    paddingHorizontal: 10,
    fontSize: 16,
  },
});
// Customizable Area End

// import React, {Component} from 'react';
// import {View, TextInput, StyleSheet} from 'react-native';
// import {
//   responsiveHeight,
//   responsiveWidth,
// } from 'react-native-responsive-dimensions';

// export default class CustomTextInput extends Component {
//   render() {
//     return (
//       <View style={styles.container}>
//         <View style={styles.borderContainer}>
//           <TextInput
//             style={styles.textInput}
//             placeholder="Enter exception word"
//             placeholderTextColor="gray"
//           />
//         </View>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 8,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   borderContainer: {
//     borderWidth: 5,
//     borderColor: 'rgba(225, 204, 255, 1)', // Light blue border
//     borderRadius: 15,
//     padding: -1, // Set padding to 0 to ensure borders touch
//   },
//   textInput: {
//     // Adjust width to account for border width
//     height: responsiveHeight(6),
//     // Adjust height to account for border width
//     width: responsiveWidth(70),
//     borderWidth: 2,
//     borderColor: 'rgba(59, 38, 130, 1)', // Blue border
//     borderRadius: 10,
//     paddingHorizontal: 10,
//     fontSize: 16,
//   },
// });
