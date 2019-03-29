import React, { PureComponent } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Accordion from 'react-native-collapsible/Accordion';
import { NavigationActions, StackActions } from 'react-navigation';
import {
  ListItem
} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
 
export default class SideMenu extends PureComponent {
  state = {
    activeSections: [],
  }
 
  setActiveSections = sections => {
    this.setState({
      activeSections: sections.includes(undefined) ? [] : sections,
    });
  }
 
  renderHeader = (section, _, isActive) => {
    return (
      <Animatable.View
        duration={400}
        transition="backgroundColor">
        <ListItem 
          containerStyle={[styles.header, isActive ? styles.active : styles.inactive]}
          title={section.category_name}
          bottomDivider={true}  
          leftIcon={() => <Icon name={section.icon} /> }
        />
      </Animatable.View>
    );
  }

  onKeywordPress = (keyword) => {
    this.props.navigation.closeDrawer();
    this.fetchTweets( keyword );
  }

  fetchTweets = ( keyword ) => {
    const navigateAction = NavigationActions.navigate({
      routeName: 'TweetListScreen',
      params: {
        keyword
      }
    });

    const resetAction = StackActions.reset({
      index: 0,
      actions: [ navigateAction ],
    });
    this.props.navigation.dispatch(resetAction);
  }
 
  renderContent = (section, _, isActive) => {
    return (
      <Animatable.View
        duration={400}
        style={[styles.content, isActive ? styles.active : styles.inactive]}
        transition="backgroundColor">
        {section.subcategory.map((item, key) => (
          <View key={key} style={styles.item}>
            <TouchableOpacity
              onPress={() => this.onKeywordPress(item.id)}>
              <ListItem
                key={key}
                title={item.val}
                bottomDivider={true}
                leftIcon={() => <Icon name={item.icon} /> }
              />
            </TouchableOpacity>           
          </View>
        ))}
      </Animatable.View>
    );
  }
 
  render() {
    return (
      <View style={styles.container}>
        <Text
          style={{
            paddingTop: 30,
            paddingBottom: 10,
            paddingLeft: 10,
            fontSize: 20,
            textAlign: 'center',
          }}>
          Categories
        </Text>
        <ScrollView contentContainerStyle={{}}>
          <Accordion
            activeSections={this.state.activeSections}
            sections={SECTIONS}
            touchableComponent={TouchableOpacity}
            expandMultiple={true}
            renderHeader={this.renderHeader}
            renderContent={this.renderContent}
            duration={400}
            onChange={this.setActiveSections}
          />
        </ScrollView>
      </View>
    );
  }
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    paddingTop: 10,
  },
  header: {
    backgroundColor: '#F5FCFF'
  },
  content: {
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#fff',
  },
  active: {
    backgroundColor: 'rgba(255,255,255,1)',
  },
  inactive: {
    backgroundColor: 'rgba(245,252,255,1)',
  },
  text: {
    fontSize: 16,
    color: '#606070',
    padding: 10,
  },
});
 
const SECTIONS = [
  {
    category_name: 'Animals',
    icon: 'paw',
    subcategory: [{ id: 'dogs', val: 'Dogs', icon: 'dog' }, { id: 'cats', val: 'Cats', icon: 'cat' }],
  },
  {
    category_name: 'Sports',
    icon: 'running',
    subcategory: [{ id: 'soccer', val: 'Soccer', icon: 'futbol' }, { id: 'basketball', val: 'Basketball', icon: 'basketball-ball' }],
  }
];