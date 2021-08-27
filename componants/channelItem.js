import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {Button} from 'react-native-elements';
import {Card, ListItem, Icon, Image} from 'react-native-elements';

const ChannelItem = ({channel, playing, handleFav}) => {
  const [starName, setStarName] = useState('star-outline');

  const fav = e => {
    setStarName(starName === 'star' ? 'star-outline' : 'star');
    handleFav(channel,starName);
  };
  return (
    <View>
      <ListItem
        key={channel.id}
        bottomDivider
        style={{
          display: 'flex',
          flexDirection:'column',
          alignItems: 'stretch',
          justifyContent:'flex-end',
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
          onPress={fav}
        />
      </ListItem>
    </View>
  );
};
export default ChannelItem;
