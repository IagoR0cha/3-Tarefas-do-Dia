import React from 'react';
import { StyleSheet, FlatList, SafeAreaView } from 'react-native';

import ItemPicture from './ItemPicture';

import { ItemListPicture } from '../../interfaces/itemListPicture';
import { ReactElement } from 'react-native/node_modules/@types/react';

interface Props {
  data: Array<ItemListPicture>;
  syncButton: ReactElement | null
}

export default function ListPictures({ data, syncButton }: Props) {

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item }) => <ItemPicture picture={item.data} /> }
        keyExtractor={(item) => item.data.id.toString()}
        ListFooterComponent={syncButton}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});