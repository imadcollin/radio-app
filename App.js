import React, {useState} from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import Channels from './helper/channels';
import RadioPlayer from 'react-native-radio-player';
import {Button, ThemeProvider} from 'react-native-elements';
import {Card, ListItem, Icon, Image} from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Rating} from 'react-native-elements';
const App = () => {
  const [isPLaying, setIsPlaying] = useState(false);
  const [starColor, setStarColor] = useState('red');
  const [starName, setStarName] = useState('star');
  const playing = url => {
    if (!isPLaying) {
      RadioPlayer.stop();
    }
    RadioPlayer.radioURL(url);
    RadioPlayer.play();
    setIsPlaying(!isPLaying);
  };
  const stop = () => {
    console.log('stop');
    RadioPlayer.stop();
  };
  const theme = {
    Button: {
      titleStyle: {
        color: 'red',
      },
    },
  };
  const click = () => {
    console.log('clicked');
  };
  const st = async value => {
    try {
      await AsyncStorage.setItem('@storage_key', value);
    } catch (e) {
      console.log(e);
    }
  };
  const stt = value => {
    console.log('read', value);
    st(value);
  };
  const rt = async () => {
    try {
      const test = await AsyncStorage.getItem('@storage_key');
      console.log('retrieved', test);
    } catch (e) {
      console.log(e);
    }
  };

  const fav = e => {
    setStarName(starName === 'star-outline' ? 'star' : 'star-outline');
  };
  const ratingCompleted = rating => {
    console.log('Rating is: ' + rating);
  };

  return (
    <SafeAreaView>
      <View>
        <Card style={{backgroundColor: 'green'}}>
          <Card.Title>Channels</Card.Title>
          <Card.Divider />
          {Channels.map((channel, i) => {
            return (
              <ListItem
                key={channel.id}
                bottomDivider
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  padding: 10,
                }}>
                <Image
                  style={{width: 50, height: 40}}
                  resizeMode="cover"
                  source={channel.logo}
                />
                <Text>{channel.name} </Text>
                <Icon
                  name="play-circle-outline"
                  type="ionicon"
                  color="#517fa4"
                  onPress={() => playing(channel.url)}
                />
                <Icon
                  name="star-outline"
                  type="ionicon"
                  //  color={starColor}
                  onPress={() => console.log('icon on press')}
                />
              </ListItem>
            );
          })}
          <ThemeProvider theme={theme}>
            <Button
              type="outline"
              title="Stop"
              color="red"
              onPress={stop}></Button>
          </ThemeProvider>
        </Card>
        <Button title="storaige" onPress={stt('somedata')}></Button>
        <Button title="retrived" onPress={rt}>
          {' '}
        </Button>
        <Rating
          startingValue={0}
          ratingCount={1}
          onFinishRating={ratingCompleted}
          style={{paddingVertical: 10}}
        />
      </View>
    </SafeAreaView>
  );
};

export default App;
