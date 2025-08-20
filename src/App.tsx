/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

// INFO - CH - 2025-08-12 - Unused demo RN app

import { NewAppScreen } from '@react-native/new-app-screen';
import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';

function App() {
    const isDarkMode = useColorScheme() === 'dark';

    return (
        <View style={styles.container}>
            <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
            <NewAppScreen templateFileName="App.tsx" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default App;
