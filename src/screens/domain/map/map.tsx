import React, { FC, useState, Children } from 'react';
import { View, Text, StatusBar, Dimensions, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { ScaledSheet, vs } from 'react-native-size-matters';
import MapView , { PROVIDER_GOOGLE, Marker } from 'react-native-maps';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet' ;

import { MapCustomData } from './data';
import { mapStyle, historyData } from './data.map';
import Popup from './sections/popup';
import Info from './sections/info';


const { width, height } = Dimensions.get('window');

// interface InfoProps  {
//   busStop: string | undefined;
//   city: string | undefined;
//   latitute: string | undefined;
//   longitude: string | undefined;
// }

type InfoState = {} ;
 
const Map:FC = () => {

    const [openSheet, setOpenSheet] = useState<boolean>(false);
    const [popUp, setPopup] = useState<boolean>(false);
    const [pop, setPop] = useState<boolean>(true);
    const [info, setInfo] = useState<InfoState>({});
    const [openInfo, setOpenInfo] = useState<boolean>(false);

  // Bottom sheet
  const snapPoint = ["27"];

  const ASPECT_RATIO = width / height / 7 ;
  const LATITUDE_DELTA = 0.9;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

  const INITIAL_REGION = {
    latitude: 7.3085,
    longitude: 5.1420,
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

      <MapView
        initialRegion={INITIAL_REGION}
        userInterfaceStyle={'dark'}
        showsUserLocation
        style={styles.map}
        customMapStyle={mapStyle} 
        provider={PROVIDER_GOOGLE}>
           {
            Children.toArray(
              MapCustomData.map(marker => (
                  <Marker 
                    coordinate={marker}
                    pinColor={"wheat"} 
                    onPress={() => openInfoFunc(marker)}
                  />
              ))
            )
           }
        </MapView>
            <View style={{ position: 'absolute', top: 0, left: 0, right: 0 }}>
                <Text style={styles.top_text}> Navigation to Destination </Text>
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
                      <TouchableOpacity style={styles.history_layer}>
                      <Icon name="clock-outline" style={styles.history_icon} />
                        <View>
                          <Text style={styles.history_top_text}> {dtx.busStop} </Text>
                          <Text style={styles.history_sub_text}> {dtx.city} </Text>
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
    color: '#ffffff',
    fontFamily: 'dsss',
    fontSize: vs(18),
    textAlign: 'center',
    paddingTop: vs(35),
    backgroundColor: 'rgba(0,0,0,0.05)',
    paddingBottom: vs(10  )
  },
  history_layer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginVertical: vs(3),
    width: width - 60,
    backgroundColor: '#f8f8f8',
    paddingVertical: vs(5) ,
    borderRadius: vs(10)
  },
  history_icon: {
    color: '#abadb0',
    fontSize: vs(21),
    marginHorizontal: vs(20),
  },
  history_top_text: {
    color: '#6f6a6a',
    fontFamily: 'dss',
    fontSize: vs(13),
  },
  history_sub_text: {
    color: '#403b3b',
    fontFamily: 'Circular',
    fontSize: vs(11),
    paddingVertical: vs(3)
  }
})

export default Map ;