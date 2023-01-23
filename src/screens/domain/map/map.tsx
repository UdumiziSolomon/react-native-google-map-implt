import React, { FC, useState, Children, useEffect, useRef } from 'react';
import { View, Text, StatusBar, Dimensions, TouchableOpacity, Modal, ScrollView , Image } from 'react-native';
import { ScaledSheet, vs } from 'react-native-size-matters';
import MapView , { PROVIDER_GOOGLE, Marker, Circle } from 'react-native-maps';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icons from 'react-native-vector-icons/MaterialIcons';

import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet' ;

import { MapCustomData } from './data';
import { mapStyle , historyData} from './data.map';
import Popup from './sections/popup';
import Info from './sections/info';

import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import * as Location from 'expo-location';


const { width, height } = Dimensions.get('window');

 
const Map:FC = () => {

  const navigation = useNavigation<StackNavigationProp<any>>();

  const ASPECT_RATIO = width / height / 50  ;
  const LATITUDE_DELTA = 0.2;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

  const [openSheet, setOpenSheet] = useState<boolean>(false);
  const [popUp, setPopup] = useState<boolean>(false);
  const [pop, setPop] = useState<boolean>(true);
  const [info, setInfo] = useState<any>({});
  const [openInfo, setOpenInfo] = useState<boolean>(false);
  const [infog, setInfog] = useState<boolean>(false);
  const [showLive, setShowLive] = useState(false);

  const [userRegion, setUserRegion] = useState<any>({
    longitude: null,
    latitude: null,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA 
  });

  const [checkLive, setCheckLive] = useState(false);

  // Bottom sheet
  const snapPoint = ["25"];
  const mapRef = useRef(null);

  useEffect(() => {
    (async () => {

      const ASPECT_RATIO = width / height / 50  ;
      const LATITUDE_DELTA = 0.2;
      const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      await setUserRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA     
      })
      setShowLive(true);

    })();
  }, []);



  const INITIAL_REGION = {
    latitude: 7.27591733,
    longitude: 5.18319051,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA 
  }

  const openPop = () => {
    setPopup(!popUp);
  }

  const closePop = () => {
    setPopup(!popUp);
  }

  const closeInfo = () => {
    setOpenInfo(false);
  }

  const openInfographics = () => {
    setInfog(!infog);
  }

  let display ;

  if (openInfo) {
    display = (
      <Modal 
        visible={openInfo}
        transparent={true}
        statusBarTranslucent={true}
        animationType='fade'
        >
        <Info info={info} closeInfo={closeInfo} />
    </Modal>
    )
  }

  const openInfoFunc = (data: any) => {
    setInfo(data)
    setOpenInfo(true);
  }

  const Infographics = async () => {
    setInfog(!infog);
    navigation.navigate('Infographics');
  }

  const tokyoRegion = {
    latitude: 7.2649,
    longitude:  5.21346,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA 
  }

  const moveCurrent = () => {
    setCheckLive(true);
    mapRef.current?.animateToRegion(userRegion, 3000);
  }

  const moveBack = () => {
    setCheckLive(false);
    mapRef.current?.animateToRegion(INITIAL_REGION, 3000);
  }


  return (
    <View style={styles.container}>
      <StatusBar translucent={true} backgroundColor="transparent" />

      <View>
        {display}
      </View>

      { popUp && (
        <Modal 
          visible={pop} 
          transparent={true}
          statusBarTranslucent={true}
          animationType='fade' > 
          <Popup closePop={closePop} /> 
        </Modal>
      ) }

      { infog && (
        <Modal 
          visible={infog} 
          transparent={true}
          statusBarTranslucent={true}
          animationType='fade' 
        > 
            <View style={{ backgroundColor: 'rgba(255,255,255,0.7)', flex: 1, paddingTop: StatusBar.currentHeight,  alignItems: 'center' }}>
              <TouchableOpacity onPress={() => setInfog(!infog)}>
                <Icon name="close" style={{ color: '#391743', fontSize: vs(30), marginTop: vs(20)}} />
              </TouchableOpacity>
              <TouchableOpacity onPress={Infographics} style={{ backgroundColor: '#887DAE', width: width / 2.5, paddingVertical: vs(12), borderRadius: vs(10), marginTop: vs(20)}}>
                <Text style={{ textAlign: 'center', fontFamily: 'dsss', color: '#fff', fontSize: vs(13) }}> Infographics </Text>
              </TouchableOpacity>
            </View>
        </Modal>
      ) }

      <MapView
        ref={mapRef}
        initialRegion={INITIAL_REGION}
        userInterfaceStyle={'dark'}
        showsTraffic={true}
        // showsUserLocation={true}
        rotateEnabled={false}
        style={styles.map}
        provider={PROVIDER_GOOGLE}>
           {
            Children.toArray(
              MapCustomData.map(marker => (
                <View>
                  <Marker 
                    coordinate={marker}
                    pinColor={"wheat"} 
                    onPress={() => openInfoFunc(marker)}
                  >
                    <Image source={require('../../../assets/images/pin.png')} style={{ width: vs(15), height: vs(15)}} />
                  </Marker>
                  </View>
              ))
            )
           }

           {
            showLive && (
              <View>
                <Marker
                  coordinate={userRegion}
                  pinColor={"green" }
                >
                </Marker>

                 <Circle 
                  center={userRegion}
                  radius={500}
                  strokeWidth = { 1 }
                  strokeColor = { '#2eda50' }
                  fillColor = { '#c6c1c17a' }
                />
                </View>
            )
           }


        </MapView>


            <View style={{ 
              position: 'absolute', top: 0, left: 0, right: 0, flexDirection: 'row',
                paddingTop: vs(30), alignItems: 'center', 
              }}>
                <TouchableOpacity onPress={openInfographics}>
                  <Icon style={styles.dot} name="menu" />
                </TouchableOpacity>
                <Text style={styles.top_text}> Navigation to Destination </Text>
            </View>

                <View style={{ 
              position: 'absolute', bottom: 0, right: 0, flexDirection: 'row',
                paddingBottom: vs(190), alignItems: 'center', 
              }}>

                {
                  checkLive ? (
                    <TouchableOpacity onPress={() => moveBack()}>
                      <Icons style={styles.dottt} name="my-location" />
                    </TouchableOpacity>

                  ) : (
                    <TouchableOpacity onPress={() => moveCurrent()}>
                    <Icons style={styles.dott} name="my-location" />
                  </TouchableOpacity>
                  )
                }
            </View>


      <BottomSheet
          index={0}
          snapPoints={snapPoint}
          animateOnMount={true}
          enablePanDownToClose={openSheet}

      >
          <BottomSheetView>
            <View style={styles.cont}>
              <TouchableOpacity onPress={openPop} style={styles.locale_header_layer}>
                <Text style={styles.locale_header_text}> Your Location </Text>
                <Icon name="chevron-up" style={styles.down_icon} />
              </TouchableOpacity>

            <ScrollView>
              {
                Children.toArray(
                  historyData.map(dtx => (
                    <TouchableOpacity onPress={openPop} style={styles.history_layer}>
                    <Icon name="clock-outline" style={styles.history_icon} />
                      <View>
                        <Text style={styles.history_top_text}> {dtx.nodeFrom} </Text>
                        <Text style={styles.history_sub_text}> Akure </Text>
                      </View>
                    </TouchableOpacity>
                  ))
                )
              }
            </ScrollView>

            </View>
          </BottomSheetView>
      </BottomSheet>
    </View>
  )
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7fa4a6',
  },
  cont: {
    alignItems: 'center',
  },
  locale_header_layer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: vs(4),
    backgroundColor: '#f1f0f0',
    width: width - 40,
    textAlign: 'center',
    paddingVertical: vs(6),
    borderRadius: vs(20),
    flexDirection: 'row',
    paddingHorizontal: vs(20),
    marginBottom: vs(10)
  },
  locale_header_text: {
    color: '#40404e',
    fontFamily: 'dsss',
    fontSize: vs(16),
  },
  map: {
    width: width,
    height: height,
  },
  down_icon: {
    color: '#323d48',
    fontSize: vs(27)
  },
  top_text: {
    color: '#1f2c56',
    fontFamily: 'dsss',
    fontSize: vs(18),
    marginLeft: vs(20)
  },
  history_layer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginVertical: vs(3),
    width: width - 50,
    // backgroundColor: '#f8f8f8',
    paddingVertical: vs(6) ,
    borderRadius: vs(10),
    borderBottomColor: '#eee',
    borderBottomWidth: vs(1)
  },
  history_icon: {
    color: '#abadb0',
    fontSize: vs(22),
    marginHorizontal: vs(20),
  },
  history_top_text: {
    color: '#131111',
    fontFamily: 'dss',
    fontSize: vs(13),
  },
  history_sub_text: {
    color: '#615d5d',
    fontFamily: 'Circular',
    fontSize: vs(10.8),
    paddingVertical: vs(2)
  },
  dot: {
    color: '#293564',
    fontSize: vs(20),
    marginLeft: vs(25),
    backgroundColor: '#eee',
    borderRadius: vs(10),
    paddingHorizontal: vs(7),
    paddingVertical: vs(6),
  },
  dott: {
    color: '#293564',
    fontSize: vs(20),
    marginRight: vs(10),
    backgroundColor: '#ffffff',
    borderRadius: vs(60),
    paddingHorizontal: vs(16),
    paddingVertical: vs(15),
  },
  dottt: {
    color: '#fff',
    fontSize: vs(20),
    marginRight: vs(10),
    backgroundColor: '#2A166F',
    borderRadius: vs(60),
    paddingHorizontal: vs(16),
    paddingVertical: vs(15),
  }
})

export default Map ;