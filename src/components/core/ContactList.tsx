import React, {useEffect, useState} from 'react';
import {
  FlatList,
  StyleSheet,
  Platform,
  Alert,
  ActivityIndicator,
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import Contacts from 'react-native-contacts';
import {check, PERMISSIONS, RESULTS, request} from 'react-native-permissions';
import Contact from './Contact';

interface ContactItem {
  recordID: string;
  // Add other properties as needed
}

const ContactList = (props: any) => {
  const [contacts, setContacts] = useState<ContactItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchText, setSearchText] = useState('');

  // Request permissions function for both iOS and Android
  const requestContactPermission = async () => {
    try {
      //   const permission =
      //     Platform.OS === 'android'
      //       ? await request(PERMISSIONS.ANDROID.READ_CONTACTS)
      //       : await request(PERMISSIONS.IOS.CONTACTS);
      //   console.log(permission, '???');
      //   if (permission === RESULTS.GRANTED) {
      //     console.log('object i am here');
      //     Contacts.getAll()
      //       .then(contacts => {
      //         setContacts(contacts);
      //         setLoading(false);
      //       })
      //       .catch(error => {
      //         setLoading(false);
      //         console.error('Error fetching contacts:', error);
      //       });
      //   } else {
      //     console.log('Contact permission denied');
      //     setLoading(false);
      //     // Alert.alert(
      //     //   'Permission Denied',
      //     //   'Please enable contact permission in settings to use this feature.',
      //     // );
      //   }
      Contacts.checkPermission().then(permission => {
        // Contacts.PERMISSION_AUTHORIZED || Contacts.PERMISSION_UNDEFINED || Contacts.PERMISSION_DENIED
        if (permission === 'undefined') {
          Contacts.requestPermission().then(permission => {
            // ...
            console.log(permission, 'check');
          });
        }
        if (permission === 'authorized') {
          // yay!
          Contacts.getAll()
            .then(contacts => {
              setContacts(contacts);
              setLoading(false);
            })
            .catch(error => {
              setLoading(false);
              console.error('Error fetching contacts:', error);
            });
        }
        if (permission === 'denied') {
          // x.x
          setLoading(false);

          (async () => {
            if (Platform.OS === 'android') {
              const permission = await request(
                PERMISSIONS.ANDROID.READ_CONTACTS,
              );
              if (permission === RESULTS.GRANTED) {
                Contacts.getAll().then(contacts => {
                  setContacts(contacts);
                  setLoading(false);
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
  const loadContacts = async () => {
    await requestContactPermission();
    const count = await Contacts.getCount(); // Get the count of contacts
    console.log(count, '??? count');
  };
  useEffect(() => {
    loadContacts();
  }, []);

  //   const search = (text: any) => {
  //     const phoneNumberRegex =
  //       /\b[\+]?[(]?[0-9]{2,6}[)]?[-\s\.]?[-\s\/\.0-9]{3,15}\b/m;
  //     const emailAddressRegex =
  //       /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
  //     if (text === '' || text === null) {
  //       loadContacts();
  //     } else if (phoneNumberRegex.test(text)) {
  //       Contacts.getContactsByPhoneNumber(text, (err, contacts) => {
  //         this.setState({contacts});
  //       });
  //     } else if (emailAddressRegex.test(text)) {
  //       Contacts.getContactsByEmailAddress(text, (err, contacts) => {
  //         this.setState({contacts});
  //       });
  //     } else {
  //       Contacts.getContactsMatchingString(text, (err, contacts) => {
  //         this.setState({contacts});
  //       });
  //     }
  //   };

  const search = (text: string) => {
    setSearchText(text);
    const phoneNumberRegex =
      /\b[\+]?[(]?[0-9]{2,6}[)]?[-\s\.]?[-\s\/\.0-9]{3,15}\b/m;
    const emailAddressRegex =
      /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    if (text === '' || text === null) {
      loadContacts();
    } else if (phoneNumberRegex.test(text)) {
      console.log(text, 'i am in number');

      (async () => {
        const filteredContacts = await Contacts.getContactsByPhoneNumber(text);
        setContacts(filteredContacts);
      })();
    } else if (emailAddressRegex.test(text)) {
      (async () => {
        const filteredContacts = await Contacts.getContactsByEmailAddress(text);
        setContacts(filteredContacts);
      })();
    } else {
      (async () => {
        const filteredContacts = await Contacts.getContactsMatchingString(text);
        setContacts(filteredContacts);
      })();
    }
  };

  const keyExtractor = (item: ContactItem, idx: number) => {
    return item.recordID.toString() || idx.toString();
  };

  const renderItem = ({item}: any) => {
    return (
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate('ContactDetailsScreen', item);
          // console.log(item);
        }}
        style={styles.contactCon}>
        <View style={styles.imgCon}>
          <View style={styles.placeholder}>
            {item.thumbnailPath ? (
              <Image
                source={{uri: item.thumbnailPath}}
                resizeMode="contain"
                style={{width: 50, height: 50}}
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
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <>
      <TextInput
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          marginBottom: 10,
          paddingHorizontal: 10,
        }}
        placeholder="Search by phone number or email"
        onChangeText={search}
        value={searchText}
      />
      {contacts.length === 0 ? (
        <View style={styles.container}>
          <Text>No contacts found.</Text>
        </View>
      ) : (
        <FlatList
          data={contacts}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          style={styles.list}
        />
      )}
    </>
  );
};

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
    paddingLeft: 5,
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

export default ContactList;

// import React, {useEffect, useState} from 'react';
// import {FlatList, View, Text, StyleSheet} from 'react-native';
// import Contacts from 'react-native-contacts';
// import Contact from './Contact';
// const ContactList = () => {
//   const [contacts, setContacts] = useState([]);
//   useEffect(() => {
//     Contacts.getAll().then(contacts => {
//       setContacts(contacts);
//     });
//   }, []);
//   const keyExtractor = (item: any, idx: any) => {
//     return item?.recordID?.toString() || idx.toString();
//   };
//   const renderItem = ({item, index}: any) => {
//     return <Contact contact={item} />;
//   };
//   return (
//     <FlatList
//       data={contacts}
//       renderItem={renderItem}
//       keyExtractor={keyExtractor}
//       style={styles.list}
//     />
//   );
// };
// const styles = StyleSheet.create({
//   list: {
//     flex: 1,
//   },
// });
// export default ContactList;
