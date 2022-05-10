import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-ionicons';

// Screens
import ImageButton from './ImageButton';
import PostPage from './PostPage';

//Screen names
const imageButton = "Create Some Posts here";
const postScreen = "See Some Posts here";

const Tab = createBottomTabNavigator();

const MainContainer = () => {

  


  return (
      <Tab.Navigator
        initialRouteName={imageButton}
        
        screenOptions={({ route }) => ({
          headerShown: false, 
          tabBarIcon: ({focused}) => {
            let iconName;
            let rn = route.name;

            if (rn === imageButton) {
              iconName = focused ? 'home' : 'home-outline';

            } else if (rn === mainScreen) {
              iconName = focused ? 'list' : 'list-outline';
            }
            // You can return any component that you like here
            return (
              <Icon name = {iconName} size = {25} />
            );
          },
        })
      }
        screenOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'grey',
          labelStyle: { paddingBottom: 10, fontSize: 10 },
          style: { padding: 10, height: 70}
        }}>

        <Tab.Screen name={imageButton} component={ImageButton} />
        <Tab.Screen name={postScreen} component={PostPage} />

      </Tab.Navigator>
  );
}

