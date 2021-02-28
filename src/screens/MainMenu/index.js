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

import SQLite from 'react-native-sqlite-storage'

const MainMenu = inject("AppStore")(observer(({ navigator, AppStore }) => {
  // debugger

  function errorCB(err) {
    debugger
    console.log("SQL Error: " + err.message + ' - code: ' + err.code);
  }
  
  function openCB() {
    console.log("Database OPENED");
  }

  var db = SQLite.openDatabase({
    name: 'db',
    // location: 'default',
    // createFromLocation: 1,
  }, openCB, errorCB);

  useEffect(() => {
    debugger
    db.transaction((tx) => {
      // this.deleteDatabase("db.db");
      tx.executeSql(
        // 'SELECT * FROM Persons',
        'SELECT * FROM genuses',
        [],
        (tx, results) => {
          debugger
            console.log("Query completed");
        },
        errorCB);
    });
  }, [])

  const onPress = (e) => {
    console.log(23);
  }


  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.safeAreaView}>
        {AppStore.isInit && (
          <View style={styles.mainContainer}>
            {!AppStore.gameMode ? (
              < >
                <TouchableHighlight
                  style={styles.mainBtn}
                  onPress={(e) => onPress(e)}
                  // onPress={() => navigator.push('Game', {}, { animation: 'none' })}
                >
                  <Text style={styles.mainBtnText}>Играть</Text>
                </TouchableHighlight>
                <TouchableHighlight
                  style={styles.mainBtn}
                  onPress={() => navigator.push('GameModeSelection', {}, { animation: 'none' })}
                >
                  <Text style={styles.mainBtnText}>Выбор режима</Text>
                </TouchableHighlight>
              </>
              ) : [
              <TouchableHighlight
                style={styles.mainBtn}
                onPress={() => alert(3)}
              >
                <Text style={styles.mainBtnText}>Название мода</Text>
              </TouchableHighlight>
              ]}
          </View>
        )}
      </SafeAreaView>
    </>
  );
}));

const styles = StyleSheet.create({
  safeAreaView: {
    // flex: 1,
    backgroundColor: '#222',
    minHeight: '100%',
  },
  mainContainer: {
    // height: 100,
    // width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
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
  // sectionContainer: {
  //   marginTop: 32,
  //   paddingHorizontal: 24,
  // },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: 'white',
  },
  // sectionDescription: {
  //   marginTop: 8,
  //   fontSize: 18,
  //   fontWeight: '400',
  //   color: Colors.dark,
  // },
  // highlight: {
  //   fontWeight: '700',
  // },
  // footer: {
  //   color: Colors.dark,
  //   fontSize: 12,
  //   fontWeight: '600',
  //   padding: 4,
  //   paddingRight: 12,
  //   textAlign: 'right',
  // },
});

export default MainMenu;
