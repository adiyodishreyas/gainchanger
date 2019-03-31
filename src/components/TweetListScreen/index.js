import React, { PureComponent } from 'react';
import { 
  Text, 
  View, 
  FlatList, 
  ActivityIndicator,
  Image,
  StyleSheet
} from 'react-native';
import { 
  Card, 
  ListItem,
  Button
} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { DrawerActions } from 'react-navigation';

export default class TweetListScreen extends PureComponent {
  
  constructor(props){
    super(props);
    this.state = { 
      isLoading: false, 
      tweets: [] 
    };
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
      this.setState({ isLoading: false, tweets: responseJson.statuses });
    })
    .catch((error) => {
      console.error(error);
      this.setState({ isLoading: false, tweets: [] });
    });  
  }

  componentDidMount() {
    const keyword = this.props.navigation.getParam('keyword');
    if( keyword ) {
      this.fetchTweets(keyword);
    }
  }

  renderTweet = (tweet) => {
    const { item } = tweet;
    const { text, entities, user } = item;

    const { media } = entities;
    const imageUrl =  media && media.length > 0 ? media[0].media_url_https : null;

    const userAvatarComponent = (
      <ListItem 
          title={user.name}
          subtitle={`@${user.screen_name}`}
          leftAvatar={{ source: { uri: user.profile_image_url_https } }}
        />
    );
    const tweetTextComponent = (
      <Text style={{marginBottom: 10}}>
        { text }
      </Text>
    );

    const imageComponent = (
      <View style={{ flex: 1, alignItems: 'center', marginBottom: 20 }}>
        <Image 
          style={{ width: 200, height: 200 }}
          source= {{ uri: imageUrl }}
        />
      </View>
    );

    return ( 
      <Card>
        { userAvatarComponent }
        { imageUrl && imageComponent }
        { tweetTextComponent }
      </Card>
    );
  }

  renderLoader() {
    return(
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  renderDiscoverButton() {
    return ( 
      <View style={styles.centerContainer}>
        <Button
          onPress={() => this.props.navigation.dispatch(DrawerActions.toggleDrawer())}
          titleStyle={{ padding: 10 }}
          containerStyle={{ backgroundColor: '#55ACEE' }}
          icon={
            <Icon
              name="search"
              size={15}
              color="white"
            />
          }
          title="Discover"
        />
      </View>
    )
  }

  renderTweetList() {
    return(
      <FlatList
        style={styles.tweetListContainer}
        data={this.state.tweets}
        renderItem={this.renderTweet}
        keyExtractor={({id_str}, index) => id_str}
      />
    );
  }

  render() {
    const { isLoading, tweets } = this.state;
    return (
      <View style={styles.container}>
        { isLoading && this.renderLoader() }
        { !isLoading && tweets.length === 0 && this.renderDiscoverButton() }
        { !isLoading && tweets.length > 0 && this.renderTweetList() }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#F5FCFF' 
  },
  loader: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  centerContainer: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  tweetListContainer: {
    paddingTop: 20
  }
});