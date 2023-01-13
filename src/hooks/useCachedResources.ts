import { useEffect, useState } from 'react';

// Custom dependencies import
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

const useCachedResources = () => {
    const [loadStat, setLoadStat] = useState(false);

    useEffect(() => {
        loadResourcesandDataSync();
    }, []);

    const loadResourcesandDataSync = async () => {
        try {
            SplashScreen.preventAutoHideAsync();

            // Load Fonts
            await Font.loadAsync({
                "Gotham": require("@fonts/Gotham.otf"),
                'Circular': require('../assets/fonts/Circular.ttf'),
                "s": require("@fonts/s.ttf"),
                'ss': require('../assets/fonts/ss.otf'),
                "sss": require("@fonts/sss.otf"),
                'ssss': require('../assets/fonts/ssss.otf'),
                "ds": require("@fonts/ds.ttf"),
                'dss': require('../assets/fonts/dss.ttf'),
                "dsss": require("@fonts/dsss.ttf"),
            });

            setLoadStat(true);
            SplashScreen.hideAsync();
        } catch (error) {
            console.log(error);
        }
    }
    return loadStat ;
}

export default useCachedResources ;