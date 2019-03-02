import React, { Component } from "react";
import { View, Text, ScrollView,StyleSheet } from "react-native";
import { connect } from 'react-redux';
import { getApiResponse } from "../api";
import VideoPlayer from "./Video";

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
  UNSAFE_componentWillReceiveProps(nextProps) {
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
    const section=[];
    for (let i=0;i<10;i++){
      section.push(<Section sectionNumber={i+1}/>);
    }
    return (
      <ScrollView>
        <Text>initial Screen</Text>
        {
          this.state.dataLoaded==true
          ?
            this.props.getAPIResponse!=='error'
            ?
              <View><Text>getAPIResponse Data Loaded</Text></View> 
            :
              <View><Text>Error in loading data</Text></View>
          :
            <View><Text>getAPIResponse Data is loading...</Text></View>
        }
        {section}
      </ScrollView>
    );
  }
}
const mapStateToProps = (state) => {
  const { 
    getAPIResponse,
  } = state.SampleReducer;
  return {
    getAPIResponse
  };
};
const mapDispatchToProps = dispatch => ({
  fetchApiResponse: () => dispatch(getApiResponse()),
});
export default connect(mapStateToProps,mapDispatchToProps)(InitialScreen);

class Section extends Component{
  constructor(props) {
    super(props);
    this.state = {
      duration:null,
      currentTime:null,
    };
  }
  totalDuration(duration){
    this.setState({duration});
  }
  durationPlayed(currentTime){
    this.setState({currentTime});
  }
  render() {
    const videos=[];
    for (let i=0;i<10;i++){
      videos.push(
        <VideoPlayer/>
      );
    }
    console.log(videos);
    return (
      <View style={styles.viewConatainer}>
        <Text style={{color:'black',fontWeight:'bold'}}>Section number - {this.props.sectionNumber}</Text>
        <VideoPlayer videoPlayed={(currentTime)=>this.durationPlayed(currentTime)} videoDuration={(duration)=>this.totalDuration(duration)}/>
        <View style={styles.timeShowView}>
          <Text style={styles.textColor}>Total Duration Time : {this.state.duration}</Text>
          <Text style={styles.textColor}>Current Time : {this.state.currentTime}</Text>
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  viewConatainer: {
    height:400,
    backgroundColor : 'white',
    marginVertical: 5,
    marginHorizontal: 5,
    elevation:3,
    padding:5,
  },
  videoConatainer:{
  },
  timeShowView:{
    flexDirection:'row',
    justifyContent:'space-between',
  },
  textColor:{
    color:'black',
  }
});
