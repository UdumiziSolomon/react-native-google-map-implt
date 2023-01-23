import React, { FC, useState, Children, useEffect } from 'react';
import { View, Text, StatusBar, Dimensions, TouchableOpacity, Modal, ScrollView , Image } from 'react-native';
import { ScaledSheet, vs } from 'react-native-size-matters';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';


const { width, height } = Dimensions.get('window');

const mainData = [
    {
        title: 'ETA',
        description: 'Infographics on the ETAs of the major routes',
        image: require('../../../assets/images/info2.png'),
        nav: 'Eta'
    },
    {
        title: 'ROAD CONDITION',
        description: 'Infographics on the major conditions of the major routes',
        image: require('../../../assets/images/info3.png'),
        nav: 'Road'
    },
    {
        title: 'DOMINATING LAND USE',
        description: 'Infographics on the dominating land use of the major routes',
        image: require('../../../assets/images/info1.png'),
        nav: 'Dominating'
    },
    {
        title: 'SPEED BUMP CONDITION',
        description: 'Infographics on the speed bump condition of the major routes',
        image: require('../../../assets/images/info4.png'),
        nav: 'Speed'
    }
]

const Infographics:FC = () => {
    const navigation = useNavigation<StackNavigationProp<any>>();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={ () => navigation.goBack()}>
        <Icon name="arrow-left" style={styles.top_icon} />
      </TouchableOpacity>

      <View style={{ alignItems: 'center', width: width }}>
        <ScrollView>
            {
                Children.toArray(
                    mainData.map(dtx => (
                        <TouchableOpacity onPress={() => navigation.navigate(dtx.nav)} style={styles.full_layer}>
                            <Image source={dtx.image} style={styles.info_image} resizeMode="contain" />
                            <View style={styles.inner_layer}>
                                <Text style={styles.inl_top_text}>{dtx.title} </Text>
                                <Text style={styles.inl_sub_text}>{dtx.description} </Text>
                            </View>
                        </TouchableOpacity>
                    ))
                )
            }
        </ScrollView>
      </View>

    </View>
  )
}

export default Infographics;

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#887DAE',
        paddingTop: StatusBar.currentHeight
    },
    top_icon: {
        fontSize: vs(25),
        marginLeft: vs(15),
        color: '#fff',
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
        color: '#494957',
        fontFamily: 'dsss',
        fontSize: vs(16.5),
    },
    inl_sub_text: {
        color: '#40404e',
        fontFamily: 'Circular',
        fontSize: vs(11.5),
        marginTop: vs(3)
    }
});