import React from 'react';
import { StyleSheet, Text } from 'react-native';

const SmallButton = ({ action, text }) =>  (
    <Text style={styles.button} onPress={action}>{text}</Text>
)

const styles = StyleSheet.create({
    button: {
        margin: 10,
        padding: 10,
        width: 70,
        borderColor: 'black',
        borderWidth: 0.8,
        borderRadius: 7,
        textAlign: 'center'
    },
})

export default SmallButton