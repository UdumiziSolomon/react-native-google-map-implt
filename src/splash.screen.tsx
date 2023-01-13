import { View, Text, StatusBar, Image, Dimensions } from 'react-native'
import React, { FC } from 'react'
import { ScaledSheet, vs } from 'react-native-size-matters';

import useCachedResources from '@hooks/useCachedResources' ;

const { width } = Dimensions.get('window');

const Splash: FC = () => {

    const resourceLoad = useCachedResources();

    if(!resourceLoad){
        return null ;
    }else{
        return (
          <View style={styles.container}>
            <StatusBar translucent backgroundColor="#2A166F" barStyle={"light-content"} />
            <Image source={require('./assets/images/logo.png')} style={styles.logoImage} />
            <Text style={styles.logo_text}> Trafiko </Text>
            <Text style={styles.logo_sub_text}> Drive safer and smarter </Text>

            <Text style={styles.down_text}> Version 1.0 </Text>

          </View>
        )
    }
}

const styles = ScaledSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#2A166F",
      alignItems: 'center',
      justifyContent: 'center'
    },
    logoImage: {
      width: width / 3
    },
    logo_text: {
      color: '#ffffff',
      fontFamily: 'dsss',
      fontSize: vs(18),
      marginTop: vs(2)
    },
    logo_sub_text: {
      color: '#fff',
      fontFamily: 'dsss',
      fontSize: vs(21),
      marginTop: vs(60)
    },
    down_text: {
      bottom: 0,
      marginBottom: vs(20),
      position: 'absolute',
      color: '#fff',
      fontFamily: 'dss',
      fontSize: vs(14)
    }
});

export default Splash;