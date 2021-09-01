import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import VolumeControl from 'react-native-volume-control';
import Slider from '@react-native-community/slider';
import {Icon} from 'react-native-elements';

const VolumeSlider = () => {
  const [volume, setVolume] = useState(10);

  const sliderChange = value => {
    VolumeControl.change(value);
    setVolume(value);
  };
  const mute = () => {
    VolumeControl.change(0);
  };
  const unmute = () => {
    VolumeControl.change(volume);
  };
  return (
    <View style={sty.container}>
      <Icon
        containerStyle={{marginTop: 8}}
        name="volume-off"
        onPress={mute}></Icon>
      <Slider
        style={{width: 300, height: 40}}
        minimumValue={0}
        maximumValue={1}
        minimumTrackTintColor="#FFFFFF"
        maximumTrackTintColor="#000000"
        value={volume}
        onValueChange={sliderChange}
      />
      <Icon
        containerStyle={{marginTop: 8}}
        name="volume-up"
        onPress={unmute}></Icon>
    </View>
  );
};
export default VolumeSlider;

const sty = StyleSheet.create({
  container: {
    backgroundColor: 'red',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 50,
  },
});
