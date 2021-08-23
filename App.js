import React, {useState} from 'react';
import {SafeAreaView, View} from 'react-native';
import Channels from './helper/channels';
import RadioPlayer from 'react-native-radio-player';
import {Button, ThemeProvider} from 'react-native-elements';
import {Card} from 'react-native-elements';
import {Rating} from 'react-native-elements';
import ChannelItem from './componants/channelItem';
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
              <ChannelItem key={i} channel={channel} playing={playing}></ChannelItem>
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
    </SafeAreaView>
  );
};

export default App;
