import React from 'react';
import { StyleSheet, Text, View, Vibration } from 'react-native';
import {vibrate} from './utils' // Unfortunately, I have a device that doesn't support vibration 

const pattern = [500, 500, 500]
const workTime = 10
const breakTime = 20

export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
      timer: workTime,
      onWork: true,
      paused: true,
    }
  }
  
  componentDidMount() {
    this.pauseUnpause(this.state.paused)
  }

  componentWillUnmount() {
    clearInterval(this.intervel)
  }

  decrease = () => {
    this.setState(prevState => ({
      timer: prevState.timer - 1,
    }), () => this.swapTime(this.state.timer, this.state.onWork))
  }

  convert = (seconds) => {
    const minutes = seconds / 60
    const secs = minutes % 1 === 0 ? '00' : seconds % 60
    const secFormat = secs.toString().length === 1 ? '0' + secs : secs
    const minFormat = Math.floor(minutes).toString().length === 1 ? '0' + Math.floor(minutes) : Math.floor(minutes)
    const format = minFormat + ':' + secFormat
    return format
  }

  swapTime = (timer, onWork) => {
    if (timer === -1) {
      vibrate()
      this.setState({timer: onWork ? breakTime : breakTime})
    }
  }

  pauseUnpause = (paused) => {
    paused ? clearInterval(this.intervel) : this.intervel = setInterval(this.decrease, 1000)
  }


  toggle = () => {
    this.setState(prevState => ({
      paused: !prevState.paused,
    }), () => this.pauseUnpause(this.state.paused))
  }


  reset = () => {
    this.setState({
      timer: workTime,
      paused: true,
    }, () => this.pauseUnpause(this.state.paused))
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Worktime!</Text>
        <Text style={styles.timer}>{this.state.timer} {this.convert(this.state.timer)}</Text>
        <View style={styles.buttonContainer}>
          <Text style={styles.button} onPress={this.toggle}>Start</Text>
          <Text style={styles.button} onPress={this.reset}>Reset</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  timer: {
    fontSize: 78,
  },

  button: {
    margin: 10,
    padding: 10,
    width: 70,
    backgroundColor: '#007bff',
    color: 'white',
    borderColor: 'black',
    borderWidth: 0.8,
    borderRadius: 4,
    textAlign: 'center'
  },

  buttonContainer: {
    flexDirection: 'row'
  },
  header: {
    fontSize: 78,
  }
});
