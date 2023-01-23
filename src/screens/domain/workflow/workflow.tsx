import React, { FC, useState, useRef, useEffect } from 'react';
import { View, Text, StatusBar, Dimensions, TouchableOpacity } from 'react-native';
import { ScaledSheet, vs } from 'react-native-size-matters';
import MapView , { PROVIDER_GOOGLE, Marker, Circle, AnimatedRegion } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import MapViewDirections from 'react-native-maps-directions';
import * as Location from 'expo-location';

// import { GOOGLE_API_KEY } from '@env';

import Icon from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/Entypo';

const { width, height } = Dimensions.get('window');


interface Coordinate {
    latitude: number;
    longitude: number;
    latitudeDelta: number,
    longitudeDelta: number,
    duration: number
  }
  
  type WorkflowProp = {
    route: any;
  }


const Workflow: FC<WorkflowProp> = ({ route }) => {

    const navigation = useNavigation<StackNavigationProp<any>>();

    const { originData, destinationData } = route.params ;

    const [estimate, setEstimate] = useState<boolean>(true);
    const [disp, setDisp] = useState<boolean>(false);
    const [vis, setVis] = useState(true);

    const [duration, setDuration] = useState<any>();

    const ASPECT_RATIO = width / height / 6 ;
    const LATITUDE_DELTA = 0.4;
    const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

    const mapRef = useRef(null);


  const INITIAL_REGION = {
    latitude: 7.30693303,
    longitude: 5.1398688,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  }

  const [coordinate, setCoordinate] = useState<any>(new AnimatedRegion({
      latitude: originData.latitude,
      longitude: originData.longitude,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
  }));

  const edgePadding = {
    top: 40,
    bottom: 40,
    right: 40,
    left: 40
  }

  const traceRoute = () => {
    if(originData && destinationData){
        mapRef.current?.fitToCoordinates([originData, destinationData], { edgePadding })
    }
  }

  const onAppReady = (args: any) => {
    if(args){
        setDuration(args.duration);
    }
  }


  const animateMarker = () => {
    setEstimate(false);
    setDisp(!disp)
    traceRoute();
    // reachDest();
    // const newCoordinate = {
    //     latitude: destinationData.latitude,
    //     longitude: destinationData.longitude,
    //     latitudeDelta: LATITUDE_DELTA,
    //     longitudeDelta: LONGITUDE_DELTA,
    // };

    // const duration = 10000 ;
    // coordinate.timing({
    //     ...newCoordinate,
    //     duration,
    // }).start();
}

  const reachDest = () => {
    setTimeout(() => {
        setVis(false);
        setDisp(!disp);
    }, 11000);
  }

  const closeApplication =  () => {
    navigation.replace("Exit");
  }


  return (
    <View style={styles.container}>
        <StatusBar translucent={true} backgroundColor="transparent" />

       <MapView
            ref={mapRef}
            region={INITIAL_REGION}
            userInterfaceStyle={'light'}
            showsUserLocation
            style={styles.map}
            showsTraffic={true}
            provider={PROVIDER_GOOGLE}
        >

            <MapViewDirections
                origin={originData}
                destination={destinationData}
                apikey={""}
                strokeWidth={10}
                strokeColor="#387098"
                onReady={onAppReady}
            />


                { vis && 
                    <Marker.Animated
                        coordinate={coordinate}
                        pinColor={"red" }
                    />  
                }  

                <Marker
                    coordinate={destinationData}
                    pinColor={"green" }
                >
                </Marker>


             <Circle 
                center={destinationData}
                radius={800}
                strokeWidth = { 1 }
                strokeColor = { '#ffffff' }
                fillColor = { '#2872037e' }
            />

            <Circle 
                center={INITIAL_REGION}
                radius={10000}
                strokeWidth = { 1 }
                strokeColor = { '#abdcb3' }
                fillColor = { '#a1a4a97d' }
            /> 

        </MapView>

        <View style={{ 
              position: 'absolute', top: 0, left: 0, flexDirection: 'row',
                paddingTop: vs(35), alignItems: 'center', 
              }}>
                <TouchableOpacity onPress={() => navigation.navigate('Map')}>
                  <Icon style={styles.dott} name="chevron-back" />
                </TouchableOpacity>
            </View>

            <View style={{ 
              position: 'absolute', top: 0, flexDirection: 'row',
                paddingTop: vs(40), alignItems: 'center',  right: 0
              }}>
                <TouchableOpacity onPress={closeApplication}>
                  <Text style={styles.dot_text}> Exit App </Text>
                </TouchableOpacity>
            </View>

        {/* <View style={{ 
            position: 'absolute', top: 0, right: 0, 
            paddingTop: vs(40)
        }}>
            <View style={styles.displayBox}>
                <Text style={{ fontFamily: 'dsss', textAlign: 'center', paddingVertical: vs(7), color: '#3c2e6d', fontSize: vs(13) }}> MARKERS INFO </Text>

                <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: vs(10)}}>
                    <View style={{ width: vs(15), height: vs(15), borderRadius: vs(30), backgroundColor: '#1d860a', marginRight: vs(10), borderColor: '#fff', borderWidth: vs(.4), marginLeft: vs(3)}}></View>
                    <Text style={{ fontFamily: 'dsss', color: '#625e6f', fontSize: vs(12) }}> Duration (polyline) </Text>
                </View>

                 <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: vs(10), marginVertical: vs(6)}}>
                    <View style={{ width: vs(15), height: vs(15), borderRadius: vs(30), backgroundColor: '#0f242a', marginRight: vs(10), borderColor: '#fff', borderWidth: vs(.4), marginLeft: vs(3)}}></View>
                    <Text style={{ fontFamily: 'dsss', color: '#625e6f', fontSize: vs(12) }}> Distance (direction) </Text>
                </View>

            </View>
        </View> */}

        { estimate && (
            <View style={styles.prompt}>
                <View style={styles.promptt}>
                    <Text style={styles.prompt_top_text}> Estimated time of Arrival from </Text>
                    <Text style={styles.prompt_top_textttt}> {originData.nodeFrom}  </Text>
                  <Icon style={styles.prompt_top_textt} name="arrow-down" />
                    <Text style={styles.prompt_top_textt}> {destinationData.nodeFrom} </Text>
                    {/* <Text style={styles.prompt_top_texttt}> {destinationData.averageETA} MINS </Text> */}

                    <TouchableOpacity onPress={() => animateMarker()} style={styles.prompt_btn}>
                        <Text style={styles.prompt_btn_text}> VIEW </Text> 
                    </TouchableOpacity>
                </View>
            </View>
        )}

        {
            disp && (
                <View style={{ 
                    position: 'absolute', bottom: 0, flexDirection: 'row',
                      alignItems: 'center',  right: 0
                    }}>

                      <View style={{ width: width, backgroundColor: '#fff', height: vs(120), borderTopRightRadius: vs(20), borderTopLeftRadius: vs(20), alignItems: 'center', paddingVertical: vs(10)}}>

                      <View style={{ justifyContent: 'center', flexDirection: 'row', alignItems: 'center', marginTop: vs(5) }}>
                         <Icon style={{ color: '#a64340', fontSize: vs(30), textAlign: 'center', backgroundColor: '#eee', padding: vs(10), borderRadius: vs(100)}} name="car-outline" />

                         <Icon style={{ fontSize: vs(20), marginHorizontal: vs(20), color: '#243e22aa'}} name="chevron-forward" />

                         <Icons style={{ color: '#4c9b45', fontSize: vs(25), textAlign: 'center', backgroundColor: '#eee', padding: vs(10), borderRadius: vs(100)}} name="location" />
                           
                         </View>

                         <View style={{ justifyContent: 'center', flexDirection: 'row', alignItems: 'center', marginTop: vs(10) }}>
                            <Text style={{ fontFamily: 'dsss', color: '#132e0d', fontSize: vs(20)}}> ETA: </Text>
                            <Text style={{ fontFamily: 'dsss', color: '#132e0d', fontSize: vs(18)}}> {Math.ceil(duration)} MINS </Text>
                         </View>

                      </View>
                  </View>
            )
        }

    </View>
  )
}


