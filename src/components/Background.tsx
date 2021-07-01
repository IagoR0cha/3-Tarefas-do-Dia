import React, { ReactNode } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { StyleSheet, View } from 'react-native';

import { theme } from '../global/styles/theme';

interface Props {
  children: ReactNode;
  styleBody?: StyleProp<ViewStyle>;
  header?: ReactNode;
  styleHeader?: StyleProp<ViewStyle>;
}

export default function Background({ children, styleBody, header, styleHeader }: Props) {
 return (
   <View style={styles.container}>
    <View style={styleHeader}>
      { header }
    </View>
    <View style={[styles.body, styleBody]}>
      { children }
    </View>
   </View>
 );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  },
  body: {
    flex: 1,
    width: '100%',
    alignSelf: 'center',
    justifyContent: 'center',
    paddingTop: 16,
    paddingHorizontal: 16,
    backgroundColor: theme.backgroundColor
  }
});