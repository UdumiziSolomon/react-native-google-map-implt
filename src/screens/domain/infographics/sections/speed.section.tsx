import React, { FC, useState, Children, useEffect } from 'react';
import { View, Text, StatusBar, Dimensions, TouchableOpacity, Modal, ScrollView , Image } from 'react-native';
import { ScaledSheet, vs } from 'react-native-size-matters';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

const { width, height } = Dimensions.get('window');

const SpeedData = [
    {
        title: 'Speed bump condition from Northgate to Agbogbo junction and back',
        image: require('../../../../assets/images/info4.png'),
        sh: 'first'
    },
    {
        title: 'Speed bump condition from Nepa bus stop to Iralegbo and back',
        image: require('../../../../assets/images/info4.png'),
        sh: 'second'
    },
    {
        title: 'Speed bump condition from Southgate to high court junction/S.O and back',
        image: require('../../../../assets/images/info4.png'),
        sh: 'third'
    }
]

const Speed:FC = () => {

    const navigation = useNavigation<StackNavigationProp<any>>();
    const [toShow, setToShow] = useState<string>('');


  return (
    <View style={styles.container}>
    <TouchableOpacity onPress={ () => navigation.goBack()}>
      <Icon name="chevron-left" style={styles.top_icon} />
    </TouchableOpacity>

    <View style={{ alignItems: 'center', width: width }}>
      <ScrollView>
      {
                Children.toArray(
                    SpeedData.map(dtx => (
                        <TouchableOpacity onPress={() => setToShow(dtx.sh)} style={styles.full_layer}>
                            <Image source={dtx.image} style={styles.info_image} resizeMode="contain" />
                            <View style={styles.inner_layer}>
                                <Text style={styles.inl_top_text}>{dtx.title} </Text>
                            </View>
                        </TouchableOpacity>
                    ))
                )
            }
      </ScrollView>
    </View>

    { toShow == 'first' && (
        <View style={styles.tr}>
            <TouchableOpacity onPress={() => setToShow('')}>
                <Icon name="chevron-left" style={styles.top_icon} />
            </TouchableOpacity>
             <Image source={require('../../../../assets/images/speed1.png')} style={styles.tri} resizeMode="contain" />
        </View>
    )}

    { toShow == 'second' && (
        <View style={styles.tr}>
            <TouchableOpacity onPress={() => setToShow('')}>
                <Icon name="chevron-left" style={styles.top_icon} />
            </TouchableOpacity>
             <Image source={require('../../../../assets/images/speed2.png')} style={styles.tri} resizeMode="contain" />
        </View>
    )}

    { toShow == 'third' && (
        <View style={styles.tr}>
            <TouchableOpacity onPress={() => setToShow('')}>
                <Icon name="chevron-left" style={styles.top_icon} />
            </TouchableOpacity>
            <Image source={require('../../../../assets/images/speed3.png')} style={styles.tri} resizeMode="contain" />
        </View>
    )}

  </View>
  )
}

export default Speed

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#887DAE',
        paddingTop: StatusBar.currentHeight
    },
    top_icon: {
        fontSize: vs(35),
        marginLeft: vs(15),
        color: '#363030',
        paddingTop: vs(10)
    },
    full_layer: {
        flexDirection: 'row',
        paddingVertical: vs(22),
        backgroundColor: '#efeeee',
        width: width - 30,
        borderRadius: vs(15),
        marginVertical: vs(20),
        paddingHorizontal: vs(10),
        alignItems: 'center'
    },
    info_image: {
        width: vs(30),
        height: vs(30)
    },
    inner_layer: {
        width: width - 100,
        marginLeft: vs(10)
    },
    inl_top_text: {
        color: '#505057',
        fontFamily: 'dsss',
        fontSize: vs(15),
    },
    tr: {
        position: 'absolute',
        backgroundColor: '#ffffff',
        flex: 1,
        width: '100%',
        height: '100%',
        bottom: 0,
    },
    tri: {
        width: width,
        height: height,
    }
})