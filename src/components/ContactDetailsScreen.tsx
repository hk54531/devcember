import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import Contacts, {Contact} from 'react-native-contacts';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const ContactDetailsScreen = ({route, navigation}: any) => {
  const [fetchedContact, setFetchedContact] = useState<Contact>(null);

  useEffect(() => {
    const fetchContactDetails = async () => {
      try {
        const contact = await Contacts.getContactById(route.params.recordID);
        const updatedContact = {
          ...route.params,
          socialProfiles: [
            {
              label: 'twitter',
              value: {
                urlString: 'http://twitter.com/HankyPanky',
                username: 'HankyPanky',
                service: 'Twitter',
              },
            },
            {
              label: 'facebook',
              value: {
                urlString: 'http://www.facebook.com/HankZakoff',
                username: 'HankZakoff',
                service: 'Facebook',
              },
            },
            {
              label: 'instagram',
              value: {
                urlString: 'http://www.instagram.com/HankZakoff',
                username: 'HankZakoff',
                service: 'Instagram',
              },
            },
            {
              label: 'linkedin',
              value: {
                urlString: 'http://www.linkedin.com/HankZakoff',
                username: 'HankZakoff',
                service: 'LinkedIn',
              },
            },
          ],
        };
        setFetchedContact(updatedContact);
        console.log(JSON.stringify(updatedContact), '???');
      } catch (error) {
        console.error('Error fetching contact details:', error);
      }
    };

    fetchContactDetails();
  }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <StatusBar animated={true} backgroundColor="#fff" />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: '#fff',
          justifyContent: 'space-between',
          padding: 10,
        }}>
        <TouchableOpacity onPress={() => navigation.navigate('ContactList')}>
          <Ionicons name="arrow-back" size={25} color={'black'} />
        </TouchableOpacity>
        <Text style={{marginRight: 90, fontWeight: '700'}}>
          SHARE YOUR CONTACTS
        </Text>
      </View>
      <ScrollView style={{backgroundColor: '#F5F5F5'}}>
        {fetchedContact && (
          <View style={{alignItems: 'center', padding: 20}}>
            {fetchedContact.thumbnailPath ? (
              <Image
                source={{uri: fetchedContact.thumbnailPath}}
                style={{width: 100, height: 100, borderRadius: 50}}
              />
            ) : (
              <View
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 50,
                  backgroundColor: '#d9d9d9',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={{fontSize: 18}}>
                  {fetchedContact.givenName[0]}
                </Text>
              </View>
            )}
            <Text style={{fontSize: 24, fontWeight: 'bold', marginTop: 10}}>
              {`${fetchedContact.givenName} ${fetchedContact.middleName} ${fetchedContact.familyName}`}
            </Text>
            {fetchedContact.jobTitle && (
              <Text style={{fontSize: 16, marginTop: 5, fontWeight: '300'}}>
                {fetchedContact.jobTitle} | {fetchedContact.company}
              </Text>
            )}
            <View
              style={{
                backgroundColor: '#fff',
                marginTop: 20,
                borderRadius: 10,
                // width: '90%',
                minWidth: '90%',
                padding: 20,
              }}>
              {fetchedContact.phoneNumbers && (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',

                    marginBottom: 10,
                  }}>
                  <MaterialIcons
                    name="wifi-calling-3"
                    size={25}
                    color={'black'}
                  />
                  <View>
                    <Text
                      style={{
                        marginLeft: 10,
                        fontSize: 18,
                        fontWeight: '500',
                      }}>
                      Phone
                    </Text>
                    {fetchedContact.phoneNumbers.map((phoneNumber, index) => (
                      <Text
                        key={index}
                        style={{
                          marginLeft: 10,
                          fontSize: 14,
                          //   fontWeight: 'bold',
                        }}>
                        {phoneNumber.number}
                      </Text>
                    ))}
                  </View>
                  <TouchableOpacity style={{marginLeft: 'auto'}}>
                    <Entypo
                      name="dots-three-vertical"
                      size={20}
                      color={'grey'}
                    />
                  </TouchableOpacity>
                </View>
              )}
              {fetchedContact.emailAddresses.length > 0 && (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: 10,
                  }}>
                  <Feather name="mail" size={25} color={'black'} />
                  <View>
                    <Text
                      style={{
                        marginLeft: 10,
                        fontSize: 18,
                        fontWeight: '500',
                      }}>
                      Email
                    </Text>
                    {fetchedContact.emailAddresses.map((email, index) => (
                      <Text
                        key={index}
                        style={{
                          marginLeft: 10,
                          fontSize: 14,
                          //   fontWeight: 'bold',
                        }}>
                        {email.email}
                      </Text>
                    ))}
                  </View>
                  <TouchableOpacity style={{marginLeft: 'auto'}}>
                    <Entypo
                      name="dots-three-vertical"
                      size={20}
                      color={'grey'}
                    />
                  </TouchableOpacity>
                </View>
              )}
              {fetchedContact.socialProfiles?.map(
                (profile: any, index: any) => (
                  <View
                    key={index}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginBottom: 10,
                    }}>
                    {profile.label === 'twitter' && (
                      <Feather name="twitter" size={25} color={'#1DA1F2'} />
                    )}
                    {profile.label === 'facebook' && (
                      <Entypo name="facebook" size={25} color={'#4267B2'} />
                    )}
                    {profile.label === 'instagram' && (
                      <Feather name="instagram" size={25} color={'#C13584'} />
                    )}
                    {profile.label === 'linkedin' && (
                      <Feather name="linkedin" size={25} color={'#0077B5'} />
                    )}
                    {/* {profile.label && (
                      <Feather name={profile.label} size={25} color={'black'} />
                    )} */}
                    <View>
                      <Text
                        style={{
                          marginLeft: 10,
                          fontSize: 18,
                          fontWeight: '500',
                        }}>
                        {profile.value.service}
                      </Text>
                      <Text style={{marginLeft: 10, fontSize: 14}}>
                        {profile.value.username}
                      </Text>
                    </View>
                    <TouchableOpacity style={{marginLeft: 'auto'}}>
                      <Entypo
                        name="dots-three-vertical"
                        size={20}
                        color={'grey'}
                      />
                    </TouchableOpacity>
                  </View>
                ),
              )}
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ContactDetailsScreen;
