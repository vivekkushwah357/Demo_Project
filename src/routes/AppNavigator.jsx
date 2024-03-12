import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Login from "../screens/Login";



const Stack = createNativeStackNavigator();

const AppNavigatior = () => {
  return (
    <NavigationContainer>
      <View style={{flex: 1}}>
        <SafeAreaProvider>
          <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Login" component={Login} />
          </Stack.Navigator>
        </SafeAreaProvider>
      </View>
    </NavigationContainer>
  );
};

export default AppNavigatior;
