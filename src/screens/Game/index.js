import React, { useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableHighlight,
} from 'react-native';

const Game = inject("AppStore")(observer(({ navigator, AppStore }) => {
  debugger

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.safeAreaView}>     
        <TouchableHighlight
          style={styles.mainBtn}
          onPress={() => navigator.push('MainMenu', {}, { animation: 'none' })}
        >
          <Text style={styles.mainBtnText}>Выход</Text>
        </TouchableHighlight> 
        {AppStore.wherewith === 'picture' && (
          <View>
            <View>
              <Text style={styles.text}>Picture</Text>
            </View>
            {AppStore.what === 'word' ? (
              <View>
                <Text style={styles.text}>Word</Text>
              </View>
            ) : (
              <View>
                <Text style={styles.text}>Letters</Text>
              </View>
            )}
          </View>
        )}
        {AppStore.wherewith === 'word' && (
          <View>  
            <View>
              <Text style={styles.text}>Word</Text>
            </View>
            <View>
              <Text style={styles.text}>Picture</Text>
            </View>
          </View>
        )}
      </SafeAreaView>
    </>
  );
}));

const styles = StyleSheet.create({
  safeAreaView: {
    backgroundColor: '#222',
    minHeight: '100%',
    alignItems: 'center',  
  },
  mainContainer: {
    justifyContent: 'space-around',
    alignItems: 'center',
    color: 'white',
  },
  mainBtn: {
    height: 50,
    width: 180,
    borderWidth: 1,
    borderColor: 'white', 
  },
  mainBtnText: {
    textAlign: "center",
    lineHeight: 45,
    color: 'white',
  },
  text: {
    color: 'white',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: 'white',
  },
});

export default Game;