const styles = ScaledSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#336699',
        width: width,
        height: height
    },
    map: {
        width: width,
        height: '100%',
    },
    prompt: {
        position: 'absolute',
        width: width,
        bottom: 0,
        left: 0,
        right: 0,
        alignItems: 'center'
    },
    promptt: {
        width: width - 60,
        height: vs(170),
        borderRadius: vs(20),
        backgroundColor: '#fff',
        marginBottom: vs(30),
        paddingVertical: vs(10),
        alignItems: 'center',
        justifyContent: 'center'
    },
    prompt_top_text: {
        color: '#141318',
        fontFamily: 'dsss',
        fontSize: vs(16),
        textAlign: 'center',
        marginTop: vs(4)
    },
    prompt_top_textt: {
        color: '#141316',
        fontFamily: 'dsss',
        fontSize: vs(16),
        textAlign: 'center',
        marginTop: vs(3)
    },
    prompt_top_textttt: {
        color: '#496d34',
        fontFamily: 'dsss',
        fontSize: vs(16),
        textAlign: 'center',
        marginTop: vs(5)
    },
    prompt_top_texttt: {
        color: '#496d34',
        fontFamily: 'dsss',
        fontSize: vs(16),
        textAlign: 'center',
        marginTop: vs(8)
    },
    prompt_btn: {
        backgroundColor: '#67ad4f',
        width: width / 3,
        paddingVertical: vs(7),
        borderRadius: vs(30),
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: vs(10)
    },
    prompt_btn_text: {
        color: '#fff',
        fontFamily: 'dsss',
        fontSize: vs(12)
    },
    arrival: {
        position: 'absolute',
        width: width,
        bottom: 0,
        left: 0,
        right: 0,
        alignItems: 'center'
    },
    arrivall: {
        width: width,
        height: vs(150),
        borderTopRightRadius: vs(40),
        borderTopLeftRadius: vs(40),
        backgroundColor: '#4a8d56',
        paddingVertical: vs(10),
        alignItems: 'center'
    },
    alert_disp: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: vs(10)
    },
    alert_text: {
        color: '#fff',
        fontFamily: 'dsss',
        fontSize: vs(16),
    },
    alert_icon: {
        color: '#fff',
        fontSize: vs(18)
    },
    btn_group: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: vs(20),
        width: width - 20,
        marginTop: vs(30)
    },
    btn_one: {
        borderWidth: vs(1),
        borderColor: '#fff',
        borderRadius: vs(5),
        paddingVertical: vs(5),
        paddingHorizontal: vs(10),
        alignItems: 'center',
        justifyContent: 'center'
    },
    btn_one_text: {
        color: '#fff',
        fontFamily: 'dsss',
        fontSize: vs(15),
        paddingBottom: vs(2)
    },
    btn_two: {
        backgroundColor: '#fff',
        borderRadius: vs(5),
        paddingVertical: vs(5),
        paddingHorizontal: vs(10),
    },
    btn_two_text: {
        color: '#68a75d',
        fontFamily: 'dsss',
        fontSize: vs(15),
        paddingBottom: vs(2)
    },
    displayBox: {
        width: width / 2,
        height: vs(80),
        backgroundColor: 'rgba(255,255,255,0.9)',
        marginRight: vs(15),
        borderRadius: vs(15),
    },
    dott: {
        color: '#293564',
        fontSize: vs(20),
        marginLeft: vs(10),
        backgroundColor: '#ffffff',
        borderRadius: vs(60),
        paddingHorizontal: vs(10),
        paddingVertical: vs(9),
    },
    dot_text: {
        color: '#ffffff',
        fontFamily: 'dsss',
        fontSize: vs(12),
        backgroundColor: '#bf5d5d',
        paddingVertical: vs(8),
        paddingHorizontal: vs(20),
        borderRadius: vs(60),
        marginRight: vs(20)
    }
});

export default Workflow;