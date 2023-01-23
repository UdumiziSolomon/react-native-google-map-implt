import React, { useState } from 'react';
import { Text, View, Dimensions, StatusBar, TouchableOpacity, ScrollView } from 'react-native';
import { ScaledSheet, vs } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


const { width, height } = Dimensions.get('window');

const Info = ({ info, closeInfo }: any) => {
  return (
    <View style={styles.container}>
      <View style={styles.display}>
        <View style={styles.display_header_layer}>
          <TouchableOpacity onPress={closeInfo}>
            <Icon name="close" style={styles.info_icon} />
          </TouchableOpacity>
        </View>
          <Text style={styles.display_top_text}> {info.busStop} Bus Stop details </Text>
          <ScrollView contentContainerStyle={{ alignItems: 'center' }}>

              <View style={styles.details_layer}>
              <Icon name="map-marker" style={styles.info_iconn} />
                <Text style={styles.details_first_text}> Node From:  </Text>
                <Text style={styles.details_second_text}> {info.nodeFrom} </Text>
              </View>

              <View style={styles.details_layer}>
                <Icon name="map-marker" style={styles.info_iconn} />
                <Text style={styles.details_first_text}> Node To:  </Text>
                <Text style={styles.details_second_text}> {info.nodeTo} </Text>
              </View>

              <View style={styles.details_layer}>
                <Icon name="map-marker" style={styles.info_iconn} />
                <Text style={styles.details_first_text}> Latitude:  </Text>
                <Text style={styles.details_second_text}> {info.latitude} </Text>
              </View>

              <View style={styles.details_layer}>
                <Icon name="map-marker" style={styles.info_iconn} />
                <Text style={styles.details_first_text}> Longitude:  </Text>
                <Text style={styles.details_second_text}> {info.longitude} </Text>
              </View>

              <View style={styles.details_layer}>
                <Icon name="map-marker" style={styles.info_iconn} />
                <Text style={styles.details_first_text}> ETA to next node  </Text>
                <Text style={styles.details_second_text}> {info.averageETA} </Text>
              </View>

              <View style={styles.details_layer}>
                <Icon name="map-marker" style={styles.info_iconn} />
                <Text style={styles.details_first_text}> Distance to next node (m):  </Text>
                <Text style={styles.details_second_text}> {info.distance} </Text>
              </View>

              <View style={styles.details_layer}>
                <Icon name="map-marker" style={styles.info_iconn} />
                <Text style={styles.details_first_text}> Average speed to next node (km/hr)  </Text>
                <Text style={styles.details_second_text}> {info.average} </Text>
              </View>

               <View style={styles.details_layer}>
                <Icon name="map-marker" style={styles.info_iconn} />
                <Text style={styles.details_first_text}> Peak period:  </Text>
                <Text style={styles.details_second_text}> {info.peakPeriod} </Text>
              </View>

              <View style={styles.details_layer}>
                <Icon name="map-marker" style={styles.info_iconn} />
                <Text style={styles.details_first_text}> Dominating Land use:  </Text>
                <Text style={styles.details_second_text}> {info.dominatingLandUse} </Text>
              </View>

              <View style={styles.details_layer}>
                <Icon name="map-marker" style={styles.info_iconn} />
                <Text style={styles.details_first_text}> Type of lane:  </Text>
                <Text style={styles.details_second_text}> {info.typeOfLane} </Text>
              </View>


              <View style={styles.details_layer}>
                <Icon name="map-marker" style={styles.info_iconn} />
                <Text style={styles.details_first_text}> Speed bumps:  </Text>
                <Text style={styles.details_second_text}> {info.speedBumps} </Text>
              </View>

              <View style={styles.details_layer}>
                <Icon name="map-marker" style={styles.info_iconn} />
                <Text style={styles.details_first_text}> Road  condition:  </Text>
                <Text style={styles.details_second_text}> {info.trafficSituation} </Text>
              </View>

          </ScrollView>
      </View>
    </View>
  )
}

export default Info

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,250,0.1)',
        height: height,
        paddingTop: StatusBar.currentHeight,
        marginTop: vs(60)
    },
    display: {
      width: width - 20,
      height: height / 1.62,
      backgroundColor: '#ffffff',
      borderRadius: vs(20),
      paddingVertical: vs(4),
    },
    info_icon: {
      color: '#323d48',
      fontSize: vs(20),
      marginRight: vs(30)
  },
  info_iconn: {
    color: '#313539',
    fontSize: vs(13),
    marginRight: vs(5)
},
  display_header_layer: {
    paddingVertical: vs(5),
    alignItems: 'flex-end'
  },
  display_top_text: {
    color: '#40404e',
    fontFamily: 'dsss',
    fontSize: vs(18),
    // textAlign: 'center',
    marginBottom: vs(5),
    marginLeft: vs(20)
  },
  details_layer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginVertical: vs(2),
    width: width - 40,
    backgroundColor: '#fcfcfc',
    paddingVertical: vs(6) ,
    borderRadius: vs(5),
    paddingHorizontal: vs(20),
    flexWrap: 'wrap'
  },
  details_first_text: {
    color: '#33333d',
    fontFamily: 'dsss',
    fontSize: vs(13),
    textTransform: 'uppercase',
    marginRight: vs(3)
  },
  details_second_text: {
    color: '#4c4c50',
    fontFamily: 'dsss',
    fontSize: vs(12.5),
  },
})