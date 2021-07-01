import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { theme } from '../global/styles/theme';
import { MaterialIcons } from '@expo/vector-icons';

import { DataAccess } from '../interfaces/dataAccess';

interface Data {
  id: number;
  title: string,
  description: string
}

interface Props {
  data: Data;
  onPress: ({}: DataAccess) => void;
}

export default function ItemIssue({ data, onPress }: Props) {

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.8}
      onPress={() => onPress({ id: data.id, title: data.title })}
    >
      <View style={styles.header}>
        <MaterialIcons name="work-outline" size={20} color={theme.textLightColor} />
        <Text style={styles.nameText}>{data.title}</Text>
      </View>
      <View style={styles.body}>
        <Text style={styles.descriptionText}>{data.description}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.cardColorLight,
    marginBottom: 16,
    borderRadius: 10,
    elevation: 3
  },
  header: {
    backgroundColor: theme.primaryColor,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  nameText: {
    fontSize: 17,
    fontWeight: 'bold',
    color: theme.textLightColor,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    marginLeft: 10
  },
  body: {
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  descriptionText: {
    fontSize: 16,
    color: theme.textDarkColor,
  }
});