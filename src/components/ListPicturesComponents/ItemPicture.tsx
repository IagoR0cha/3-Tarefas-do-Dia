import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import * as MediaLibrary from 'expo-media-library';

import { ItemListPicture } from '../../interfaces/itemListPicture';


interface Props {
  picture: MediaLibrary.Asset
}

export default function ItemPicture({ picture }: Props) {

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{ uri: picture.uri }}
        resizeMode="cover"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 500,
    borderRadius: 10,
    elevation: 5,
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  }
});