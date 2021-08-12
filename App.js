import React from 'react';
import {Button, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import RadioPlayer, {
} from 'react-native-radio-player';
const App = () => {
  const playing = () => {
    console.log('playing...');
    let x = 'http://stream.live.vc.bbcmedia.co.uk/bbc_radio_one';
    const bbc_3 = 'http://stream.live.vc.bbcmedia.co.uk/bbc_radio_three';
    RadioPlayer.radioURL(bbc_3);

    RadioPlayer.play();
  };
  const stop = () => {
    RadioPlayer.stop();
  };

  return (
    <SafeAreaView>
      <View>
        <Text> React Native </Text>
        <Button title="Play" onPress={playing}></Button>
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
