import React, { } from 'react';
import { Text, View, Dimensions, Image } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';



const Slides = ({ item }) => {
    
    const { width } = Dimensions.get('window');

    return (
        <View style={styles.container}>

            <View style={styles.onboardImageLay}>
                <Image source={item.image} style={[styles.onboardImage, { width : width - 120}]} resizeMode="contain" />
            </View>

           <View style={[styles.onboardLayout, { width }]}>
                <Text style={styles.title}>{item.title} </Text>
                <Text style={styles.subject}>{item.subject} </Text>
           </View>

        </View>
    )
}

export default Slides;

const styles = ScaledSheet.create({
    container: {
        paddingTop: '45@vs',
        flex: .7,
    },
    onboardLayout: {
        paddingHorizontal: '3@vs',
        justifyContent: 'center', 
        alignItems: 'center',
        marginTop: '1@vs'
    },
    onboardImageLay: {
        flex: .7,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '50@vs'
    },
   subject: {
       fontFamily: 'Circular',
       fontSize: '13.5@vs',
       paddingHorizontal: '14@vs',
       color: '#929fb2',
       textAlign: 'center',
       marginTop: '5@vs'
   },
   title: {
       fontFamily: "dsss",
       fontSize: '23@vs',
       marginTop: '60@vs',
       color: '#0c090a',
       paddingHorizontal: '10@vs',
       textAlign: 'center'
   },
   onboardImage: {
       resizeMode: 'contain',
   }

});