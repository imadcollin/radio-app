import React, {useState} from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import Channels from './helper/channels';
import RadioPlayer from 'react-native-radio-player';
import {Button, ThemeProvider} from 'react-native-elements';
import {Card, ListItem, Icon, Image} from 'react-native-elements';

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
        <Card>
          <Card.Title>Channels</Card.Title>
          <Card.Divider />
          {Channels.map((channel, i) => {
            return (
              <ListItem
                key={i}
                bottomDivider
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
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
      </View>
    </SafeAreaView>
  );
};

export default App;
