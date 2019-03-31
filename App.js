/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import { 
  Dimensions, 
  TouchableOpacity 
} from 'react-native';
import { 
  createStackNavigator, 
  createDrawerNavigator, 
  createAppContainer, 
  DrawerActions 
} from 'react-navigation';
import Icon from "react-native-vector-icons/Ionicons";

import SideMenu from './src/components/SideMenu';
import TweetListScreen from './src/components/TweetListScreen';

const stackNav = createStackNavigator({
  TweetListScreen : {
    screen: TweetListScreen,
    navigationOptions: ({navigation}) => ({
      title: navigation.getParam('name', '') + ' Tweets',
      headerTintColor: '#FFF',
      headerStyle: {
        backgroundColor: '#55ACEE',
      },
      headerRight:(<TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.toggleDrawer()) }>
                      <Icon style={{ paddingRight: 20, color: '#FFF' }} name="ios-menu" size={30} />
                  </TouchableOpacity>
      )
    }),
    key: 'tweet-list-screen'
  }
});

const drawerNav = createDrawerNavigator({
    Main: {
      screen: stackNav,
    }
  }, {
    contentComponent: SideMenu,
    drawerPosition: 'right',
    drawerWidth: Dimensions.get('window').width - 80,  
});

const AppContainer = createAppContainer(drawerNav);

export default AppContainer;
