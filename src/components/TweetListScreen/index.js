import React, {Component} from 'react';
import {StyleSheet, Text, View, Alert} from 'react-native';
import { NavigationEvents } from 'react-navigation';


export default class TweetListScreen extends Component {

  componentDidMount = () => {
    const keyword = this.props.navigation.getParam('keyword');
    if( keyword ) {
      Alert.alert(keyword);
    }
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text> TweetListScreen </Text>
      </View>
    );
  }
}