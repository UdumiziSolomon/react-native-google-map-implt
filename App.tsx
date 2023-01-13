import "react-native-gesture-handler"

import React, { useEffect, useState, FC } from 'react';
import AppStack from '@navigations/domains/app/app.stack';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

// splash 
import Splash from './src/splash.screen' ;

const App:FC = () => {

  const [splash, setSplash] = useState(false);

  useEffect(() => {
    const loadUser = () => {
      setSplash(true);
    }
    setTimeout(loadUser, 3000);
  }, []);
  
  if(!splash){
      return <Splash /> ;
  }else{
    return (
      <NavigationContainer>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <BottomSheetModalProvider>
            <AppStack />
          </BottomSheetModalProvider>
        </GestureHandlerRootView>
      </NavigationContainer>
    );
  }

}

export default App ;
