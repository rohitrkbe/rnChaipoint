import React, { Component } from "react";
import { View, Text, AsyncStorage } from "react-native";
import { Provider } from "react-redux";
import configureStore from "./store";
import InitialScreen  from "./screen";

const { store, persistor } = configureStore();

export class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <View>
          <Text>hi</Text>
          <InitialScreen />
        </View>
      </Provider>
    );
  }
}

export default App;