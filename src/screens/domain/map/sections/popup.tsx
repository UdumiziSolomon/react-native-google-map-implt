import React, { useState, Children } from 'react';
import { Text, View, Dimensions, StatusBar, TouchableOpacity } from 'react-native';
import { ScaledSheet, vs } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { RadioButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { MapCustomData } from '../data';

const { width, height } = Dimensions.get('window');

type PopProp = {
  closePop: () => void,
}

// type AppParamList =  {
//   Map: undefined;
//   Workflow: string;
//   Exit: undefined;
// }

const Popup = ({ closePop }: PopProp) => {

  const navigation = useNavigation<StackNavigationProp<any>>();

  const [inputStat, setInputStat] = useState(false);
  const [checked, setChecked] = useState('');

  const [coords, setCoords] = useState({
    origin: '',
    destination: ''
  });

  const { origin, destination } = coords ;

  const switchStat = () => {
    setInputStat(!inputStat);
  }

  const onClose = async (val: string) => {
    setCoords({...coords, origin: val });
    switchStat();
  }

  const onCloseDestination = async (val: string) => {
    setCoords({ ...coords, destination: val });
    navigateFunc();
  }

  const navigateFunc = () => {
    navigation.navigate('Workflow', { coords });
  }

  return (
    <View style={styles.container}>
      { !inputStat ? (
            <View style={styles.display}>
            <View style={styles.locale_header_layer}>
              <Text style={styles.locale_header_text}> Your Location </Text>
              <TouchableOpacity onPress={closePop}>
                <Icon name="close" style={styles.down_icon} />
              </TouchableOpacity>
            </View>

            {
              Children.toArray(
                MapCustomData.map(dtx => (
                  <View style={styles.coord_layer}>
                    <View>
                      <Text style={styles.coord_top_text}> {dtx.busStop} </Text>
                      <Text style={styles.coord_sub_text}> {dtx.city} </Text>
                    </View>
                    <RadioButton
                      color="#000"
                      value={dtx.busStop}
                      status={ checked === dtx.busStop ? 'checked' : 'unchecked' }
                      onPress={() => onClose(dtx.busStop)}
                    />
                  </View>
                ))
              )
            }


          </View>
      ): (
        <View style={styles.display}>
          <View style={styles.locale_header_layerr}>
            <Text style={styles.locale_header_textt}> Your Destination </Text>
            <TouchableOpacity onPress={switchStat}>
              <Icon name="arrow-left" style={styles.down_icon} />
            </TouchableOpacity>
          </View>

           {
            Children.toArray(
              MapCustomData.map(dtx => (
                <View style={styles.coord_layer}>
                  <View>
                    <Text style={styles.coord_top_text}> {dtx.busStop} </Text>
                    <Text style={styles.coord_sub_text}> {dtx.city} </Text>
                  </View>
                  <RadioButton
                    color="#000"
                    value={dtx.busStop}
                    status={ checked === dtx.busStop ? 'checked' : 'unchecked' }
                    onPress={() => onCloseDestination(dtx.busStop)}
                  />
                </View>
              ))
            )
            }
          
        </View>
      )}
    </View>
  )
}


const styles = ScaledSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,250,0.2)',
        height: height,
        paddingTop: StatusBar.currentHeight,
        marginTop: vs(60)
    },
    display: {
        width: width - 30,
        height: height / 1.62,
        backgroundColor: '#ffffff',
        borderRadius: vs(20),
        paddingVertical: vs(10),
        alignItems: 'center',
    },
    locale_header_layer: {
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: vs(4),
      backgroundColor: '#f1f0f0',
      width: width - 70,
      textAlign: 'center',
      paddingVertical: vs(10),
      borderRadius: vs(20),
      flexDirection: 'row',
      paddingHorizontal: vs(20),
      marginBottom: vs(10)
    },
    locale_header_layerr: {
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: vs(4),
      backgroundColor: '#aef1c7',
      width: width - 70,
      textAlign: 'center',
      paddingVertical: vs(10),
      borderRadius: vs(20),
      flexDirection: 'row',
      paddingHorizontal: vs(20),
      marginBottom: vs(10)
    },
    locale_header_text: {
      color: '#40404e',
      fontFamily: 'dsss',
      fontSize: vs(18),
    },
    locale_header_textt: {
      color: '#43a039',
      fontFamily: 'dsss',
      fontSize: vs(18),
    },
    down_icon: {
      color: '#323d48',
      fontSize: vs(20)
    },
    coord_layer: {
      flexDirection: 'row',
      marginTop: vs(5),
      alignItems: 'center',
      justifyContent: 'space-between',
      width: width - 70
    },
    coord_top_text: {
      color: '#525260',
      fontFamily: 'dsss',
      fontSize: vs(14),
    },
    coord_sub_text: {
      color: '#828286',
      fontFamily: 'Circular',
      fontSize: vs(12),
    }
});

export default Popup;