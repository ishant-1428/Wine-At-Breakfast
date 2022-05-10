import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/dist/FontAwesome5';

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
      initialRouteName={PostPage}
      screenOptions = {{
        headerShown:true,
        tabBarStyle:{}
      }}
      
      >
        <Tab.Screen name= 'Home Screen' component={PostPage} 
        options={{
          tabBarIcon: ({size,color})=>(<Icon name={'archive'} color={color} size = {0}/>),
        }
      }
        
        />
        <Tab.Screen name= 'Create Post'  component={ImageButton}
        options={{
          tabBarIcon: ({size, color}) => (<Icon name={'airbnb'} size={0} color={color} />)
      }}
      />

      </Tab.Navigator>
  );
}

export default MainContainer;
