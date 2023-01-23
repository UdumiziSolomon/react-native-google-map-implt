import { createNativeStackNavigator } from '@react-navigation/native-stack';

// types import
import { AppStackParamList, AppEnum } from '../types/app.types';
import { Map, Workflow, Exit, Infographics, Eta, Road, Dominating, Speed, Onboard } from '@screens/index';

const BaseStack = createNativeStackNavigator<AppStackParamList>();

const AppStack = () => {

    return (
        <BaseStack.Navigator
            initialRouteName={AppEnum.Onboard}
            screenOptions={{ headerShown: false }}
        >
            <BaseStack.Screen name={AppEnum.Onboard} component={Onboard} />
            <BaseStack.Screen name={AppEnum.Map} component={Map} />
            <BaseStack.Screen name={AppEnum.Workflow} component={Workflow} />
            <BaseStack.Screen name={AppEnum.Exit} component={Exit} />
            <BaseStack.Screen name={AppEnum.Infographics} component={Infographics} />
            <BaseStack.Screen name={AppEnum.Eta} component={Eta} />
            <BaseStack.Screen name={AppEnum.Road} component={Road} />
            <BaseStack.Screen name={AppEnum.Dominating} component={Dominating} />
            <BaseStack.Screen name={AppEnum.Speed} component={Speed} />
        </BaseStack.Navigator>
    )
    
}

export default AppStack ;