

import React from "react";

// Customizable Area Start
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  Linking,
  Platform,
} from "react-native";
import Contacts from 'react-native-contacts';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo"
// Merge Engine - import assets - Start
// Merge Engine - import assets - End

// Merge Engine - Artboard Dimension  - Start
// Merge Engine - Artboard Dimension  - End
// Customizable Area End

import ContactsListController, {
  Props,
  configJSON,
} from "./ContactsListController";
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";

export default class ContactsList extends ContactsListController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start

    // Customizable Area End
  }

  // Customizable Area Start
   renderItem = (item: any
  //   {"phoneNumbers":
  //  [{
  //   "id":string,
  //   "label":string,
  //   "number":string
  // },{
  //   "id":string,
  //   "label":string,
  //   "number":string
  // }],
  // "isStarred":boolean,
  // "postalAddresses":[],
  // "thumbnailPath":string,
  // "department":string,
  // "jobTitle":string,
  // "emailAddresses":[
  //   {
  //     "id":string,
  //     "label":string,
  //     "email":string
  //   }],
  //   "urlAddresses":[],
  //   "suffix":null,
  //   "company":string,
  //   "imAddresses":[],
  //   "note":string,
  //   "middleName":string,
  //   "displayName":string,
  //   "familyName":string,
  //   "givenName":string,
  //   "prefix":null,
  //   "hasThumbnail":boolean,
  //   "rawContactId":string,
  //   "recordID":string}
    ) => {
    return (
      <TouchableOpacity onPress={()=>console.log(JSON.stringify(item),"???")} style={styles.contactCon}>
        <View style={styles.imgCon}>
          <View style={styles.placeholder}>
            {item.hasThumbnail ? (
              <Image
                source={{uri: item.thumbnailPath}}
                resizeMode="contain"
                style={{width: 100, height: 100}}
              />
            ) : (
              <Text style={styles.txt}>{item?.givenName[0]}</Text>
            )}
          </View>
        </View>
        <View style={styles.contactDat}>
          <Text style={styles.name}>
            {item?.givenName} {item?.middleName && item.middleName + ' '}
            {item?.familyName}
          </Text>
          <Text style={styles.phoneNumber}>
            {item?.phoneNumbers[0]?.number}
          </Text>
        </View>
        <TouchableOpacity>
          <Entypo name="dots-three-vertical" size={20} color={"grey"} />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };
   keyExtractor = (item:  {
    recordID: string;
    // Add other properties as needed
  }, idx: number) => {
    return item.recordID.toString() || idx.toString();
  };
   search = (text: string) => {
    this.setState({searchText:text})
    const phoneNumberRegex =
      /\b[\+]?[(]?[0-9]{2,6}[)]?[-\s\.]?[-\s\/\.0-9]{3,15}\b/m;
    const emailAddressRegex =
      /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    if (text === '' || text === null) {
      this.loadContacts();
    } else if (phoneNumberRegex.test(text)) {
      (async () => {
        const filteredContacts = await Contacts.getContactsByPhoneNumber(text);
        this.setState({contacts:filteredContacts});
      })();
    } else if (emailAddressRegex.test(text)) {
      (async () => {
        const filteredContacts = await Contacts.getContactsByEmailAddress(text);
        this.setState({contacts:filteredContacts});
      })();
    } else {
      (async () => {
        const filteredContacts = await Contacts.getContactsMatchingString(text);
        this.setState({contacts:filteredContacts});
      })();
    }
  };
  //  openNativeContacts = () => {
  //   let url = '';
  //   if (Platform.OS === 'android') {
  //     url = 'content://contacts/people';
  //   } else if (Platform.OS === 'ios') {
  //     url = 'contacts://'; // This will open the Contacts app on iOS
  //   }
  //   Linking.openURL(url).catch(err => console.error('An error occurred', err));
  // };


  openContacts = () => {
    Contacts.openContactForm({}).then(async() => {
      // Do something after the contact form is closed
      const count = await Contacts.getCount();
      console.log(count, '??? count');
      this.setState({contactsCount:count})
      Contacts.getAll().then(contacts => {
        this.setState({ contacts: contacts, loading: false });
      });
    }).catch(error => {
      console.error('Error opening contact form: ', error);
    });
  };
  
  // Customizable Area End

  render() {
    // Customizable Area Start
    // Merge Engine - render - Start
    return (
     this.state.loading ?
        <View style={[styles.container, styles.horizontal]}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
    :( <>
      <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between",padding:20}}>
      <TouchableOpacity><MaterialIcons name="arrow-back" size={25} color={"black"} /></TouchableOpacity>
      <Text style={{fontSize:responsiveFontSize(2.5),fontWeight:"700",marginLeft:responsiveWidth(5)}}>Contact List</Text>
      <TouchableOpacity onPress={()=>this.setSearch()}><AntDesign name="search1" size={25} color={"black"} /></TouchableOpacity>
      <TouchableOpacity onPress={ ()=>this.openContacts()}><AntDesign name="pluscircleo" size={25} color={"black"} /></TouchableOpacity>

      </View>
      { this.state.enableSearch && <TextInput
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          marginBottom: 10,
          paddingHorizontal: 10,
          width:responsiveWidth(90),
          marginLeft:responsiveWidth(5),
          borderRadius:10,
        }}
        placeholder="Search by phone number or email"
        onChangeText={(text)=>this.search(text)}
        value={this.state.searchText}
      />}
      <View 
       style={{
        height: responsiveHeight(6),
        marginBottom: 10,
        paddingHorizontal: 10,
        backgroundColor:"#D3D3D3",

      }}
      >
        <Text style={{marginLeft:5,marginTop:responsiveHeight(1.7),fontWeight:"700",color:"grey"}}>{this.state.contactsCount} CONTACTS</Text>
      </View>
      {this.state.contacts?.length === 0 ? (
        <View style={styles.container}>
          <Text>No contacts found.</Text>
        </View>
      ) : (
        <FlatList
          data={this.state.contacts}
          renderItem={({ item }) => this.renderItem(item)}
          keyExtractor={this.keyExtractor}
          style={styles.list}
        />
      )}
    </>)
    );
    // Merge Engine - render - End
    // Customizable Area End
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    flex: 1,
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  contactCon: {
    flex: 1,
    flexDirection: 'row',
    padding: 5,
    borderBottomWidth: 0.5,
    borderBottomColor: '#d9d9d9',
    alignItems:"center"
  },
  imgCon: {},
  placeholder: {
    width: 55,
    height: 55,
    borderRadius: 30,
    overflow: 'hidden',
    backgroundColor: '#d9d9d9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contactDat: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft:10,
  },
  txt: {
    fontSize: 18,
  },
  name: {
    fontSize: 16,
  },
  phoneNumber: {
    color: '#888',
  },
});
// Customizable Area End


