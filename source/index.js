import React, { Component } from "react";
import { View } from "react-native";
import { Provider } from "react-redux";
import configureStore from "./store";
import InitialScreen  from "./screen";

const { store, persistor } = configureStore();

export class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <View>
          <InitialScreen />
        </View>
      </Provider>
    );
  }
}

export default App;