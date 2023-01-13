import React, { FC, useState, Children } from 'react';
import { View, Text, StatusBar, Dimensions, TouchableOpacity } from 'react-native';
import { ScaledSheet, vs } from 'react-native-size-matters';
import MapView , { PROVIDER_GOOGLE, Marker, Polyline } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import Icon from 'react-native-vector-icons/Ionicons';
import { mapStyle } from '../map/data.map';

const { width, height } = Dimensions.get('window');

type WorkflowProp = {
    route: any
}

const Workflow: FC<WorkflowProp> = ({ route }) => {

    const navigation = useNavigation<StackNavigationProp<any>>();

    const { coords } = route.params ;

    const [estimate, setEstimate] = useState<boolean>(true);
    const [disp, setDisp] = useState<boolean>(false);

    const ASPECT_RATIO = width / height / 7 ;
    const LATITUDE_DELTA = 0.9;
    const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

  const INITIAL_REGION = {
    latitude: 7.3085,
    longitude: 5.1420,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA 
  }

  let originCoord = {
    latitude: 7.2570,
    longitude: 5.1991,
  }

   let destCoord = {
    latitude: 7.4046,
    longitude: 5.0130,
  }

  const reachDest = () => {
        setTimeout(() => {
            setDisp(!disp);
        }, 5000);
  }

  const startTransition = () => {
    setEstimate(false);
    reachDest();
  }

  const closeApplication = () => {
    navigation.navigate("Exit");
  }


  return (
    <View style={styles.container}>
        <StatusBar translucent={true} backgroundColor="transparent" />
       <MapView
        initialRegion={INITIAL_REGION}
        userInterfaceStyle={'dark'}
        showsUserLocation
        style={styles.map}
        customMapStyle={mapStyle} 
        provider={PROVIDER_GOOGLE}>

             <Polyline
                coordinates={[originCoord, destCoord]} //specify our coordinates
                strokeColor={"#e3e3e3"}
                strokeWidth={4}
            />

            <Marker 
                coordinate={originCoord}
                pinColor={"red" }
            />

            <Marker 
                coordinate={destCoord}
                pinColor={"green" }
            />

        </MapView>
        { estimate && (
            <View style={styles.prompt}>
                <View style={styles.promptt}>
                    <Text style={styles.prompt_top_text}> Estimated time of Arrival to </Text>
                    <Text style={styles.prompt_top_textt}> FUTA BUS STOP </Text>
                    <Text style={styles.prompt_top_texttt}> 30 MINS </Text>

                    <TouchableOpacity onPress={startTransition} style={styles.prompt_btn}>
                        <Text style={styles.prompt_btn_text}> PROCEED </Text> 
                    </TouchableOpacity>
                </View>
            </View>
        )}

        { disp && (
            <View style={styles.arrival}>
                <View style={styles.arrivall}>
                    <View style={styles.alert_disp}>
                        <Icon name="ios-checkmark-done-circle-outline" style={styles.alert_icon} /> 
                        <Text style={styles.alert_text}> You have arrived at Futa Bus Stop </Text>
                    </View>

                    <View style={styles.btn_group}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.btn_one}>
                            <Text style={styles.btn_one_text}> Another Location </Text> 
                        </TouchableOpacity>

                        <TouchableOpacity onPress={closeApplication} style={styles.btn_two}>
                            <Text style={styles.btn_two_text}> Close Application </Text> 
                        </TouchableOpacity>
                    </View>


                </View>
            </View>
        )}

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
        width: width - 80,
        height: vs(150),
        borderRadius: vs(20),
        backgroundColor: '#887DAE',
        marginBottom: vs(50),
        paddingVertical: vs(10),
        alignItems: 'center'
    },
    prompt_top_text: {
        color: '#2A166F',
        fontFamily: 'dsss',
        fontSize: vs(15),
        textAlign: 'center',
        marginTop: vs(4)
    },
    prompt_top_textt: {
        color: '#2A166F',
        fontFamily: 'dsss',
        fontSize: vs(18),
        textAlign: 'center',
        marginTop: vs(5)
    },
    prompt_top_texttt: {
        color: '#ffffff',
        fontFamily: 'dsss',
        fontSize: vs(16),
        textAlign: 'center',
        marginTop: vs(5)
    },
    prompt_btn: {
        backgroundColor: '#2A166F',
        width: width / 3,
        paddingVertical: vs(7),
        borderRadius: vs(30),
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: vs(20)
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
    }
});

export default Workflow;