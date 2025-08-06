import React from 'react';
import { StyleSheet, View } from 'react-native';

const ProgressBar = ({ progress }: { progress: number }) => {
  return (
    <View style={styles.container}>
      <View style={[styles.filler, { width: `${progress}%` }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 20,
    overflow: 'hidden',
    marginVertical: 8,
  },
  filler: {
    height: '100%',
    backgroundColor: '#3C82F6',
  },
});

export default ProgressBar;
