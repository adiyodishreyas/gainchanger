import React, { PureComponent } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, Alert } from 'react-native';
import { Card, Icon, Button } from 'react-native-elements';

export default class TweetListScreen extends PureComponent {
  
  constructor(props){
    super(props);
    this.state = { isLoading: false, tweets: [] };
  }

  fetchTweets(keyword) {
    this.setState({ isLoading: true });

    var myHeaders = new Headers({
      authorization: 'Bearer AAAAAAAAAAAAAAAAAAAAAAXUfwAAAAAAP9TmsyTeYIq1u1JjB0HF30RxRtU%3D7oCjZzT3mN7uXiBMIQGO36L8e68bhdpOyVmfaw2nrbrkt3fQBT'
    });
    var options = {
      mode: 'no-cors',
      headers: myHeaders,
      method: 'GET'
    };
    var searchApi = `https://api.twitter.com/1.1/search/tweets.json?q=${keyword}&result_type=popular`;

    return fetch(searchApi, options)
    .then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson);
      this.setState({ isLoading: false, tweets: responseJson.statuses });
    })
    .catch((error) => {
      console.error(error);
    });  
  }

  componentDidMount() {
    const keyword = this.props.navigation.getParam('keyword');
    if( keyword ) {
      this.fetchTweets(keyword);
    }
  }

  renderTweet = (tweet) => {
    console.log('tweet', tweet);
    const { item } = tweet;
    const { text } = item;

    return ( 
      <Card
        title='Tweet'
        >
        <Text style={{marginBottom: 10}}>
          { text }
        </Text>
        <Button
          icon={<Icon name='code' color='#ffffff' />}
          backgroundColor='#03A9F4'
          buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
          title='VIEW' />
      </Card>
    );
  }

  render() {
    if(this.state.isLoading) {
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )
    }

    return(
      <View style={{flex: 1, paddingTop:20}}>
        <FlatList
          data={this.state.tweets}
          renderItem={this.renderTweet}
          keyExtractor={({id_str}, index) => id_str}
        />
      </View>
    );
  }
}