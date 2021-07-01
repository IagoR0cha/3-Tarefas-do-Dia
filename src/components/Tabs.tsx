import React, { useState, useEffect } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { Dimensions } from 'react-native';
import { StyleSheet, View, TouchableNativeFeedback, Text } from 'react-native';
import { theme } from '../global/styles/theme';

interface Props {
  onPressDevice?: () => void;
  onPressCloud?: () => void
  itemCurrent?: (item: item) => void;
}

type item = 'DEVICE' | 'CLOUD'

export default function Tabs({ onPressCloud, onPressDevice, itemCurrent }: Props) {
  const [itemSelected, setItemSelected] = useState<item>('DEVICE');

  function itemSelectedControl(item: item) {
    const enableBorder: StyleProp<ViewStyle> = { borderBottomColor: '#fff' };
    const disableBorder: StyleProp<ViewStyle> = { borderBottomColor: theme.primaryColor };

    return itemSelected === item ? enableBorder : disableBorder;
  }

  useEffect(() => {
    if (itemCurrent){
      itemCurrent(itemSelected);
    }
  }, [itemSelected])

  return (
    <View style={styles.container}>
      <TouchableNativeFeedback
        onPress={() => {
          setItemSelected('DEVICE');
          onPressDevice && onPressDevice();
        }}
        background={TouchableNativeFeedback.Ripple('#00000011', false)}
      >
        <View style={[styles.button, itemSelectedControl('DEVICE')]}>
          <Text style={styles.textButton}>Dispositivo</Text>
        </View>
      </TouchableNativeFeedback>
      <TouchableNativeFeedback
        onPress={() => {
          setItemSelected('CLOUD');
          onPressCloud && onPressCloud();
        }}
        background={TouchableNativeFeedback.Ripple('#00000011', true)}
      >
        <View style={[styles.button, itemSelectedControl('CLOUD')]}>
          <Text style={styles.textButton}>Nuvem</Text>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    height: 50
  },
  button: {
    flex: 1,
    backgroundColor: theme.primaryColor,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 4,
  },
  textButton: {
    color: theme.textLightColor,
    fontWeight: 'bold',
  }
});

