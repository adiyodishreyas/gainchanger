import React, { PureComponent } from 'react';
import {
  ScrollView,
  StyleSheet,
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
    activeSubSection: {}
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
          containerStyle={styles.header}
          title={section.category_name}
          bottomDivider={true}  
          leftIcon={() => <Icon name={section.icon} /> }
        />
      </Animatable.View>
    );
  }

  onKeywordPress = (item) => {
    this.props.navigation.closeDrawer();
    this.setState({ activeSubSection: item });
    this.fetchTweetsAction( item );
  }

  fetchTweetsAction = ( {id, val, icon} ) => {
    const navigateAction = NavigationActions.navigate({
      routeName: 'TweetListScreen',
      params: {
        keyword: id,
        name: val,
        icon: icon
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
        style={styles.content}>
        {section.subcategory.map((item, key) => (
          <View key={key}>
            <TouchableOpacity
              onPress={() => this.onKeywordPress(item)}>
              <ListItem
                containerStyle={styles.subSectionStyle}
                key={key}
                title={item.val}
                bottomDivider={true}
                checkmark={this.state.activeSubSection ? item.id === this.state.activeSubSection.id : false}
                leftIcon={() => <Icon name={item.icon} /> }
              />
            </TouchableOpacity>           
          </View>
        ))}
      </Animatable.View>
    );
  }

  renderSideMenuHeader() {
    return (
      <View style={styles.sideMenuHeaderContainer}>
        <Icon 
          name={'twitter'}
          color={'white'}
          size={75}
        />
      </View>
    );
  }
 
  render() {
    return (
      <View style={styles.container}>
        {this.renderSideMenuHeader()}
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
    backgroundColor: '#F5FCFF'
  },
  header: {
    backgroundColor: '#F5FCFF'
  },
  content: {
    backgroundColor: '#FFF',
  },
  subSectionStyle: {
    paddingLeft: 25
  },  
  sideMenuHeaderContainer: { 
    backgroundColor: '#55ACEE', 
    height: 300, 
    alignItems: 'center', 
    justifyContent: 'center' 
  }
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