/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';

import AppStackNav from '@src/navigation/AppStackNav';
import { navigationRef } from 'navigation/utils';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <View style={styles.container}>
      <GestureHandlerRootView style={styles.container}>
        <NavigationContainer ref={navigationRef}>
          <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />

          <AppStackNav />
        </NavigationContainer>
      </GestureHandlerRootView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
