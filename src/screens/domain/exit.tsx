import { StyleSheet, Text, View , Image, Dimensions, StatusBar, BackHandler } from 'react-native'
import React, { useEffect } from 'react';
import { ScaledSheet, vs } from 'react-native-size-matters';


const { width, height } = Dimensions.get('window');


const Exit = () => {

     useEffect(() => {
        // back handle exit app
      //   BackHandler.addEventListener('hardwareBackPress', backButtonHandler);
      //   return () => {
      //     BackHandler.removeEventListener('hardwareBackPress', backButtonHandler);
      // };
      setTimeout(() => {
        backButtonHandler();
      }, 2000);
    }, []);

    const backButtonHandler = (): any => {
      BackHandler.exitApp();
    }


  return (
    <View style={styles.container}>
        <StatusBar translucent={true} backgroundColor="#fff" barStyle={"dark-content"} />
        <Image style={styles.image} source={require('../../assets/images/image.png')} resizeMode="contain" />
      <Text style={styles.text}> Thank you for using Trafiko </Text>
    </View>
  )
}

export default Exit;

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff'
    },
    image: {
        width: width - 100 ,
        marginTop: StatusBar.currentHeight,
        paddingTop: vs(30),
        height: height / 2
    },
    text: {
        color: '#2A166F',
        fontFamily: 'dsss',
        fontSize: vs(25),
        textAlign: 'center',
        marginTop: vs(5)
    }
})