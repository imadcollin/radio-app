import React,{useState} from 'react';
import {View, Text} from 'react-native';
import VolumeControl, {VolumeControlEvents} from 'react-native-volume-control';
import Slider from '@react-native-community/slider';
import {Icon} from 'react-native-elements';

const VolumeSlider = () => {
  const [volume] = useState(0);

  const sliderChange = value => {
    VolumeControl.change(value);
  };
  return (
    <View>
        <Icon name="volume-medium-outline"></Icon>
      <Slider
        value={volume}
        onValueChange={sliderChange}
      />
    </View>
  );
};
export default VolumeSlider;
