import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Login from './screens/Login';

import { createStackNavigator } from '@react-navigation/stack';
import TestLogin from './screens/TestLogin';
import ChooseGame from './screens/ChooseGame';
import KioskLanding from './screens/KioskLanding';
import CoupenCode from './screens/CoupenCode';
import PlayGame from './screens/PlayGame';
import PlayedGame from './screens/PlayedGame';
import PrintComponent from './screens/Print';
import PrinterTest from './screens/PrinterTest';

const Stack = createStackNavigator();


export default function App() {

    
  return (



    <NavigationContainer>
    <Stack.Navigator initialRouteName="Login"  screenOptions={{
        headerShown: false
      }}>

<Stack.Screen name="Login" component={Login} options={{ headerShown: false  }}/>
<Stack.Screen name="PlayScreen" component={PlayGame} options={{ headerShown: false  }}/>
<Stack.Screen name="ChooseGame" component={ChooseGame} options={{ headerShown: false  }}/>
<Stack.Screen name="KioskLanding" component={KioskLanding} options={{ headerShown: false  }}/>
<Stack.Screen name="PlayedGame" component={PlayedGame} options={{ headerShown: false  }}/>
<Stack.Screen name="Print" component={PrintComponent} options={{ headerShown: false  }}/>
<Stack.Screen name="CoupenCode" component={CoupenCode} options={{ headerShown: false  }}/>
<Stack.Screen name="PrinterTest" component={PrinterTest} options={{ headerShown: false  }}/>

       </Stack.Navigator>
       </NavigationContainer>
  );
}


