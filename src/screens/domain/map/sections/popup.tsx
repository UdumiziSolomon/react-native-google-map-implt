import React, { useState, Children } from 'react';
import { Text, View, Dimensions, StatusBar, TouchableOpacity, ScrollView } from 'react-native';
import { ScaledSheet, vs } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { RadioButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { MapCustomData } from '../data';
import AsyncStorage from '@react-native-async-storage/async-storage';


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

  const [inputStat, setInputStat] = useState<boolean>(false);
  const [checked, setChecked] = useState<number>();
  const [checkedd, setCheckedd] = useState<number>();


  const [originData, setOriginData] = useState({});
  const [destinationData, setDestinationData] = useState({});

  const [show, setShow] = useState(false);

  const switchStat = () => {
    setInputStat(!inputStat);
  }

  const onClose = async (val: any, index: number) => {
    setChecked(index);
    setOriginData(val);
    switchStat();
  }

  const onCloseDestination = async (val: any, index: number) => {
    setShow(true);
    setCheckedd(index);
    setDestinationData(val);
  }

  const navigateFunc = async () => {
    await closePop()
    navigation.navigate('Workflow', { originData, destinationData });
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

            <ScrollView
              contentContainerStyle={{ flexGrow: 1 }}
            >
              {
                  MapCustomData.map((dtx, index) => (
                    <View key={index} style={styles.coord_layer}>
                      <View>
                        <Text style={styles.coord_top_text}> {dtx.nodeFrom} </Text>
                        <Text style={styles.coord_sub_text}> Akure </Text>
                      </View>
                      <RadioButton
                        color="#000"
                        value={dtx.nodeFrom}
                        status={ checked === index ? 'checked' : 'unchecked' }
                        onPress={() => onClose(dtx, index)}
                      />
                    </View>
                  ))
              }
            </ScrollView>



          </View>
      ): (
        <View style={styles.display}>
          <View style={styles.locale_header_layerr}>
            <Text style={styles.locale_header_textt}> Your Destination </Text>
            <TouchableOpacity onPress={switchStat}>
              <Icon name="arrow-left" style={styles.down_icon} />
            </TouchableOpacity>
          </View>

          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
          >
           {
              MapCustomData.map((dtx, index) => (
                <View key={index} style={styles.coord_layer}>
                  <View>
                    <Text style={styles.coord_top_text}> {dtx.nodeFrom} </Text>
                    <Text style={styles.coord_sub_text}> Akure </Text>
                  </View>
                  <RadioButton
                    color="#000"
                    value={dtx.nodeFrom}
                    status={ checkedd === index ? 'checked' : 'unchecked' }
                    onPress={() => onCloseDestination(dtx, index)}
                  />
                </View>
              ))
            }
          </ScrollView>

          <View style={styles.btn_continue_layer}>
          { show ? (
              <TouchableOpacity onPress={navigateFunc}  style={styles.btn_continue_layerr}>
                <Text style={styles.btn_continue_text}> Continue </Text>
              </TouchableOpacity>
            ): (
              <TouchableOpacity  style={styles.btn_continue_layerrt}>
                <Text style={styles.btn_continue_textt}> Continue </Text>
              </TouchableOpacity>
            )}
            </View>
           


          
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
      fontSize: vs(17),
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
      fontSize: vs(13),
    },
    coord_sub_text: {
      color: '#828286',
      fontFamily: 'Circular',
      fontSize: vs(11),
    },
    btn_continue_layer: {
      backgroundColor: '#ffffff',
      width: width - 30,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: vs(10),
      position: 'absolute',
      bottom: 0,
      height: vs(50),
      borderRadius: vs(20)
    },
    btn_continue_layerr: {
      backgroundColor: '#5aa155',
      width: width / 2.2,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: vs(8),
      borderRadius: vs(50),
      position: 'absolute',
      bottom: 0,
      marginBottom: vs(8)
    },
    btn_continue_text: {
      color: '#ffffff',
      fontFamily: 'dsss',
      fontSize: vs(14),
      paddingBottom: vs(2)
    },
    btn_continue_layerrt: {
      backgroundColor: '#b6bab5',
      width: width / 2.2,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: vs(8),
      borderRadius: vs(50),
      position: 'absolute',
      bottom: 0,
      marginBottom: vs(8)
    },
    btn_continue_textt: {
      color: '#ffffff',
      fontFamily: 'dsss',
      fontSize: vs(14),
      paddingBottom: vs(2)
    }
});

export default Popup;