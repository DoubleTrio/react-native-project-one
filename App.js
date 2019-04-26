
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { vibrate } from './utils' // Unfortunately, I have a device that doesn't support vibration, so I'm not too sure if vibration works 

const workTime = 1500
const breakTime = 300

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

  convert = (seconds) => {
    const minutes = seconds / 60
    const secs = minutes % 1 === 0 ? '00' : seconds % 60
    const secFormat = secs.toString().length === 1 ? '0' + secs : secs
    const minFormat = Math.floor(minutes).toString().length === 1 ? '0' + Math.floor(minutes) : Math.floor(minutes)
    const format = minFormat + ':' + secFormat
    return format
  }

  swapTime = (timer, onWork) => {
    if (timer === 0) {
      vibrate()
      this.setState(prevState => ({
        timer: onWork ? breakTime : workTime,
        onWork: !prevState.onWork
      }))
    }
  }

  decrease = () => {
    this.setState(prevState => ({
      timer: prevState.timer - 1,
    }), () => this.swapTime(this.state.timer, this.state.onWork))
  }

  toggle = () => {
    this.setState(prevState => ({
      paused: !prevState.paused,
    }), () => this.pauseUnpause(this.state.paused))
  }

  pauseUnpause = (paused) => {
    paused ? clearInterval(this.intervel) : this.intervel = setInterval(this.decrease, 1000)
  }

  reset = () => {
    this.setState(prevState => ({
      timer: prevState.onWork ? workTime : breakTime,
      paused: true,
      onWork: prevState.onWork
    }), () => this.pauseUnpause(this.state.paused))
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={[styles.header, styles.font]}>{this.state.onWork ? 'Work Timer' : 'Break Timer'}</Text>
        <Text style={[styles.timer, styles.font]}>{this.convert(this.state.timer)}</Text>
        <View style={styles.buttonContainer}>
          <Text style={styles.button} onPress={this.toggle}>{this.state.paused ? 'Start' : 'Stop'}</Text>
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

  button: {
    margin: 10,
    padding: 10,
    width: 70,
    borderColor: 'black',
    borderWidth: 0.8,
    borderRadius: 7,
    textAlign: 'center'
  },

  buttonContainer: {
    flexDirection: 'row'
  },

  header: {
    fontSize: 78,
    fontWeight: '600',
    padding: 20,
    
  },
  
  font: {
    fontFamily: "Courier New",
  },

  timer: {
    fontSize: 70,
  }
});
