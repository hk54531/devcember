import React, {useState, useRef, useEffect, memo} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  Platform,
  PermissionsAndroid,
  FlatList,
} from 'react-native';
import {Camera, useCameraDevice} from 'react-native-vision-camera'; // Adjust import
import {
  CameraRoll,
  PhotoIdentifier,
} from '@react-native-camera-roll/camera-roll';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {
  PERMISSIONS,
  checkMultiple,
  requestMultiple,
} from 'react-native-permissions';
import {responsiveWidth} from 'react-native-responsive-dimensions';

const App = () => {
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [flashMode, setFlashMode] = useState<'off' | 'on' | 'auto'>('off');
  const [galleryImages, setGalleryImages] = useState<PhotoIdentifier[]>([]);
  const [camera, setCamera] = useState<'back' | 'front'>('back');
  const [zoomLevel, setZoomLevel] = useState(1); // Zoom level state
  const cameraRef = useRef<Camera>(null); // Use React.MutableRefObject<Camera>

  const device = useCameraDevice(camera); // Get camera device

  useEffect(() => {
    const requestPermissions = async () => {
      if (Platform.OS === 'android') {
        const cameraPermission = await requestCameraPermission();
        const galleryPermission = await requestGalleryPermission();
        if (cameraPermission && galleryPermission) {
          fetchGalleryImages();
        }
      } else if (Platform.OS === 'ios') {
        checkMultiple([
          PERMISSIONS.IOS.CAMERA,
          PERMISSIONS.IOS.PHOTO_LIBRARY,
        ]).then(statuses => {
          if (
            statuses[PERMISSIONS.IOS.CAMERA] === 'granted' &&
            statuses[PERMISSIONS.IOS.PHOTO_LIBRARY] === 'granted'
          ) {
            fetchGalleryImages();
          }
        });
      }
    };

    requestPermissions();
  }, []);

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true; // iOS doesn't require explicit camera permission request
  };

  const GalleryImage = memo(({image}: any) => (
    <TouchableOpacity style={styles.galleryImageContainer}>
      <Image source={{uri: image.node.image.uri}} style={styles.galleryImage} />
    </TouchableOpacity>
  ));

  const requestGalleryPermission = async () => {
    if (Platform.OS === 'android') {
      if (Number(Platform.Version) >= 33) {
        const permissions = [
          PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
          PERMISSIONS.ANDROID.READ_MEDIA_VIDEO,
          PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
        ];

        const statuses = await requestMultiple(permissions);
        return (
          statuses[PERMISSIONS.ANDROID.READ_MEDIA_IMAGES] === 'granted' &&
          statuses[PERMISSIONS.ANDROID.READ_MEDIA_VIDEO] === 'granted' &&
          statuses[PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE] === 'granted'
        );
      } else {
        const permission = PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;
        const hasPermission = await PermissionsAndroid.check(permission);
        if (hasPermission) {
          return true;
        }
        const status = await PermissionsAndroid.request(permission);
        return status === PermissionsAndroid.RESULTS.GRANTED;
      }
    }
    return true; // For iOS, no explicit gallery permission request is needed
  };

  const openCamera = async () => {
    const permissionGranted = await requestCameraPermission();
    if (permissionGranted) {
      setIsCameraOpen(true);
    }
  };

  const capture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePhoto({
        flash: flashMode,
      });
      // await CameraRoll.save(`file://${photo.path}`, {
      //   type: 'photo',
      // });
      console.log(photo, '???');
      // Handle the photo
    } else {
      console.log('Camera reference is not yet available');
    }
  };

  const closeCamera = () => {
    setIsCameraOpen(false);
  };

  const toggleFlash = () => {
    setFlashMode(prevMode => {
      if (prevMode === 'off') return 'on';
      else if (prevMode === 'on') return 'off';
      else return 'off';
    });
  };

  const toggleCamera = () => {
    setCamera(prev => {
      if (prev === 'back') return 'front';
      else return 'back';
    });
  };

  const fetchGalleryImages = async () => {
    try {
      const {edges} = await CameraRoll.getPhotos({
        first: 9999,
        assetType: 'Photos',
      });
      setGalleryImages(edges);
      console.log('Gallery images:', edges);
    } catch (error) {
      console.error('Error fetching gallery images:', error);
    }
  };

  const setZoom1x = () => {
    setZoomLevel(1);
  };

  const setZoom1_5x = () => {
    setZoomLevel(1.5);
  };

  const setZoom2x = () => {
    setZoomLevel(2);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Camera App</Text>
      </View>
      <View style={styles.cameraContainer}>
        {isCameraOpen && device ? (
          <>
            <Camera
              ref={cameraRef}
              style={styles.camera}
              device={device}
              isActive={true}
              photo={true}
              zoom={zoomLevel} // Zoom level passed to Camera component
            />
            {/* Zoom Buttons */}
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <TouchableOpacity style={styles.zoomButton} onPress={setZoom1x}>
                <Text style={styles.zoomButtonText}>1x</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.zoomButton} onPress={setZoom1_5x}>
                <Text style={styles.zoomButtonText}>1.5x</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.zoomButton} onPress={setZoom2x}>
                <Text style={styles.zoomButtonText}>2x</Text>
              </TouchableOpacity>
            </View>
            {/* End of Zoom Buttons */}
          </>
        ) : (
          <></>
        )}
      </View>
      <FlatList
        data={galleryImages}
        horizontal
        renderItem={({item}) => <GalleryImage image={item} />}
        keyExtractor={(item, index) => index.toString()}
      />
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton} onPress={openCamera}>
          <MaterialIcon name="camera" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton} onPress={toggleFlash}>
          <IonIcon
            name={flashMode === 'off' ? 'flash-off' : 'flash'}
            size={24}
            color="white"
          />
        </TouchableOpacity>
        {/* Capture Button */}
        <TouchableOpacity style={styles.footerButton} onPress={capture}>
          <MaterialIcon name="camera" size={24} color="white" />
        </TouchableOpacity>
        {/* End of Capture Button */}
        <TouchableOpacity style={styles.footerButton} onPress={closeCamera}>
          <MaterialIcon name="close" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.footerButton}
          onPress={fetchGalleryImages}>
          <MaterialIcon name="image-multiple" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton} onPress={toggleCamera}>
          <Text>Cam</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  header: {
    paddingTop: Platform.OS === 'android' ? 40 : 0,
    paddingHorizontal: 20,
    paddingBottom: 10,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'white',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  cameraContainer: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  gallery: {
    // flex: 0.5,
    flexDirection: 'row',
  },
  galleryImageContainer: {
    padding: 5,
  },
  galleryImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
  },
  footerButton: {
    padding: 10,
    borderRadius: 25,
    backgroundColor: '#3F51B5',
  },
  zoomButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: 10,
    borderRadius: 5,
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  zoomButtonText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
});

export default App;
