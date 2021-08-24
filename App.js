import React, {useState} from 'react';
import {SafeAreaView, View} from 'react-native';
import Channels from './helper/channels';
import RadioPlayer from 'react-native-radio-player';
import {Button, ThemeProvider} from 'react-native-elements';
import {Card} from 'react-native-elements';
import {Rating} from 'react-native-elements';
import ChannelItem from './componants/channelItem';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {
  const [isPLaying, setIsPlaying] = useState(false);
  const [favChs, setFacChs] = useState([]);

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

  const st = async value => {
    console.log('value:', value);
    try {
      await AsyncStorage.setItem('@storage_key', JSON.stringify(value));
    } catch (e) {
      console.log(e);
    }
  };
  const stt = value => {
    if (favChs.includes(value)) return;
    setFacChs(favChs => [...favChs, value]);
    st(favChs);
  };
  const rt = async () => {
    try {
      const test = await AsyncStorage.getItem('@storage_key')
        .then(req => JSON.parse(req))
        .then(json => console.log(json))
        .catch(error => console.log('error!'));
    } catch (e) {
      console.log(e);
    }
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
              <ChannelItem
                key={i}
                channel={channel}
                playing={playing}
                stt={stt}></ChannelItem>
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

        <Rating
          startingValue={0}
          ratingCount={1}
          onFinishRating={ratingCompleted}
          style={{paddingVertical: 10}}
        />
      </View>
      <Button onPress={rt}> retrieve</Button>
    </SafeAreaView>
  );
};

export default App;
