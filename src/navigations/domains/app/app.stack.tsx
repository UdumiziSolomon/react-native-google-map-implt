import { createNativeStackNavigator } from '@react-navigation/native-stack';

// types import
import { AppStackParamList, AppEnum } from '../types/app.types';
import { Map, Workflow, Exit } from '@screens/index';

const BaseStack = createNativeStackNavigator<AppStackParamList>();

const AppStack = () => {

    return (
        <BaseStack.Navigator
            initialRouteName={AppEnum.Map}
            screenOptions={{ headerShown: false }}
        >
            <BaseStack.Screen name={AppEnum.Map} component={Map} />
            <BaseStack.Screen name={AppEnum.Workflow} component={Workflow} />
            <BaseStack.Screen name={AppEnum.Exit} component={Exit} />
        </BaseStack.Navigator>
    )
    
}

export default AppStack ;