********************************************************************************************
ContactsListController.tsx






import {IBlock} from '../../../framework/src/IBlock';
import {Message} from '../../../framework/src/Message';
import {BlockComponent} from '../../../framework/src/BlockComponent';
import MessageEnum, {
  getName,
} from '../../../framework/src/Messages/MessageEnum';
import {runEngine} from '../../../framework/src/RunEngine';

// Customizable Area Start
import {imgPasswordInVisible, imgPasswordVisible} from './assets';
import Contacts from 'react-native-contacts';
import {PERMISSIONS, RESULTS, request} from 'react-native-permissions';
import {Platform} from 'react-native';
// Customizable Area End

export const configJSON = require('./config');

export interface Props {
  navigation: any;
  id: string;
  // Customizable Area Start
  // Customizable Area End
}

interface S {
  txtInputValue: string;
  txtSavedValue: string;
  enableField: boolean;
  // Customizable Area Start
  searchText: string;
  loading: boolean;
  contacts: any;
  enableSearch: boolean;
  contactsCount: number;
  // Customizable Area End
}

interface SS {
  id: any;
  // Customizable Area Start
  // Customizable Area End
}

export default class ContactsListController extends BlockComponent<
  Props,
  S,
  SS
> {
  // Customizable Area Start
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    this.receive = this.receive.bind(this);

    // Customizable Area Start
    this.subScribedMessages = [
      getName(MessageEnum.AccoutLoginSuccess),
      // Customizable Area Start
      // Customizable Area End
    ];

    this.state = {
      txtInputValue: '',
      txtSavedValue: 'A',
      enableField: false,
      // Customizable Area Start
      searchText: '',
      loading: true,
      contacts: null,
      enableSearch: false,
      contactsCount: 0,
      // Customizable Area End
    };
    runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

    // Customizable Area Start
    // Customizable Area End
  }

  async receive(from: string, message: Message) {
    runEngine.debugLog('Message Recived', message);

    if (message.id === getName(MessageEnum.AccoutLoginSuccess)) {
      let value = message.getData(getName(MessageEnum.AuthTokenDataMessage));

      this.showAlert(
        'Change Value',
        'From: ' + this.state.txtSavedValue + ' To: ' + value,
      );

      this.setState({txtSavedValue: value});
    }

    // Customizable Area Start
    // Customizable Area End
  }

  txtInputWebProps = {
    onChangeText: (text: string) => {
      this.setState({txtInputValue: text});
    },
    secureTextEntry: false,
  };

  txtInputMobileProps = {
    ...this.txtInputWebProps,
    autoCompleteType: 'email',
    keyboardType: 'email-address',
  };

  txtInputProps = this.isPlatformWeb()
    ? this.txtInputWebProps
    : this.txtInputMobileProps;

  btnShowHideProps = {
    onPress: () => {
      this.setState({enableField: !this.state.enableField});
      this.txtInputProps.secureTextEntry = !this.state.enableField;
      this.btnShowHideImageProps.source = this.txtInputProps.secureTextEntry
        ? imgPasswordVisible
        : imgPasswordInVisible;
    },
  };

  btnShowHideImageProps = {
    source: this.txtInputProps.secureTextEntry
      ? imgPasswordVisible
      : imgPasswordInVisible,
  };

  btnExampleProps = {
    onPress: () => this.doButtonPressed(),
  };

  doButtonPressed() {
    let msg = new Message(getName(MessageEnum.AccoutLoginSuccess));
    msg.addData(
      getName(MessageEnum.AuthTokenDataMessage),
      this.state.txtInputValue,
    );
    this.send(msg);
  }

  // web events
  setInputValue = (text: string) => {
    this.setState({txtInputValue: text});
  };

  setEnableField = () => {
    this.setState({enableField: !this.state.enableField});
  };

  // Customizable Area Start
  componentDidMount = async () => {
    this.loadContacts();
  };
  requestContactPermission = async () => {
    try {
      Contacts.checkPermission().then(permission => {
        if (permission === 'undefined') {
          Contacts.requestPermission().then(permission => {
            console.log(permission, 'check');
            Contacts.getAll().then(contacts => {
              this.setState({contacts: contacts, loading: false});
            });
          });
        }
        if (permission === 'authorized') {
          Contacts.getAll()
            .then(contacts => {
              this.setState({contacts: contacts, loading: false});
            })
            .catch(error => {
              this.setState({loading: false});
              console.error('Error fetching contacts:', error);
            });
        }
        if (permission === 'denied') {
          (async () => {
            if (Platform.OS === 'android') {
              const permission = await request(
                PERMISSIONS.ANDROID.READ_CONTACTS,
              );
              if (permission === RESULTS.GRANTED) {
                Contacts.getAll().then(contacts => {
                  this.setState({contacts: contacts, loading: false});
                });
              }
            }
          })();
        }
      });
    } catch (error) {
      console.error('Error requesting contact permission:', error);
    }
  };
  loadContacts = async () => {
    await this.requestContactPermission();
    const count = await Contacts.getCount();
    console.log(count, '??? count');
    this.setState({contactsCount: count});
  };
  setSearch = () => {
    this.setState({enableSearch: !this.state.enableSearch});
  };
  // Customizable Area End
}
