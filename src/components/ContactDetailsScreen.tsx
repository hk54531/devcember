import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  StatusBar,
  TouchableOpacity,
  Share,
  PermissionsAndroid,
  Platform,
  ToastAndroid,
  Alert,
} from 'react-native';
import Contacts, {Contact} from 'react-native-contacts';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/FontAwesome';
import RNFS from 'react-native-fs';
import {VCard4} from 'vcard4-ts';

import {
  responsiveHeight,
  responsiveScreenFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

const ContactDetailsScreen = ({route, navigation}: any) => {
  const [fetchedContact, setFetchedContact] = useState<any>(null);
  const [checkbox, setCheckbox] = useState<boolean>(false);
  const [checkboxEmail, setCheckboxEmail] = useState<boolean>(false);
  const [checkedSocialProfiles, setCheckedSocialProfiles] = useState<any>({});

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
                username: 'hari twitter',
                service: 'Twitter',
              },
            },
            {
              label: 'facebook',
              value: {
                urlString: 'http://www.facebook.com/HankZakoff',
                username: 'god ryzen',
                service: 'Facebook',
              },
            },
            {
              label: 'instagram',
              value: {
                urlString: 'http://www.instagram.com/HankZakoff',
                username: 'rocky',
                service: 'Instagram',
              },
            },
            {
              label: 'linkedin',
              value: {
                urlString: 'http://www.linkedin.com/HankZakoff',
                username: 'Hank Zakoff',
                service: 'LinkedIn',
              },
            },
          ],
        };
        setFetchedContact(updatedContact);
        console.log(JSON.stringify(updatedContact), '???');
        const initialCheckedState: any = {};
        updatedContact.socialProfiles.forEach((profile: any) => {
          initialCheckedState[profile.label] = false;
        });
        setCheckedSocialProfiles(initialCheckedState);
        console.log(checkedSocialProfiles, '???');
      } catch (error) {
        console.error('Error fetching contact details:', error);
      }
    };

    fetchContactDetails();
  }, []);
  const handleCheckBoxChange = (label: string) => {
    setCheckedSocialProfiles((prevState: any) => ({
      ...prevState,
      [label]: !prevState[label],
    }));
  };

  //   const shareContact = () => {
  //     let message = `Full Name: ${fetchedContact.givenName} ${fetchedContact.middleName} ${fetchedContact.familyName}\n`;
  //     if (fetchedContact.jobTitle) {
  //       message += `Job Role: ${fetchedContact.jobTitle}\n`;
  //     }
  //     if (fetchedContact.company) {
  //       message += `Company Name: ${fetchedContact.company}\n`;
  //     }
  //     if (checkbox) {
  //       message += 'Phone Numbers:\n';
  //       fetchedContact.phoneNumbers.forEach((phoneNumber: any) => {
  //         message += ` - ${phoneNumber.number}\n`;
  //       });
  //     }
  //     if (checkboxEmail) {
  //       message += 'Email Addresses:\n';
  //       fetchedContact.emailAddresses.forEach((email: any) => {
  //         message += ` - ${email.email}\n`;
  //       });
  //     }
  //     // Add selected social profiles if any
  //     const selectedProfiles = Object.entries(checkedSocialProfiles)
  //       .filter(([_, value]) => value)
  //       .map(([key, _]) => {
  //         const profile = fetchedContact.socialProfiles.find(
  //           (p: any) => p.label === key,
  //         );
  //         if (profile) {
  //           return ` - ${profile.value.service}: ${profile.value.username}\n`;
  //         }
  //         return '';
  //       })
  //       .join('');

  //     if (selectedProfiles) {
  //       message += 'Social Profiles:\n';
  //       message += selectedProfiles;
  //     }

  //     // Share the constructed message
  //     console.log(message, 'vcard details');
  //     Share.share({
  //       message: message,
  //     });
  //   };

  //vcard generator
  const shareContact = () => {
    if (
      !checkbox &&
      !checkboxEmail &&
      Object.values(checkedSocialProfiles).every(value => !value)
    ) {
      // Show an alert to select anything
      Alert.alert('Please select at least one contact detail to share.');
      return; // Exit the function
    }
    // Construct the VCard string
    let vCard = `BEGIN:VCARD\nVERSION:3.0\n`;

    // Add contact details
    vCard += `FN:${fetchedContact.givenName} ${fetchedContact.middleName} ${fetchedContact.familyName}\n`;
    if (fetchedContact.jobTitle) {
      vCard += `TITLE:${fetchedContact.jobTitle}\n`;
    }
    if (fetchedContact.company) {
      vCard += `ORG:${fetchedContact.company}\n`;
    }

    if (checkbox) {
      fetchedContact.phoneNumbers.forEach((phoneNumber: any) => {
        vCard += `TEL;TYPE=CELL:${phoneNumber.number}\n`;
      });
    }
    if (checkboxEmail) {
      fetchedContact.emailAddresses.forEach((email: any) => {
        vCard += `EMAIL:${email.email}\n`;
      });
    }

    Object.entries(checkedSocialProfiles)
      .filter(([_, value]) => value)
      .forEach(([key, _]) => {
        const profile = fetchedContact.socialProfiles.find(
          (p: any) => p.label === key,
        );
        if (profile) {
          vCard += `X-SOCIALPROFILE;TYPE=${profile.label.toUpperCase()}:http://${
            profile.value.username
          }\n`;
        }
      });

    // Close the VCard string
    vCard += `END:VCARD`;

    const path = RNFS.DocumentDirectoryPath + `/contact.vcf`;
    RNFS.writeFile(path, vCard, 'utf8')
      .then(async () => {
        console.log('VCF file saved successfully:', path);
        // Optionally, you can share the file here
        // Share the VCard file
        await Share.share({
          title: 'Share Contact',
          url: 'file://' + path,
          //   type: 'text/vcard', // or 'text/x-vcard'
        });
      })
      .catch(error => {
        console.error('Error saving VCF file:', error);
      });

    console.log(vCard);
    // Share the VCard
    // Share.share({
    //   message: vCard,
    // });
  };

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
                  <TouchableOpacity
                    style={
                      checkbox
                        ? {
                            borderWidth: 2,
                            borderColor: '#8e4ede',
                            borderRadius: 5,
                            backgroundColor: '#8e4ede',
                            // color: 'white',
                            width: responsiveHeight(2.7),
                            height: responsiveHeight(2.7),
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginRight: responsiveWidth(2),
                            marginTop: responsiveHeight(0.3),
                            // marginLeft: responsiveWidth(6),
                          }
                        : {
                            padding: 5,
                            paddingRight: 3,
                            borderWidth: 2,
                            borderColor: '#8e4ede',
                            borderRadius: 5,
                            // color: 'white',
                            width: responsiveHeight(2.7),
                            height: responsiveHeight(2.7),
                            marginRight: responsiveWidth(2),
                            marginTop: responsiveHeight(0.3),
                            // marginLeft: responsiveWidth(6),
                          }
                    }
                    testID={`checkbox`}
                    onPress={() => {
                      // this.removecheckBoxErr();
                      setCheckbox(!checkbox);
                    }}>
                    <Icon
                      name={checkbox ? 'check' : ''}
                      size={16}
                      color={checkbox ? 'white' : 'transparent'}
                    />
                  </TouchableOpacity>
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
                  <TouchableOpacity
                    style={
                      checkboxEmail
                        ? {
                            borderWidth: 2,
                            borderColor: '#8e4ede',
                            borderRadius: 5,
                            backgroundColor: '#8e4ede',
                            // color: 'white',
                            width: responsiveHeight(2.7),
                            height: responsiveHeight(2.7),
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginRight: responsiveWidth(2),
                            marginTop: responsiveHeight(0.3),
                            // marginLeft: responsiveWidth(6),
                          }
                        : {
                            padding: 5,
                            paddingRight: 3,
                            borderWidth: 2,
                            borderColor: '#8e4ede',
                            borderRadius: 5,
                            // color: 'white',
                            width: responsiveHeight(2.7),
                            height: responsiveHeight(2.7),
                            marginRight: responsiveWidth(2),
                            marginTop: responsiveHeight(0.3),
                            // marginLeft: responsiveWidth(6),
                          }
                    }
                    testID={`checkboxEmail`}
                    onPress={() => {
                      // this.removecheckBoxErr();
                      setCheckboxEmail(!checkboxEmail);
                    }}>
                    <Icon
                      name={checkboxEmail ? 'check' : ''}
                      size={16}
                      color={checkboxEmail ? 'white' : 'transparent'}
                    />
                  </TouchableOpacity>
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
              {/* {fetchedContact.socialProfiles?.map(
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
                    )} 
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
              )} */}
              {/* </View>
          </View>
        )} */}
              {fetchedContact.socialProfiles?.map(
                (profile: any, index: any) => (
                  <View
                    key={index}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginBottom: 10,
                    }}>
                    <TouchableOpacity
                      style={{
                        borderWidth: 2,
                        borderColor: '#8e4ede',
                        borderRadius: 5,
                        backgroundColor: checkedSocialProfiles[profile.label]
                          ? '#8e4ede'
                          : 'transparent',
                        width: 20,
                        height: 20,
                        marginRight: 10,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onPress={() => handleCheckBoxChange(profile.label)}>
                      {checkedSocialProfiles[profile.label] && (
                        <Icon name="check" size={14} color="white" />
                      )}
                    </TouchableOpacity>
                    {/* Render social profile icon based on label */}
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
                    <View>
                      <Text
                        style={{
                          fontSize: 18,
                          fontWeight: '500',
                          marginLeft: 10,
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

        <TouchableOpacity
          style={{
            height: 50,
            width: '80%',
            backgroundColor: '#EFE3FE',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 10,
            alignSelf: 'center',
          }}>
          <Text>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={shareContact}
          style={{
            height: 50,
            width: '80%',
            backgroundColor: '#8e4ede',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 10,
            alignSelf: 'center',
            marginVertical: 10,
          }}>
          <Text style={{color: 'white'}}>Share</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ContactDetailsScreen;
