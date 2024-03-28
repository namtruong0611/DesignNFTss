import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BottomNavigation from './Screen/BottomNavigation'; 
import Login from './Screen/Login';
import Register from './Screen/Register';
import ForgotPassword from './Screen/ForgotPassword';
import ProfileScreen from './Screen/Profile';
 

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} options={{ title: 'Login' }} />
        <Stack.Screen name="Register" component={Register} options={{ title: 'Register' }} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{ title: 'Forgot Password' }} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Main" component={BottomNavigation} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
