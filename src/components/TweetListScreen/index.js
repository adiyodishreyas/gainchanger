import React, { PureComponent } from 'react';
import { 
  Text, 
  View, 
  FlatList, 
  ActivityIndicator ,
  Image
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
    const { item } = tweet;
    const { text, entities, user } = item;

    const { media } = entities;
    const imageUrl =  media && media.length > 0 ? media[0].media_url_https : null;

    return ( 
      <Card>
        <ListItem 
          title={user.name}
          subtitle={`@${user.screen_name}`}
          leftAvatar={{ source: { uri: user.profile_image_url_https } }}
        />
        {imageUrl && 
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginBottom: 20 }}>
            <Image 
              resizeMode={'cover'}
              style={{ width: 200, height: 200 }}
              source= {{ uri: imageUrl }}
            />
          </View>
        }
        <Text style={{marginBottom: 10}}>
          { text }
        </Text>
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
    else {
      if( this.state.tweets.length === 0 ) {
        return ( 
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Button
              onPress={() => this.props.navigation.dispatch(DrawerActions.toggleDrawer())}
              titleStyle={{ padding: 10 }}
              containerStyle={{ backgroundColor: '#55acee' }}
              icon={
                <Icon
                  name="twitter"
                  size={15}
                  color="white"
                />
              }
              title="Find Tweets"
            />
          </View>
        )
      }
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