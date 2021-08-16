import React, {useState} from 'react';
import {Button, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import Channels from './helper/channels';
import RadioPlayer from 'react-native-radio-player';
const App = () => {
  const [isPLaying, setIsPlaying] = useState(false);
  const playing = () => {
    if (!isPLaying) {
      RadioPlayer.stop();
    }
    RadioPlayer.radioURL(Channels[0].url);
    RadioPlayer.play();
    setIsPlaying(!isPLaying);
  };
  const stop = () => {
    RadioPlayer.stop();
  };

  return (
    <SafeAreaView>
      <View>
        <Text> React Native </Text>
        {Channels.map((item) => (
          <Button title={item.name} key={item.id} onPress={playing}></Button>
        ))}
        <Button title="Stop" color="#ff0000" onPress={stop}></Button>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
  },
});

export default App;
