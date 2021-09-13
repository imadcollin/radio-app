import React, {useState} from 'react';
import {SafeAreaView, View, Text} from 'react-native';
import Channels from './helper/channels';
import RadioPlayer from 'react-native-radio-player';
import {Card, Icon, Button} from 'react-native-elements';
import ChannelItem from './componants/channelItem';
import AsyncStorage from '@react-native-async-storage/async-storage';
import VolumeSlider from './componants/volumerSlider';
import {SearchBar} from 'react-native-elements';

const App = () => {
  const [isPLaying, setIsPlaying] = useState(false);
  const [favChs, setFacChs] = useState([]);
  const [chs, setChs] = useState(Channels);
  const [clonedChannels] = useState(Channels);
  const [searchInput, setSearchInput] = useState('');
  const [disableStop, setDisableStop] = useState(true);

  const updateSearch = value => {
    let text = value.toLowerCase();
    setChs([...clonedChannels]);
    if (!text || text === '') {
      setChs(Channels);
    }
    console.log(text);
    let arr = clonedChannels
      .filter(x => x.name.toLowerCase().match(text))
      .map(x => x);
    if (arr.length > 0) {
      setChs(arr);
    } else {
      setChs([]);
    }
    setSearchInput(value);
  };

  const playing = url => {
    if (!isPLaying) {
      RadioPlayer.stop();
    }
    RadioPlayer.radioURL(url);
    RadioPlayer.play();
    setDisableStop(false);
    setIsPlaying(!isPLaying);
  };
  const stop = () => {
    RadioPlayer.stop();
    setDisableStop(true);
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
        <Text style={{padding:10, fontSize:22, fontWeight:'bold', textAlign:"center"}}>Radio App</Text>
        <SearchBar
          placeholder="Search..."
          onChangeText={updateSearch}
          lightTheme
          cancelButtonTitle="clear"
          value={searchInput}
        />
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
          <Button
            type="outline"
            title="Stop"
            color="red"
            disabled={disableStop}
            onPress={stop}></Button>
        </Card>
        <VolumeSlider></VolumeSlider>
      </View>
    </SafeAreaView>
  );
};

export default App;
