import React, {useState} from 'react';
import {SafeAreaView, View, Text} from 'react-native';
import Channels from './helper/channels';
import RadioPlayer from 'react-native-radio-player';
import {Button, ThemeProvider} from 'react-native-elements';
import {Card, Icon} from 'react-native-elements';
import ChannelItem from './componants/channelItem';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {
  const [isPLaying, setIsPlaying] = useState(false);
  const [favChs, setFacChs] = useState([]);
  const [chs, setChs] = useState(Channels);

  const playing = url => {
    if (!isPLaying) {
      RadioPlayer.stop();
    }
    RadioPlayer.radioURL(url);
    RadioPlayer.play();
    setIsPlaying(!isPLaying);
  };
  const stop = () => {
    RadioPlayer.stop();
  };
  const theme = {
    Button: {
      titleStyle: {
        color: 'red',
      },
    },
  };

  const saveItems = async value => {
    try {
      await AsyncStorage.setItem('@storage_key', JSON.stringify(value));
    } catch (e) {
      console.log(e);
    }
  };
  const handleFav = (channel, starName) => {
    if (starName === 'star-outline') {
      if (!cleanList(channel)) favChs.push(channel);
      saveItems(favChs);
    } else {
      const arr = favChs.filter(x => x.id != channel.id);
      saveItems(arr);
    }
  };

  const cleanList = channel => {
    return favChs.filter(ch => ch.id === channel.id).length > 0;
  };
  const retrieveItems = async () => {
    try {
      await AsyncStorage.getItem('@storage_key')
        .then(req => JSON.parse(req))
        .then(json => setChs(json))
        .catch(error => console.log('error!'));
    } catch (e) {
      console.log(e);
    }
  };
  const myFav = () => {
    retrieveItems();
  };
  const all = () => {
    setChs(Channels);
  };

  return (
    <SafeAreaView>
      <View>
        <Card>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignSelf: 'auto',
              justifyContent: 'space-between',
            }}>
            <Text onPress={all}>All</Text>
            <Card.Title>Channels</Card.Title>
            <Icon name="star" type="ionicon" color="#F39C12" onPress={myFav} />
          </View>

          <Card.Divider />
          {chs.map((channel, i) => {
            return (
              <ChannelItem
                key={i}
                channel={channel}
                playing={playing}
                handleFav={handleFav}></ChannelItem>
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
      </View>
    </SafeAreaView>
  );
};

export default App;
