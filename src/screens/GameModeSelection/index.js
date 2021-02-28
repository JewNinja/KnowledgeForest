import React from 'react';
import { inject, observer, useLocalObservable } from 'mobx-react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  Picker,
  CheckBox,
} from 'react-native';
import { configure } from 'mobx';


const GameModeSelection = inject("AppStore")(observer(({ navigator, AppStore }) => {
  const state = useLocalObservable(() => ({
    wherewith: AppStore.wherewith || "picture",
    what: AppStore.what || "word",
    isPlayingForTime: AppStore.isPlayingForTime || false,
    isWithExtraTime: AppStore.isWithExtraTime || false,
    guessesAmount: AppStore.guessesAmount || 4
  }))

  return (
    <>
      <View style={styles.container}>
        <View >
          <Text>По:</Text>
          <Picker
            selectedValue={state.wherewith}
            onValueChange={(v) => {state.wherewith = v}}
          >
            <Picker.Item label="картинке" value="picture" />
            <Picker.Item label="слову" value="word" />
          </Picker>
        </View>
        <View >
          <Text>Угадывать:</Text>
          <Picker
            selectedValue={state.what !== state.wherewith && state.what}
            onValueChange={(v) => {state.what = v}}
            enabled={state.wherewith !== "word"}
          >
            {state.wherewith === "picture" && <Picker.Item key="word" label="из слов" value="word" />}
            {state.wherewith === "word" && <Picker.Item key="picture" label="из картинок" value="picture" />}
            {state.wherewith === "picture" && <Picker.Item key="letters" label="слово" value="letters" /> /*   // TODO: при выборе letters ошибка  */}
          </Picker>
        </View>
        <View >
          <Text>На время</Text>
          <CheckBox
            value={state.isPlayingForTime}
            onValueChange={(v) => {state.isPlayingForTime = v}}
          />
          <Text>+Доп.время</Text>
          <CheckBox
            disabled={!state.isPlayingForTime}
            value={state.isWithExtraTime}
            onValueChange={(v) => {state.isWithExtraTime = v}}
          />
        </View>
        <View >
          <Text>Угадывать из:</Text>
          <Picker
            selectedValue={state.guessesAmount}
            onValueChange={(v) => {state.guessesAmount = v}}
          >
            <Picker.Item label="2" value={2} />
            <Picker.Item label="4" value={4} />
            <Picker.Item label="6" value={6} />
            <Picker.Item label="8" value={8} />
          </Picker>
        </View>
        <View >
          <TouchableHighlight
            style={styles.toGameBtn}
            onPress={() => AppStore.setNewSettings(state, true, () => navigator.push('Game', {}, { animation: 'none' }))}
          >
            <Text style={styles.toGameBtnText}>Угадывать</Text>
          </TouchableHighlight>
        </View>
      </View>
    </>
  );
}));

const styles = StyleSheet.create({
  toGameBtn: {
    borderWidth: 1,
    borderColor: 'black',
  }
});

export default GameModeSelection;
