import React, {useState} from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import Channels from './helper/channels';
import RadioPlayer from 'react-native-radio-player';
import {Button, ThemeProvider} from 'react-native-elements';

const App = () => {
  const [isPLaying, setIsPlaying] = useState(false);
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
  return (
    <SafeAreaView>
      <View>
        <Text> React Native </Text>
        {Channels.map(item => (
          <Button
            title={item.name}
            key={item.id}
            onPress={() => playing(item.url)}></Button>
        ))}
        <ThemeProvider theme={theme}>
          <Button
            type="outline"
            title="Stop"
            color="red"
            onPress={stop}></Button>
        </ThemeProvider>
      </View>
    </SafeAreaView>
  );
};

export default App;
