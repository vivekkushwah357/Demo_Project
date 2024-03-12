import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Login from "./src/screens/Login";
import Start from "./src/screens/Start";
import DetailData from "./src/screens/DetailData";
import Loader from "./src/components/Loader";
import AddTodo from "./src/screens/AddTodo";



const Stack = createNativeStackNavigator();

const AppNavigatior = () => {
  return (
    <NavigationContainer>
      <View style={{flex: 1}}>
        <SafeAreaProvider>
          <Stack.Navigator>
            <Stack.Screen name="Login" component={Login} options={{headerShown: false}}  />
            <Stack.Screen name="Start" component={Start} />
            <Stack.Screen name="AddTodo" component={AddTodo}/>
            <Stack.Screen name="DetailData" component={DetailData} />
            <Stack.Screen name="Loader" component={Loader} />
          </Stack.Navigator>
        </SafeAreaProvider>
      </View>
    </NavigationContainer>
  );
};

export default AppNavigatior;
