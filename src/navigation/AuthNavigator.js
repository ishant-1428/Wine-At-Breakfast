import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Login, SignUp, ForgetPassword,MainScreen } from "../screens";

const Stack = createStackNavigator();

export default AuthNavigator = () => (
    <Stack.Navigator
        screenOptions = {{
            headerShown: null
        }}
    >     
        <Stack.Screen 
            name="Login" 
            component= {Login}
        />          
        <Stack.Screen 
            name="SignUp" 
            component= {SignUp}
        />          
        <Stack.Screen 
            name="ForgetPassword" 
            component= {ForgetPassword}
        />
        <Stack.Screen 
            name="MainScreen" 
            component= {MainScreen}
        />
    </Stack.Navigator> 
)