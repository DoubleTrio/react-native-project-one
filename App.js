import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { vibrate } from './utils' // Unfortunately, I have a device that doesn't support vibration, so I'm not too sure if vibration works 
import SmallButton from './SmallButton'

const workTime = 1500
const breakTime = 300

export default class App extends React.Component {

  state = {
    timer: workTime,
    onWork: true,
    paused: true,
  }
  
  componentDidMount() {
    this.pauseUnpause(this.state.paused)
  }

  componentWillUnmount() {
    clearInterval(this.intervel)
  }

  convert = (seconds) => {
    let minutes = seconds / 60
    const secs = minutes % 1 === 0 ? '0' : seconds % 60
    const secFormat = secs < 10 ? '0' + secs : secs
    minutes = Math.floor(minutes)
    const minFormat = minutes < 10 ? '0' + minutes : minutes
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
          <SmallButton text = {this.state.paused ? 'Start' : 'Stop'} action={this.toggle} />
          <SmallButton text = 'Reset' action={this.reset} />
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
