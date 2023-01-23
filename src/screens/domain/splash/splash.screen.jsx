import React, { useState, useRef } from 'react'
import { StatusBar, FlatList, Dimensions, Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ScaledSheet , verticalScale, vs} from 'react-native-size-matters';



// get data
import {OnboardingData}  from './splash.data';

import Slides from './splash.slide';

const Onboard = () => {
    const navigation = useNavigation();
    const  { width } = Dimensions.get('window');
    const [currIndex, setCurrIndex ] = useState(0);
    const ref = useRef(null);

      // get current idex of screen onSlide 
    const updateCurrentSlideIndex = e => {
        const contentOffsetX = e.nativeEvent.contentOffset.x 
        const currentIndex = Math.round( contentOffsetX / width );
        setCurrIndex(currentIndex);
    };

    // move between slides
    const nextSlide = () => {
        const nextSlideIndex = currIndex + 1 ;
        if( nextSlideIndex != OnboardingData.length) {
            const offset = nextSlideIndex * width ;
            ref?.current?.scrollToOffset({ offset });
            setCurrIndex(nextSlideIndex);
        }
    }

    // skip ?
    const skipSlide = () => {
        const lastSlideIndex = OnboardingData.length - 1 ;
        const offset = lastSlideIndex * width ;
        ref?.current?.scrollToOffset({ offset });
        setCurrIndex(lastSlideIndex);
    }

     const skipToSignUp = () => {
        navigation.replace('Map');
    }


    return (
        <View style={styles.container}>
            <StatusBar translucent backgroundColor="#fff" barStyle={"dark-content"} />
            <FlatList 
                pagingEnabled
                ref={ref}
                onMomentumScrollEnd={updateCurrentSlideIndex}
                data={OnboardingData}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) => <Slides key={item.id} 
                    item={item} 
                    event={currIndex} 
                    navigation={navigation}
                    nextSlide={nextSlide}
                    skipSlide={skipSlide}
                />}
            />

            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: verticalScale(20)}}>
                { OnboardingData.map((_, index) => (
                    <View key={index} style={[
                        styles.indicator,
                        currIndex == index && {
                        backgroundColor: '#2A166F'
                    }]} />
                ))}
                </View>

            <View style={styles.indicatorLayout}>

            { currIndex === 2 
                ?
                <View style={{ justifyContent: 'center', alignItems: 'center'}}>
                   <TouchableOpacity onPress={skipToSignUp} style={[styles.getStartedLay, { width: width - 60}]}>
                        <Text style={styles.getStarted}> Continue </Text>
                   </TouchableOpacity>
                   </View>
                :

               <View style={{ justifyContent: 'center', alignItems: 'center'}}>
                 <TouchableOpacity onPress={skipToSignUp} style={[styles.getStartedLayys, { width: width - 50 }]}>
                        <Text style={styles.getStartedds}> Skip </Text>
                       
                   </TouchableOpacity>
                 <TouchableOpacity onPress={nextSlide} style={[styles.getStartedLayy, { width: width - 50 }]}>
                        <Text style={styles.getStartedd}> Next </Text>
                       
                   </TouchableOpacity>
               </View>
            }

                {/* <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: verticalScale(20)}}>
                { OnboardingData.map((_, index) => (
                    <View key={index} style={[
                        styles.indicator,
                        currIndex == index && {
                        backgroundColor: '#811895'
                    }]} />
                ))}
                </View> */}
          </View>
            
        </View>
    )
}

export default Onboard;

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
     indicator: {
        height: '10@vs', 
        width: '10@vs',
        borderRadius: '15@vs', 
        backgroundColor: '#ddd',
        marginHorizontal: '5@vs',
        marginVertical: vs(20)
   },
   indicatorLayout: {
       paddingHorizontal: '10@vs',
       flex: .6
   },
      indicatorIcon: {
       backgroundColor: '#811895',
       color: '#fff',
       paddingVertical: '8@vs',
       borderRadius: '30@vs',
       paddingHorizontal: '8@vs'  
   },
   getStarted: {
      fontFamily: 'dsss',
       fontSize: '13@vs',
       paddingHorizontal: '5@vs' ,
       color: '#fff', 
       textAlign: 'center',
       marginTop: '1@vs'
   },
   getStartedLay: {
       paddingHorizontal: '15@vs',
       paddingVertical: '15@vs',
       borderRadius: '10@vs',
       flexDirection: 'row',
       alignItems: 'center',
       justifyContent: 'center',
       backgroundColor: '#2A166F',
       marginTop: vs(10)
   },
   getStartedd: {
    fontFamily: 'dsss',
     fontSize: '13@vs',
     paddingHorizontal: '5@vs' ,
     color: '#fff', 
     textAlign: 'center'
 },
    getStartedds: {
    fontFamily: 'dsss',
     fontSize: '13@vs',
     paddingHorizontal: '5@vs' ,
     color: '#2A166F', 
     textAlign: 'center'
 },
 getStartedLayy: {
     paddingHorizontal: '15@vs',
     paddingVertical: '15@vs',
     borderRadius: '10@vs',
     backgroundColor: '#2A166F',
     marginVertical: vs(5)
 },
 getStartedLayys: {
    paddingHorizontal: '15@vs',
    paddingVertical: '15@vs',
    borderRadius: '10@vs',
    borderColor: '#9995a5',
    marginVertical: vs(5),
    borderWidth: '1@vs'
}
});