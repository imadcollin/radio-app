import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {Button} from 'react-native-elements';
import {Card, ListItem, Icon, Image} from 'react-native-elements';

const ChannelItem = ({channel, playing, stt}) => {
  const [starName, setStarName] = useState('star-outline');

  const fav = e => {
    console.log(channel.url);
    stt(channel);
    setStarName(starName === 'star' ? 'star-outline' : 'star');
  };
  return (
    <View>
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
          name={starName}
          type="ionicon"
          //    color={starColor}
          onPress={fav}
        />
      </ListItem>
    </View>
  );
};
export default ChannelItem;
