import React, {useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {ListItem, Icon, Image} from 'react-native-elements';

const ChannelItem = ({channel, playing, handleFav}) => {
  const [starName, setStarName] = useState('star-outline');

  const fav = e => {
    setStarName(starName === 'star' ? 'star-outline' : 'star');
    handleFav(channel, starName);
  };
  return (
    <View>
      <ListItem key={channel.id} bottomDivider>
        <View style={itemsStyle.container}>
          <Image
            style={itemsStyle.img}
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
          <Icon name={starName} type="ionicon" onPress={fav} />
        </View>
      </ListItem>
    </View>
  );
};
export default ChannelItem;

const itemsStyle = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    flexGrow: 1,
    width: 'auto',
    justifyContent: 'space-between',
  },
  img: {width: 50, height: 40},
});
