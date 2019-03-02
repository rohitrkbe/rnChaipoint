import React, { Component } from "react";
import { View, Text, AsyncStorage, } from "react-native";
import { connect } from 'react-redux';
import { getApiResponse } from "../api";

class InitialScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    dataLoaded: false,
    };
  }
  
  componentDidMount() {
    console.log('componentDidMount')
    this.fetchData();
    // BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  };
  
  fetchData(){
    this.props.fetchApiResponse();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ dataLoaded: false });
    if (nextProps && nextProps.getAPIResponse !== this.props.getAPIResponse) {
      this.setState({ dataLoaded: true });
    }
  }

  componentWillUnmount() {
    // BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }

  handleBackPress = async () => {
    Actions.pop();
    return true
  }

  render() {
    console.log('response in render',this.props.getAPIResponse);
    return (
      <View>
        <Text>initial Screen</Text>
        {
          this.state.dataLoaded==true
          ?
            this.props.getAPIResponse!=='error'
            ?
              <View><Text>Data Loaded</Text></View> 
            :
              <View><Text>Error in loading data</Text></View>
          :
            <View><Text>Data is loading...</Text></View>
        }
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const { 
    getAPIResponse
  } = state.SampleReducer;
  return {
    getAPIResponse
  };
};

const mapDispatchToProps = dispatch => ({
  fetchApiResponse: () => dispatch(getApiResponse()),
});

export default connect(mapStateToProps,mapDispatchToProps)(InitialScreen);